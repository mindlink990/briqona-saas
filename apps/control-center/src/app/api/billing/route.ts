import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@briqona/database'
import { getSessionFromToken } from '@briqona/auth/session-cookie'

export async function GET() {
  const token = (await cookies()).get('briqona_session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  const session = await getSessionFromToken(db, token)
  if (!session || session.expiresAt <= new Date()) return NextResponse.json({ error: 'Session expired' }, { status: 401 })

  const subscription = await db.subscription.findFirst({
    where: { tenantId: session.tenantId },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ subscription })
}
