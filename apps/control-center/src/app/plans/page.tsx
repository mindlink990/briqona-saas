'use client'

import { useEffect, useState } from 'react'

type Plan = { id:string; name:string; slug:string; description:string|null; monthlyPrice:number; yearlyPrice:number; currency:string; active:boolean; maxUsers:number|null; maxWorkspaces:number }

export default function PlansPage() {
  const [plans,setPlans]=useState<Plan[]>([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{fetch('/api/plans').then(r=>r.json()).then(d=>setPlans(d.plans??[])).finally(()=>setLoading(false))},[])
  return <main className="min-h-screen bg-slate-950 p-6 text-slate-100 md:p-10"><div className="mx-auto max-w-6xl"><div className="flex items-end justify-between"><div><p className="text-sm text-slate-500">Control Center</p><h1 className="mt-1 text-3xl font-semibold">Plans</h1><p className="mt-2 text-slate-400">Manage the packages customers see on the marketing website.</p></div><button className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-950">+ New plan</button></div>{loading?<p className="mt-8 text-slate-500">Loading plans…</p>:<div className="mt-8 grid gap-5 md:grid-cols-3">{plans.map(p=><article key={p.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">{p.name}</h2><span className={`rounded-full px-2.5 py-1 text-xs ${p.active?'bg-emerald-500/10 text-emerald-400':'bg-slate-800 text-slate-500'}`}>{p.active?'Active':'Inactive'}</span></div><p className="mt-2 min-h-10 text-sm text-slate-400">{p.description||'No description'}</p><p className="mt-6 text-3xl font-semibold">{p.currency} {p.monthlyPrice}<span className="text-sm font-normal text-slate-500"> / month</span></p><p className="mt-1 text-sm text-slate-500">{p.currency} {p.yearlyPrice} / year</p><div className="mt-6 border-t border-slate-800 pt-5 text-sm text-slate-400"><p>Users: {p.maxUsers??'Unlimited'}</p><p className="mt-2">Workspaces: {p.maxWorkspaces}</p></div><button className="mt-6 w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm">Edit plan</button></article>)}</div>}{!loading&&!plans.length&&<div className="mt-8 rounded-xl border border-dashed border-slate-800 p-10 text-center text-slate-500">No active plans yet. Create your first package.</div>}</div></main>
}
