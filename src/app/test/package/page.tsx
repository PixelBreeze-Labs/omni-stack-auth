// src/app/test/package/page.tsx
'use client'
import { useState } from 'react'
import { LoginButton } from '@/components/auth/LoginButton'  // Changed import path

export default function TestPackagePage() {
    const [clientId, setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')

    const registerClient = async () => {
        const res = await fetch('/api/test/register-client')
        const client = await res.json()
        setClientId(client.clientId)
        setClientSecret(client.clientSecret)

        localStorage.setItem('omnistack_test_credentials', JSON.stringify({
            clientId: client.clientId,
            clientSecret: client.clientSecret
        }))
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Test Package Integration</h1>

            <div className="space-y-4">
                <button
                    onClick={registerClient}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register Test Client
                </button>

                {clientId && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded">
                            <div>Client ID: {clientId}</div>
                            <div>Client Secret: {clientSecret}</div>
                        </div>

                        <LoginButton
                            clientId={clientId}
                            redirectUri="http://localhost:3000/test/callback"
                        >
                            Test Package Login
                        </LoginButton>
                    </div>
                )}
            </div>
        </div>
    )
}