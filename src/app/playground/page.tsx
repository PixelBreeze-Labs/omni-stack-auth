'use client'
import { useState } from 'react'
import { DirectTest } from './components/DirectTest'
import { PackageTest } from './components/PackageTest'
import { Header } from '@/components/layout/Header'

export default function PlaygroundPage() {
    const [tab, setTab] = useState<'direct' | 'package'>('direct')

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8 flex justify-center gap-2">
                    <button
                        onClick={() => setTab('direct')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            tab === 'direct'
                                ? 'bg-primary text-white'
                                : 'bg-white text-text-secondary hover:text-text-primary border border-gray-200'
                        }`}
                    >
                        Direct Integration
                    </button>
                    <button
                        onClick={() => setTab('package')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            tab === 'package'
                                ? 'bg-primary text-white'
                                : 'bg-white text-text-secondary hover:text-text-primary border border-gray-200'
                        }`}
                    >
                        Package Integration
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-8">
                        {tab === 'direct' ? <DirectTest /> : <PackageTest />}
                    </div>
                </div>
            </div>
        </div>
    )
}