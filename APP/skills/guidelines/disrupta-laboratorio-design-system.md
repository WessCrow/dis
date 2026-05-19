# Laboratório de Ideias — guideline de UI

> Regras **locais** à feature. Tokens globais: `design-system/` e `CONTEXT.md`.

## Superfície

- Página: `public/laboratorio-ideias.html`
- Estilos: `design-system/index.css` + `public/disrupta-ui.css`
- Comportamento: `public/js/laboratorio-ideias.js`

## Layout

- **Float-dash** à direita; **drawer de contexto** à esquerda no modo resposta
- Coluna central: `#lab-center-preview` (pré-geração) → `#lab-result-dossier` (pós-geração)
- Skip links obrigatórios para `#lab-main-content` e `#float-dash`

## Copy

- Fonte editorial: `docs/copy/laboratorio-ideias-textos.md`, `docs/copy/laboratorio-dossie-copy.md`
- Tabela de fontes: `skills/guidelines/disrupta-laboratorio-resultado-tabela-fontes.md`

## SPEC da feature

`src/features/laboratorio-ideias/SPEC.md`
