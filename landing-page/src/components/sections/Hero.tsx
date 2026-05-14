"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { WovenLightHero } from "../ui/woven-light-hero";
import { useState, useEffect, useCallback } from "react";
import {
  HERO_SLIDES,
  HERO_ROTATION_INTERVAL,
  HERO_CTA_PRIMARY,
} from "../../../docx/hero-content";

// ── Dev console slider ────────────────────────────────────────────────────────

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
      <input
        type="number"
        step={step}
        value={parseFloat(value.toFixed(3))}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bg-transparent border-b border-white/10 font-mono text-[10px] text-white/80 w-16 text-right focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
    <input
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-px bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
    />
    {unit && <span className="text-[8px] text-white/20 font-mono">{unit}</span>}
  </div>
);

// ── Align button group ────────────────────────────────────────────────────────

type TextAlign = "left" | "center" | "right";

const AlignGroup = ({
  value,
  onChange,
}: {
  value: TextAlign;
  onChange: (v: TextAlign) => void;
}) => (
  <div className="space-y-1.5">
    <span className="font-mono text-[9px] uppercase text-white/50 block">Alinhamento X</span>
    <div className="flex gap-1">
      {(["left", "center", "right"] as TextAlign[]).map((a) => (
        <button
          key={a}
          onClick={() => onChange(a)}
          className={`flex-1 font-mono text-[9px] uppercase py-1.5 border transition-colors ${
            value === a
              ? "border-white/50 text-white bg-white/5"
              : "border-white/10 text-white/30 hover:text-white/60 hover:border-white/25"
          }`}
        >
          {a === "left" ? "⬅" : a === "center" ? "↔" : "➡"}
        </button>
      ))}
    </div>
  </div>
);

// ── Config defaults ───────────────────────────────────────────────────────────

interface UIConfig {
  // Title
  titleSize: number;
  titleLineHeight: number;
  titleMaxWidth: number;
  letterSpacing: number;
  // Subtitle
  subtitleSize: number;
  subtitleLineHeight: number;
  subtitleMaxWidth: number;
  subtitleOpacity: number;
  // Layout
  lateralPadding: number;
  verticalOffset: number;
  headlineAreaHeight: number;
  gapHeadlineSubhead: number;
  // Alignment
  textAlign: TextAlign;
  itemsAlign: "start" | "center" | "end";
  // Color
  titleColor: string;
  subtitleColor: string;
  accentColor: string;
}

const DEFAULT_CONFIG: UIConfig = {
  titleSize: 6,
  titleLineHeight: 0.88,
  titleMaxWidth: 45,
  letterSpacing: 0.015,
  subtitleSize: 1.25,
  subtitleLineHeight: 1.45,
  subtitleMaxWidth: 31,
  subtitleOpacity: 98,
  lateralPadding: 10,
  verticalOffset: 0,
  headlineAreaHeight: 256,
  gapHeadlineSubhead: 34,
  textAlign: "left",
  itemsAlign: "start",
  titleColor: "#FFFFFF",
  subtitleColor: "#FFFFFF",
  accentColor: "#FFFFFF",
};

