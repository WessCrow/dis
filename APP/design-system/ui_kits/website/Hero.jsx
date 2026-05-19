// Hero.jsx — Disrupta hero with rotating headline + dot-grid background
// Mirrors landing-page/src/components/sections/Hero.tsx (simplified — no Three.js)

const HERO_SLIDES = [
  {
    headline: "O achismo\né o buraco\nnegro da\ninovação.",
    subhead:  "Onde a intuição orbita, o capital desaparece. Escape da incerteza com o rigor da Disrupta.",
    cta:      "Iniciar Escape Gravitacional",
    status:   "TARGET_LOCK: NOMINAL",
  },
  {
    headline: "Interesse\nnão é\ndemanda.",
    subhead:  "Entrevista que não custa dinheiro mente. Aplicamos protocolos de disposição real a pagar — não opinião, não entusiasmo.",
    cta:      "Aplicar Protocolo SIID",
    status:   "SIGNAL_SCAN: ACTIVE",
  },
  {
    headline: "Faturamento\nnão é\nlucro.",
    subhead:  "A Auditoria SIID separa receita de margem operacional defensável. 87% das ideias não sobrevivem ao filtro de viabilidade.",
    cta:      "Executar Stress-Test",
    status:   "MARGIN_AUDIT: READY",
  },
];

const ROTATION_MS = 5500;

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex(i => (i + 1) % HERO_SLIDES.length), ROTATION_MS);
    return () => clearInterval(t);
  }, [paused]);

  const slide = HERO_SLIDES[index];

  const sectionStyle = {
    position: "relative", minHeight: "100vh",
    display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "128px clamp(40px, 8vw, 160px) 80px",
    overflow: "hidden", background: "var(--ds-bg-1)",
  };
  const glowStyle = {
    position: "absolute", top: "-40%", right: "-30%",
    width: "1100px", height: "1100px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(50,145,255,0.10) 0%, transparent 60%)",
    pointerEvents: "none",
  };
  const eyebrowStyle = {
    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
    letterSpacing: "0.5em", textTransform: "uppercase",
    color: "var(--ds-c-9)", marginBottom: 36,
    display: "inline-flex", alignItems: "center", gap: 12,
  };
  const lineStyle = { width: 40, height: 1, background: "var(--ds-c-6)", display: "inline-block" };

  return (
    <section id="hero" style={sectionStyle}>
      <div aria-hidden="true" style={glowStyle} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080 }}>
        <div style={eyebrowStyle}>
          <span style={lineStyle}></span>
          Innovation Audit · Stark Mode
        </div>

        <h1
          key={`h-${index}`}
          className="hero-headline"
          style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9.5vw, 144px)",
            fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.025em",
            color: "var(--ds-c-10)", marginBottom: 36, maxWidth: "16ch",
            whiteSpace: "pre-line",
          }}
        >
          {slide.headline}
        </h1>

        <p
          key={`s-${index}`}
          className="hero-sub"
          style={{
            fontFamily: "var(--font-sans)", fontSize: "clamp(16px, 1.4vw, 20px)",
            fontWeight: 400, lineHeight: 1.55,
            color: "var(--ds-c-9)", marginBottom: 56, maxWidth: "44ch",
          }}
        >
          {slide.subhead}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
          <HudButton href="#access" status={slide.status} size="lg">
            {slide.cta}
          </HudButton>
          <a href="#method" className="btn-ghost">Ver método SIID</a>
        </div>

        {/* Dots indicator */}
        <div style={{ display: "flex", gap: 12, marginTop: 96, alignItems: "center" }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setIndex(i); setPaused(true); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 28, height: 2, background: i === index ? "#fff" : "rgba(255,255,255,0.18)",
                border: "none", padding: 0, cursor: "pointer", transition: "background 200ms",
              }}
            />
          ))}
          <span style={{ marginLeft: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ds-c-9)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {String(index + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position: "relative", zIndex: 1, marginTop: 96, paddingTop: 40,
        borderTop: "1px solid var(--ds-c-4)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 40, maxWidth: 1080,
      }}>
        {[
          ["87%", "das ideias reprovam no filtro SIID"],
          ["08", "dimensões na auditoria técnica"],
          ["R$ 0", "queimado antes de validar"],
          ["3.4×", "mais rápido que due-diligence padrão"],
        ].map(([num, label]) => (
          <div key={num}>
            <div className="tabular-nums" style={{
              fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 500,
              color: "var(--ds-c-10)", letterSpacing: "-0.02em", marginBottom: 8,
            }}>{num}</div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ds-c-9)",
              letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.4,
            }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
