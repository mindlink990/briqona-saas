'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Plan = { id:string; name:string; description:string|null; monthlyPrice:number; yearlyPrice:number; currency:string; maxUsers:number|null; maxWorkspaces:number }

export default function PricingPage(){
 const [plans,setPlans]=useState<Plan[]>([])
 useEffect(()=>{fetch('/api/plans').then(r=>r.json()).then(d=>setPlans(d.plans??[]))},[])
 return <main className="min-h-screen bg-slate-950 px-6 py-16 text-white"><div className="mx-auto max-w-6xl"><Link href="/" className="text-sm text-slate-400">← Briqona</Link><div className="mt-12 text-center"><p className="text-sm text-slate-500">PRICING</p><h1 className="mt-3 text-4xl font-semibold md:text-5xl">Plans that grow with you.</h1></div><div className="mt-12 grid gap-5 md:grid-cols-3">{plans.map(p=><article key={p.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><h2 className="text-xl font-semibold">{p.name}</h2><p className="mt-3 min-h-10 text-sm text-slate-400">{p.description}</p><p className="mt-7 text-4xl font-bold">{p.currency} {p.monthlyPrice}<span className="text-sm font-normal text-slate-500"> / month</span></p><p className="mt-1 text-sm text-slate-500">or {p.currency} {p.yearlyPrice} / year</p><div className="mt-6 border-t border-slate-800 pt-5 text-sm text-slate-400"><p>{p.maxUsers??'Unlimited'} users</p><p className="mt-2">{p.maxWorkspaces} workspace{p.maxWorkspaces===1?'':'s'}</p></div><Link href={`/signup?plan=${p.id}`} className="mt-7 block rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950">Choose {p.name}</Link></article>)}</div></div></main>
}
