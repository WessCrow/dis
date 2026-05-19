# Disrupta — Design System

## Company Overview

**Disrupta** (disrupta.app) is *Innovation Audit* — a Brazilian platform that validates whether an idea will survive market reality before founders burn capital on it. The pitch is brutal and technical:

> "Valide a sobrevivência da sua ideia com o rigor técnico do Método SIID."

The product is positioned as **anti-vanity, anti-hype, anti-self-deception**. It treats founder enthusiasm with the same skepticism a black hole treats light: nothing gets out without passing a horizon of evidence. The metaphor "Black Hole Engine", "Lente Gravitacional", "horizonte de eventos" runs throughout the product copy. The interface is referred to internally as **Stark Mode**.

The core methodology is **SIID** — an 8-dimension audit run on every idea:
1. Intensidade da Dor
2. Frequência de Uso
3. Tamanho do Mercado
4. Soluções Atuais
5. Barreira de Troca
6. Capacidade de Execução
7. Modelo de Monetização
8. Custo de Aquisição

---

## Sources

Imported from `github.com/WessCrow/dis` (branch `main`):

- `design-system/fontfaces.css` — TTArtnikDemo @font-face declarations (8 weights)
- `design-system/fonts/` — 8 TTF files (Thin → ExtraBold)
- `design-system/vercel-geist/tokens/geist-semantic.css` — color tokens (light + dark)
- `design-system/vercel-geist/tokens/typography-utilities.css` — type scale classes
- `design-system/vercel-geist/WEB-INTERFACE-GUIDELINES.md` — Vercel interaction guidelines (mirrored for offline)
- `design-system/vercel-geist/GEIST-FOUNDATIONS.md` — color roles + typography hierarchy
- `design-system/DESIGN-bugatti.md` — aesthetic reference (monochrome austerity, full-bleed cinema)
- `assets/brand/Dis-branco-vert-icon.svg`, `Dis-branco-vert-txt.svg`, `Dis-preto-vert.svg` — logos
- `CONTEXT.md` — latest design decisions (Brutalist refactor, zero radius)
- `landing-page/src/app/globals.css` — production `btn-primary` / `btn-ghost` / `siid-molding` styles
- `landing-page/src/components/sections/{Hero,AuditGrid}.tsx` — section patterns
- `landing-page/src/components/layout/Navbar.tsx` — header pattern

This design system is a **faithful reproduction** of the canonical tokens — not a reinterpretation.

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Brazilian Portuguese (PT-BR)**, technical-incisive register.
- **Brutalist copy**: short, declarative, no softeners. The brand assumes the reader is a professional founder, not a beginner.
- **Sci-fi / aerospace lexicon**: "Comando de Missão", "Protocolo de Validação", "Auditoria Técnica", "Stark Mode", "Lente Gravitacional", "Horizonte de Eventos", "Black Hole Engine".
- **Anti-hype framing**: "Unicórnio ou rastro de poeira?", "Sem ruído. Sem achismo.", "O horizonte de eventos não aceita desculpas."
- **Capitalization**: Sentence case for body; **TÍTULO EM CAPS + tracking 0.1em–0.5em** for technical labels (`DIM_01`, `COMANDO DE MISSÃO`, `INTERFACE STARK MODE`).
- **Numbering**: Always two-digit padded (`DIM_01`, `01.`, `02.`).
- **Emoji**: Never.

### Example Copy Patterns
- CTA primary: *"Executar Protocolo Disrupta"*, *"Iniciar Validação Técnica"*, *"Solicitar Acesso"*
- Eyebrow labels: *"COMANDO DE MISSÃO"*, *"LENTE GRAVITACIONAL"*, *"08 CRITÉRIOS DE AUDITORIA"*
- Helper line under CTA: *"Interface Stark Mode. Auditoria técnica em tempo real. Sem ruído. Sem achismo."*

---

## VISUAL FOUNDATIONS

### Theme
- **Dark by default — "Stark Mode"**. The site ships with `<html class="dark">` and almost never renders the light variant in product surfaces. Light tokens exist for documents and exports.
- **Dot-grid page background**: `radial-gradient(circle at center, rgba(255,255,255,0.08) 0.95px, transparent 1px); background-size: 20px 20px; background-attachment: fixed;`

### Color Tokens (Geist semantic)
Each token has a light value and a dark value. **Always use the semantic name**, not the hex.

| Token | Role | Light | Dark (Stark Mode) |
|---|---|---|---|
| `--ds-bg-1` | Primary background | `#ffffff` | `#000000` |
| `--ds-bg-2` | Secondary background | `#fafafa` | `#0a0a0a` |
| `--ds-c-1` | Component fill — default | `#ffffff` | `#111111` |
| `--ds-c-2` | Component fill — hover | `#f4f4f5` | `#1a1a1a` |
| `--ds-c-3` | Component fill — active | `#e4e4e7` | `#262626` |
| `--ds-c-4` | Border — default | `#e4e4e7` | `rgba(255,255,255,0.12)` |
| `--ds-c-5` | Border — hover | `#d4d4d8` | `rgba(255,255,255,0.18)` |
| `--ds-c-6` | Border — active | `#a1a1aa` | `rgba(255,255,255,0.28)` |
| `--ds-c-7` | High-contrast bg | `#18181b` | `#ededed` |
| `--ds-c-8` | High-contrast bg hover | `#27272a` | `#ffffff` |
| `--ds-c-9` | Secondary text | `#71717a` | `#a1a1aa` |
| `--ds-c-10` | Primary text | `#09090b` | `#fafafa` |
| `--ds-blue` | Accent / link | `#0070f3` | `#3291ff` |
| `--ds-red` | Error / destructive | `#e00000` | `#ff3333` |
| `--ds-green` | Success | `#007a41` | `#45dec4` |
| `--ds-amber` | Warning | `#f5a623` | `#f7b955` |

