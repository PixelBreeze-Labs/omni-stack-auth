import Link from 'next/link'

export default function HomePage() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            OmniStack Auth
          </h1>
          <p className="mt-2 text-gray-600">
            Universal authentication provider for modern applications
          </p>
          <div className="mt-8">
            <Link
                href="/docs"
                className="text-indigo-600 hover:text-indigo-500"
            >
              View Documentation →
            </Link>
          </div>
        </div>
      </div>
  )
}