// ── Component ─────────────────────────────────────────────────────────────────

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [cfg, setCfg] = useState<UIConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);

  const set = (partial: Partial<UIConfig>) => setCfg((c) => ({ ...c, ...partial }));

  const handleSave = useCallback(() => {
    const lines = Object.entries(cfg)
      .map(([k, v]) => `  ${k}: ${typeof v === "string" ? `"${v}"` : v},`)
      .join("\n");
    const output = `const DEFAULT_CONFIG: UIConfig = {\n${lines}\n};`;
    navigator.clipboard.writeText(output).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }, [cfg]);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Shift+H → toggle console
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "h") setShowConsole((v) => !v);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setIsPaused(true);
  }, []);

  const slide = HERO_SLIDES[index];

  const itemsAlignClass =
    cfg.itemsAlign === "center" ? "items-center" : cfg.itemsAlign === "end" ? "items-end" : "items-start";

  return (
    <>
      <WovenLightHero>
        <section
          className={`relative min-h-screen flex flex-col ${itemsAlignClass} justify-center pt-32 pb-20 overflow-hidden w-full`}
          style={{
            paddingLeft: `${cfg.lateralPadding}rem`,
            paddingRight: `${cfg.lateralPadding}rem`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-left z-10 w-full"
            style={{
              textAlign: cfg.textAlign,
              transform: `translateY(${cfg.verticalOffset}px)`,
            }}
          >
            {/* ── Headline ── */}
            <div
              className="flex items-center justify-start w-full"
              style={{ height: `${cfg.headlineAreaHeight}px`, marginBottom: `${cfg.gapHeadlineSubhead}px` }}
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold tracking-tighter"
                  style={{
                    fontSize: `${cfg.titleSize}rem`,
                    lineHeight: cfg.titleLineHeight,
                    color: cfg.titleColor,
                    maxWidth: `${cfg.titleMaxWidth}rem`,
                    letterSpacing: `${cfg.letterSpacing}em`,
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.headline}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* ── Subhead ── */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`subhead-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: cfg.subtitleOpacity / 100, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="leading-relaxed"
                style={{
                  fontSize: `${cfg.subtitleSize}rem`,
                  lineHeight: cfg.subtitleLineHeight,
                  color: cfg.subtitleColor,
                  marginBottom: `${cfg.gapHeadlineSubhead * 2}px`,
                  maxWidth: `${cfg.subtitleMaxWidth}rem`,
                }}
              >
                {slide.subhead}
              </motion.p>
            </AnimatePresence>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-start gap-12"
            >
              <div className="w-full md:w-auto">
                <MagneticButton className="btn-primary !w-auto px-12 !rounded-none relative overflow-hidden group !border-white !text-white hover:!bg-white hover:!text-black transition-all">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: cfg.accentColor }}
                  />
                  {HERO_CTA_PRIMARY}
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </WovenLightHero>

      {/* ── Dev Console — Shift+H ── */}
      <div className="fixed bottom-10 right-10 z-[9999] pointer-events-auto">
        {showConsole && (
          <div className="w-80 max-h-[90vh] overflow-y-auto p-6 bg-black/90 backdrop-blur-3xl border border-white/20 shadow-2xl select-none font-mono">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Hero Control</span>
              </div>
              <button
                onClick={() => setShowConsole(false)}
                className="text-white/40 hover:text-white text-[10px] uppercase"
              >
                [X]
              </button>
            </div>

            <div className="space-y-8">

              {/* ── 01. Slides ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase text-white/30 tracking-widest">01. Slides</span>
                  <button
                    onClick={() => setIsPaused((v) => !v)}
                    className="text-[9px] uppercase tracking-widest border border-white/20 px-2 py-0.5 text-white/50 hover:text-white hover:border-white/50 transition-colors"
                  >
                    {isPaused ? "▶ Play" : "⏸ Pause"}
                  </button>
                </div>
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-full text-left border p-3 transition-all duration-200 ${
                      i === index
                        ? "border-white/40 bg-white/5"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <span className={`text-[8px] uppercase tracking-widest block mb-1 ${i === index ? "text-white" : "text-white/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className={`text-[9px] leading-snug ${i === index ? "text-white/80" : "text-white/30"}`}>
                      {s.headline}
                    </p>
                  </button>
                ))}
              </div>

              {/* ── Salvar / Reset ── */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSave}
                  className={`w-full font-mono text-[9px] uppercase py-2.5 border transition-all duration-300 tracking-widest ${
                    saved
                      ? "border-white/60 text-white bg-white/10"
                      : "border-white/30 text-white/70 hover:text-white hover:border-white/60 hover:bg-white/5"
                  }`}
                >
                  {saved ? "✓ Copiado para clipboard" : "Salvar configuração"}
                </button>
                {saved && (
                  <p className="text-[8px] text-white/30 text-center font-mono leading-relaxed">
                    Cole em DEFAULT_CONFIG no Hero.tsx
                  </p>
                )}
                <button
                  onClick={() => setCfg(DEFAULT_CONFIG)}
                  className="w-full font-mono text-[9px] uppercase py-2 border border-white/10 text-white/20 hover:text-white/50 hover:border-white/20 transition-colors tracking-widest"
                >
                  Reset defaults
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[8px] text-white/20 uppercase tracking-widest">Shift+H para fechar</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
