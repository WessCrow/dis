# SPEC.md — Laboratório de Ideias

> **Feature:** laboratorio-ideias  
> **Última atualização:** 2026-05-17  
> **UI:** `public/laboratorio-ideias.html` · **JS:** `public/js/laboratorio-ideias.js`

---

## 📍 Estado atual

**Fase:** protótipo HTML estático (Stark Mode)  
**Último trabalho:** fundo ambiente do Laboratório — gradiente radial descentralizado (luz sup.-esq.) + grão fino (`--lab-ambient-*` em `disrupta-ui.css`); canvas de sparkles transparente  
**Próximo passo:** integrar geração real de dossié (API) e remover mocks da tabela de fontes

---

## 🔄 Fluxos principais

| Fluxo | Descrição |
|---|---|
| Happy | Usuário preenche contexto → Gera ideia → visualiza dossié `#lab-result-dossier` |
| Alternative | Modo hero (`lab-mode-hero`) vs modo resposta (drawer de contexto recolhido) |
| Exception | Validação de campos obrigatórios antes de simular geração |

---

## 🧩 Componentes locais

- `#float-dash` — navegação flutuante entre apps  
- `#lab-center-preview` / `#lab-result-dossier` — estados da coluna central  
- Organismos em `public/organisms-*.html` (referência isolada)

---

## 📐 Decisões locais

| Decisão | Motivo |
|---|---|
| Copy e tabelas em `docs/copy/` | Separar conteúdo editorial da marcação HTML |
| Guideline de UI em `skills/guidelines/disrupta-laboratorio-design-system.md` | Regras só desta superfície |

---

## ⚠️ Armadilhas

- Não duplicar tokens de cor/fonte aqui — usar `CONTEXT.md` e `design-system/`  
- Links entre apps: `evaluation-v2.html` (calculadora), `evaluation-result.html` (referência)
