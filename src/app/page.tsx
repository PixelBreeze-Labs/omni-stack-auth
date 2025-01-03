// src/app/page.tsx
import { Header } from '@/components/layout/Header'
import Link from 'next/link'

export default function HomePage() {
  return (
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:px-8">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
                  Universal Authentication for Modern Applications
                </h1>
                <p className="relative mt-6 text-lg leading-8 text-text-secondary">
                  Add "Login with OmniStack" to your application in minutes. Secure, reliable, and easy to integrate.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                      href="/playground"
                      className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                  >
                    Try it Out
                  </Link>
                  <Link
                      href="/docs"
                      className="text-sm font-semibold leading-6 text-text-primary flex items-center gap-1"
                  >
                    View Documentation <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-14 flex justify-end lg:mt-0">
                <div className="relative">
                  <img
                      src="/demo/auth-modal.png"
                      alt="Auth Modal Demo"
                      className="w-[364px] rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Authentication Made Simple</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Everything you need for modern auth
              </p>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                A complete authentication solution that works seamlessly across platforms and frameworks.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col">
                      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-text-primary">
                        {feature.name}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-secondary">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                    </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <Link href="/docs" className="text-text-secondary hover:text-text-primary">
                Documentation
              </Link>
              <Link href="/playground" className="text-text-secondary hover:text-text-primary">
                Playground
              </Link>
              <Link href="https://github.com/PixelBreeze-Labs/omni-stack-auth" className="text-text-secondary hover:text-text-primary">
                GitHub
              </Link>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-xs leading-5 text-text-secondary">
                &copy; {new Date().getFullYear()} OmniStack. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
  )
}

const features = [
  {
    name: 'Secure by Default',
    description: 'Built with security best practices. OAuth 2.0 compliant with support for multiple authentication flows.',
  },
  {
    name: 'Framework Agnostic',
    description: 'Works with any modern framework or library. Easy integration with React, Vue, Angular, and more.',
  },
  {
    name: 'Developer Experience',
    description: 'Simple API, comprehensive documentation, and developer tools make integration a breeze.',
  },
]