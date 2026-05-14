"use client";

import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef, useState, useEffect, useCallback, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  FalseCertaintyIcon,
  ResourceDrainIcon,
  OperationalBlindnessIcon,
} from "@/components/ui/diagnostic-icons";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CardData {
  tag: string;
  title: string;
  description: string;
  color: string;
  Visual: ComponentType;
}

interface SectionContent {
  overline: string;
  heading: string;
  subtitle: string;
  cards: Omit<CardData, "color" | "Visual">[];
}

type TextAlign = "left" | "center" | "right";
type ItemsAlign = "start" | "center" | "end";

interface LayoutConfig {
  // Heading
  headingSize: number;       // rem
  headingLineHeight: number;
  headingLetterSpacing: number; // em
  headingMaxWidth: number;   // px
  // Subtitle
  subtitleSize: number;      // rem
  subtitleOpacity: number;   // %
  subtitleMaxWidth: number;  // px
  // Section
  paddingY: number;          // px (top & bottom)
  gapHeadingSubtitle: number; // px
  gapSectionCards: number;   // px
  // Alignment
  textAlign: TextAlign;
  itemsAlign: ItemsAlign;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_CONTENT: SectionContent = {
  overline: "Diagnóstico",
  heading: 'Você sente a gravidade do "Eu Acho"\npuxando seu projeto?',
  subtitle: "No centro de toda startup que faliu, havia uma certeza não auditada.",
  cards: [
    {
      tag: "Colapso de Perspectiva",
      title: "A Singularidade do Ego",
      description:
        "Quando o fundador brilha mais que o problema. Você ignora sinais vitais do mercado porque está cego pelo próprio pitch. O resultado? Colapso total.",
    },
    {
      tag: "Destruição de Recursos",
      title: "Espaguetificação do Capital",
      description:
        "O fenômeno onde os recursos são esticados até romperem. Investimento gasto em tecnologia sofisticada para um problema que ninguém quer pagar para resolver.",
    },
    {
      tag: "Risco Invisível",
      title: "Matéria Escura Operacional",
      description:
        "Custos invisíveis, churn oculto e margens ilusórias. Se você não mapeou os riscos, eles já estão devorando seu lucro no escuro.",
    },
  ],
};

const DEFAULT_LAYOUT: LayoutConfig = {
  headingSize: 3.75,
  headingLineHeight: 1.1,
  headingLetterSpacing: -0.03,
  headingMaxWidth: 1000,
  subtitleSize: 1,
  subtitleOpacity: 40,
  subtitleMaxWidth: 600,
  paddingY: 128,
  gapHeadingSubtitle: 24,
  gapSectionCards: 0,
  textAlign: "center",
  itemsAlign: "center",
};

const VISUALS: ComponentType[] = [FalseCertaintyIcon, ResourceDrainIcon, OperationalBlindnessIcon];
const COLORS = ["#0A0A0A", "#0D0D0D", "#080808"];

// ── Console primitives ────────────────────────────────────────────────────────

const Slider = ({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
      <input
        type="number" step={step} value={parseFloat(value.toFixed(3))}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bg-transparent border-b border-white/10 font-mono text-[10px] text-white/80 w-16 text-right focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-px bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
    />
  </div>
);

const AlignX = ({ value, onChange }: { value: TextAlign; onChange: (v: TextAlign) => void }) => (
  <div className="space-y-1.5">
    <span className="font-mono text-[9px] uppercase text-white/50 block">Alinhamento X</span>
    <div className="flex gap-1">
      {(["left", "center", "right"] as TextAlign[]).map((a) => (
        <button key={a} onClick={() => onChange(a)}
          className={`flex-1 font-mono text-[9px] uppercase py-1.5 border transition-colors ${
            value === a ? "border-white/50 text-white bg-white/5" : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
          }`}
        >
          {a === "left" ? "⬅" : a === "center" ? "↔" : "➡"}
        </button>
      ))}
    </div>
  </div>
);

const AlignY = ({ value, onChange }: { value: ItemsAlign; onChange: (v: ItemsAlign) => void }) => (
  <div className="space-y-1.5">
    <span className="font-mono text-[9px] uppercase text-white/50 block">Alinhamento Y</span>
    <div className="flex gap-1">
      {(["start", "center", "end"] as ItemsAlign[]).map((a) => (
        <button key={a} onClick={() => onChange(a)}
          className={`flex-1 font-mono text-[9px] uppercase py-1.5 border transition-colors ${
            value === a ? "border-white/50 text-white bg-white/5" : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
          }`}
        >
          {a === "start" ? "⬆" : a === "center" ? "↕" : "⬇"}
        </button>
      ))}
    </div>
  </div>
);

const TextField = ({
  label, value, multiline = false, onChange,
}: {
  label: string; value: string; multiline?: boolean; onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <label className="font-mono text-[8px] uppercase text-white/40 tracking-widest block">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full bg-transparent border border-white/10 font-mono text-[9px] text-white/80 p-2 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
      />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-white/10 font-mono text-[9px] text-white/80 py-1 focus:outline-none focus:border-white/30 transition-colors"
      />
    )}
  </div>
);

// ── Card component ────────────────────────────────────────────────────────────

interface CardProps {
  i: number; title: string; description: string;
  Visual: ComponentType; color: string; tag: string;
  progress: MotionValue<number>; range: [number, number]; targetScale: number;
}

const Card = ({ i, title, description, Visual, color, tag, progress, range, targetScale }: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      {/* motion.div aplica o scale de scroll no card inteiro (borda inclusa) */}
      <motion.div
        style={{ scale, zIndex: i }}
        className="relative h-[500px] w-[90%] md:w-[75%] origin-top"
      >
        <TiltCard
          tiltLimit={6}
          scale={1.02}
          effect="gravitate"
          spotlight
          style={{ backgroundColor: color }}
          className={cn(
            "h-full w-full rounded-none border border-white/10 shadow-2xl backdrop-blur-xl",
            "bg-gradient-to-br from-white/5 to-transparent"
          )}
        >
          <div className="flex w-full h-full">
            <div className="w-[42%] shrink-0 flex flex-col justify-between p-8 md:p-12">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9">{tag}</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white leading-tight">{title}</h2>
                <p className="text-ds-c-10 text-base leading-relaxed font-light mt-2">{description}</p>
              </div>
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-xs font-mono text-ds-c-9">
                0{i + 1}
              </div>
            </div>
            <div className="relative flex-1 h-full border-l border-white/5">
              <Visual />
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

export const ValidationRigor = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const [content, setContent] = useState<SectionContent>(DEFAULT_CONTENT);
  const [layout, setLayout] = useState<LayoutConfig>(DEFAULT_LAYOUT);
  const [showConsole, setShowConsole] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"texto" | "layout">("texto");

  const setCard = (i: number, partial: Partial<SectionContent["cards"][0]>) =>
    setContent((c) => { const cards = [...c.cards]; cards[i] = { ...cards[i], ...partial }; return { ...c, cards }; });

  const setL = (partial: Partial<LayoutConfig>) => setLayout((l) => ({ ...l, ...partial }));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "d") setShowConsole((v) => !v);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSave = useCallback(() => {
    const out = JSON.stringify({ content, layout }, null, 2);
    navigator.clipboard.writeText(out).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }, [content, layout]);

