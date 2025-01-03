// src/app/docs/components/login-button/page.tsx
import {CodeBlock} from "@/app/docs/components/CodeBlock";
import {PropsTable} from "@/app/docs/components/PropsTable";

export default function LoginButtonPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary">LoginButton Component</h1>

            <p className="mt-4 text-text-secondary">
                The LoginButton component provides a pre-styled button that handles the OmniStack authentication flow.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-text-primary">Usage</h2>

            <CodeBlock
                code={`import { LoginButton } from '@omnistack/auth'

export default function App() {
  return (
    <LoginButton
      clientId="your_client_id"
      redirectUri="your_callback_url"
      mode="light"
      size="md"
      onSuccess={(data) => {
        console.log('Logged in:', data.user)
      }}
    />
  )
}`}
            />

            <h2 className="mt-8 text-xl font-semibold text-text-primary">Props</h2>

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
                    },
                    {
                        name: 'size',
                        type: '"sm" | "md" | "lg"',
                        default: 'md',
                        description: 'Button size'
                    },
                    {
                        name: 'onSuccess',
                        type: '(data: { user: User; token: string }) => void',
                        description: 'Callback function called after successful authentication'
                    },
                    {
                        name: 'className',
                        type: 'string',
                        description: 'Additional CSS classes to apply to the button'
                    }
                ]}
            />
        </div>
    )
}