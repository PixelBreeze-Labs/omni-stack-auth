// packages/omnistack-auth/src/types/index.ts
export interface AuthConfig {
    clientId: string
    redirectUri: string
    mode?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export interface AuthResponse {
    success: boolean
    error?: string
    token?: string
    user?: {
        id: string
        email: string
        name?: string
        picture?: string
    }
}