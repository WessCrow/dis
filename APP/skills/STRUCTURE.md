# 📊 Estrutura Visual — `/skills` Runtime Modular v2.0

> **Última atualização:** 2026-05-10

---

## 🗂️ Mapa Completo

```
skills/
│
├── 📄 INDEX.md                        [Navegação rápida — leia aqui primeiro]
├── 📄 README.md                       [Documentação geral]
├── 📄 STRUCTURE.md                    [Este arquivo]
│
├── 🛡️  governance/                    [Protocolos obrigatórios]
│   ├── Start.md                       [Orchestrator central v2.2]
│   ├── RULES.md                       [★ Regras invioláveis — lido antes de toda execução]
│   ├── project-start.md              [Protocolo de inicialização de projetos]
│   └── gitprotocol.md                [Checklist Git/Deploy]
│
├── 📖 guidelines/                     [Diretrizes e padrões]
│   └── designer2627.md               [Engenheiro de Design Senior 2026]
│
├── 🎨 templates/                      [Boilerplates reutilizáveis]
│   ├── context-template.md           [★ Template do CONTEXT.md — por projeto, na raiz]
│   ├── briefing-template.md          [Histórico de projeto (complementar)]
│   ├── roadmap-template.md           [Histórico de projeto (complementar)]
│   ├── architecture-template.md      [Histórico de projeto (complementar)]
│   ├── herobanner-prompt.md          [Hero banner]
│   ├── particle-text-effect-shadcn.md [Particle text + shadcn/ui]
│   └── asmr-background-shadcn.md    [ASMR canvas background]
│
├── 🏗️  structure/                      [Camada 1 — Arquitetura de Pastas — executa ANTES de skills funcionais]
│   ├── react-vite-structure.skill   [React + Vite → src/, components/, pages/, hooks/...]
│   ├── nextjs-structure.skill       [Next.js App Router → app/, components/, modules/...]
│   ├── frontend-structure.skill     [Frontend genérico — fallback]
│   ├── backend-structure.skill      [API/Backend → modules/, shared/, config/, database/...]
│   ├── monorepo-structure.skill     [Monorepo → apps/, packages/, tooling/]
│   ├── design-system-structure.skill [Design System → tokens/, components/, stories/]
│   └── clean-architecture.skill    [Clean Arch → domain/, application/, infrastructure/]
│
├── 🔧 local-skills/                   [Camada 2 — Skills Funcionais — busca aqui PRIMEIRO]
│   ├── project-starter.skill         [Inicialização de projetos]
│   ├── web-design-cloner.skill       [Clonagem/decomposição visual]
│   └── ux-audit.skill               [Auditoria de UX]
│
├── 🔗 linked-skills/                  [Skills externas (symlinks) — busca SEGUNDO]
│   ├── redesign-existing-projects
│   ├── high-end-visual-design
│   ├── kickoff-doc
│   ├── design-taste-frontend
│   ├── full-output-enforcement
│   ├── industrial-brutalist-ui
│   ├── minimalist-ui
│   ├── stitch-design-taste
│   └── firecrawl-scrape
│
├── 📤 outputs/                        [Documentação viva — contexto persistente]
│   ├── PROJECT_BRIEF.md              [Visão geral, objetivo, contexto]
│   ├── ROADMAP.md                    [Fases, prioridades, próximos passos]
│   └── ARCHITECTURE.md              [Decisões técnicas e estrutura]
│
└── 🗄️  cache/                         [Cache local de skills remotas]
    └── remote-skills/                [Skills baixadas de skills.sh]
```

---

## 🔄 Fluxo de Operação

