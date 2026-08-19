import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

const clean = (v: unknown) => String(v ?? '').trim()

export async function POST(request: Request) {
  const body = await request.json()
  const name = clean(body.name)
  const slug = clean(body.slug)
  if (!name || !slug) return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
  const plan = await db.plan.create({ data: {
    name, slug, description: clean(body.description) || null,
    monthlyPrice: Number(body.monthlyPrice ?? 0), yearlyPrice: Number(body.yearlyPrice ?? 0),
    currency: clean(body.currency) || 'USD', active: body.active !== false,
    maxUsers: body.maxUsers == null || body.maxUsers === '' ? null : Number(body.maxUsers),
    maxWorkspaces: Number(body.maxWorkspaces ?? 1),
  }})
  return NextResponse.json({ plan }, { status: 201 })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const id = clean(body.id)
  if (!id) return NextResponse.json({ error: 'Plan id is required' }, { status: 400 })
  const plan = await db.plan.update({ where: { id }, data: {
    ...(body.name !== undefined ? { name: clean(body.name) } : {}),
    ...(body.slug !== undefined ? { slug: clean(body.slug) } : {}),
    ...(body.description !== undefined ? { description: clean(body.description) || null } : {}),
    ...(body.monthlyPrice !== undefined ? { monthlyPrice: Number(body.monthlyPrice) } : {}),
    ...(body.yearlyPrice !== undefined ? { yearlyPrice: Number(body.yearlyPrice) } : {}),
    ...(body.active !== undefined ? { active: Boolean(body.active) } : {}),
    ...(body.maxUsers !== undefined ? { maxUsers: body.maxUsers === null || body.maxUsers === '' ? null : Number(body.maxUsers) } : {}),
    ...(body.maxWorkspaces !== undefined ? { maxWorkspaces: Number(body.maxWorkspaces) } : {}),
  }})
  return NextResponse.json({ plan })
}
