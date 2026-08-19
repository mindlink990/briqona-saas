import type { Session } from './index'

export function requireRole(session: Session | null, allowed: Session['role'][]): Session {
  if (!session) throw new Error('UNAUTHENTICATED')
  if (!allowed.includes(session.role)) throw new Error('FORBIDDEN')
  return session
}

export function assertTenant(session: Session, tenantId: string, workspaceId?: string) {
  if (session.tenantId !== tenantId) throw new Error('TENANT_ACCESS_DENIED')
  if (workspaceId && session.workspaceId !== workspaceId) throw new Error('WORKSPACE_ACCESS_DENIED')
}
