# Start.md — Orchestrator

> Executar na ordem abaixo. Sem pular etapas.

---

## ⚡ Pré-execução — antes de qualquer ação

```
1. Ler skills/governance/RULES.md   → regras invioláveis (código, HTML, CSS, acessibilidade)
2. Ler CONTEXT.md (raiz do projeto) → stack, DS tokens, componentes, decisões arquiteturais
   → não existe: projeto novo → executar project-start.md
3. Criar componente UI? → verificar "Componentes disponíveis" no CONTEXT.md antes de criar
```

> CONTEXT.md global deve ter ≤50 linhas. Se estiver maior → há conteúdo feature-level mal posicionado.

---

## 🔭 Context Scoping — etapa obrigatória (V2)

> Protocolo completo: `governance/context-scoping.md`

```
[1] Identificar qual feature a tarefa toca
      ex: "adiciona botão delete na lista de clientes" → feature: customers

[2] Existe src/features/[feature]/SPEC.md?
      SIM → carregar SPEC.md da feature (entidades, fluxos, estado atual)
      NÃO → criar SPEC.md via templates/feature-spec-template.md antes de executar

[3] A tarefa exige domínio técnico específico?
      SIM → carregar skill correspondente (ver Roteamento por intenção abaixo)
      NÃO → não carregar skill — tarefa direta não precisa de overhead
```

**Regra de ouro:** RULES.md + CONTEXT.md (global, leve) + SPEC.md (feature, local) = contexto suficiente.  
Se sentir necessidade de carregar mais → o CONTEXT.md global está gordo ou o SPEC.md está ausente.

**O que NUNCA vai no SPEC.md de feature:**  
`tokens de cor/fonte/espaço` · `regras de código/acessibilidade` · `componentes do DS global` · `stack/framework`  
Esses itens ficam **apenas** em CONTEXT.md e RULES.md. Duplicar é erro de arquitetura.

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
                       lenis-scroll · responsive-craft · emil-design-eng
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
| Scroll suave / scroll-driven / parallax | `lenis-scroll` |
| Layout responsivo / breakpoints / fluido | `responsive-craft` |
| Animação / micro-interação / polish de UI | `emil-design-eng` |
| Review de código de UI (before/after) | `emil-design-eng` |
| Nenhuma skill com score ≥ 2 | `skills.sh` → cache → executar |

**Score:** 0 irrelevante · 1 secundária · 2 boa · 3 ideal  
**Regra:** 1 skill principal + máx. 2 secundárias (só se mudarem o resultado)  
**Modo:** Single (padrão) · Dual (estruturar + validar) · Pipeline (etapas dependentes)

---

## 📋 Checklist mental — preencher antes de executar

```
RULES.md lido?                sim / não → ler agora
CONTEXT.md (global) lido?     sim / não existe → project-start.md / não → ler agora
DS verificado?                sim / não aplicável

── Context Scoping (V2) ──────────────────────────────
feature identificada:         [feature]
SPEC.md existe?               sim → carregar / não → criar via feature-spec-template.md
SPEC.md contém item global?   não → ok / sim → mover para CONTEXT.md antes de prosseguir
──────────────────────────────────────────────────────

stack detectada:              [stack]
structure skill:              [skill] / já existe → pular

skill necessária?             sim → [skill] / não → executar sem skill
skill secundária:             [skill] / não necessária
modo:                         single / dual / pipeline

CONTEXT.md atualizar?         sim → atualizar ao final / não → justificar
SPEC.md da feature atualizar? sim → atualizar ao final / não → justificar
```

---

## 📤 Pós-execução — atualizar contexto ao final da sessão

**CONTEXT.md global** (se houver mudança arquitetural):
- Componentes novos do DS criados → seção Design System
- Decisões que afetam todo o projeto → seção Decisões (nunca remover)
- Stack ou integrações alteradas

**SPEC.md da feature trabalhada** (toda sessão significativa):
- Estado atual: fase, último trabalho, próximo passo
- Novos componentes locais criados → seção Componentes
- Decisões locais tomadas → seção Decisões locais
- Armadilhas descobertas → seção Armadilhas

---

## 🚫 Nunca · ✅ Sempre

**Nunca**
- Executar sem RULES.md e CONTEXT.md (global) carregados
- Tocar uma feature sem carregar o SPEC.md dela (ou criá-lo)
- Colocar token de DS, regra de código ou componente global dentro de um SPEC.md
- Criar componente sem verificar o DS do CONTEXT.md
- Hardcode de cor, fonte ou espaçamento
- `any` em TypeScript · `console.log` em produção · imports/variáveis não usadas
- `<div>` onde existe elemento semântico HTML
- Skill remota sem salvar em cache primeiro
- Estrutura de pastas improvisada sem structure skill
- Deixar SPEC.md desatualizado ao fim de sessão com mudança significativa

**Sempre**
- RULES.md + CONTEXT.md (global) + SPEC.md (feature) antes de executar
- Verificar DS do CONTEXT.md global antes de criar qualquer componente
- Criar SPEC.md via `feature-spec-template.md` se não existir
- 1 skill dominante — só carregar se o domínio técnico exigir
- Structure skill antes de skill funcional em projetos novos
- Atualizar SPEC.md da feature ao final de toda sessão significativa
- CONTEXT.md global atualizado apenas para mudanças arquiteturais reais

---

> **Novo projeto:** structure skill → project-start.md → criar SPEC.md por feature → CONTEXT.md (global, leve)  
> **Feature existente:** RULES.md + CONTEXT.md + SPEC.md da feature → skill (se necessário) → entregar → atualizar SPEC.md  
> **Feature nova em projeto existente:** criar SPEC.md → executar → atualizar SPEC.md  
> **Sem skill local/linked:** skills.sh → cache/remote-skills/ → executar local
