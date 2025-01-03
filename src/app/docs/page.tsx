// Example documentation page: src/app/docs/page.tsx
import {CodeBlock} from "@/app/docs/components/CodeBlock";
import {PropsTable} from "@/app/docs/components/PropsTable";

export default function DocsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary">OmniStack Auth Documentation</h1>

            <p className="mt-4 text-text-secondary">
                OmniStack Auth provides a unified authentication solution that can be integrated into any application,
                similar to "Sign in with Google" or "Sign in with GitHub".
            </p>

            <h2 className="mt-8 text-xl font-semibold text-text-primary">Quick Start</h2>

            <CodeBlock
                code={`npm install @omnistack/auth`}
                language="bash"
            />

            <CodeBlock
                code={`import { LoginButton } from '@omnistack/auth'

function App() {
  return (
    <LoginButton
      clientId="your_client_id"
      redirectUri="your_callback_url"
    />
  )
}`}
                filename="App.tsx"
            />

            <h2 className="mt-8 text-xl font-semibold text-text-primary">Available Components</h2>

            <PropsTable
                props={[
                    {
                        name: 'clientId',
                        type: 'string',
                        required: true,
                        description: 'Your OmniStack client ID'
                    },
                    {
                        name: 'redirectUri',
                        type: 'string',
                        required: true,
                        description: 'Where to redirect after successful authentication'
                    },
                    {
                        name: 'mode',
                        type: '"light" | "dark"',
                        default: 'light',
                        description: 'Button appearance mode'
                    }
                ]}
            />
        </div>
    )
}