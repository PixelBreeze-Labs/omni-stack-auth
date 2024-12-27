export interface OAuthClient {
    id: string
    name: string
    clientId: string
    clientSecret: string
    redirectUrls: string[]
}

export interface UserLogin {
    id: string
    userId: string
    clientId: string
    lastLogin: Date
}

export interface AuthResponse {
    access_token: string
    token_type: string
    expires_in: number
}

export interface UserInfo {
    id: string
    email: string
    name?: string
    picture?: string
    current_client: {
        name: string
        client_id: string
    }
    logins: {
        client_name: string
        last_login: string
    }[]
}