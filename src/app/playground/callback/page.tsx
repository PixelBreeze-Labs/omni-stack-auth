'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'

function CallbackContent() {
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    const searchParams = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')
        if (!code) return

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow px-6 py-8">
                <h1 className="text-2xl font-bold text-text-primary mb-8">Auth Callback</h1>

                {token && (
                    <div className="mb-8">
                        <h2 className="font-bold text-text-primary mb-2">Access Token:</h2>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-text-primary">
                            {token}
                        </pre>
                    </div>
                )}

                {userInfo && (
                    <div>
                        <h2 className="font-bold text-text-primary mb-2">User Info:</h2>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-text-primary">
                            {JSON.stringify(userInfo, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

function LoadingState() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow px-6 py-8">
                <div className="animate-pulse">
                    <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CallbackPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Suspense fallback={<LoadingState />}>
                <CallbackContent />
            </Suspense>
        </div>
    )
}