// src/app/test/components/PackageTest.tsx
'use client'
import { useState } from 'react'
import { AuthModal, LoginButton } from '@omnistack/auth'

export function PackageTest() {
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
        console.log('Package login success:', data)
        window.location.href = `/test/callback?code=${data.code}`
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">Package Integration Testing</h1>
                <p className="mt-2 text-text-secondary">Test the packaged version of OmniStack Auth</p>
            </div>

            {/* Setup Section */}
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
                        <h2 className="text-lg font-semibold text-text-primary mb-4">3. Test Button Variants</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Small Light */}
                            <div>
                                <h3 className="text-sm font-medium text-text-primary mb-2">Small Light</h3>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="sm"
                                    onSuccess={onLoginSuccess}
                                />
                            </div>

                            {/* Medium Dark */}
                            <div>
                                <h3 className="text-sm font-medium text-text-primary mb-2">Medium Dark</h3>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="md"
                                    mode="dark"
                                    onSuccess={onLoginSuccess}
                                />
                            </div>

                            {/* Large Custom */}
                            <div>
                                <h3 className="text-sm font-medium text-text-primary mb-2">Large Custom</h3>
                                <LoginButton
                                    clientId={clientId}
                                    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/test/callback`}
                                    size="lg"
                                    className="bg-purple-600 hover:bg-purple-700"
                                    onSuccess={onLoginSuccess}
                                >
                                    Custom OmniStack Login
                                </LoginButton>
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