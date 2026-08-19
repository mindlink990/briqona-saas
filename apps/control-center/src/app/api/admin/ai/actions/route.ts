import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function POST(request: Request) {
  const { action, tenantId } = await request.json()
  if (!tenantId) return NextResponse.json({ error: 'tenantId is required' }, { status: 400 })
  const tenant = await db.tenant.findUnique({ where: { id: tenantId }, include: { subscriptions: { orderBy: { createdAt: 'desc' }, take: 1 } } })
  if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
  if (!['review_payment','review_trial','open_tenant'].includes(action)) return NextResponse.json({ error: 'Unsupported action' }, { status: 400 })
  return NextResponse.json({ ok: true, action, tenantId: tenant.id, tenant: tenant.name, subscriptionId: tenant.subscriptions[0]?.id ?? null, message: action === 'review_payment' ? 'Payment review prepared.' : action === 'review_trial' ? 'Trial review prepared.' : 'Tenant review prepared.' })
}
