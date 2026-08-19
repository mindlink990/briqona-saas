import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@briqona/database'
import { getSessionFromToken } from '@briqona/auth/session-cookie'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('briqona_session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const session = await getSessionFromToken(db, token)
  if (!session || session.expiresAt <= new Date()) return NextResponse.json({ error: 'Session expired' }, { status: 401 })

  const membership = await db.membership.findUnique({
    where: { userId_workspaceId: { userId: session.userId, workspaceId: session.workspaceId } },
    include: { tenant: true, workspace: true },
  })

  if (!membership) return NextResponse.json({ error: 'Membership not found' }, { status: 403 })
  return NextResponse.json({ user: { id: session.user.id, email: session.user.email, name: session.user.name }, tenant: membership.tenant, workspace: membership.workspace, role: membership.role })
}
