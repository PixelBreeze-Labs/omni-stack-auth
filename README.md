# OmniStack Auth

Universal authentication provider for modern web applications, offering a seamless "Login with OmniStack" experience similar to social logins.

## Features

- 🔒 **Secure by Default**: Built with security best practices and OAuth 2.0 compliance
- 🎨 **Beautiful UI**: Pre-built components that match your brand
- 🚀 **Easy Integration**: Simple API for quick implementation
- 📱 **Responsive**: Works perfectly on all devices
- 🌍 **Framework Agnostic**: Use with any modern framework

## Quick Start

1. Install the package:
```bash
npm install @omnistack/auth
```

2. Add the login button:
```typescript
import { LoginButton } from '@omnistack/auth'

function App() {
  return (
    <LoginButton
      clientId="your_client_id"
      redirectUri="your_callback_url"
      onSuccess={(data) => {
        console.log(data.user, data.token)
      }}
    />
  )
}
```

## Project Structure

```
omnistack-auth/
├── src/
│   ├── app/           # Next.js app
│   │   ├── page.tsx   # Landing page
│   │   ├── docs/      # Documentation
│   │   └── playground/# Testing playground
│   ├── components/    # Shared components
│   │   └── auth/      # Auth components
│   └── lib/          # Utilities
└── packages/
    └── omnistack-auth/# NPM package
```

## Environment Variables

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_DOMAIN=https://auth.omnistack.com

# Database
DATABASE_URL=mongodb://localhost:27017/omnistack-auth

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Security
JWT_SECRET=your_jwt_secret
```

## Development

1. Clone and install:
```bash
git clone https://github.com/PixelBreeze-Labs/omni-stack-auth.git
cd omnistack-auth
npm install
```

2. Start MongoDB:
```bash
mongod --dbpath /usr/local/var/mongodb
```

3. Run the development server:
```bash
npm run dev
```

4. Visit the playground:
    * Open http://localhost:3000/playground
    * Test both direct and package integrations

## Documentation

Visit our documentation for:
* Detailed integration guides
* Component API references
* Best practices
* Examples

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

* Social login providers
* Multi-factor authentication
* Enterprise SSO
* Mobile SDKs
* Analytics dashboard
* Rate limiting
* Subscription management

## License

MIT © [OmniStack]