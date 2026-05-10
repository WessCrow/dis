# Web Interface Guidelines

**Fonte:** [https://vercel.com/design/guidelines](https://vercel.com/design/guidelines)  
**Repositório upstream:** [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)  
**Nota:** Espelho de conteúdo público para trabalho offline no DIS; o documento oficial pode mudar.

Interfaces succeed because of hundreds of choices. This is a living, non-exhaustive list of those decisions. Most guidelines are framework-agnostic, some specific to React/Next.js.

## Interactions

- Keyboard works everywhere. All flows are keyboard-operable and follow the [WAI-ARIA Authoring Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/).
- Clear focus. Every focusable element shows a visible focus ring. Prefer `:focus-visible` over `:focus` to avoid distracting pointer users. Set `:focus-within` for grouped controls.
- Manage focus. Use focus traps, move and return focus according to the WAI-ARIA Patterns.
- Match visual and hit targets. Exception: if the visual target is under 24px wide, expand its hit target to at least 24px. On mobile, the minimum size is 44px.
- Mobile input size. Root font size is ≥ 16px on mobile to prevent iOS Safari auto-zoom on focus (or equivalent strategy).
- Respect zoom. Never disable browser zoom.
- Hydration-safe inputs. Inputs must not lose focus or value after hydration.
- Do not block paste. Never disable paste in password or text fields.
- Loading buttons. Show a loading indicator and keep the original label.
- Minimum loading-state duration. If you show a spinner/skeleton, add a short show-delay (~150–300 ms) and a minimum visible time (~300–500 ms) to avoid flicker on fast responses.
- URL as state. Persist state in the URL so share, refresh, Back/Forward navigation work (e.g. [nuqs](https://nuqs.dev/)).
- Optimistic updates. Update the UI immediately when success is likely; reconcile on server response. On failure, show an error and roll back or provide Undo.
- Ellipsis for further input and loading states. Menu options that open a follow-up (e.g. “Rename…”) and loading/processing states (“Loading…”, “Saving…”, “Generating…”) end with an ellipsis.
- Confirm destructive actions. Require confirmation or provide Undo with a safe window.
- Prevent double-tap zoom on controls. Set `touch-action: manipulation`.
- Tap highlight follows design. Set `-webkit-tap-highlight-color`.
- Design forgiving interactions. Generous hit targets, clear affordances, predictable interactions.
- Tooltip timing. Delay the first tooltip in a group; subsequent peers can have no delay.
- Overscroll behavior. Set `overscroll-behavior: contain` intentionally (e.g. in modals/drawers).
- Scroll positions persist. Back/Forward restores prior scroll.
- Autofocus for speed. On desktop with a single primary input, autofocus. Rarely autofocus on mobile because the keyboard can cause layout shift.
- No dead zones. If part of a control looks interactive, it should be interactive.
- Deep-link everything. Filters, tabs, pagination, expanded panels, anytime `useState` is used.
- Clean drag interactions. Disable text selection and apply `inert` while dragging.
- Links are links. Use `<a href>` or framework `Link` for navigation so Cmd/Ctrl+click, middle-click, and context menu work. Do not substitute with `<button>` or `<div role="button">` for navigational links.
- Announce async updates. Use polite `aria-live` for toasts and inline validation.
- Locale-aware keyboard shortcuts. Internationalize shortcuts for non-QWERTY layouts. Show platform-specific symbols.

## Animations

- Prefer CSS over main-thread JS-driven animations when possible.
- Preference: CSS first, then Web Animations API, then JavaScript libraries (e.g. [motion](https://www.npmjs.com/package/motion)).

## Layout

**Espelho Vercel (acima):** decisões gerais. **Extensão DIS:** layout do MVP (*Laboratório de Ideias* + *Resultado do Laboratório*) segue [`/skills/guidelines/disrupta-laboratorio-design-system.md`](../../skills/guidelines/disrupta-laboratorio-design-system.md) e tokens Bugatti em [`/design system/DESIGN-bugatti.md`](../DESIGN-bugatti.md); tipografia e leitura em [`/skills/guidelines/accessibility-typography-wcag.md`](../../skills/guidelines/accessibility-typography-wcag.md).

- Cross-browser SVG transforms. Apply CSS transforms/animations to `<g>` wrappers; set `transform-box: fill-box; transform-origin: center;`.
- Optical alignment. Adjust ±1px when perception beats geometry.
- Deliberate alignment. Every element aligns with something intentionally.
- Balance contrast in lockups. When text and icons sit side by side, adjust weight, size, spacing, or color so they do not clash.
- Responsive coverage. Verify on mobile, laptop, and ultra-wide.
- Respect safe areas. Use `env(safe-area-inset-*)`.
- No excessive scrollbars. Fix overflow issues; test with “Show scroll bars: Always” on macOS.
- Let the browser size things. Prefer flex/grid/intrinsic layout over measuring in JS.

### DIS — MVP (protótipo `prototype/`)

- **Padrão `float-dash`:** menu flutuante à **direita** (itens: Dashboard, Avaliação de Inovação, Laboratório de Ideias, Workspace, Billing & Invoices, Experimentos); no Laboratório de Ideias o rail **não expande** — tooltips `data-float-tip` ao hover/foco; rail **centrado na vertical** da viewport; header com logo à **extrema esquerda** e utilitários à **extrema direita** (`disrupta-ui.css`).
- **Barra superior:** altura `--lab-top-bar-height`; `z-index` acima do painel flutuante; traço inferior em `::after` em **toda a largura da viewport**, inclusive sob o painel de contexto à esquerda.
- **Coluna central:** hero e ações como *Ver Histórico* (*Laboratório de Ideias*); conteúdo principal não deve depender de medidas em JS quando flex/grid cobrem o caso.
- **Painel de contexto (esquerda):** fixo de `top: var(--lab-top-bar-height)` até o fundo da viewport, **sem** cobrir o header; largura `--lab-context-panel-width`; `lab-body` com **`padding-left`** coerente com o painel.
- **Menu expandido:** aplicar **`padding-right` extra só em `.lab-main`** — o header **`.lab-top-bar`** **não** recebe esse recuo (evita desalinhamento da marca com o traço full-bleed).
- **Interior do painel:** margens e ritmo com `--lab-panel-inset-y`, gaps `--lab-panel-gap-sm` / `--lab-panel-gap-md` / `--lab-panel-gap-lg` (múltiplos de `0.25rem`), e **1.25rem** horizontal fixo no CSS onde aplicável; hierarquia tipográfica do skill (título display → corpo Inter ~1rem / line-height ~1.6 → métricas mono caps → CTA → hint).
- ***Resultado do Laboratório* (hierarquia de página):** barra de marca → header de página (breadcrumb, H1, meta) → relatório em cards → superfície de moldagem → barra de CTA fixa — ver secção “Hierarquia de componentes” no skill.
- **Tema e fontes do MVP:** escuro fixo (tokens Bugatti); famílias acordadas no skill (**Big Shoulders Display**, **Inter**, **JetBrains Mono**); profundidade visual do MVP sem sombras pesadas (alinhado a DESIGN-bugatti).

## Content

- Inline help first. Prefer inline explanations; tooltips as last resort.
- Stable skeletons. Skeletons mirror final content to avoid layout shift.
- Accurate page titles. `<title>` reflects the current context.
- No dead ends. Every screen offers a next step or recovery path.
- All states designed. Empty, sparse, dense, and error states.
- Typographic quotes. Prefer curly quotes (“ ”) over straight quotes.
- Avoid widows/orphans. Tidy rag and line breaks.
- Tabular numbers for comparisons. `font-variant-numeric: tabular-nums` or [Geist Mono](https://vercel.com/font).
- Redundant status cues. Do not rely on color alone; include text labels.
- Icons have labels. Convey the same meaning with text for non-sighted users.
- Use the ellipsis character `…` over three periods.
- Anchored headings. Set `scroll-margin-top` for headers when linking to sections.
- Resilient to user-generated content. Layouts handle short, average, and very long content.
- Locale-aware formats. Format dates, times, numbers, delimiters, and currencies for the user’s locale.
- Prefer language settings over location. Use `Accept-Language` and `navigator.languages`; do not rely on IP/GPS for language.
- Shield verbatim content from translation. Use `translate="no"` for brand names, code tokens, and technical identifiers.
- Accessible content. Accurate names (`aria-label`), hide decoration (`aria-hidden`), verify in the accessibility tree.
- Icon-only buttons are named. Provide a descriptive `aria-label`.
- Semantics before ARIA. Prefer native elements (`button`, `a`, `label`, `table`) before `aria-*`.
- Headings and skip link. Hierarchical headings and a “Skip to content” link.
- Non-breaking spaces for glued terms. Use `&nbsp;` or narrow no-break space for units and shortcuts.

## Forms

- Enter submits when a single text input is focused and it is the only control; with many controls, apply to the last control.
- In `<textarea>`, ⌘/⌃+Enter submits; Enter inserts a new line.
- Labels everywhere. Every control has a `<label>` or equivalent association.
- Submission rule. Keep submit enabled until submission starts; then disable during the request, show a spinner, include an idempotency key when relevant.
- Do not block typing. Show validation feedback instead of blocking keystrokes.
- Do not pre-disable submit. Allow submitting incomplete forms to surface validation.
- No dead zones on checkboxes/radios; label and control share a generous hit target.
- Error placement. Show errors next to fields; on submit, focus the first error.
- Autocomplete and names. Meaningful `autocomplete` and `name` for autofill.
- Spellcheck selectively. Disable for emails, codes, usernames, etc.
- Correct types and input modes. Use appropriate `type` and `inputmode`.
- Placeholders signal emptiness. End with an ellipsis character where appropriate.
- Unsaved changes. Warn before navigation when data could be lost.
- Password managers and 2FA. Ensure compatibility; allow pasting OTPs.
- Windows `<select>` background. Set explicit `background-color` and `color` on native `<select>` for dark mode contrast.

## Performance

- Device/browser matrix. Test iOS Low Power Mode and macOS Safari.
- Measure reliably. Disable extensions that skew profiling.
- Track re-renders. Minimize and make re-renders fast (React DevTools, React Scan).
- Throttle when profiling. CPU and network throttling.
- Minimize layout work. Batch reads/writes.
- Network latency budgets. `POST` / `PATCH` / `DELETE` complete in under 500 ms when feasible.
- Keystroke cost. Prefer uncontrolled inputs or cheap controlled loops.
- Large lists. Virtualize or use `content-visibility: auto`.
- Preload wisely. Preload only above-the-fold images; lazy-load the rest.
- No image-caused CLS. Set explicit dimensions and reserve space.
- Preconnect to origins. `<link rel="preconnect">` for asset/CDN domains.
- Preload fonts for critical text.
- Subset fonts. Unicode-range and limit variable axes as needed.
- Do not use the main thread for expensive work. Prefer [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) for long tasks.

## Design

- Layered shadows. Mimic ambient + direct light with at least two layers.
- Crisp borders. Combine borders and shadows; semi-transparent borders improve edge clarity.
- Nested radii. Child radius ≤ parent radius and concentric curves.
- Hue consistency. On non-neutral backgrounds, tint borders/shadows/text toward the same hue.
- Accessible charts. Color-blind-friendly palettes.
- Minimum contrast. Prefer [APCA](https://apcacontrast.com/) for perceptual contrast where appropriate.
- Interactions increase contrast. `:hover`, `:active`, `:focus` have more contrast than rest state.
- Browser UI matches your background. Set `<meta name="theme-color">` to align browser chrome.
- Set the appropriate `color-scheme` on `<html>` in dark themes.
- Text anti-aliasing and transforms. Prefer animating a wrapper instead of the text node.
- Avoid gradient banding when fading to dark colors (masks vs background images).

## Vercel-specific (copywriting)

- Active voice, action-oriented language.
- Consistent placeholders: strings `YOUR_API_TOKEN_HERE`, numbers `0123456789`.
- Use numerals for counts (“8 deployments”).
- Separate numbers and units with a space; use non-breaking space where needed (`10&nbsp;MB`).
- Default to positive language; error messages guide the exit with a clear action.
- Avoid ambiguity in button labels (“Save API Key” instead of “Continue”).

## Integrate with agents

Install the upstream review helper (optional):

```bash
curl -fsSL https://vercel.com/design/guidelines/install | bash
```

- [command.md (raw)](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)  
- [AGENTS.md](https://agents.md/)
