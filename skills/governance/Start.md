# Start.md — Orchestrator

> Executar na ordem abaixo. Sem pular etapas.

---

## ⚡ Pré-execução — antes de qualquer ação

```
1. Ler governance/RULES.md          → código, HTML/W3C, CSS, Design System, acessibilidade
2. Ler CONTEXT.md (raiz do projeto) → stack, DS, componentes, decisões, estado atual
   → não existe: projeto novo → executar project-start.md
3. Criar componente UI? → verificar "Componentes disponíveis" no CONTEXT.md antes de criar
```

---

## 🏗️ Projeto novo — detectar stack → executar structure skill

| Stack detectada | Skill |
|---|---|
| React + Vite / SPA / dashboard | `structure/react-vite-structure.skill` |
| Next.js / SSR / App Router | `structure/nextjs-structure.skill` |
| API / backend / microserviço | `structure/backend-structure.skill` |
| Monorepo / workspace / múltiplos apps | `structure/monorepo-structure.skill` |
| Design System / Storybook | `structure/design-system-structure.skill` |
| Clean Architecture / DDD / enterprise | `structure/clean-architecture.skill` |
| Frontend sem stack específica | `structure/frontend-structure.skill` |

Estrutura já existe no projeto? → pular esta camada.  
Sempre executar **antes** de qualquer skill funcional.

---

## 📦 Resolução de skills — ordem fixa

```
1. local-skills/    → project-starter · web-design-cloner · ux-audit
2. linked-skills/   → redesign-existing · high-end-visual · kickoff-doc · design-taste
                       full-output · industrial-brutalist · minimalist · stitch · firecrawl
3. skills.sh        → só se score < 2 nas anteriores
                       baixar → salvar em cache/remote-skills/ → executar
```

---

## 🗺️ Roteamento por intenção

| Intenção | Skills prioritárias |
|---|---|
| Criar UI / componente / visual | `web-design-cloner` → `high-end-visual-design` → `design-taste-frontend` |
| Auditar UX / identificar problemas | `ux-audit` → linked se necessário |
| Iniciar projeto novo | structure skill → `project-starter` → `kickoff-doc` |
| Refatorar projeto existente | `redesign-existing-projects` → `ux-audit` |
| Padrões web / boas práticas | `design-taste-frontend` → `full-output-enforcement` |
| Documentação / kickoff | `kickoff-doc` → `templates/` |
| Nenhuma skill com score ≥ 2 | `skills.sh` → cache → executar |

**Score:** 0 irrelevante · 1 secundária · 2 boa · 3 ideal  
**Regra:** 1 skill principal + máx. 2 secundárias (só se mudarem o resultado)  
**Modo:** Single (padrão) · Dual (estruturar + validar) · Pipeline (etapas dependentes)

---

## 📋 Checklist mental — preencher antes de executar

```
RULES.md lido?           sim / não → ler agora
CONTEXT.md lido?         sim / não existe → project-start.md / não → ler agora
DS verificado?           sim / não aplicável

stack detectada:         [stack]
structure skill:         [skill] / já existe → pular

skill principal:         [skill]
skill secundária:        [skill] / não necessária
modo:                    single / dual / pipeline

CONTEXT.md atualizar?    sim → atualizar ao final / não → justificar
```

---

## 📤 Pós-execução — atualizar CONTEXT.md ao final da sessão

- Estado atual: fase, último trabalho, próximo passo
- Componentes novos criados → seção Design System
- Decisões tomadas → seção Decisões (nunca remover)
- Armadilhas descobertas → seção Atenção

---

## 🚫 Nunca · ✅ Sempre

**Nunca**
- Executar sem RULES.md e CONTEXT.md carregados
- Criar componente sem verificar o DS do CONTEXT.md
- Hardcode de cor, fonte ou espaçamento
- `any` em TypeScript · `console.log` em produção · imports/variáveis não usadas
- `<div>` onde existe elemento semântico HTML
- Skill remota sem salvar em cache primeiro
- Estrutura de pastas improvisada sem structure skill

**Sempre**
- RULES.md + CONTEXT.md antes de qualquer execução
- Verificar DS antes de criar qualquer componente
- 1 skill dominante — escolher por score, não por familiaridade
- Structure skill antes de skill funcional em projetos novos
- CONTEXT.md atualizado ao final de sessão com trabalho significativo

---

> **Novo projeto:** structure skill → project-start.md → skills funcionais → CONTEXT.md  
> **Projeto existente:** RULES.md + CONTEXT.md → skill → entregar → CONTEXT.md  
> **Sem skill local/linked:** skills.sh → cache/remote-skills/ → executar local
