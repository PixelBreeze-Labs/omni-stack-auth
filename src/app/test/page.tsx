'use client'
import { useState } from 'react'

export default function TestPage() {
    const [clientId, setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')

    const registerClient = async () => {
        const res = await fetch('/api/test/register-client')
        const client = await res.json()
        setClientId(client.clientId)
        setClientSecret(client.clientSecret)

        // Store credentials for callback page
        localStorage.setItem('omnistack_test_credentials', JSON.stringify({
            clientId: client.clientId,
            clientSecret: client.clientSecret
        }))
    }

    const startLogin = () => {
        if (!clientId) return

        const url = `/api/auth/authorize?${new URLSearchParams({
            client_id: clientId,
            redirect_uri: 'https://auth.omnistack.xyz/test/callback'
        })}`

        window.location.href = url
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Test OmniStack Auth</h1>

            <div className="space-y-4">
                <button
                    onClick={registerClient}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register Test Client
                </button>

                {clientId && (
                    <div className="space-y-2">
                        <div>Client ID: {clientId}</div>
                        <div>Client Secret: {clientSecret}</div>

                        <button
                            onClick={startLogin}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Test Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}