```
┌─────────────────────────────────────────────────────────┐
│  Usuário faz pedido                                     │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  PRÉ-EXECUÇÃO OBRIGATÓRIA (toda sessão)                 │
│  → Ler governance/RULES.md                              │
│    (código, HTML, CSS, DS, acessibilidade)              │
│  → Ler CONTEXT.md do projeto (se existir)               │
│    (stack, DS, componentes, decisões, estado atual)     │
│  → CONTEXT.md não existe → ir para Criação              │
│  → CONTEXT.md existe → ir para Alteração                │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  governance/Start.md                                    │
│  → Interpreta intenção                                  │
│  → Classifica: ação + domínio + profundidade            │
│  → Calcula score de aderência                           │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  CAMADA 1 — ORGANIZAÇÃO ESTRUTURAL                      │
│  (somente em projetos novos)                            │
│                                                         │
│  Detecta stack do projeto                               │
│       ↓                                                 │
│  Seleciona structure skill:                             │
│  react-vite / nextjs / backend /                        │
│  monorepo / design-system /                             │
│  clean-architecture / frontend                          │
│       ↓                                                 │
│  Cria arquitetura de pastas + boilerplates              │
│  Registra em ARCHITECTURE.md                            │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  CAMADA 2 — RESOLUÇÃO DE SKILL FUNCIONAL                │
│                                                         │
│  [1] local-skills/   → busca aqui primeiro              │
│       ↓ (se não encontrar)                              │
│  [2] linked-skills/  → busca aqui segundo               │
│       ↓ (se não encontrar ou score < 2)                 │
│  [3] skills.sh       → busca remota                     │
│       ↓ (se score ≥ 2)                                  │
│  [4] cache/remote-skills/ → salva antes de executar     │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  EXECUÇÃO                                               │
│  → Lê outputs/ para restaurar contexto                 │
│  → Executa skill selecionada                            │
│  → Respeita padrões existentes                          │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  GOVERNANCE                                             │
│  → Se commit/deploy: consulta gitprotocol.md            │
│  → Se design: consulta designer2627.md                  │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  PÓS-EXECUÇÃO                                           │
│  → Atualiza CONTEXT.md na raiz do projeto               │
│    (estado atual, componentes criados, decisões, próx.) │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  Entrega ao usuário                                     │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Função de Cada Pasta

| Pasta | Camada | Descrição | Ordem de acesso |
|---|---|---|---|
| **`/governance`** | — | Protocolos obrigatórios (Start, **RULES**, Project-Start, Git) | Sempre — RULES.md lido antes de tudo |
| **`/guidelines`** | — | Diretrizes de design, UX e padrões | Quando tarefa envolve design/UX |
| **`/templates`** | — | Boilerplates prontos — **context-template.md** é o principal | Ao iniciar projeto: context-template primeiro |
| **`/structure`** | **Camada 1** | Skills de arquitetura de pastas por stack | Projetos novos — executa PRIMEIRO |
| **`/local-skills`** | **Camada 2** | Skills funcionais proprietárias | Após structure — busca PRIMEIRO |
| **`/linked-skills`** | **Camada 2** | Skills funcionais externas vinculadas | Após local — busca SEGUNDO |
| **`/outputs`** | **Camada 4** | Documentação viva do projeto | Ler antes de alterar; atualizar após |
| **`/cache`** | — | Skills remotas baixadas para uso local | Após busca em skills.sh |

---

## 📝 Convenções de Nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Governance | `PascalCase.md` | `Start.md`, `ARCHITECTURE.md` |
| Guidelines | `kebab-case.md` | `designer2627.md` |
| Templates | `kebab-case-template.md` | `briefing-template.md` |
| Skills locais | `kebab-case.skill` | `project-starter.skill` |
| Skills linked | `kebab-case` (sem extensão) | `kickoff-doc` |
| Outputs | `SCREAMING-SNAKE.md` | `PROJECT_BRIEF.md` |
| Cache | `[nome-skill]/` | `remote-skills/discovery/` |

---

## 🚀 Como Adicionar Novos Elementos

### Nova Skill Local
```bash
touch local-skills/nova-skill.skill
# Seguir formato: cabeçalho + propósito + quando usar + fluxo + outputs
# Atualizar INDEX.md e STRUCTURE.md
```

### Nova Skill Linked (Symlink)
```bash
ln -s /caminho/para/skill linked-skills/nome-skill
# Atualizar INDEX.md e STRUCTURE.md
```

### Novo Template
```bash
touch templates/novo-template.md
# Usar formato: cabeçalho + seções + histórico
# Atualizar INDEX.md
```

### Skill Remota (via skills.sh)
```bash
# 1. Baixar via Start.md (Deep Skill Search)
# 2. Salvar em cache/remote-skills/nome-skill/
# 3. Registrar no INDEX.md temporariamente
```

---

## ✅ Checklist de Integridade

Execute mentalmente a cada sessão:

- [ ] `governance/RULES.md` lido antes de qualquer execução?
- [ ] `CONTEXT.md` do projeto lido no início da sessão?
- [ ] Design System verificado antes de criar qualquer componente?
- [ ] `governance/Start.md` é o ponto de entrada de toda interação?
- [ ] Em projetos novos: camada estrutural (`structure/`) executada antes de skills funcionais?
- [ ] `CONTEXT.md` criado na raiz do projeto (não em `/skills`)?
- [ ] Stack detectada corretamente antes de selecionar structure skill?
- [ ] Skills funcionais sendo buscadas na ordem: local → linked → remota?
- [ ] Skills remotas sendo salvas em `cache/remote-skills/` antes de executar?
- [ ] `CONTEXT.md` atualizado ao final de sessão significativa?
- [ ] `gitprotocol.md` consultado antes de commit/deploy?
- [ ] Novos elementos adicionados ao `INDEX.md` e `STRUCTURE.md`?

---

## 🏗️ Nova Skill de Estrutura

```bash
touch structure/nova-stack-structure.skill
# Incluir: detecção, arquitetura de pastas, convenções, fluxo, regras, output ARCHITECTURE.md
# Atualizar INDEX.md e STRUCTURE.md
# Adicionar linha na tabela de detecção em governance/Start.md
```

---

## 📌 Histórico de Versões

| Aspecto | v1.0 | v2.0 | v2.1 |
|---|---|---|---|
| Start.md | Roteador básico | Orchestrator completo | + Camada estrutural integrada |
| Resolução de skills | Implícita | local → linked → remota | Idem + structure antes de funcional |
| Skills remotas | Não operacionalizadas | Cache obrigatório | Idem |
| Contexto | Perdido entre sessões | outputs/ (3 docs vivos) | Idem |
| Inicialização de projeto | Sem protocolo | project-start.md | + Detecção de stack + structure skill |
| Arquitetura de pastas | Ad hoc | Sem padrão | `/structure/` com 7 skills por stack |
| Auditoria de UX | Sem skill | ux-audit.skill | Idem |
| Templates | Prompts de UI | + Briefing, Roadmap, Architecture | Idem |

---

**Status:** ✅ v2.1 implementada e documentada  
**Data:** 2026-05-10
