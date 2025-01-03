# OmniStack Auth

## Overview
OmniStack Auth provides a unified authentication solution that can be integrated into any application, similar to "Sign in with Google" or "Sign in with GitHub". It consists of two parts:
1. Auth Provider (this project)
2. Client Package (@omnistack/auth)

## Direct Integration

```typescript
// Method 1: Using the LoginButton component
import { LoginButton } from '@omnistack/auth'

function App() {
  return (
    <LoginButton
      clientId="your_client_id"
      redirectUri="your_callback_url"
      mode="light" // or "dark"
      size="md" // "sm" | "md" | "lg"
      onLoginSuccess={(data) => {
        console.log(data.token, data.user)
      }}
    />
  )
}

// Method 2: Using the AuthModal directly
import { AuthModal } from '@omnistack/auth'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <AuthModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      clientId="your_client_id"
      redirectUri="your_callback_url"
      onSuccess={(data) => {
        console.log(data.token, data.user)
      }}
    />
  )
}
```

## Environment Setup

```env
# Core URLs
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

## Missing Features & Next Steps

### 1. User Management
- User registration flow
- Password reset functionality
- Email verification
- Multi-factor authentication
- User profile management

### 2. Security Enhancements
- Rate limiting
- CSRF protection
- IP blocking
- Suspicious activity detection
- Session management
- Token refresh mechanism

### 3. Admin Dashboard
- Client application management
- User management interface
- Analytics and usage statistics
- Audit logs
- Client credentials management

### 4. Developer Experience
- Better error handling
- Comprehensive logging
- SDK documentation
- Integration examples
- TypeScript improvements
- Testing suite

### 5. Infrastructure
- Deployment configuration
- CI/CD pipeline
- Monitoring setup
- Backup strategy
- Scaling configuration

### 6. Package Improvements
- Dark mode support
- Custom styling options
- More button variants
- Loading states
- Error handling
- Accessibility improvements
- i18n support

### 7. Integration Features
- Social login providers
- Enterprise SSO
- SAML support
- OpenID Connect compliance
- OAuth 2.0 flows

### 8. Client SDKs
- React Native support
- Vue.js support
- Angular support
- Mobile SDKs (iOS/Android)
- Server-side SDKs

### 9. Business Features
- Usage tracking
- Billing integration
- API rate limiting
- Client tiers
- Subscription management

### 10. Documentation
- API documentation
- Integration guides
- Security best practices
- Troubleshooting guide
- Migration guides
- SDK references
- Example applications

## Getting Started for Development

1. Clone and Install:
```bash
git clone https://github.com/your-org/omnistack-auth.git
cd omnistack-auth
npm install
```

2. Set up environment:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

3. Start MongoDB:
```bash
# Make sure MongoDB is running
mongod --dbpath /usr/local/var/mongodb
```

4. Run development server:
```bash
npm run dev
```

5. Test the integration:
```bash
# Visit http://localhost:3000/test
# Register a test client
# Try both direct and package integrations
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT