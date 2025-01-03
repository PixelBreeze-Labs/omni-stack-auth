// Add types for forgot password and registration flows
interface AuthResponse {
    success: boolean
    error?: string
    redirectUrl?: string
}

// Add these to your existing AuthModal props
interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    clientId: string
    redirectUri: string
    onForgotPassword?: (email: string) => Promise<AuthResponse>
    onRegister?: (email: string, password: string) => Promise<AuthResponse>
}