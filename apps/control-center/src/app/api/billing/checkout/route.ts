import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@briqona/database'
import { getSessionFromToken } from '@briqona/auth/session-cookie'

async function stripe(path: string, body: URLSearchParams) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_NOT_CONFIGURED')
  const res = await fetch(`https://api.stripe.com/v1/${path}`, { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Stripe request failed')
  return data
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('briqona_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    const session = await getSessionFromToken(db, token)
    if (!session || session.expiresAt <= new Date()) return NextResponse.json({ error: 'Session expired' }, { status: 401 })

    const { planId, interval = 'MONTHLY' } = await request.json()
    const plan = await db.plan.findFirst({ where: { id: String(planId), active: true } })
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    const priceId = interval === 'YEARLY' ? plan.stripeYearlyPriceId : plan.stripeMonthlyPriceId
    if (!priceId) return NextResponse.json({ error: 'This plan is not configured for Stripe yet' }, { status: 409 })

    const base = process.env.APP_URL || new URL(request.url).origin
    const body = new URLSearchParams({
      mode: 'subscription',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      success_url: `${base}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/billing/canceled`,
      customer_email: session.user.email,
      'metadata[tenantId]': session.tenantId,
      'metadata[workspaceId]': session.workspaceId,
      'metadata[planId]': plan.id,
      'metadata[interval]': interval,
    })
    const checkout = await stripe('checkout/sessions', body)
    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    if (error instanceof Error && error.message === 'STRIPE_NOT_CONFIGURED') return NextResponse.json({ error: 'Stripe is not configured' }, { status: 501 })
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 })
  }
}
