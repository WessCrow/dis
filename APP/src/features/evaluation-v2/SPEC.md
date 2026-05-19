# SPEC.md — Calculadora de Inovação v2

> **Feature:** evaluation-v2  
> **Última atualização:** 2026-05-19  
> **UI:** `public/evaluation-v2.html` · `public/js/evaluation-v2.js`

---

## 📍 Estado atual

**Fase:** protótipo estático com fluxo guiado + resultado na mesma página  
**Último trabalho:** review UI propagado a todas as telas de produto (`--text-muted` WCAG, links, redirect v1)  
**Próximo passo:** integração API / persistência server-side

---

## 📐 Decisões locais

| Decisão | Motivo |
|---|---|
| Uma pergunta por vez | Reduz carga cognitiva vs. formulário v1 |
| Resultado inline (`lab-mode-response`) | Mesmo padrão do Laboratório; sem redirect para `evaluation-result.html` |
| Top bar `lab-tokens` / `lab-notify` / `lab-profile` | Consistência visual com `laboratorio-ideias.html` |
| `scale-btn` do DS | Evita variante CSS duplicada |
| Score único no painel lateral (wizard) | Mobile usa `eval-wizard__score-mobile`; resultado usa masthead |

---

## 🧩 Componentes locais

- `eval-wizard` — fluxo SIID (intro → contexto → 8 dimensões → revisão)
- `eval-result-panel` — dossié «Avaliação de Inovação» após validar
- `eval-context-panel` — progresso lateral (outline + fase + score)

---

## ⚠️ Armadilhas

- `evaluation-result.html` permanece referência estática; fluxo v2 não redireciona mais para ela
- Recarregar com `disrupta-eval-v2-complete` restaura o relatório se respostas válidas no `sessionStorage`
- Botões do header estão `disabled` até dialogs de pricing/perfil existirem nesta página
