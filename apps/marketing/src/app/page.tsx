import Link from 'next/link'

const plans = [
  { name: 'Starter', price: '$19', description: 'For small teams getting started.', features: ['5 users', 'Core workspace', 'Basic analytics'] },
  { name: 'Pro', price: '$49', description: 'For growing teams and workflows.', features: ['25 users', 'Advanced modules', 'Automation & analytics'], featured: true },
  { name: 'Business', price: '$99', description: 'For organizations that need scale.', features: ['Unlimited workspaces', 'Advanced permissions', 'Priority support'] },
]

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-xl font-bold tracking-tight">Briqona</div>
        <nav className="hidden gap-7 text-sm text-slate-300 md:flex"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#security">Security</a></nav>
        <div className="flex gap-3"><Link href="/login" className="rounded-lg px-4 py-2 text-sm text-slate-300">Log in</Link><Link href="/signup" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950">Start free</Link></div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 text-center md:pt-32">
        <div className="mx-auto mb-6 w-fit rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">One platform for every team</div>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">Run your business from one powerful workspace.</h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">Briqona brings teams, workflows, analytics and business modules together in a secure multi-tenant SaaS platform.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950">Create your workspace</Link><a href="#pricing" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200">View pricing</a></div>
      </section>

      <section id="features" className="border-y border-slate-900 bg-slate-950/70 px-6 py-24"><div className="mx-auto max-w-7xl"><p className="text-sm font-medium text-slate-500">BUILT FOR SCALE</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Everything connected.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{[['Workspace','Give every team a focused, permission-aware environment.'],['Automation','Build repeatable workflows without losing visibility.'],['Analytics','Turn workspace activity into clear business insights.']].map(([title,text])=><div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{text}</p></div>)}</div></div></section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24"><div className="text-center"><p className="text-sm text-slate-500">SIMPLE PRICING</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Choose the workspace that fits.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{plans.map(plan=><div key={plan.name} className={`rounded-2xl border p-7 ${plan.featured?'border-white bg-white text-slate-950':'border-slate-800 bg-slate-900'}`}><p className="font-semibold">{plan.name}</p><p className="mt-5 text-4xl font-bold">{plan.price}<span className={`text-sm font-normal ${plan.featured?'text-slate-500':'text-slate-500'}`}> / month</span></p><p className={`mt-3 text-sm ${plan.featured?'text-slate-600':'text-slate-400'}`}>{plan.description}</p><ul className="mt-6 space-y-3 text-sm">{plan.features.map(f=><li key={f}>✓ {f}</li>)}</ul><Link href="/signup" className={`mt-7 block rounded-lg px-4 py-3 text-center text-sm font-semibold ${plan.featured?'bg-slate-950 text-white':'bg-white text-slate-950'}`}>Choose {plan.name}</Link></div>)}</div></section>

      <section id="security" className="border-t border-slate-900 px-6 py-20 text-center"><h2 className="text-2xl font-semibold">Secure by architecture.</h2><p className="mx-auto mt-3 max-w-2xl text-slate-400">Tenant isolation, workspace-level memberships, role-based access and auditable sessions are built into the platform foundation.</p></section>
      <footer className="border-t border-slate-900 px-6 py-8 text-center text-sm text-slate-500">© 2026 Briqona. All rights reserved.</footer>
    </main>
  )
}
