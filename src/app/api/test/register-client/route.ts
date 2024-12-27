import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function GET() {
    // Create a test client
    const client = await prisma.client.create({
        data: {
            name: "Test App",
            clientId: "test_" + crypto.randomBytes(8).toString('hex'),
            clientSecret: crypto.randomBytes(32).toString('hex'),
            redirectUrls: ["http://localhost:3000/test/callback"]
        }
    })

    return Response.json(client)
}