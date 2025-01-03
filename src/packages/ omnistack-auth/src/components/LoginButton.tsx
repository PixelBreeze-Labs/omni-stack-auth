// packages/omnistack-auth/src/components/LoginButton.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {AuthModal} from "./AuthModal";

interface LoginButtonProps {
    clientId: string
    redirectUri: string
    children?: React.ReactNode
    mode?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    onLoginSuccess?: (data: { token: string; user: any }) => void
}

const BUTTON_SIZES = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
}

const BUTTON_MODES = {
    light: 'bg-[#2A8E9E] hover:bg-[#180D39] text-white',
    dark: 'bg-[#180D39] hover:bg-[#2A8E9E] text-white'
}

export function LoginButton({
                                clientId,
                                redirectUri,
                                children,
                                mode = 'light',
                                size = 'md',
                                className = '',
                                onLoginSuccess
                            }: LoginButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSuccess = (data: { token: string; user: any }) => {
        setIsModalOpen(false)
        onLoginSuccess?.(data)
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className={`
                    inline-flex items-center justify-center rounded-lg font-medium transition-colors
                    ${BUTTON_SIZES[size]}
                    ${BUTTON_MODES[mode]}
                    ${className}
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-white/10 flex items-center justify-center text-xs font-bold">
                        OS
                    </div>
                    {isLoading ? (
                        <motion.div
                            className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    ) : children || 'Continue with OmniStack'}
                </div>
            </motion.button>

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clientId={clientId}
                redirectUri={redirectUri}
                onSuccess={handleSuccess}
            />
        </>
    )
}