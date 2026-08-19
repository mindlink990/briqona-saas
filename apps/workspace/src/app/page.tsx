export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-slate-800 p-5 md:block">
          <div className="mb-8 text-xl font-semibold">Briqona</div>
          <div className="mb-5 rounded-lg border border-slate-800 bg-slate-900 p-3">
            <p className="text-xs text-slate-500">Workspace</p>
            <p className="mt-1 text-sm font-medium">Briqona Technologies</p>
          </div>
          <nav className="space-y-1 text-sm text-slate-400">
            {['Dashboard', 'Teams', 'Projects', 'Workflows', 'Analytics', 'Settings'].map((item, i) => (
              <div key={item} className={`rounded-lg px-3 py-2.5 ${i === 0 ? 'bg-slate-800 text-white' : ''}`}>{item}</div>
            ))}
          </nav>
        </aside>
        <section className="flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-800 px-5 md:px-8">
            <div><p className="text-xs text-slate-500">Workspace</p><h1 className="font-medium">Dashboard</h1></div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm">NB</div>
          </header>
          <div className="p-5 md:p-8">
            <p className="text-sm text-slate-500">Welcome back</p>
            <h2 className="mt-1 text-2xl font-semibold">Briqona Technologies</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[['23','Team members'],['18','Open projects'],['42','Automations'],['94%','Workspace health']].map(([v,l]) => (
                <div key={l} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-500">{l}</p><p className="mt-3 text-3xl font-semibold">{v}</p></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
