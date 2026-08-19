import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function POST(request: Request) {
  const body = await request.json()
  const planId = String(body.planId ?? '')
  const interval = body.interval === 'YEARLY' ? 'YEARLY' : 'MONTHLY'
  if (!planId) return NextResponse.json({ error: 'planId is required' }, { status: 400 })

  const plan = await db.plan.findFirst({ where: { id: planId, active: true } })
  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

  // Payment-provider adapter boundary. No payment is marked successful here.
  // Configure Stripe/another provider in deployment and create its checkout session here.
  return NextResponse.json({
    checkoutRequired: true,
    provider: process.env.PAYMENT_PROVIDER ?? 'not-configured',
    planId: plan.id,
    interval,
    amount: interval === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice,
    currency: plan.currency,
    message: 'Payment provider is not configured yet.',
  }, { status: 501 })
}
