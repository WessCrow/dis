// ─── Footer Section Controller ────────────────────────────────────────────────
// Todos os parâmetros visuais e de conteúdo do footer em um único lugar.
// Valores numéricos são em px — controlados por sliders no console (Shift+F).

export type FooterConfig = {
  background: string;
  paddingTop: number;        // px
  content: {
    maxWidth: string;
    paddingX: number;        // px
  };
  logo: {
    src: string;
    alt: string;
    height: number;          // px
    marginBottom: number;    // px
  };
  description: {
    text: string;
    maxWidth: string;
    marginBottom: number;    // px
    colorOpacity: string;
  };
  divider: {
    show: boolean;
    colorOpacity: string;
    marginBottom: number;    // px
  };
  meta: {
    copyright: string;
    tagline: string;
    marginBottom: number;    // px
    colorOpacity: string;
  };
  marquee: {
    enabled: boolean;
    itemCount: number;
    duration: number;
    opacityClass: string;
    separator: string;
    logoSrc: string;
    logoHeight: string;
    logoMaxHeight: string;
    logoPaddingX: string;
    translateY: string;
  };
  glassMask: {
    enabled: boolean;
    height: number;          // % da altura do footer
    blurPx: number;          // px de backdrop-blur
    bgOpacity: number;       // 0–100 (opacidade do fundo preto)
    gradientStart: number;   // % onde começa (transparente)
    gradientEnd: number;     // % onde termina (opaco)
  };
};

export const footerConfig: FooterConfig = {
  // ── Container ──────────────────────────────────────────────────────────────
  background: "bg-black",
  paddingTop: 64,

  content: {
    maxWidth: "max-w-7xl",
    paddingX: 24,
  },

  // ── Logo principal ─────────────────────────────────────────────────────────
  logo: {
    src: "/img/Dis-branco-vert-txt.svg",
    alt: "Disrupta",
    height: 24,
    marginBottom: 24,
  },

  // ── Descrição ──────────────────────────────────────────────────────────────
  description: {
    text: "Diagnóstico técnico de inovação baseado na metodologia e framework Disrupta.",
    maxWidth: "max-w-md",
    marginBottom: 24,
    colorOpacity: "text-white/70",
  },

  // ── Divisória horizontal ───────────────────────────────────────────────────
  divider: {
    show: true,
    colorOpacity: "bg-white/10",
    marginBottom: 24,
  },

  // ── Linha de meta (copyright + tagline) ───────────────────────────────────
  meta: {
    copyright: "© 2026 Disrupta Lab. Todos os direitos reservados.",
    tagline: "Framework Disrupta • Powered by AI",
    marginBottom: 472,
    colorOpacity: "text-white/50",
  },

  // ── Marquee de fundo ───────────────────────────────────────────────────────
  marquee: {
    enabled: true,
    itemCount: 2,
    duration: 120,
    opacityClass: "opacity-100",
    separator: "\\\\",
    logoSrc: "/img/txt-disrupta.svg",
    logoHeight: "h-[39vw] md:h-[29.3vw]",
    logoMaxHeight: "max-h-[878px]",
    logoPaddingX: "px-8 md:px-16",
    translateY: "translate-y-[15%] md:translate-y-[10%]",
  },

  // ── Glass mask (camada de desfoque sobre o marquee) ────────────────────────
  glassMask: {
    enabled: true,
    height: 40,
    blurPx: 10,
    bgOpacity: 90,
    gradientStart: 5,
    gradientEnd: 50,
  },
};
