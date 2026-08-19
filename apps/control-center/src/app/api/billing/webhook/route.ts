import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

function verifyStripeSignature(payload: string, header: string, secret: string) {
  const parts = header.split(',')
  const timestamp = parts.find(x => x.startsWith('t='))?.slice(2)
  const signatures = parts.filter(x => x.startsWith('v1=')).map(x => x.slice(3))
  if (!timestamp || !signatures.length) return false
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex')
  return signatures.some(sig => sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 501 })
  const signature = request.headers.get('stripe-signature')
  const payload = await request.text()
  if (!signature || !verifyStripeSignature(payload, signature, secret)) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  const event = JSON.parse(payload)
  const object = event.data?.object

  if (event.type === 'checkout.session.completed' && object?.mode === 'subscription') {
    const tenantId = object.metadata?.tenantId
    const planId = object.metadata?.planId
    const interval = object.metadata?.interval === 'YEARLY' ? 'YEARLY' : 'MONTHLY'
    if (tenantId && planId && object.subscription) {
      const existing = await db.subscription.findFirst({ where: { tenantId } })
      const start = new Date()
      const end = new Date(start)
      if (interval === 'YEARLY') end.setFullYear(end.getFullYear() + 1)
      else end.setMonth(end.getMonth() + 1)
      const data = { status: 'ACTIVE' as const, billingInterval: interval as 'MONTHLY' | 'YEARLY', currentPeriodStart: start, currentPeriodEnd: end, stripeCustomerId: object.customer || null, stripeSubscriptionId: String(object.subscription), planId }
      if (existing) await db.subscription.update({ where: { id: existing.id }, data })
      else await db.subscription.create({ data: { tenantId, ...data } })
    }
  }

  if (event.type === 'customer.subscription.deleted' && object?.id) {
    await db.subscription.updateMany({ where: { stripeSubscriptionId: String(object.id) }, data: { status: 'CANCELED' } })
  }

  if (event.type === 'invoice.payment_failed' && object?.subscription) {
    await db.subscription.updateMany({ where: { stripeSubscriptionId: String(object.subscription) }, data: { status: 'PAST_DUE' } })
  }

  return NextResponse.json({ received: true })
}
