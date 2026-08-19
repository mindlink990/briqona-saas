import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

export async function POST(request: Request) {
  const { question = '' } = await request.json()
  const q = String(question).toLowerCase()
  const [pastDue, trials, transactions] = await Promise.all([
    db.subscription.findMany({ where: { status: 'PAST_DUE' }, include: { tenant: true, plan: true }, take: 20 }),
    db.subscription.findMany({ where: { status: 'TRIALING' }, include: { tenant: true, plan: true }, orderBy: { currentPeriodEnd: 'asc' }, take: 20 }),
    db.financialTransaction.findMany({ orderBy: { occurredAt: 'desc' }, take: 500 }),
  ])
  const now = Date.now()
  const expiring = trials.filter(s => new Date(s.currentPeriodEnd).getTime() <= now + 48 * 60 * 60 * 1000)
  const revenue = transactions.filter(x => x.type === 'REVENUE').reduce((a,x)=>a+x.amount,0)
  const expenses = transactions.filter(x => x.type === 'EXPENSE').reduce((a,x)=>a+x.amount,0)
  const refunds = transactions.filter(x => x.type === 'REFUND').reduce((a,x)=>a+x.amount,0)
  const profit = revenue - expenses - refunds
  let answer = `Platform snapshot: ${pastDue.length} past-due subscriptions, ${expiring.length} trials expiring within 48 hours, and ${transactions.length} recent ledger transactions. Net profit across the loaded ledger is ${profit}.`
  if (q.includes('pending') || q.includes('work')) answer = `Pending attention: ${pastDue.length} past-due payments and ${expiring.length} trials expiring within 48 hours.`
  else if (q.includes('profit') || q.includes('loss')) answer = `Loaded ledger totals: revenue ${revenue}, expenses ${expenses}, refunds ${refunds}; net profit is ${profit}.`
  else if (q.includes('trial')) answer = `${expiring.length} trials expire within 48 hours.`
  else if (q.includes('payment') || q.includes('pay')) answer = `${pastDue.length} subscriptions are past due.`
  return NextResponse.json({ answer, data: { pastDue: pastDue.length, expiringTrials: expiring.length, revenue, expenses, refunds, profit } })
}
