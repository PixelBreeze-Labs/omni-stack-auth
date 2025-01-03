// src/app/docs/components/CodeBlock.tsx
'use client'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
    code: string
    language?: string
    filename?: string
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative mt-4 mb-8">
            {filename && (
                <div className="absolute top-0 left-4 -translate-y-1/2 px-4 py-1 bg-gray-100 rounded-full text-sm text-text-secondary">
                    {filename}
                </div>
            )}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <button
                    onClick={copyCode}
                    className="absolute right-2 top-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                    {copied ? (
                        <CheckIcon className="w-4 h-4 text-green-400" />
                    ) : (
                        <CopyIcon className="w-4 h-4 text-gray-400" />
                    )}
                </button>
                <pre className="p-4 overflow-x-auto text-sm text-gray-300">
          <code>{code}</code>
        </pre>
            </div>
        </div>
    )
}
