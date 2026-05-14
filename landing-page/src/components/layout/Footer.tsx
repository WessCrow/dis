"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FooterMarquee } from "./FooterMarquee";
import { footerConfig, type FooterConfig } from "./footer.config";
import { MagneticButton } from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Estilos cinematográficos ─────────────────────────────────────────────────

const CINEMATIC_STYLES = `
@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.85; }
}

.footer-breathe {
  animation: footer-breathe 9s ease-in-out infinite alternate;
}

.footer-aurora {
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(50,145,255,0.10) 0%,
    rgba(50,145,255,0.04) 45%,
    transparent 75%
  );
}

.footer-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

.footer-giant-text {
  font-size: clamp(120px, 22vw, 320px);
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 55%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
  pointer-events: none;
}

.footer-logo-glow {
  filter: drop-shadow(0 0 24px rgba(50,145,255,0.18));
}
`;

// ─── Sub-componentes do Console ───────────────────────────────────────────────

const Slider = ({ label, value, min, max, step, unit = "", onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit?: string;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
      <div className="flex items-center gap-1">
        <input type="number" step={step} value={parseFloat(value.toFixed(2))}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="bg-transparent border-b border-white/10 font-mono text-[10px] text-white/80 w-14 text-right focus:outline-none focus:border-ds-blue transition-colors"
        />
        {unit && <span className="font-mono text-[9px] text-white/30">{unit}</span>}
      </div>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-px bg-white/10 appearance-none cursor-pointer accent-ds-blue"
    />
  </div>
);

const TextInput = ({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="font-mono text-[9px] uppercase text-white/50 block">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
        className="w-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 px-2 py-1.5 focus:outline-none focus:border-ds-blue transition-colors resize-none"
      />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 px-2 py-1.5 focus:outline-none focus:border-ds-blue transition-colors"
      />
    )}
  </div>
);

