import { randomBytes } from 'node:crypto'

export function createSessionToken(): string {
  return randomBytes(32).toString('base64url')
}
