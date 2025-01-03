// packages/omnistack-auth/src/components/AuthModal.tsx
'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    clientId: string
    redirectUri: string
    onSuccess?: (data: { token: string; user: any }) => void
}

export function AuthModal({ isOpen, onClose, clientId, redirectUri, onSuccess }: AuthModalProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim(),
                    clientId,
                    redirectUri
                })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error)

            if (data.token) {
                onSuccess?.(data)
                onClose()
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#1D1E20]/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-8">
                                    <motion.div
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="h-8 w-8 rounded bg-[#2A8E9E] text-white flex items-center justify-center font-bold">
                                            OS
                                        </div>
                                        <span className="font-bold text-xl text-[#2A8E9E]">OmniStack</span>
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                                    </motion.button>
                                </div>

                                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                                    Welcome back!
                                </Dialog.Title>

                                <p className="text-gray-500 mb-6">
                                    Sign in to continue to your account
                                </p>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <motion.input
                                            whileFocus={{ scale: 1.002 }}
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                                            placeholder="Enter your email"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                href="#"
                                                className="text-sm text-[#2A8E9E] hover:underline"
                                            >
                                                Forgot password?
                                            </motion.a>
                                        </div>
                                        <motion.input
                                            whileFocus={{ scale: 1.002 }}
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                                            placeholder="Enter your password"
                                            disabled={loading}
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#2A8E9E] px-4 py-3 text-white font-medium hover:bg-[#180D39] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A8E9E] transition-colors disabled:opacity-50 disabled:hover:bg-[#2A8E9E]"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <motion.div
                                                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                <span className="ml-2">Signing in...</span>
                                            </div>
                                        ) : (
                                            'Sign in'
                                        )}
                                    </motion.button>

                                    <div className="text-center text-sm text-gray-500">
                                        Don't have an account?{' '}
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            href="#"
                                            className="text-[#2A8E9E] hover:underline font-medium"
                                        >
                                            Sign up
                                        </motion.a>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}