import { useState, useEffect, useCallback } from 'react'
import type { AuthConfig, AuthResponse } from '../types'

export function useOmniAuth(config: AuthConfig) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<AuthResponse['user'] | null>(null)
    const [token, setToken] = useState<string | null>(null)

    // Get stored token on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('omnistack_auth')
        if (storedAuth) {
            const { token, user } = JSON.parse(storedAuth)
            setToken(token)
            setUser(user)
        }
    }, [])

    const login = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        const authWindow = window.open(
            `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/authorize?` +
            new URLSearchParams({
                client_id: config.clientId,
                redirect_uri: config.redirectUri
            }),
            'OmniStack Auth',
            'width=500,height=600'
        )

        if (!authWindow) {
            setError('Popup blocked. Please allow popups and try again.')
            setIsLoading(false)
            return
        }

        // Listen for messages from auth window
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== process.env.NEXT_PUBLIC_APP_DOMAIN) return

            const { type, data } = event.data
            if (type === 'AUTH_SUCCESS') {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('omnistack_auth', JSON.stringify(data))
                authWindow.close()
            }
            if (type === 'AUTH_ERROR') {
                setError(data.error)
                authWindow.close()
            }
            setIsLoading(false)
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [config.clientId, config.redirectUri])

    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('omnistack_auth')
    }, [])

    return {
        login,
        logout,
        isLoading,
        error,
        user,
        token,
        isAuthenticated: !!token
    }
}