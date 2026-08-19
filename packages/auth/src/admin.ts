import { cookies } from 'next/headers'
import { db } from '@briqona/database'
import { getSessionFromToken } from './session-cookie'

export async function requireAdmin() {
  const store = await cookies()
  const token = store.get('briqona_session')?.value
  if (!token) throw new Error('UNAUTHENTICATED')
  const session = await getSessionFromToken(db, token)
  if (!session || session.expiresAt <= new Date()) throw new Error('UNAUTHENTICATED')

  const membership = await db.membership.findUnique({
    where: { userId_workspaceId: { userId: session.userId, workspaceId: session.workspaceId } },
  })
  if (!membership || (membership.role !== 'OWNER' && membership.role !== 'ADMIN')) throw new Error('FORBIDDEN')
  return { session, membership }
}
