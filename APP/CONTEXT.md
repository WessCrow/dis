# CONTEXT.md

## 🏗️ Stack e estrutura

**Stack:** HTML estático + CSS (tokens) + JavaScript vanilla  
**Deploy:** Vercel — diretório `public/` (`vercel.json`)  
**Governança:** `skills/governance/Start.md` → `skills/governance/RULES.md`

```
APP/
├── public/              → app servido (HTML, CSS, JS, img)
├── design-system/       → tokens, preview, ui_kits
├── src/features/*/SPEC.md
├── docs/                → PRD, PDR, copy
└── skills/              → runtime de agentes
```

## 🎨 Design System

**Entrada CSS:** `design-system/index.css` → `colors_and_type.css`  
**Tokens:** `--ds-bg-*`, `--ds-c-*`, `--ds-blue`  
**App CSS:** `public/disrupta-ui.css`  
**Preview:** `design-system/preview/*.html`

**Componentes (protótipo):** float-dash, lab-brand, matrix, organisms (`public/organisms-*.html`)

**Páginas de produto:** `data-theme="dark"` · `design-system/index.css` → `disrupta-ui.css` · `body.page-laboratorio-ideias` (fundo ambiente) · estilos por feature em `disrupta-ui.css` (`page-evaluation-v2`, `page-evaluation-result`) — sem `<style>` inline  
**Calculadora canónica:** `public/evaluation-v2.html` (wizard SIID + relatório inline)

## 📍 Estado atual

**Fase:** protótipos HTML + reorganização de repositório  
**Último trabalho:** padrão UI propagado (WCAG, top bar, links v2) em Laboratório, Calculadora v2, resultado e redirect v1  
**Próximo passo:** Git remoto + API do Laboratório

## 🛠️ Decisões

- **Cantos:** `border-radius` 5px (`--ds-radius-sm`) em superfícies do produto  
- **Context V2:** SPEC por feature em `src/features/` — sem duplicar tokens no SPEC  
- **Imagens:** paths relativos `img/` a partir de `public/`

## ⚠️ Atenção

- Não manter cópia paralela de HTML em `src/` — só `src/features/`  
- `href="#"` em evaluation: corrigir antes de produção
