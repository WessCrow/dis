"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ScannerCardStream } from "../ui/ScannerCardStream";

const ScannerSlider = ({ label, value, min, max, step, onChange }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
      <input
        type="number"
        step={step}
        value={typeof value === "number" ? parseFloat(value.toFixed(3)) : value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bg-transparent border-b border-white/10 font-mono text-[10px] text-white/80 w-16 text-right focus:outline-none focus:border-[#29BDF2] transition-colors"
      />
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#29BDF2]"
    />
  </div>
);

export const WasteNotSection = () => {
  const [showConsole, setShowConsole] = useState(false);
  const [config, setConfig] = useState({
    // Section
    minHeight: 85,
    bgOpacity: 100,
    overlayOpacity: 0,
    // Background box (clip-path)
    bgWidth: 100,
    bgPaddingTop: 0,
    bgPaddingBottom: 0,
    bgPaddingLeft: 0,
    widthTop: 100,
    widthBottom: 100,
    // Left column
    leftColWidth: 48,
    paddingTop: 120,
    paddingBottom: 128,
    paddingLeft: 248,
    paddingRight: 44,
    gap: 20,
    contentOffsetY: -32,
    // Typography
    titleSize: 60,
    subtitleOpacity: 70,
    subtitleSize: 18,
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "w") {
        setShowConsole((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section
      className="border-t border-white/5 relative flex flex-col md:flex-row overflow-hidden"
      style={{
        minHeight: `${config.minHeight}vh`,
        backgroundColor: "transparent",
      }}
    >
      {/* Background box com clip-path */}
      <div
        className="absolute pointer-events-none bg-black"
        style={{
          opacity: config.bgOpacity / 100,
          width: `${config.bgWidth}%`,
          top: `${config.bgPaddingTop}px`,
          bottom: `${config.bgPaddingBottom}px`,
          left: `${config.bgPaddingLeft}px`,
          clipPath: (() => {
            const t = config.widthTop, b = config.widthBottom;
            const tx = (100 - t) / 2, bx = (100 - b) / 2;
            return `polygon(${tx}% 0%, ${tx + t}% 0%, ${bx + b}% 100%, ${bx}% 100%)`;
          })(),
        }}
      />
      {/* Overlay full */}
      <div
        className="absolute inset-0 pointer-events-none bg-black"
        style={{ opacity: config.overlayOpacity / 100 }}
      />

      {/* ── Left column — conteúdo de texto ── */}
      <div
        className="wastecol-left relative z-10 flex flex-col justify-center md:border-r border-white/10"
        style={{
          "--col-w": `${config.leftColWidth}%`,
          paddingTop: `${config.paddingTop}px`,
          paddingBottom: `${config.paddingBottom}px`,
          paddingLeft: `clamp(1.5rem, 5vw, ${config.paddingLeft}px)`,
          paddingRight: `clamp(1.5rem, 3vw, ${config.paddingRight}px)`,
          gap: `${config.gap}px`,
          marginTop: `${config.contentOffsetY}px`,
        } as React.CSSProperties}
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-c-9 block"
        >
          Oportunidade Blindada
        </motion.span>

        <h2
          className="font-bold tracking-tighter leading-[0.95] text-white"
          style={{ fontSize: `${config.titleSize}px` }}
        >
          Não desperdice <br />
          <span className="text-[#B4B4B5] italic">ideia.</span>
        </h2>

        <p
          className="max-w-xl leading-relaxed text-white"
          style={{
            fontSize: `${config.subtitleSize}px`,
            opacity: config.subtitleOpacity / 100,
          }}
        >
          Muitos criadores estão deixando dinheiro na mesa por não saber como continuar.
          O protocolo Disrupta transforma o "e se?" em um roadmap documental de execução.
        </p>
      </div>

      {/* ── Right column — ScannerCardStream ── */}
      <div
        className="relative z-10 w-full md:flex-1 overflow-hidden flex items-center justify-center"
        aria-hidden="true"
      >
        <ScannerCardStream />
      </div>

      {/* Console — Shift+W */}
      <div className="fixed bottom-10 right-10 z-[9999] pointer-events-auto">
        {showConsole && (
          <div className="w-80 max-h-[85vh] overflow-y-auto p-6 bg-black/90 backdrop-blur-3xl border border-white/20 shadow-2xl select-none font-mono">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#29BDF2] animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">WasteNot Config</span>
              </div>
              <button
                onClick={() => setShowConsole(false)}
                className="text-white/40 hover:text-white text-[10px] uppercase"
                aria-label="Fechar painel de configuração"
              >
                [X]
              </button>
            </div>

            <div className="space-y-8">
              {/* 01. Seção */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">01. Seção</span>
                <ScannerSlider label="Min Height (vh)" value={config.minHeight} min={20} max={200} step={5}
                  onChange={(v: number) => setConfig(c => ({ ...c, minHeight: v }))} />
              </div>

              {/* 02. Coluna esquerda */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">02. Col. Esquerda</span>
                <ScannerSlider label="Largura (%)" value={config.leftColWidth} min={20} max={80} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, leftColWidth: v }))} />
                <ScannerSlider label="Padding Top (px)" value={config.paddingTop} min={0} max={400} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, paddingTop: v }))} />
                <ScannerSlider label="Padding Bottom (px)" value={config.paddingBottom} min={0} max={400} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, paddingBottom: v }))} />
                <ScannerSlider label="Padding Left (px)" value={config.paddingLeft} min={0} max={300} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, paddingLeft: v }))} />
                <ScannerSlider label="Padding Right (px)" value={config.paddingRight} min={0} max={300} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, paddingRight: v }))} />
                <ScannerSlider label="Gap elementos (px)" value={config.gap} min={0} max={80} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, gap: v }))} />
                <ScannerSlider label="Content Offset Y (px)" value={config.contentOffsetY} min={-200} max={200} step={4}
                  onChange={(v: number) => setConfig(c => ({ ...c, contentOffsetY: v }))} />
              </div>

              {/* 03. Background */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">03. Background</span>
                <ScannerSlider label="BG Opacidade (%)" value={config.bgOpacity} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, bgOpacity: v }))} />
                <ScannerSlider label="Overlay Opacidade (%)" value={config.overlayOpacity} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, overlayOpacity: v }))} />
                <ScannerSlider label="BG Width (%)" value={config.bgWidth} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, bgWidth: v }))} />
                <div className="grid grid-cols-2 gap-3">
                  <ScannerSlider label="BG Top (px)" value={config.bgPaddingTop} min={0} max={400} step={4}
                    onChange={(v: number) => setConfig(c => ({ ...c, bgPaddingTop: v }))} />
                  <ScannerSlider label="BG Bottom (px)" value={config.bgPaddingBottom} min={0} max={400} step={4}
                    onChange={(v: number) => setConfig(c => ({ ...c, bgPaddingBottom: v }))} />
                  <ScannerSlider label="BG Left (px)" value={config.bgPaddingLeft} min={0} max={400} step={4}
                    onChange={(v: number) => setConfig(c => ({ ...c, bgPaddingLeft: v }))} />
                </div>
              </div>

              {/* 03b. Forma do BG */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">03b. Forma do BG</span>
                <ScannerSlider label="Width Topo (%)" value={config.widthTop} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, widthTop: v }))} />
                <ScannerSlider label="Width Base (%)" value={config.widthBottom} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, widthBottom: v }))} />
              </div>

              {/* 04. Tipografia */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">04. Tipografia</span>
                <ScannerSlider label="Título (px)" value={config.titleSize} min={24} max={120} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, titleSize: v }))} />
                <ScannerSlider label="Subtítulo (px)" value={config.subtitleSize} min={12} max={32} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, subtitleSize: v }))} />
                <ScannerSlider label="Subtítulo Opacidade (%)" value={config.subtitleOpacity} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({ ...c, subtitleOpacity: v }))} />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[8px] text-white/30 uppercase tracking-widest">Shift+W para fechar</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
