export interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    redirectUri: string;
    onSuccess?: (data: OnSuccessData) => void;
}

export interface LoginButtonProps {
    clientId: string;
    redirectUri: string;
    size?: 'sm' | 'md' | 'lg';
    mode?: 'light' | 'dark';
    className?: string;
    children?: React.ReactNode;
    onSuccess?: (data: OnSuccessData) => void;
}

export interface OnSuccessData {
    code: string;
    state?: string;
}

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