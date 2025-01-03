// src/app/test/page.tsx
'use client'
import { useState } from 'react'
import { DirectTest } from './components/DirectTest'
import { PackageTest } from './components/PackageTest'

export default function TestPage() {
    const [tab, setTab] = useState<'direct' | 'package'>('direct')

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setTab('direct')}
                    className={`px-4 py-2 rounded ${
                        tab === 'direct' ? 'bg-[#2A8E9E] text-white' : 'bg-gray-100'
                    }`}
                >
                    Direct Integration
                </button>
                <button
                    onClick={() => setTab('package')}
                    className={`px-4 py-2 rounded ${
                        tab === 'package' ? 'bg-[#2A8E9E] text-white' : 'bg-gray-100'
                    }`}
                >
                    Package Integration
                </button>
            </div>

            {tab === 'direct' ? <DirectTest /> : <DirectTest />}
        </div>
    )
}