'use client'

import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      window.location.href = '/'
    } catch (e) { setError(e instanceof Error ? e.message : 'Login failed') } finally { setLoading(false) }
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-7"><h1 className="text-2xl font-semibold">Welcome back</h1><p className="mt-2 text-sm text-slate-400">Sign in to your Briqona workspace.</p>{error && <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}<label className="mt-6 block text-sm">Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none" /></label><label className="mt-4 block text-sm">Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none" /></label><button disabled={loading} className="mt-6 w-full rounded-lg bg-white p-3 font-medium text-slate-950 disabled:opacity-50">{loading ? 'Signing in…' : 'Sign in'}</button></form></main>
}
