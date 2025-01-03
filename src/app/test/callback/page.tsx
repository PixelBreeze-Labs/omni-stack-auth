'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CallbackPage() {
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    const searchParams = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')
        if (!code) return

        // Get stored credentials
        const stored = localStorage.getItem('omnistack_test_credentials')
        if (!stored) return

        const credentials = JSON.parse(stored)

        // Exchange code for token
        fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                client_id: credentials.clientId,
                client_secret: credentials.clientSecret
            })
        })
            .then(r => r.json())
            .then(data => {
                setToken(data.access_token)

                // Get user info
                return fetch('/api/auth/userinfo', {
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`
                    }
                })
            })
            .then(r => r.json())
            .then(setUserInfo)
            .catch(console.error)
    }, [searchParams])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Callback</h1>

            {token && (
                <div className="mb-4">
                    <h2 className="font-bold">Access Token:</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                        {token}
                    </pre>
                </div>
            )}

            {userInfo && (
                <div>
                    <h2 className="font-bold">User Info:</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                        {JSON.stringify(userInfo, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}