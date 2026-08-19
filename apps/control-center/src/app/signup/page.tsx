'use client'

import { FormEvent, useState } from 'react'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', tenantName: '' })
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const update = (key: keyof typeof form, value: string) => setForm(v => ({ ...v, [key]: value }))
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setLoading(true); try { const res = await fetch('/api/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) }); const data=await res.json(); if(!res.ok) throw new Error(data.error||'Signup failed'); window.location.href='/'; } catch(e){setError(e instanceof Error?e.message:'Signup failed')} finally{setLoading(false)} }
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-7"><h1 className="text-2xl font-semibold">Create your workspace</h1><p className="mt-2 text-sm text-slate-400">Start your Briqona organization.</p>{error&&<p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}{[['name','Your name','text'],['email','Work email','email'],['tenantName','Company / workspace name','text'],['password','Password','password']].map(([key,label,type])=><label key={key} className="mt-4 block text-sm">{label}<input value={form[key as keyof typeof form]} onChange={e=>update(key as keyof typeof form,e.target.value)} type={type} required minLength={key==='password'?8:undefined} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none" /></label>)}<button disabled={loading} className="mt-6 w-full rounded-lg bg-white p-3 font-medium text-slate-950 disabled:opacity-50">{loading?'Creating…':'Create workspace'}</button></form></main>
}
