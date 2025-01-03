import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'OmniStack Auth',
    description: 'Universal authentication provider for modern apps',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
        <main className="min-h-screen bg-white">
            {children}
        </main>
        </body>
        </html>
    )
}