const Toggle = ({ label, value, onChange }: {
  label: string; value: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
    <button type="button" onClick={() => onChange(!value)}
      className={`px-3 py-1 font-mono text-[9px] uppercase border transition-colors ${
        value ? "bg-ds-blue text-ds-bg-1 border-ds-blue" : "border-white/20 text-white/40 hover:border-white/40"
      }`}
    >
      {value ? "ON" : "OFF"}
    </button>
  </div>
);

const Divider = () => <div className="w-full h-px bg-white/5" />;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[9px] uppercase text-[#B4B4B5] block mb-4">{children}</span>
);

const extractOpacity = (cls: string) => parseInt(cls.match(/opacity-(\d+)/)?.[1] ?? "20");
const extractVw      = (cls: string) => parseFloat(cls.match(/h-\[(\d+(?:\.\d+)?)vw\]/)?.[1] ?? "30");
const extractMaxPx   = (cls: string) => parseInt(cls.match(/max-h-\[(\d+)px\]/)?.[1] ?? "450");
const extractTranslY = (cls: string) => parseInt(cls.match(/translate-y-\[(\d+)%\]/)?.[1] ?? "15");

// ─── Componente Principal ─────────────────────────────────────────────────────

export const Footer = () => {
  const [config, setConfig] = useState<FooterConfig>(footerConfig);
  const [showConsole, setShowConsole] = useState(false);
  const configRef = useRef(config);

  // Refs GSAP
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const giantTextRef  = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const metaRef       = useRef<HTMLDivElement>(null);

  useEffect(() => { configRef.current = config; }, [config]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "f") setShowConsole((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Animações GSAP com ScrollTrigger ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax do texto gigante de fundo
      gsap.fromTo(giantTextRef.current,
        { y: "15vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );

      // Reveal escalonado do conteúdo
      gsap.fromTo(
        [headingRef.current, metaRef.current],
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const set = <K extends keyof FooterConfig>(key: K, value: FooterConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const setNested = <K extends keyof FooterConfig, SK extends keyof FooterConfig[K]>(
    key: K, subKey: SK, value: FooterConfig[K][SK]
  ) => setConfig((c) => ({ ...c, [key]: { ...(c[key] as object), [subKey]: value } }));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const { background, paddingTop, content, logo, description, divider, meta, marquee, glassMask } = config;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CINEMATIC_STYLES }} />

      {/*
        Curtain Reveal Wrapper — fica no fluxo normal (h-screen),
        o clip-path revela o footer fixo conforme o scroll avança.
      */}
      <div
        ref={wrapperRef}
        data-footer-trigger
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          className={`fixed bottom-0 left-0 w-full h-screen ${background} overflow-hidden text-white`}
        >
          {/* ── Camadas de fundo ─────────────────────────────────────────── */}

          {/* Aurora azul — glow ambiente */}
          <div className="footer-aurora footer-breathe absolute left-1/2 top-1/2 h-[55vh] w-[75vw] rounded-[50%] blur-[72px] pointer-events-none z-0" />

          {/* Grid perspectivo */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Texto gigante de fundo — parallax via GSAP */}
          <div
            ref={giantTextRef}
            aria-hidden="true"
            className="footer-giant-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0"
          >
            DISRUPTA
          </div>

          {/* ── Conteúdo principal ───────────────────────────────────────── */}
          <div
            className={`${content.maxWidth} mx-auto relative z-10 h-full flex flex-col`}
            style={{
              paddingLeft:  `${content.paddingX}px`,
              paddingRight: `${content.paddingX}px`,
              paddingTop:   `${paddingTop}px`,
            }}
          >
            {/* Logo */}
            <div ref={headingRef} style={{ marginBottom: `${logo.marginBottom}px` }}>
              <img
                src={logo.src}
                alt={logo.alt}
                className="footer-logo-glow"
                style={{ height: `${logo.height}px`, width: "auto" }}
              />
            </div>

            {/* Descrição */}
            <p
              className={`${description.colorOpacity} text-sm md:text-base ${description.maxWidth} leading-relaxed`}
              style={{ marginBottom: `${description.marginBottom}px` }}
            >
              {description.text}
            </p>

            {/* Divisória */}
            {divider.show && (
              <div
                className={`w-full h-px ${divider.colorOpacity}`}
                style={{ marginBottom: `${divider.marginBottom}px` }}
              />
            )}

            {/* Meta + scroll-to-top */}
            <div
              ref={metaRef}
              className={`w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm ${meta.colorOpacity}`}
              style={{ marginBottom: `${meta.marginBottom}px` }}
            >
              <span>{meta.copyright}</span>
              <span>{meta.tagline}</span>

              <MagneticButton
                onClick={scrollToTop}
                aria-label="Voltar ao topo"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="square" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          {/* ── Glass mask sobre o marquee ───────────────────────────────── */}
          {glassMask.enabled && (
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]"
              style={{
                height: `${glassMask.height}%`,
                backdropFilter: `blur(${glassMask.blurPx}px)`,
                WebkitBackdropFilter: `blur(${glassMask.blurPx}px)`,
                background: `linear-gradient(to bottom, transparent, rgba(0,0,0,${glassMask.bgOpacity / 100}))`,
                maskImage: `linear-gradient(to bottom, transparent ${glassMask.gradientStart}%, black ${glassMask.gradientEnd}%)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent ${glassMask.gradientStart}%, black ${glassMask.gradientEnd}%)`,
              }}
            />
          )}

          {/* ── Marquee ──────────────────────────────────────────────────── */}
          {marquee.enabled && (
            <div className={`w-full absolute bottom-0 left-0 right-0 pointer-events-none flex justify-center ${marquee.translateY}`}>
              <FooterMarquee config={marquee} />
            </div>
          )}
        </footer>
      </div>

      {/* ── Console Panel (Shift+F) ──────────────────────────────────────────── */}
      {showConsole && (
        <div className="fixed bottom-6 left-6 z-[9999] w-80 max-h-[82vh] overflow-y-auto bg-black/85 backdrop-blur-3xl border border-white/20 shadow-2xl select-none [scrollbar-width:thin] [scrollbar-color:theme(colors.white/10)_transparent]">

          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-black/90 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ds-blue animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">
                Footer Engine
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setConfig(footerConfig)}
                className="font-mono text-[9px] uppercase text-white/30 hover:text-white/70 transition-colors"
              >
                Reset
              </button>
              <button type="button" onClick={() => setShowConsole(false)}
                className="font-mono text-[10px] text-white/40 hover:text-white transition-colors"
              >
                [X]
              </button>
            </div>
          </div>

          <div className="px-5 py-5 space-y-7">

            <div>
              <SectionLabel>Layout · Padding · Espaçamento</SectionLabel>
              <div className="space-y-4">
                <Slider label="Padding Top (container)" value={paddingTop} min={0} max={200} step={4} unit="px" onChange={(v) => set("paddingTop", v)} />
                <Slider label="Padding X (conteúdo)" value={content.paddingX} min={0} max={120} step={4} unit="px" onChange={(v) => setNested("content", "paddingX", v)} />
                <Slider label="Gap Logo → Descrição" value={logo.marginBottom} min={0} max={120} step={4} unit="px" onChange={(v) => setNested("logo", "marginBottom", v)} />
                <Slider label="Gap Descrição → Divider" value={description.marginBottom} min={0} max={200} step={4} unit="px" onChange={(v) => setNested("description", "marginBottom", v)} />
                <Slider label="Gap Divider → Meta" value={divider.marginBottom} min={0} max={120} step={4} unit="px" onChange={(v) => setNested("divider", "marginBottom", v)} />
                <Slider label="Gap Meta → Marquee" value={meta.marginBottom} min={0} max={600} step={8} unit="px" onChange={(v) => setNested("meta", "marginBottom", v)} />
              </div>
            </div>

            <Divider />

            <div>
              <SectionLabel>Tamanho</SectionLabel>
              <div className="space-y-4">
                <Slider label="Logo Height" value={logo.height} min={12} max={120} step={2} unit="px" onChange={(v) => setNested("logo", "height", v)} />
                <Slider label="Marquee Logo Height" value={extractVw(marquee.logoHeight)} min={5} max={60} step={1} unit="vw"
                  onChange={(v) => setNested("marquee", "logoHeight", `h-[${v}vw] md:h-[${(v * 0.75).toFixed(1)}vw]`)}
                />
                <Slider label="Marquee Logo Max Height" value={extractMaxPx(marquee.logoMaxHeight)} min={100} max={800} step={25} unit="px"
                  onChange={(v) => setNested("marquee", "logoMaxHeight", `max-h-[${v}px]`)}
                />
              </div>
            </div>

            <Divider />

            <div>
              <SectionLabel>Marquee</SectionLabel>
              <div className="space-y-4">
                <Toggle label="Enabled" value={marquee.enabled} onChange={(v) => setNested("marquee", "enabled", v)} />
                <Slider label="Duration" value={marquee.duration} min={10} max={300} step={5} unit="s" onChange={(v) => setNested("marquee", "duration", v)} />
                <Slider label="Item Count" value={marquee.itemCount} min={2} max={20} step={1} onChange={(v) => setNested("marquee", "itemCount", v)} />
                <Slider label="Opacity" value={extractOpacity(marquee.opacityClass)} min={5} max={100} step={5} unit="%" onChange={(v) => setNested("marquee", "opacityClass", `opacity-${v}`)} />
                <Slider label="Translate Y" value={extractTranslY(marquee.translateY)} min={0} max={40} step={1} unit="%"
                  onChange={(v) => setNested("marquee", "translateY", `translate-y-[${v}%] md:translate-y-[${Math.max(0, v - 5)}%]`)}
                />
                <TextInput label="Separador" value={marquee.separator} onChange={(v) => setNested("marquee", "separator", v)} />
              </div>
            </div>

            <Divider />

            <div>
              <SectionLabel>Conteúdo</SectionLabel>
              <div className="space-y-4">
                <TextInput label="Descrição" value={description.text} onChange={(v) => setNested("description", "text", v)} multiline />
                <TextInput label="Copyright" value={meta.copyright} onChange={(v) => setNested("meta", "copyright", v)} />
                <TextInput label="Tagline" value={meta.tagline} onChange={(v) => setNested("meta", "tagline", v)} />
              </div>
            </div>

            <Divider />

            <div>
              <SectionLabel>Glass Mask</SectionLabel>
              <div className="space-y-4">
                <Toggle label="Enabled" value={glassMask.enabled} onChange={(v) => setNested("glassMask", "enabled", v)} />
                <Slider label="Altura" value={glassMask.height} min={10} max={100} step={5} unit="%" onChange={(v) => setNested("glassMask", "height", v)} />
                <Slider label="Blur" value={glassMask.blurPx} min={0} max={80} step={2} unit="px" onChange={(v) => setNested("glassMask", "blurPx", v)} />
                <Slider label="Fundo (opacidade)" value={glassMask.bgOpacity} min={0} max={100} step={5} unit="%" onChange={(v) => setNested("glassMask", "bgOpacity", v)} />
                <Slider label="Gradiente início" value={glassMask.gradientStart} min={0} max={90} step={5} unit="%" onChange={(v) => setNested("glassMask", "gradientStart", v)} />
                <Slider label="Gradiente fim" value={glassMask.gradientEnd} min={10} max={100} step={5} unit="%" onChange={(v) => setNested("glassMask", "gradientEnd", v)} />
              </div>
            </div>

            <Divider />

            <div>
              <SectionLabel>Visibilidade</SectionLabel>
              <div className="space-y-4">
                <Toggle label="Divider" value={divider.show} onChange={(v) => setNested("divider", "show", v)} />
                <Toggle label="Marquee" value={marquee.enabled} onChange={(v) => setNested("marquee", "enabled", v)} />
              </div>
            </div>

          </div>

          <div className="sticky bottom-0 px-5 py-3 border-t border-white/10 bg-black/90">
            <p className="font-mono text-[8px] uppercase text-white/20 text-center">
              Shift+F · Reset restaura os defaults
            </p>
          </div>
        </div>
      )}
    </>
  );
};
