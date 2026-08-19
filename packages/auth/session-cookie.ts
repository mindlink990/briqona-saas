import { createHash } from 'node:crypto'

type SessionDb = {
  session: {
    findUnique: (args: any) => Promise<any>
    deleteMany: (args: any) => Promise<any>
  }
}

export async function getSessionFromToken(db: SessionDb, token: string) {
  const tokenHash = createHash('sha256').update(token).digest('hex')
  return db.session.findUnique({ where: { tokenHash }, include: { user: true } })
}

export async function revokeSession(db: SessionDb, token: string) {
  const tokenHash = createHash('sha256').update(token).digest('hex')
  await db.session.deleteMany({ where: { tokenHash } })
}
