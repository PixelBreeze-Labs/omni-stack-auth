// src/config/auth.config.ts
export const AUTH_CONFIG = {
    defaultRedirectUri: 'https://auth.omnistack.com/callback',
    apiEndpoint: 'https://auth.omnistack.com/api',
    routes: {
        login: '/auth/login',
        register: '/auth/register',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password'
    }
}