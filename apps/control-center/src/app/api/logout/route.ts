import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@briqona/database'
import { revokeSession } from '@briqona/auth/session-cookie'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get('briqona_session')?.value
  if (token) await revokeSession(db, token)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('briqona_session', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
  return response
}
