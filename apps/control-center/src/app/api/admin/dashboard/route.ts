import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function GET() {
  const [tenants, users, workspaces, activeSubscriptions, subscriptions, plans] = await Promise.all([
    db.tenant.count(),
    db.user.count(),
    db.workspace.count(),
    db.subscription.count({ where: { status: 'ACTIVE' } }),
    db.subscription.findMany({ where: { status: { in: ['ACTIVE', 'TRIALING'] } }, include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 8 }),
    db.plan.findMany({ where: { active: true }, orderBy: { monthlyPrice: 'asc' } }),
  ])

  const mrr = subscriptions.filter(s => s.status === 'ACTIVE').reduce((sum, s) => sum + (s.billingInterval === 'YEARLY' ? s.plan.yearlyPrice / 12 : s.plan.monthlyPrice), 0)
  return NextResponse.json({ metrics: { tenants, users, workspaces, activeSubscriptions, mrr }, recentSubscriptions: subscriptions, plans })
}
