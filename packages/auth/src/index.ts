export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER'

export type Session = {
  userId: string
  tenantId: string
  workspaceId: string
  role: Role
}

export function can(session: Session, permission: 'workspace:read' | 'workspace:write' | 'users:manage' | 'billing:manage') {
  if (session.role === 'OWNER') return true
  if (permission === 'workspace:read') return true
  if (session.role === 'ADMIN' && permission !== 'billing:manage') return true
  return false
}
