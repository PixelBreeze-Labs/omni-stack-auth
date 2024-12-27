// src/app/api/auth/userinfo/route.ts
import { prisma } from '@/lib/prisma'
import {supabaseAdmin} from "@/lib/supabase";
export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
            return Response.json({ error: 'No token provided' }, { status: 401 })
        }

        const token = authHeader.replace('Bearer ', '')

        // Verify token in database
        const dbToken = await prisma.token.findUnique({
            where: { token },
            include: { client: true }
        })

        if (!dbToken || dbToken.expiresAt < new Date()) {
            return Response.json({ error: 'Invalid or expired token' }, { status: 401 })
        }

        // Get user from Supabase
        const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(
            dbToken.userId
        )

        if (error || !user) {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }

        return Response.json({
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name,
            picture: user.user_metadata.avatar_url,
            current_client: {
                name: dbToken.client.name,
                client_id: dbToken.client.clientId
            }
        })

    } catch (error) {
        console.error('Userinfo error:', error)
        return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
}