  const projects: CardData[] = content.cards.map((c, i) => ({
    ...c, color: COLORS[i], Visual: VISUALS[i],
  }));

  const itemsClass = layout.itemsAlign === "center" ? "items-center" : layout.itemsAlign === "end" ? "items-end" : "items-start";

  return (
    <>
      <section className="relative z-20 bg-transparent px-6" ref={container}>
        {/* ── Heading ── */}
        <section
          className={`flex flex-col ${itemsClass} justify-center relative overflow-hidden`}
          style={{
            paddingTop: `${layout.paddingY}px`,
            paddingBottom: `${layout.paddingY}px`,
            textAlign: layout.textAlign,
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-c-9 z-10"
            style={{ marginBottom: `${layout.gapHeadingSubtitle * 0.75}px` }}
          >
            {content.overline}
          </motion.span>

          <h2
            className="font-bold tracking-tighter text-white z-10"
            style={{
              fontSize: `${layout.headingSize}rem`,
              lineHeight: layout.headingLineHeight,
              letterSpacing: `${layout.headingLetterSpacing}em`,
              maxWidth: `${layout.headingMaxWidth}px`,
              whiteSpace: "pre-line",
              marginBottom: `${layout.gapHeadingSubtitle}px`,
            }}
          >
            {content.heading}
          </h2>

          <p
            className="text-white/40 font-mono tracking-wide z-10"
            style={{
              fontSize: `${layout.subtitleSize}rem`,
              opacity: layout.subtitleOpacity / 100,
              maxWidth: `${layout.subtitleMaxWidth}px`,
            }}
          >
            {content.subtitle}
          </p>
        </section>

        {/* ── Cards ── */}
        <section className="relative h-[300vh]" style={{ marginTop: `${layout.gapSectionCards}px` }}>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={i} i={i} Visual={project.Visual} title={project.title}
                color={project.color} tag={project.tag} description={project.description}
                progress={scrollYProgress} range={[i / projects.length, 1]} targetScale={targetScale}
              />
            );
          })}
        </section>

        <div className="h-48" />
      </section>

      {/* ── Dev Console — Shift+D ── */}
      <div className="fixed bottom-10 left-10 z-[9999] pointer-events-auto">
        {showConsole && (
          <div className="w-80 max-h-[90vh] overflow-y-auto p-6 bg-black/90 backdrop-blur-3xl border border-white/20 shadow-2xl font-mono">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Diagnóstico Control</span>
              </div>
              <button onClick={() => setShowConsole(false)} className="text-white/40 hover:text-white text-[10px] uppercase">[X]</button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 mb-6">
              {(["texto", "layout"] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`flex-1 font-mono text-[9px] uppercase py-1.5 border transition-colors ${
                    activeTab === t ? "border-white/50 text-white bg-white/5" : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-8">

              {/* ── TAB: Texto ── */}
              {activeTab === "texto" && (
                <>
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest">01. Cabeçalho</span>
                    <TextField label="Overline" value={content.overline}
                      onChange={(v) => setContent((c) => ({ ...c, overline: v }))} />
                    <TextField label="Heading" value={content.heading} multiline
                      onChange={(v) => setContent((c) => ({ ...c, heading: v }))} />
                    <TextField label="Subtítulo" value={content.subtitle} multiline
                      onChange={(v) => setContent((c) => ({ ...c, subtitle: v }))} />
                  </div>

                  {content.cards.map((card, i) => (
                    <div key={i} className="space-y-3">
                      <span className="text-[9px] uppercase text-white/30 block tracking-widest">
                        {String(i + 2).padStart(2, "0")}. Card {i + 1}
                      </span>
                      <TextField label="Tag" value={card.tag} onChange={(v) => setCard(i, { tag: v })} />
                      <TextField label="Título" value={card.title} onChange={(v) => setCard(i, { title: v })} />
                      <TextField label="Descrição" value={card.description} multiline onChange={(v) => setCard(i, { description: v })} />
                    </div>
                  ))}
                </>
              )}

              {/* ── TAB: Layout ── */}
              {activeTab === "layout" && (
                <>
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest">01. Heading</span>
                    <Slider label="Tamanho (rem)" value={layout.headingSize} min={1.5} max={6} step={0.05}
                      onChange={(v) => setL({ headingSize: v })} />
                    <Slider label="Altura da linha" value={layout.headingLineHeight} min={0.8} max={1.8} step={0.01}
                      onChange={(v) => setL({ headingLineHeight: v })} />
                    <Slider label="Espaç. letras (em)" value={layout.headingLetterSpacing} min={-0.1} max={0.05} step={0.005}
                      onChange={(v) => setL({ headingLetterSpacing: v })} />
                    <Slider label="Largura máx (px)" value={layout.headingMaxWidth} min={300} max={1400} step={10}
                      onChange={(v) => setL({ headingMaxWidth: v })} />
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest">02. Subtítulo</span>
                    <Slider label="Tamanho (rem)" value={layout.subtitleSize} min={0.7} max={2} step={0.05}
                      onChange={(v) => setL({ subtitleSize: v })} />
                    <Slider label="Opacidade (%)" value={layout.subtitleOpacity} min={10} max={100} step={1}
                      onChange={(v) => setL({ subtitleOpacity: v })} />
                    <Slider label="Largura máx (px)" value={layout.subtitleMaxWidth} min={200} max={900} step={10}
                      onChange={(v) => setL({ subtitleMaxWidth: v })} />
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest">03. Espaçamentos</span>
                    <Slider label="Padding Y (px)" value={layout.paddingY} min={32} max={300} step={4}
                      onChange={(v) => setL({ paddingY: v })} />
                    <Slider label="Gap heading→sub (px)" value={layout.gapHeadingSubtitle} min={0} max={80} step={2}
                      onChange={(v) => setL({ gapHeadingSubtitle: v })} />
                    <Slider label="Gap seção→cards (px)" value={layout.gapSectionCards} min={-200} max={200} step={4}
                      onChange={(v) => setL({ gapSectionCards: v })} />
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest">04. Alinhamento</span>
                    <AlignX value={layout.textAlign} onChange={(v) => setL({ textAlign: v })} />
                    <AlignY value={layout.itemsAlign} onChange={(v) => setL({ itemsAlign: v })} />
                  </div>

                  <button
                    onClick={() => setLayout(DEFAULT_LAYOUT)}
                    className="w-full font-mono text-[9px] uppercase py-2 border border-white/10 text-white/20 hover:text-white/50 hover:border-white/20 transition-colors tracking-widest"
                  >
                    Reset layout
                  </button>
                </>
              )}

              {/* ── Salvar / Reset geral ── */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSave}
                  className={`w-full font-mono text-[9px] uppercase py-2.5 border transition-all duration-300 tracking-widest ${
                    saved
                      ? "border-white/60 text-white bg-white/10"
                      : "border-white/30 text-white/70 hover:text-white hover:border-white/60 hover:bg-white/5"
                  }`}
                >
                  {saved ? "✓ Copiado para clipboard" : "Salvar tudo"}
                </button>
                {saved && (
                  <p className="text-[8px] text-white/30 text-center leading-relaxed">
                    Cole em DEFAULT_CONTENT / DEFAULT_LAYOUT
                  </p>
                )}
                <button
                  onClick={() => { setContent(DEFAULT_CONTENT); setLayout(DEFAULT_LAYOUT); }}
                  className="w-full font-mono text-[9px] uppercase py-2 border border-white/10 text-white/20 hover:text-white/50 hover:border-white/20 transition-colors tracking-widest"
                >
                  Reset tudo
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[8px] text-white/20 uppercase tracking-widest">Shift+D para fechar</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
