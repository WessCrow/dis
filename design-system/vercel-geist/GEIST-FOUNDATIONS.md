# Geist — fundações (resumo)

**Fonte canónica:** [Geist Design System](https://vercel.com/geist/introduction)

## Cores

O sistema público descreve **10 escalas** (Gray, Gray alpha, Blue, Red, Amber, Green, Teal, Purple, Pink) com suporte a **P3** quando o browser e o ecrã permitem.

### Papéis semânticos (nomenclatura oficial)

| Papel | Uso |
|-------|-----|
| **Background 1** | Fundo principal de página e UI (predefinição). |
| **Background 2** | Fundo secundário, diferenciação subtil. |
| **Color 1–3** | Fundos de componente (default, hover, active). |
| **Color 4–6** | Contornos (default, hover, active). |
| **Color 7–8** | Fundos de alto contraste (+ hover). |
| **Color 9–10** | Texto e ícones (secundário, primário). |

Valores hex exactos mudam com o tema; no DIS usamos `tokens/geist-semantic.css` como **aproximação** para protótipos. Para valores de produção, inspeccionar [Geist Colors](https://vercel.com/geist/colors) ou o teu stack (Tailwind preset oficial, se existir no projecto).

## Tipografia

Família: **Geist Sans** (UI e marketing), **Geist Mono** (código, métricas, tabular). Ver [Geist Font](https://vercel.com/font).

### Classes (Tailwind / sistema Geist)

Documentação oficial lista combinações de `font-size`, `line-height`, `letter-spacing` e `font-weight`. Modificadores **Subtle** e **Strong**: usar `<strong>` dentro do bloco com a classe de tipografia.

**Headings:** `text-heading-72` … `text-heading-14` (heróis de marketing a cabeçalhos pequenos).

**Botões:** `text-button-16`, `text-button-14`, `text-button-12`.

**Label:** `text-label-20` … `text-label-12`, variantes `*-mono`, caps onde indicado.

**Copy:** `text-copy-24` … `text-copy-13`, incluindo `text-copy-13-mono` para código inline.

Implementação local das mesmas **nomes de classe** em: `tokens/typography-utilities.css`.

## Grid

[Geist Grid](https://vercel.com/geist/grid) — parte central da estética Vercel (documentação no site).

## Materiais

[Geist Materials](https://vercel.com/geist/materials) — superfícies, elevação, materiais de UI.

## Recursos npm (oficiais)

| Pacote | Conteúdo |
|--------|-----------|
| [`geist`](https://www.npmjs.com/package/geist) | Geist Sans, Mono, Pixel + integração Next.js (`geist/font/sans`, `geist/font/mono`, etc.). |

## Licença de tipos

Geist está sob [SIL OFL](https://github.com/vercel/geist-font/blob/main/LICENSE.txt); uso em sites e projectos é permitido segundo a licença.
