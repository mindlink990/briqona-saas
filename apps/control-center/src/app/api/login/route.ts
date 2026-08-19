import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { db } from '@briqona/database'
import { verifyPassword } from '@briqona/auth/password'
import { createSessionToken } from '@briqona/auth/session'

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email ?? '').trim().toLowerCase()
  const password = String(body.password ?? '')

  if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })

  const user = await db.user.findUnique({ where: { email }, include: { memberships: true } })
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const membership = user.memberships[0]
  if (!membership) return NextResponse.json({ error: 'No workspace membership found' }, { status: 403 })

  const token = createSessionToken()
  const tokenHash = createHash('sha256').update(token).digest('hex')
  await db.session.create({ data: { tokenHash, userId: user.id, tenantId: membership.tenantId, workspaceId: membership.workspaceId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } })

  const response = NextResponse.json({ ok: true, tenantId: membership.tenantId, workspaceId: membership.workspaceId })
  response.cookies.set('briqona_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return response
}
