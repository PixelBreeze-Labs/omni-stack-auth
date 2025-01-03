interface OmniStackConfig {
    allowRegistration?: boolean
    allowPasswordReset?: boolean
    customEmailDomains?: string[] // Restrict registration to specific domains
    theme?: {
        primaryColor?: string
        logo?: string
        darkMode?: boolean
    }
}