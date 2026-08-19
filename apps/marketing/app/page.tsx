export default function MarketingHome() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
      <section style={{ maxWidth: 900, textAlign: "center" }}>
        <p style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Briqona</p>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.05, margin: "16px 0" }}>
          One workspace for your entire business.
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, color: "#6b7280", maxWidth: 680, margin: "0 auto" }}>
          A multi-tenant business platform with a powerful control center and flexible customer workspaces.
        </p>
      </section>
    </main>
  );
}
