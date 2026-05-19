// AuditGrid.jsx — 8-dimension SIID timeline
// Mirrors landing-page/src/components/sections/AuditGrid.tsx
// Icon size grows from 96px → 288px to simulate camera recession from a planet.

const DIMENSIONS = [
  { id: 1, title: "Intensidade da Dor",       desc: "Mapeamento da urgência real do problema no cotidiano do usuário." },
  { id: 2, title: "Frequência de Uso",        desc: "Análise da recorrência da dor e a janela de oportunidade de solução." },
  { id: 3, title: "Tamanho do Mercado",       desc: "Auditoria quantitativa de potenciais adotantes e expansão vertical." },
  { id: 4, title: "Soluções Atuais",          desc: "Estudo do status quo e das alternativas precárias utilizadas hoje." },
  { id: 5, title: "Barreira de Troca",        desc: "Cálculo do esforço cognitivo e financeiro para migração do usuário." },
  { id: 6, title: "Capacidade de Execução",   desc: "Validação da viabilidade técnica e operacional para entrega do valor." },
  { id: 7, title: "Modelo de Monetização",    desc: "Teste de estresse sobre a disposição a pagar e geração de caixa." },
  { id: 8, title: "Custo de Aquisição",       desc: "Projeção de eficiência de canais e sustentabilidade de marketing." },
];

const ICON_BASE = 96;
const ICON_MAX  = 288;
const N = DIMENSIONS.length - 1;
const iconSize = i => Math.round(ICON_BASE + (i / N) * (ICON_MAX - ICON_BASE));

// Placeholder SIID icon — concentric geometric mark
const SIIDIcon = ({ id, size }) => {
  const c = size / 2;
  const r1 = size * 0.42;
  const r2 = size * 0.28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={c} cy={c} r={r1} fill="none" stroke="rgba(50,145,255,0.22)" strokeWidth={1} />
      <circle cx={c} cy={c} r={r2} fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth={1.25} />
      <circle cx={c} cy={c} r={size * 0.08} fill="#3291ff" />
      {/* tick marks at quadrant points */}
      {[0, 90, 180, 270].map(deg => {
        const rad = (deg * Math.PI) / 180;
        const x1 = c + Math.cos(rad) * (r1 - 4);
        const y1 = c + Math.sin(rad) * (r1 - 4);
        const x2 = c + Math.cos(rad) * (r1 + 4);
        const y2 = c + Math.sin(rad) * (r1 + 4);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.42)" strokeWidth={1} />;
      })}
      <text x={c} y={c + size * 0.16} textAnchor="middle"
        fontFamily="Geist Mono, monospace" fontSize={size * 0.08}
        fill="rgba(255,255,255,0.45)" letterSpacing={size * 0.005}>
        {String(id).padStart(2, "0")}
      </text>
    </svg>
  );
};

const TimelineItem = ({ dim, i }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const size = iconSize(i);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "-10% 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex", alignItems: "center", gap: 40,
        padding: "48px 0",
        opacity: visible ? 1 : 0.32,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0, width: size, height: size }}>
        {visible && (
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "rgba(50,145,255,0.10)", filter: "blur(40px)", pointerEvents: "none",
          }} />
        )}
        <SIIDIcon id={dim.id} size={size} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.32)",
          letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 14,
        }}>
          DIM_{String(dim.id).padStart(2, "0")}
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.4vw, 32px)",
          fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ds-c-10)",
          lineHeight: 1.15, marginBottom: 14,
        }}>
          {dim.title}
        </h3>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.55)",
          lineHeight: 1.65, maxWidth: 480,
        }}>
          {dim.desc}
        </p>
      </div>
    </div>
  );
};

const AuditGrid = () => {
  return (
    <section id="method" style={{
      padding: "128px clamp(40px, 6vw, 96px)",
      background: "var(--ds-bg-1)",
      borderTop: "1px solid var(--ds-c-4)",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 48, flexWrap: "wrap", marginBottom: 128,
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ds-c-9)",
              letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 24,
            }}>
              Lente Gravitacional
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.05,
              color: "var(--ds-c-10)", marginBottom: 24,
            }}>
              Enxergue além da{" "}
              <span style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic", fontWeight: 400 }}>
                poeira estelar.
              </span>
            </h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65, maxWidth: 520,
            }}>
              A Metodologia SIID funciona como uma lente de alta precisão, revelando a mecânica real do seu mercado antes que você cruze o ponto de não retorno.
            </p>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            borderLeft: "1px solid var(--ds-c-4)", paddingLeft: 32, height: 80, flexShrink: 0,
          }}>
            <div className="tabular-nums" style={{
              fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 500,
              letterSpacing: "-0.02em", color: "var(--ds-c-10)",
            }}>08</div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5,
            }}>
              Critérios de<br />Auditoria
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {DIMENSIONS.map((dim, i) => (
            <TimelineItem key={dim.id} dim={dim} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { AuditGrid });
