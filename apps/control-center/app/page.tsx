const cards = [
  ['Tenants', '—'],
  ['Users', '—'],
  ['Active Modules', '—'],
  ['API Usage', '—'],
];

export default function ControlCenter() {
  return (
    <main style={{ minHeight: '100vh', padding: 40, fontFamily: 'Arial, sans-serif' }}>
      <p style={{ margin: 0, opacity: .6 }}>BRIQONA / PLATFORM</p>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Control Center</h1>
      <p>Manage tenants, users, plans, billing, security and platform settings.</p>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginTop: 32 }}>
        {cards.map(([label, value]) => (
          <article key={label} style={{ border: '1px solid #ddd', borderRadius: 14, padding: 20 }}>
            <div style={{ opacity: .65 }}>{label}</div>
            <strong style={{ display: 'block', fontSize: 30, marginTop: 12 }}>{value}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
