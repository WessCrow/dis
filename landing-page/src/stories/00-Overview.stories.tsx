import type { Meta, StoryObj } from "@storybook/react";
import {
  ImpossibleCubeIcon,
  VortexIcon,
  GridGlitchIcon,
  HollowSpotlightIcon,
} from "@/components/ui/brand-icons";

const ICONS = [
  { Icon: ImpossibleCubeIcon,  label: "01 · Falsa Certeza",        sub: "Distorção de Realidade" },
  { Icon: VortexIcon,          label: "02 · Buraco Negro",          sub: "Ralo de Recursos" },
  { Icon: GridGlitchIcon,      label: "03 · Falha Sistêmica",       sub: "Cegueira Operacional" },
  { Icon: HollowSpotlightIcon, label: "04 · Teatro Corporativo",    sub: "Inovação por Vaidade" },
];

const Overview = () => (
  <div style={{ background: "#050505", padding: 32, minWidth: 800 }}>
    {/* Header */}
    <div style={{ marginBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 24 }}>
      <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em",
        textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
        Disrupta Lab — Sistema de Iconografia
      </p>
      <h1 style={{ fontFamily: "monospace", fontSize: 22, color: "#fff",
        fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
        High-Contrast Technical Brutalism
      </h1>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.6)",
        marginTop: 8, letterSpacing: "0.02em" }}>
        Paleta: #000 · #FFF · #FF5500 (alerta)
      </p>
    </div>

    {/* Grid 2×2 */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {ICONS.map(({ Icon, label, sub }) => (
        <div key={label} style={{ position: "relative", background: "#000", overflow: "hidden" }}>
          <div style={{ width: "100%", aspectRatio: "4/3" }}>
            <Icon />
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "8px 12px",
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          }}>
            <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.35em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: 0 }}>
              {sub}
            </p>
            <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.05em",
              color: "#fff", margin: "2px 0 0" }}>
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Legenda de paleta */}
    <div style={{ marginTop: 32, display: "flex", gap: 24, alignItems: "center" }}>
      {[
        { swatch: "#000000", label: "Background" },
        { swatch: "#ffffff", label: "Forma" },
        { swatch: "#FF5500", label: "Alerta / Erro" },
        { swatch: "rgba(255,255,255,0.18)", label: "Dim / Estrutural" },
      ].map(({ swatch, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 16, height: 16,
            background: swatch,
            border: "1px solid rgba(255,255,255,0.2)",
          }} />
          <span style={{ fontFamily: "monospace", fontSize: 10,
            color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof Overview> = {
  title: "Disrupta / Brand Icons / 00 · Overview",
  component: Overview,
  parameters: {
    backgrounds: { default: "dark" },
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Sistema de iconografia proprietário da Disrupta Lab.

**Direção de Arte:** High-Contrast Technical Brutalism
- Grid rígido, matemático, inspirado em diagramas de falha de engenharia
- Formas sólidas que sofrem intervenções — cortes, distorções, glitch
- Sem gradientes, sem sombras, sem bordas arredondadas
- Animações que carregam significado: não são decorativas

**Cor de alerta:** \`#FF5500\` marca o ponto de falha em cada ícone.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Overview>;

export const Default: Story = {
  name: "Todos os ícones",
};
