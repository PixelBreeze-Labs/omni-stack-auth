// src/components/auth/LoginButton.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AuthModal } from './AuthModal'

interface LoginButtonProps {
    clientId: string
    redirectUri: string
    children?: React.ReactNode
    // Add customization options
    className?: string
    mode?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
}

export function LoginButton({
                                clientId,
                                redirectUri,
                                children,
                                className,
                                mode = 'light',
                                size = 'md'
                            }: LoginButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors"
    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base'
    }
    const modeStyles = {
        light: 'bg-[#2A8E9E] text-white hover:bg-[#180D39]',
        dark: 'bg-[#180D39] text-white hover:bg-[#2A8E9E]'
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className={`${baseStyles} ${sizeStyles[size]} ${modeStyles[mode]} ${className}`}
            >
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-white/10 flex items-center justify-center text-xs font-bold">
                        OS
                    </div>
                    {children || 'Continue with OmniStack'}
                </div>
            </motion.button>

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clientId={clientId}
                redirectUri={redirectUri}
            />
        </>
    )
}
