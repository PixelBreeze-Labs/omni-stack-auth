// packages/omnistack-auth/src/hooks/useOmniAuth.ts
import { useState, useEffect, useCallback } from 'react'
import type { AuthConfig, AuthResponse } from '../types'

export function useOmniAuth(config: AuthConfig) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<AuthResponse['user'] | null>(null)
    const [token, setToken] = useState<string | null>(null)

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

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/authorize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: config.clientId,
                    redirect_uri: config.redirectUri
                })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error)

            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('omnistack_auth', JSON.stringify(data))

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
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