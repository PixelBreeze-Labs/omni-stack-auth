'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
    showNav?: boolean
}

export function Header({ showNav = true }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="border-b border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary text-white flex items-center justify-center font-bold">
                            OS
                        </div>
                        <span className="font-bold text-xl text-primary">OmniStack</span>
                    </Link>

                    {/* Mobile menu button */}
                    {showNav && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-md"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6 text-gray-600" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-gray-600" />
                            )}
                        </button>
                    )}

                    {/* Desktop navigation */}
                    {showNav && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/docs" className="text-text-secondary hover:text-text-primary transition-colors">
                                Documentation
                            </Link>
                            <Link href="/playground" className="text-text-secondary hover:text-text-primary transition-colors">
                                Playground
                            </Link>
                            <Link
                                href="https://github.com/PixelBreeze-Labs/omni-stack-auth"
                                className="text-text-secondary hover:text-text-primary transition-colors"
                                target="_blank"
                            >
                                GitHub
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu */}
                {showNav && (
                    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-100`}>
                        <div className="py-2 space-y-1">
                            <Link
                                href="/docs"
                                className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Documentation
                            </Link>
                            <Link
                                href="/playground"
                                className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Playground
                            </Link>
                            <Link
                                href="https://github.com/PixelBreeze-Labs/omni-stack-auth"
                                className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                            >
                                GitHub
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}