import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { code, client_id, client_secret } = await req.json()

        if (!code || !client_id || !client_secret) {
            return Response.json({ error: 'Missing parameters' }, { status: 400 })
        }

        // Verify client credentials
        const client = await prisma.client.findUnique({
            where: { clientId: client_id }
        })

        if (!client || client.clientSecret !== client_secret) {
            return Response.json({ error: 'Invalid client credentials' }, { status: 401 })
        }

        // Verify authorization code
        const authCode = await prisma.authCode.findFirst({
            where: {
                code,
                clientId: client.id,
                used: false,
                expiresAt: { gt: new Date() }
            }
        })

        if (!authCode) {
            return Response.json({ error: 'Invalid or expired code' }, { status: 401 })
        }

        // Mark code as used
        await prisma.authCode.update({
            where: { id: authCode.id },
            data: { used: true }
        })

        // Generate access token
        const accessToken = jwt.sign(
            {
                userId: authCode.userId,
                clientId: client.id
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        )

        // Store token
        await prisma.token.create({
            data: {
                token: accessToken,
                clientId: client.id,
                userId: authCode.userId,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        })

        return Response.json({
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 86400 // 24 hours
        })

    } catch (error) {
        console.error('Token exchange error:', error)
        return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
}