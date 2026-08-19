import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tenant = await db.tenant.findUnique({
    where: { id },
    include: {
      workspaces: true,
      memberships: { include: { user: true }, orderBy: { createdAt: 'asc' } },
      subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 1 },
    },
  })
  if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
  return NextResponse.json({ tenant })
}
