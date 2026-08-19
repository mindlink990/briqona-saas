import { randomBytes } from 'node:crypto'

export type SessionRecord = {
  token: string
  userId: string
  tenantId: string
  workspaceId: string
  expiresAt: Date
}

export function createSessionToken() {
  return randomBytes(32).toString('base64url')
}

export function sessionCookie(token: string) {
  return `briqona_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`
}
