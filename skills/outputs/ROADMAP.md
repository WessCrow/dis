# ROADMAP — STARTER

> **Status:** Documento vivo — atualizado a cada sessão  
> **Criado em:** 2026-05-10  
> **Última atualização:** 2026-05-10

---

## 📍 Status Atual

**Fase:** Fase 3 — Maturação Operacional  
**Progresso:** Arquitetura v2.2 implementada e validada  
**Última atualização:** 2026-05-10

---

## ✅ Concluído

### Fase 1 — Organização Estrutural (Abril 2026)
- [x] Reorganização da pasta `/skills` em subpastas temáticas
- [x] Criação de `governance/`, `guidelines/`, `templates/`, `local-skills/`, `linked-skills/`
- [x] `README.md`, `INDEX.md`, `STRUCTURE.md` criados
- [x] `Start.md` v1.0 como roteador básico de skills
- [x] `gitprotocol.md` para governance de releases
- [x] `guidelines/designer2627.md` como guideline de design
- [x] `local-skills/web-design-cloner.skill` como primeira skill local
- [x] 9 symlinks para linked-skills configurados

### Fase 2 — Runtime Modular (Maio 2026)
- [x] `Start.md` v2.0 → v2.2 como orchestrator completo (reduzido de 476 → 115 linhas)
- [x] `governance/project-start.md` — protocolo completo de inicialização
- [x] `governance/RULES.md` — regras invioláveis sempre-ativas (código, HTML, CSS, DS, WCAG, segurança)
- [x] `templates/context-template.md` — template do CONTEXT.md por projeto
- [x] `templates/prd-template.md` — template do PRD.md por projeto (10 seções)
- [x] `templates/briefing-template.md`, `roadmap-template.md`, `architecture-template.md`
- [x] `local-skills/project-starter.skill` — inicialização de projetos
- [x] `local-skills/ux-audit.skill` — auditoria de UX em 5 dimensões
- [x] `structure/` — camada 1 com 7 skills de arquitetura por stack:
  - [x] `react-vite-structure.skill`
  - [x] `nextjs-structure.skill`
  - [x] `frontend-structure.skill`
  - [x] `backend-structure.skill`
  - [x] `monorepo-structure.skill`
  - [x] `design-system-structure.skill`
  - [x] `clean-architecture.skill`
- [x] `outputs/` com documentação viva (PROJECT_BRIEF, ROADMAP, ARCHITECTURE)
- [x] `cache/remote-skills/` para skills remotas
- [x] `CONTEXT.md` criado na raiz do STARTER (projeto dogfooding)
- [x] `PRD.md` criado na raiz do STARTER (projeto dogfooding)
- [x] `INDEX.md` e `STRUCTURE.md` atualizados com arquitetura v2.2

---

## 🔄 Em Progresso

### Fase 3 — Maturação Operacional

| Item | Prioridade | Status |
|---|---|---|
| Testar fluxo completo de criação de projeto com project-starter.skill | Alta | Pendente |
| Validar linked-skills (verificar se symlinks apontam para alvos válidos) | Alta | Pendente |
| Testar resolução de skill remota via skills.sh | Média | Pendente |
| Documentar exemplos concretos de roteamento em Start.md | Média | Pendente |
| Criar `local-skills/discovery.skill` | Média | Pendente |
| Criar `local-skills/framing-doc.skill` | Média | Pendente |

---

## 📋 Próximos Passos

### Curto prazo (próximas sessões)
1. Iniciar um projeto real usando `project-starter.skill` e validar o fluxo completo de ponta a ponta
2. Auditar os 9 symlinks em `linked-skills/` — confirmar que todos apontam para alvos existentes
3. Testar `ux-audit.skill` em um produto real

### Médio prazo
1. Criar `local-skills/discovery.skill` para research/discovery
2. Criar `local-skills/framing-doc.skill` para documentos de direção
3. Adicionar diagrama Mermaid do fluxo de decisão em `STRUCTURE.md`

### Longo prazo / Futuro
1. Script de validação de integridade da estrutura (symlinks, arquivos obrigatórios, templates)
2. Dashboard de status de skills (disponíveis, em cache, score médio)
3. Versionamento semântico do sistema de skills

---

## 🗓️ Histórico de Atualizações

| Data | Mudança |
|---|---|
| 2026-05-10 | Fase 2 concluída — arquitetura v2.2 completa; CONTEXT.md e PRD.md do STARTER criados |
| 2026-04-23 | INDEX.md atualizado com linked-skills |
| 2026-04-11 | Fase 1 concluída — estrutura organizada |
