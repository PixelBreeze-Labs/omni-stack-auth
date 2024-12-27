'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CallbackPageContent() {
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    const [credentials, setCredentials] = useState(null)

    const searchParams = useSearchParams()

    useEffect(() => {
        // Get stored credentials
        const stored = localStorage.getItem('omnistack_test_credentials')
        if (stored) {
            setCredentials(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        const code = searchParams.get('code')
        if (!code || !credentials) return

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
            .then(data => setUserInfo(data))
            .catch(console.error)
    }, [searchParams, credentials])

    if (!credentials) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">No credentials found</h1>
                <p>Please go back and register a test client first.</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Callback</h1>

            {token && (
                <div className="mb-4">
                    <h2 className="font-bold">Access Token:</h2>
                    <pre className="bg-gray-100 p-2 rounded">{token}</pre>
                </div>
            )}

            {userInfo && (
                <div>
                    <h2 className="font-bold">User Info:</h2>
                    <pre className="bg-gray-100 p-2 rounded">
                        {JSON.stringify(userInfo, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}

// Wrap the content in Suspense boundary for client-side rendering
export default function CallbackPage() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null // Don't render until client-side
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackPageContent />
        </Suspense>
    )
}
