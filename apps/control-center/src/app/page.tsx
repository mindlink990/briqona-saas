export default function ControlCenterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <div className="mb-8 text-xl font-semibold">Briqona</div>
          <nav className="space-y-1 text-sm text-slate-400">
            {['Overview', 'Tenants', 'Users', 'Modules', 'Subscriptions', 'Usage', 'Security', 'Audit Log', 'Settings'].map((item, i) => (
              <div key={item} className={`rounded-lg px-3 py-2.5 ${i === 0 ? 'bg-slate-800 text-white' : ''}`}>
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-800 px-5 md:px-8">
            <div>
              <p className="text-xs text-slate-500">Platform</p>
              <h1 className="font-medium">Control Center</h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-slate-300">Search</button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700">NB</div>
            </div>
          </header>

          <div className="p-5 md:p-8">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-sm text-slate-500">Platform overview</p>
                <h2 className="text-2xl font-semibold">Everything in one place</h2>
              </div>
              <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-950">+ Create tenant</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['23', 'Tenants'],
                ['1,284', 'Users'],
                ['12', 'Active modules'],
                ['68%', 'API capacity'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-semibold">{value}</p>
                  <p className="mt-2 text-xs text-emerald-400">+12% this month</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-medium">Recent tenants</h3>
                  <span className="text-xs text-slate-500">View all</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {['Briqona Technologies', 'Northstar Labs', 'Vertex Studio'].map((tenant) => (
                    <div key={tenant} className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-medium">{tenant}</p>
                        <p className="text-xs text-slate-500">Workspace · Active</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-medium">Quick actions</h3>
                <div className="mt-4 space-y-2">
                  {['Invite user', 'Create module', 'Review security', 'Open audit log'].map((action) => (
                    <button key={action} className="w-full rounded-lg border border-slate-800 px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-800">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
