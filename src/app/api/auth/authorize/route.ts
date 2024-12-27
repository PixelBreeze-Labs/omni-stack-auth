// src/app/api/auth/authorize/route.ts
import { supabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const clientId = searchParams.get('client_id')
    const redirectUri = searchParams.get('redirect_uri')
    const state = searchParams.get('state')

    if (!clientId || !redirectUri) {
        return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Verify the client
    const client = await prisma.client.findUnique({
        where: { clientId }
    })

    if (!client || !client.redirectUrls.includes(redirectUri)) {
        return Response.json({ error: 'Invalid client or redirect URI' }, { status: 401 })
    }

    // Check if user is logged in with Supabase
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        // Save request details and redirect to login
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('client_id', clientId)
        loginUrl.searchParams.set('redirect_uri', redirectUri)
        if (state) loginUrl.searchParams.set('state', state)
        return redirect(loginUrl.toString())
    }

    // Generate authorization code
    const code = crypto.randomBytes(32).toString('hex')

    await prisma.authCode.create({
        data: {
            code,
            clientId: client.id,
            userId: session.user.id,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        }
    })

    // Redirect back with code
    const finalUrl = new URL(redirectUri)
    finalUrl.searchParams.set('code', code)
    if (state) finalUrl.searchParams.set('state', state)

    return redirect(finalUrl.toString())
}