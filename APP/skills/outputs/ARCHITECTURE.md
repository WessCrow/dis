# ARCHITECTURE — Disrupta APP

> **Última atualização:** 2026-05-17

## Visão geral

**Tipo:** protótipos web estáticos (Laboratório, Calculadora, Avaliação SIID, Storybook)  
**Padrão:** `public/` como raiz servida; documentação e governança fora do bundle

## Estrutura

```
APP/
├── CONTEXT.md
├── vercel.json              → outputDirectory: public
├── design-system/           → tokens, previews, referência visual
├── public/
│   ├── index.html           → redirect laboratorio-ideias.html
│   ├── laboratorio-ideias.html
│   ├── evaluation.html
│   ├── evaluation-result.html
│   ├── storybook.html
│   ├── disrupta-ui.css
│   ├── js/
│   ├── img/
│   └── design-system → ../design-system
├── src/features/
│   └── [feature]/SPEC.md
├── docs/
│   ├── product/   PRDs
│   ├── pdr/       PDRs / matriz de dados
│   └── copy/      textos de UI
└── skills/        → agent runtime (não deploy)
```

## Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-05-17 | `public/` única para deploy | Eliminar drift src/public |
| 2026-05-17 | `design-system/` (kebab-case) | Symlink quebrado + convenção frontend-structure |
| 2026-05-17 | SPECs em `src/features/` | Context scoping V2 (Start.md) |

## Histórico

| Data | Mudança |
|---|---|
| 2026-05-14 | Doc legado citava Next.js — não reflete este repositório |
| 2026-05-17 | Arquitetura alinhada ao HTML estático real |
