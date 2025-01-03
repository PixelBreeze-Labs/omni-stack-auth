// src/app/docs/components/DocsSidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sections = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '/docs' },
            { title: 'Quick Start', href: '/docs/quickstart' },
            // { title: 'Installation', href: '/docs/installation' },
        ]
    },
    // {
    //     title: 'Integration',
    //     items: [
    //         { title: 'Direct Integration', href: '/docs/direct-integration' },
    //         { title: 'Package Usage', href: '/docs/package-usage' },
    //         { title: 'Configuration', href: '/docs/configuration' },
    //     ]
    // },
    // {
    //     title: 'Components',
    //     items: [
    //         { title: 'LoginButton', href: '/docs/components/login-button' },
    //         { title: 'AuthModal', href: '/docs/components/auth-modal' },
    //     ]
    // }
]

export function DocsSidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-8">
            {sections.map((section) => (
                <div key={section.title}>
                    <h5 className="mb-3 font-semibold text-text-primary">
                        {section.title}
                    </h5>
                    <ul className="space-y-2">
                        {section.items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-lg transition-colors ${
                                        pathname === item.href
                                            ? 'bg-primary text-white'
                                            : 'text-text-secondary hover:text-text-primary'
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}