// FinalCTA.jsx — bottom "Comando de Missão" CTA
// Mirrors the access section in landing-page/src/app/page.tsx

const FinalCTA = () => {
  return (
    <section id="access" style={{
      position: "relative",
      padding: "160px clamp(40px, 6vw, 96px)",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      textAlign: "center",
      background: "var(--ds-bg-1)",
      overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", height: "50%",
        background: "linear-gradient(to top, rgba(50,145,255,0.05), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ds-c-9)",
          letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 36,
        }}>
          Comando de Missão
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05,
          color: "var(--ds-c-10)", marginBottom: 56,
        }}>
          Unicórnio ou rastro de poeira?<br />
          <span style={{ color: "rgba(255,255,255,0.6)" }}>
            O horizonte de eventos não aceita desculpas.
          </span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
          <HudButton href="#" status="PROTOCOL_READY: 00:00:00" size="lg">
            Executar Protocolo Disrupta
          </HudButton>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            Interface Stark Mode · Auditoria técnica em tempo real · Sem ruído · Sem achismo
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer companion
const Footer = () => {
  return (
    <footer style={{
      padding: "48px clamp(40px, 6vw, 96px)",
      borderTop: "1px solid var(--ds-c-4)",
      background: "var(--ds-bg-1)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="../../assets/logo-icon-white.svg" alt="" aria-hidden="true" style={{ height: 24 }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ds-c-9)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Disrupta · disrupta.app
        </span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {["Método SIID", "Casos", "Privacidade", "Termos"].map(l => (
          <a key={l} href="#" style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ds-c-9)",
            letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none",
          }}>{l}</a>
        ))}
      </div>
    </footer>
  );
};

Object.assign(window, { FinalCTA, Footer });
