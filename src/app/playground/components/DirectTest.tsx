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

    const onLoginSuccess = (data: any) => {
        console.log('Login success:', data)
        window.location.href = `/test/callback?code=${data.code}`
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">Direct Integration Testing</h1>
                <p className="mt-2 text-text-secondary">Test the direct integration of OmniStack Auth components</p>
            </div>

            {/* Registration Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">1. Register Test Client</h2>
                    <button
                        onClick={registerClient}
                        className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Register New Client
                    </button>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">2. Client Credentials</h2>
                    {clientId ? (
                        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                            <div className="mb-2">
                                <span className="text-text-primary font-medium">Client ID: </span>
                                <span className="text-text-primary break-all">{clientId}</span>
                            </div>
                            <div>
                                <span className="text-text-primary font-medium">Client Secret: </span>
                                <span className="text-text-primary break-all">{clientSecret}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-text-muted italic">
                            No client registered yet
                        </div>
                    )}
                </div>
            </div>

            {/* Testing Section */}
            {clientId && (
                <div className="space-y-8">
                    <div className="border-t pt-8">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">3. Test Authentication</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Modal Test */}
                            <div>
                                <h3 className="text-sm font-medium text-text-primary mb-2">Test Modal</h3>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full bg-text-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                                >
                                    Open Auth Modal
                                </button>
                            </div>

                            {/* Button Test */}
                            <div>
                                <h3 className="text-sm font-medium text-text-primary mb-2">Test Button Component</h3>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    onSuccess={onLoginSuccess}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clientId={clientId}
                redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                onSuccess={onLoginSuccess}
            />
        </div>
    )
}