# Ícones e logótipos (Geist)

**Documentação oficial:** [Geist Icons](https://vercel.com/geist/icons)

## O que o site descreve

Conjunto de ícones pensado para **ferramentas de developer** (densidade, traço, estados). A galeria interactiva está no domínio Vercel.

## Opções de implementação

### 1. Projectos React / Next (recomendado pela doc Geist)

Seguir recursos listados em Geist sob **Geistcn Icons** e **Geistcn Logos** (secção Resources no site) — mantêm-se alinhados ao design system publicado.

### 2. Ícones genéricos de alta qualidade (HTML estático)

Para protótipos `.html` sem bundler, **Lucide** (MIT) é comum em ecossistema Vercel/shadcn:

- Site: https://lucide.dev/
- SVG inline ou sprite; nomear botões só-ícone com `aria-label`.

### 3. Pacote comunitário “geist-icons”

[`geist-icons`](https://www.npmjs.com/package/geist-icons) no npm — SVG animados inspirados em Geist Icons; **não** é pacote oficial Vercel; verificar licença (MIT) e adequação à marca.

## Logótipos

Ver [BRAND-ASSETS.md](./BRAND-ASSETS.md).

## Acessibilidade (guidelines Vercel)

- Ícones decorativos: `aria-hidden="true"`.
- Botões só com ícone: `aria-label` descritivo.
- Repetir significado com texto visível quando possível.
