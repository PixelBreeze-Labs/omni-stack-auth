// src/app/docs/quickstart/page.tsx
import {CodeBlock} from "@/app/docs/components/CodeBlock";

export default function QuickStartPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary">Quick Start Guide</h1>

            <div className="mt-8 space-y-8">
                <section>
                    <h2 className="text-xl font-semibold text-text-primary">1. Installation</h2>
                    <CodeBlock
                        code={`npm install @omnistack/auth`}
                        language="bash"
                    />
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-text-primary">2. Register Your Application</h2>
                    <p className="mt-2 text-text-secondary">
                        Visit the OmniStack Dashboard to register your application and get your client credentials.
                    </p>
                    <CodeBlock
                        code={`// Save these in your .env file
OMNISTACK_CLIENT_ID=your_client_id
OMNISTACK_CLIENT_SECRET=your_client_secret`}
                        filename=".env"
                    />
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-text-primary">3. Add the Login Button</h2>
                    <CodeBlock
                        code={`import { LoginButton } from '@omnistack/auth'

export default function App() {
  return (
    <LoginButton
      clientId={process.env.NEXT_PUBLIC_OMNISTACK_CLIENT_ID!}
      redirectUri="https://your-app.com/auth/callback"
      onSuccess={(data) => {
        console.log('Logged in:', data.user)
      }}
    />
  )
}`}
                        filename="App.tsx"
                    />
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-text-primary">4. Handle the Callback</h2>
                    <CodeBlock
                        code={`// pages/auth/callback.tsx
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) return

    // Exchange code for token
    // Store user session
    // Redirect to your app
  }, [searchParams])

  return <div>Loading...</div>
}`}
                        filename="callback.tsx"
                    />
                </section>
            </div>
        </div>
    )
}