### Typography — TTArtnikDemo + Geist Mono
- **`--font-display` / `--font-sans` → TTArtnikDemo** — proprietary geometric sans, 8 weights (100–800). Used everywhere except code/metrics. Body sets `font-weight: 400`, display titles use `600/700`.
- **`--font-mono` → Geist Mono** — for technical labels, metrics, code, eyebrows (`DIM_01`, `COMANDO DE MISSÃO`).
- **Geist scale** is the entire type system. Use the utility classes:
  - Headings: `.text-heading-72` … `.text-heading-14`
  - Buttons: `.text-button-16/14/12`
  - Labels: `.text-label-20/18/16/14/13/12` + `-mono` variants
  - Copy: `.text-copy-24/20/18/16/14/13` + `-13-mono`
- **No bold for hierarchy.** Scale, not weight, drives hierarchy. Headings cap at `font-weight: 600`.
- **`.tabular-nums`** for any numeric comparison or table.

### Brutalist Rules (per `CONTEXT.md`)
- **`border-radius: 0` on EVERY surface, EVERY button, EVERY card, EVERY input.** This is a hard rule from the latest brand refactor — no rounded corners exist in the Disrupta product. The `--ds-radius-*` tokens are kept for legacy compatibility but resolve to `0`.
- **Sharp 1px borders** (`var(--ds-c-4)`) define every separation. No drop shadows for separation.
- **The `siid-molding` pattern** — `1px solid var(--ds-c-4)` outer border + `2px solid var(--ds-c-10)` left accent rail — is the canonical card shape.

### Motion
- **Easing**: `--ease-bugatti: cubic-bezier(0.16, 1, 0.3, 1)` — used everywhere. Quick decel, no overshoot, no bounce.
- **Default duration**: `300ms`. Buttons may use `250ms`. Never above `500ms` on interactive feedback (avoids fake-lag per `CONTEXT.md`).
- **No bouncy easings, no spring physics on chrome.** Motion is restrained and technical.

### Cards & Surfaces
- **No floating elevation.** Surfaces sit flat on `--ds-bg-1` and rely on a 1px border to separate.
- **The accent-rail card** (`.siid-molding`) — sharp rectangle, `1px solid var(--ds-c-4)`, `2px solid var(--ds-c-10)` on the left edge — is the brand's signature container.

### Iconography
- **Lucide Icons** for UI (per `ICONS-AND-LOGOS.md`). Stroke width 1.5–2px. Apply `aria-hidden="true"` on decorative usage and `aria-label` on icon-only buttons.
- **Custom SIID icons** exist as a 1-of-8 set in `diagnostic-icons.tsx`; treat them as proprietary illustrations, not reusable UI icons.
- **Symbol mark** `▲` from Geist (U+25B2) can substitute the Vercel mark; the Disrupta mark is the geometric "D" aperture from the logo files.
- **No emoji.**

### Layout — Floating Dash Pattern
The app interior (Laboratório de Ideias, Workspace) uses a **floating right-side rail** + full-bleed top bar pattern. Top bar height is fixed (`--lab-top-bar-height`), separator underline extends to viewport edges (including under the left context panel). Left context panel is fixed `top: --lab-top-bar-height` to bottom of viewport, never overlaps the top bar.

---

## ICONOGRAPHY

| Source | Where | License |
|---|---|---|
| **Lucide** (https://lucide.dev/) | All generic UI icons | MIT |
| **Geist Icons** | Vercel/shadcn ecosystem icons; use the `geistcn` resources | Vercel guidelines |
| **Custom SIID icons** | Only the 8 dimensions of the audit | Proprietary — `landing-page/src/components/ui/diagnostic-icons.tsx` |
| **Brand symbol** ▲ | Optional text fallback for the Vercel mark | Unicode U+25B2 |
| **Emoji** | ❌ Never | — |

A11y rules from Vercel Web Interface Guidelines: decorative icons get `aria-hidden="true"`, icon-only buttons get a descriptive `aria-label`, and meaning is repeated in visible text whenever possible.

---

## FILE INDEX

```
README.md                           ← You are here
SKILL.md                            ← Agent skill definition
colors_and_type.css                 ← Tokens + @font-face + utilities (single file)
assets/
  logo-white.svg                    ← Full vertical logo, white on dark
  logo-black.svg                    ← Full vertical logo, black on light
  logo-icon-white.svg               ← Icon-only (the "D" aperture)
  logo-txt-white.svg                ← Wordmark only "disrupta"
  fonts/TTArtnikDemo-*.ttf          ← 8 weights
preview/
  colors-stark.html                 ← Dark/Stark Mode palette
  colors-light.html                 ← Light palette
  colors-semantic.html              ← Semantic role tokens
  type-scale.html                   ← Heading + body scale
  type-specimens.html               ← Weight + mono specimens
  spacing-tokens.html               ← Spacing + radius (always 0)
  shadows.html                      ← Shadow tokens
  logo-usage.html                   ← Logo lockups
  buttons.html                      ← btn-primary + btn-ghost
  inputs.html                       ← Form controls (Stark Mode)
  cards.html                        ← siid-molding pattern + variants
  badges.html                       ← Status, mono labels, DIM tags
ui_kits/
  website/
    README.md                       ← Landing-page UI kit notes
    index.html                      ← Landing-page prototype (Hero → Audit → CTA)
    Hero.jsx                        ← Hero section
    Nav.jsx                         ← Top navigation
    AuditGrid.jsx                   ← 8-dimension SIID timeline
    FinalCTA.jsx                    ← Bottom Mission Command CTA
```
