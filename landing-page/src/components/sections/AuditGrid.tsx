"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SIID_ICONS } from "@/components/ui/diagnostic-icons";

const dimensions = [
  { id: 1, title: "Intensidade da Dor",       desc: "Mapeamento da urgência real do problema no cotidiano do usuário." },
  { id: 2, title: "Frequência de Uso",         desc: "Análise da recorrência da dor e a janela de oportunidade de solução." },
  { id: 3, title: "Tamanho do Mercado",        desc: "Auditoria quantitativa de potenciais adotantes e expansão vertical." },
  { id: 4, title: "Soluções Atuais",           desc: "Estudo do status quo e das alternativas precárias utilizadas hoje." },
  { id: 5, title: "Barreira de Troca",         desc: "Cálculo do esforço cognitivo e financeiro para migração do usuário." },
  { id: 6, title: "Capacidade de Execução",    desc: "Validação da viabilidade técnica e operacional para entrega do valor." },
  { id: 7, title: "Modelo de Monetização",     desc: "Teste de estresse sobre a disposição a pagar e geração de caixa." },
  { id: 8, title: "Custo de Aquisição",        desc: "Projeção de eficiência de canais e sustentabilidade de marketing." },
];

// DIM_01 = 96px (planeta próximo), DIM_08 = 288px (3× — câmera recuando)
const ICON_BASE = 96;
const ICON_MAX  = 288;
const N = dimensions.length - 1;
const iconSize = (i: number) => Math.round(ICON_BASE + (i / N) * (ICON_MAX - ICON_BASE));

// ── Linha orbital SVG — arco perspectivo conectando os centros dos planetas ────
// Cada item tem altura ≈ 88px (py-10 = 40px × 2 + conteúdo). O arco cobre toda a lista.
const ITEM_H   = 88;
const totalH   = ITEM_H * dimensions.length;

// Centro X de cada ícone: o ícone está left-aligned → cx = size/2
// Arco cúbico de bezier: começa estreito no topo (planeta próximo), abre no fundo (câmera recuando)
const orbitPath = (() => {
  const y0 = ITEM_H * 0.5;                       // centro da primeira row
  const y1 = ITEM_H * N + ITEM_H * 0.5;          // centro da última row
  const x0 = iconSize(0) / 2;                    // cx do primeiro ícone
  const x1 = iconSize(N) / 2;                    // cx do último ícone
  // Bezier curva para a direita e volta — sugere órbita elíptica em perspectiva
  return `M ${x0} ${y0} C 180 ${y0 + totalH * 0.28}, -40 ${y0 + totalH * 0.62}, ${x1} ${y1}`;
})();

// ── Per-item ──────────────────────────────────────────────────────────────────

interface ItemProps {
  dim: typeof dimensions[0];
  i: number;
}

const TimelineItem = ({ dim, i }: ItemProps) => {
  const ref  = useRef<HTMLDivElement>(null);
  const Icon = SIID_ICONS[dim.id];
  const size = iconSize(i);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 8%"] });

  const scale    = useTransform(scrollYProgress, [0, 0.18, 0.44, 0.72, 1],       [0.58, 0.84, 1, 0.86, 0.62]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.68, 0.88, 1], [0, 0.45, 1, 1, 0.38, 0]);
  const y        = useTransform(scrollYProgress, [0, 0.28, 0.62, 1],              [60, 10, -6, -32]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.28, 0.5, 0.72, 1],         [9, 2, 0, -2, -7]);
  const iconGlow = useTransform(scrollYProgress, [0.28, 0.46, 0.64], [0, 1, 0]);
  const iconScl  = useTransform(scrollYProgress, [0.28, 0.46, 0.64], [0.92, 1.06, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, rotateX, transformPerspective: 900 }}
      className="relative flex items-center gap-10 py-10 md:py-12"
    >
      {/* Ícone — âncora esquerda, escala progressiva */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <motion.div
          style={{ opacity: iconGlow }}
          className="absolute inset-0 rounded-full bg-[#3291ff]/15 blur-2xl pointer-events-none"
        />
        {Icon && (
          <motion.div style={{ scale: iconScl }} className="w-full h-full">
            <Icon />
          </motion.div>
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.45em] uppercase mb-3 block">
          DIM_0{dim.id}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-3">
          {dim.title}
        </h3>
        <p className="text-sm text-white/52 leading-relaxed max-w-md">
          {dim.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

export const AuditGrid = () => {
  return (
    <section id="method" className="py-32 px-6 bg-transparent relative">
      <div className="max-w-[860px] mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-40 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-c-9 mb-6 block"
            >
              Lente Gravitacional
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
              Enxergue além da{" "}
              <span className="text-white/70 font-sans font-normal italic">poeira estelar.</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
              A Metodologia SIID funciona como uma lente de alta precisão, revelando a mecânica real
              do seu mercado antes que você cruze o ponto de não retorno.
            </p>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-10 h-20 flex-shrink-0">
            <div className="text-4xl font-bold tracking-tighter">08</div>
            <div className="text-[10px] font-mono leading-tight tracking-widest text-white/70 uppercase">
              Critérios de <br /> Auditoria
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Linha orbital — arco perspectivo em SVG conectando os centros dos planetas */}
          <svg
            aria-hidden="true"
            className="absolute left-0 top-0 pointer-events-none"
            width="300"
            height={totalH}
            style={{ zIndex: 0 }}
            fill="none"
          >
            {/* Arco principal — trajetória orbital em perspectiva */}
            <path
              d={orbitPath}
              stroke="rgba(50,145,255,0.18)"
              strokeWidth="0.75"
              strokeDasharray="6 18"
            />
            {/* Eco do arco — halo de profundidade */}
            <path
              d={orbitPath}
              stroke="rgba(50,145,255,0.06)"
              strokeWidth="3"
            />
          </svg>

          {dimensions.map((dim, i) => (
            <TimelineItem key={dim.id} dim={dim} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
};
