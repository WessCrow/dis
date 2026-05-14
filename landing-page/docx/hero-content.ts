/**
 * ─── TEXTOS DO BANNER HERO ────────────────────────────────────────────────────
 * Fonte única de verdade para todos os microtextos do hero da landing page.
 * Edite aqui → o LP atualiza automaticamente.
 *
 * Localização no componente: src/components/sections/Hero.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Badge (tag de status acima do título) ─────────────────────────────────────
export const HERO_BADGE = "Protocolo de Inovação 2026 • Auditoria de Risco";

// ── Intervalo de rotação dos slides (em milissegundos) ────────────────────────
export const HERO_ROTATION_INTERVAL = 8000;

// ── Slides rotativos — headline + subhead sincronizados ───────────────────────
export const HERO_SLIDES = [
  {
    headline: "O achismo é o buraco negro da inovação.",
    subhead:
      "Onde a intuição orbita, o capital desaparece. Escape da incerteza com o rigor da Disrupta.",
  },
  {
    headline: "Sem auditoria, o carisma é um risco oculto.",
    subhead:
      "O mercado não é gentil com a sua intuição. Transforme “eu acho” em vereditos técnicos.",
  },
  {
    headline: "Métricas de ego são o horizonte de eventos.",
    subhead:
      "Não deixe seu investimento cruzar o ponto de não retorno. Valide a viabilidade em 5 minutos.",
  },
];

// ── Compat: arrays individuais derivados dos slides ───────────────────────────
export const HERO_HEADLINES = HERO_SLIDES.map((s) => s.headline);
export const HERO_SUBTITLE = HERO_SLIDES[0].subhead;

// ── CTA Principal ─────────────────────────────────────────────────────────────
export const HERO_CTA_PRIMARY = "Iniciar Escape Gravitacional";

// ── Status indicator ─────────────────────────────────────────────────────────
export const HERO_STATUS_LABEL = "Objetivo Disrupta";
export const HERO_STATUS_VALUE = "VALIDAÇÃO DOCUMENTAL DE MODELOS DE NEGÓCIO";
