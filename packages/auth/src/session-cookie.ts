import { createHash } from 'node:crypto'
import type { PrismaClient } from '@prisma/client'

export async function getSessionFromToken(db: PrismaClient, token: string) {
  const tokenHash = createHash('sha256').update(token).digest('hex')
  return db.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  })
}

export async function revokeSession(db: PrismaClient, token: string) {
  const tokenHash = createHash('sha256').update(token).digest('hex')
  await db.session.deleteMany({ where: { tokenHash } })
}
