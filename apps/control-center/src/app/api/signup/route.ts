import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { db } from '@briqona/database'
import { hashPassword } from '@briqona/auth/password'
import { createSessionToken } from '@briqona/auth/session'

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email ?? '').trim().toLowerCase()
  const name = String(body.name ?? '').trim()
  const password = String(body.password ?? '')
  const tenantName = String(body.tenantName ?? '').trim()

  if (!email || !password || password.length < 8 || !tenantName) {
    return NextResponse.json({ error: 'Invalid signup data' }, { status: 400 })
  }

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

  const baseSlug = tenantName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'workspace'
  const slug = `${baseSlug}-${Date.now().toString(36)}`
  const token = createSessionToken()
  const tokenHash = createHash('sha256').update(token).digest('hex')

  const result = await db.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({ data: { name: tenantName, slug } })
    const workspace = await tx.workspace.create({ data: { tenantId: tenant.id, name: tenantName, slug: 'main' } })
    const user = await tx.user.create({ data: { email, name: name || null, passwordHash: hashPassword(password) } })
    await tx.membership.create({ data: { userId: user.id, tenantId: tenant.id, workspaceId: workspace.id, role: 'OWNER' } })
    await tx.session.create({ data: { tokenHash, userId: user.id, tenantId: tenant.id, workspaceId: workspace.id, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } })
    return { tenant, workspace }
  })

  const response = NextResponse.json({ ok: true, tenantId: result.tenant.id, workspaceId: result.workspace.id })
  response.cookies.set('briqona_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return response
}
