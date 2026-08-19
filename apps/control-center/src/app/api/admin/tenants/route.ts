import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function GET() {
  const tenants = await db.tenant.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      _count: { select: { workspaces: true, memberships: true } },
    },
  })
  return NextResponse.json({ tenants })
}
