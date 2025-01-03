// src/app/docs/layout.tsx
import { Header } from '@/components/layout/Header'
import { DocsSidebar } from './components/DocsSidebar'

export default function DocsLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-8 py-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <DocsSidebar />
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow px-8 py-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
