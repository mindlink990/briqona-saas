import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function GET() {
  const [trialing, pastDue, tenants, activeSubscriptions] = await Promise.all([
    db.subscription.findMany({ where: { status: 'TRIALING' }, include: { tenant: true, plan: true }, orderBy: { currentPeriodEnd: 'asc' }, take: 10 }),
    db.subscription.findMany({ where: { status: 'PAST_DUE' }, include: { tenant: true, plan: true }, orderBy: { updatedAt: 'desc' }, take: 10 }),
    db.tenant.count(),
    db.subscription.count({ where: { status: 'ACTIVE' } }),
  ])

  const now = new Date()
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1)
  const expiringTrials = trialing.filter(s => new Date(s.currentPeriodEnd) <= new Date(now.getTime() + 48 * 60 * 60 * 1000))
  return NextResponse.json({
    generatedAt: now.toISOString(),
    metrics: { tenants, activeSubscriptions },
    pendingWork: [
      ...pastDue.map(s => ({ priority: 'high', type: 'payment', title: `Past-due subscription: ${s.tenant.name}`, detail: s.plan.name })),
      ...expiringTrials.map(s => ({ priority: 'medium', type: 'trial', title: `Trial expiring: ${s.tenant.name}`, detail: new Date(s.currentPeriodEnd).toISOString() })),
    ],
    comparison: { from: yesterday.toISOString(), to: now.toISOString(), note: 'Revenue/profit comparison requires recorded transaction and expense data.' },
  })
}
