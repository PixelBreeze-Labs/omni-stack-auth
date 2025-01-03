// src/app/test/components/PackageTest.tsx
'use client'
import { useState } from 'react'
import { LoginButton } from '@/packages/omnistack-auth'

export function PackageTest() {
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
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4">Package Integration Test</h2>
                <button
                    onClick={registerClient}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register Test Client
                </button>
            </div>

            {clientId && (
                <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded">
                        <div>Client ID: {clientId}</div>
                        <div>Client Secret: {clientSecret}</div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Button Variants:</h3>
                        <div className="grid gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Small Light:</p>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Medium Dark:</p>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="md"
                                    mode="dark"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Large Custom:</p>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="lg"
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    Custom OmniStack Login
                                </LoginButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}