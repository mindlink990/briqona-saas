import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function GET() {
  const [pastDue, trials] = await Promise.all([
    db.subscription.findMany({ where: { status: 'PAST_DUE' }, include: { tenant: true, plan: true }, take: 50 }),
    db.subscription.findMany({ where: { status: 'TRIALING' }, include: { tenant: true, plan: true }, orderBy: { currentPeriodEnd: 'asc' }, take: 50 }),
  ])
  const now = Date.now()
  const risks = [
    ...pastDue.map(s => ({ level: 'high', type: 'payment', tenantId: s.tenantId, tenant: s.tenant.name, reason: `Payment is past due on ${s.plan.name}`, recommendation: 'Review payment method and contact the customer.' })),
    ...trials.filter(s => new Date(s.currentPeriodEnd).getTime() <= now + 72 * 60 * 60 * 1000).map(s => ({ level: 'medium', type: 'trial', tenantId: s.tenantId, tenant: s.tenant.name, reason: 'Trial expires within 72 hours', recommendation: 'Send upgrade reminder before trial expiry.' })),
  ]
  return NextResponse.json({ risks, generatedAt: new Date().toISOString() })
}
