// packages/omnistack-auth/src/types/index.ts
export interface AuthConfig {
    clientId: string
    redirectUri: string
    mode?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export interface AuthResponse {
    token: string
    user: {
        id: string
        email: string
        name?: string
        picture?: string
    }
}

export interface OnSuccessData {
    token: string
    user: AuthResponse['user']
}

export interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    clientId: string
    redirectUri: string
    onSuccess?: (data: OnSuccessData) => void
}

export interface LoginButtonProps extends AuthConfig {
    children?: React.ReactNode
    onLoginSuccess?: (data: OnSuccessData) => void
}
