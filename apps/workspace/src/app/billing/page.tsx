'use client'

import { useEffect, useState } from 'react'

type Billing={status:string; billingInterval:string; currentPeriodEnd:string; plan:{name:string;monthlyPrice:number;yearlyPrice:number;currency:string}}
export default function BillingPage(){
 const [billing,setBilling]=useState<Billing|null>(null); const [error,setError]=useState('')
 useEffect(()=>{fetch('/api/billing').then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error);setBilling(d.subscription)}).catch(e=>setError(e.message))},[])
 return <main className="min-h-screen bg-slate-950 p-6 text-slate-100 md:p-10"><div className="mx-auto max-w-4xl"><p className="text-sm text-slate-500">Workspace</p><h1 className="mt-1 text-3xl font-semibold">Billing</h1>{error&&<p className="mt-6 rounded-lg bg-red-500/10 p-4 text-red-300">{error}</p>}{!billing&&!error&&<p className="mt-8 text-slate-500">Loading subscription…</p>}{billing&&<div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-7"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Current plan</p><h2 className="mt-1 text-2xl font-semibold">{billing.plan.name}</h2></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">{billing.status}</span></div><div className="mt-8 grid gap-5 sm:grid-cols-3"><div><p className="text-sm text-slate-500">Billing</p><p className="mt-1 capitalize">{billing.billingInterval.toLowerCase()}</p></div><div><p className="text-sm text-slate-500">Price</p><p className="mt-1">{billing.plan.currency} {billing.billingInterval==='YEARLY'?billing.plan.yearlyPrice:billing.plan.monthlyPrice}</p></div><div><p className="text-sm text-slate-500">Period ends</p><p className="mt-1">{new Date(billing.currentPeriodEnd).toLocaleDateString()}</p></div></div></div>}</div></main>
}
