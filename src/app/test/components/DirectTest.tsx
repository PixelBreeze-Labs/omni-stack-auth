
// src/app/test/components/DirectTest.tsx
'use client'
import { useState } from 'react'
import { AuthModal } from '@/components/auth/AuthModal'
import { LoginButton } from '@/components/auth/LoginButton'

export function DirectTest() {
    const [clientId, setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const startLogin = () => {
        if (!clientId) return
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4">Direct Integration Test</h2>
                <button
                    onClick={registerClient}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Register Test Client
                </button>
            </div>

            {clientId && (
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded">
                        <div>Client ID: {clientId}</div>
                        <div>Client Secret: {clientSecret}</div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={startLogin}
                            className="bg-green-500 text-white px-4 py-2 rounded block w-full"
                        >
                            Test Modal Login (Direct)
                        </button>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-500 mb-2">Test LoginButton Component:</p>
                            <div className="space-y-2">
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri="http://localhost:3000/test/callback"
                                    size="sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {clientId && (
                <AuthModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    clientId={clientId}
                    redirectUri="http://localhost:3000/test/callback"
                />
            )}
        </div>
    )
}