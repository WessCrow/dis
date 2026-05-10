# ARCHITECTURE — STARTER

> **Status:** Documento vivo — atualizado a cada decisão relevante  
> **Criado em:** 2026-05-10  
> **Última atualização:** 2026-05-10

---

## 🏗️ Visão Geral

**Tipo de projeto:** Sistema de governance e skills para agentes de IA  
**Padrão arquitetural:** Runtime modular de skills com resolução hierárquica  
**Princípio central:** Contexto persistente via `CONTEXT.md` + roteamento por objetivo operacional

---

## 📁 Estrutura de Arquivos

```
STARTER/
├── CONTEXT.md               → contexto operacional do projeto (stack, DS, estado, decisões)
├── PRD.md                   → especificação do produto (features, critérios, fluxos)
│
└── skills/
    ├── INDEX.md             → navegação rápida do sistema
    ├── STRUCTURE.md         → mapa visual e histórico de versões
    │
    ├── governance/          → Protocolos obrigatórios
    │   ├── Start.md         → Orchestrator central (v2.2) — lido antes de toda interação
    │   ├── RULES.md         → Regras invioláveis (código, HTML, CSS, DS, WCAG, segurança)
    │   ├── project-start.md → Protocolo completo de inicialização de projetos
    │   └── gitprotocol.md   → Release Guardian — checklist antes de commit/deploy
    │
    ├── guidelines/          → Diretrizes de padrão
    │   └── designer2627.md  → Engenheiro de Design Senior 2026
    │
    ├── templates/           → Boilerplates reutilizáveis
    │   ├── context-template.md        → ★ Template do CONTEXT.md por projeto
    │   ├── prd-template.md            → ★ Template do PRD.md por projeto
    │   ├── briefing-template.md       → Template para PROJECT_BRIEF (histórico)
    │   ├── roadmap-template.md        → Template para ROADMAP (histórico)
    │   ├── architecture-template.md   → Template para ARCHITECTURE (histórico)
    │   ├── herobanner-prompt.md       → Hero banner
    │   ├── particle-text-effect-shadcn.md → Particle text + shadcn/ui
    │   └── asmr-background-shadcn.md → ASMR canvas background
    │
    ├── structure/           → Camada 1 — Arquitetura de Pastas por Stack
    │   ├── react-vite-structure.skill
    │   ├── nextjs-structure.skill
    │   ├── frontend-structure.skill
    │   ├── backend-structure.skill
    │   ├── monorepo-structure.skill
    │   ├── design-system-structure.skill
    │   └── clean-architecture.skill
    │
    ├── local-skills/        → Camada 2 — Skills Funcionais Proprietárias
    │   ├── project-starter.skill
    │   ├── web-design-cloner.skill
    │   └── ux-audit.skill
    │
    ├── linked-skills/       → Camada 2 — Skills Externas (symlinks)
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
    ├── outputs/             → Documentação histórica do projeto
    │   ├── PROJECT_BRIEF.md
    │   ├── ROADMAP.md
    │   └── ARCHITECTURE.md  ← este arquivo
    │
    └── cache/               → Skills remotas baixadas
        └── remote-skills/   → Cache de skills de skills.sh
```

---

## 🔄 Modelo de Resolução de Skills

```
Pedido do usuário
        ↓
[1] Buscar em local-skills/
        ↓ (se não encontrar)
[2] Buscar em linked-skills/
        ↓ (se não encontrar ou score < 2)
[3] Buscar em https://skills.sh/
        ↓ (se score ≥ 2)
[4] Baixar → salvar em cache/remote-skills/
        ↓
[5] Executar localmente
```

---

## 🔧 Padrões Adotados

**Nomenclatura de arquivos:**
- Governance: `PascalCase.md` (Start.md, RULES.md, ARCHITECTURE.md)
- Guidelines: `kebab-case.md` (designer2627.md)
- Templates: `kebab-case-template.md`
- Skills locais: `kebab-case.skill`
- Skills linked: `kebab-case` (sem extensão, symlinks)
- Outputs: `SCREAMING-SNAKE.md`

**Formato de skills:**
- Cabeçalho com: Tipo, Domínio, Ação, Ativado por
- Seção de Propósito e Quando usar
- Fluxo de Execução numerado
- Checklist de Saída
- Outputs Gerados

**Contexto por projeto:**
- `CONTEXT.md` na raiz — lido no início de toda sessão (operacional)
- `PRD.md` na raiz — especificação do produto (referência de aceite)
- `outputs/` — histórico arquivístico de brief, roadmap, arquitetura

---

## 📐 Decisões Arquiteturais

### Decisão: Hierarquia de Resolução de Skills
**Data:** 2026-05-10  
**Contexto:** Precisávamos de ordem determinística para encontrar skills sem ambiguidade  
**Decisão:** local-skills → linked-skills → skills.sh (remota)  
**Alternativas consideradas:** Busca paralela (descartada — gera ambiguidade), só local (descartada — limita extensibilidade)  
**Consequências:** Sistema extensível sem perder controle local; skills remotas sempre em cache antes de execução

### Decisão: CONTEXT.md como Fonte Única de Contexto Operacional
**Data:** 2026-05-10  
**Contexto:** Sessões com agente perdem contexto — cada conversa começa do zero  
**Decisão:** `CONTEXT.md` na raiz do projeto com stack, DS, estado atual e decisões — lido obrigatoriamente a cada sessão  
**Alternativas consideradas:** Contexto só em memória (descartado — efêmero), contexto em outputs/ (descartado — mistura histórico com operacional)  
**Consequências:** Agente restaura contexto completo em segundos; outputs/ fica como arquivo histórico

### Decisão: PRD.md como Especificação de Aceite
**Data:** 2026-05-10  
**Contexto:** Projetos cresciam sem especificação formal — features eram definidas ad hoc a cada sessão  
**Decisão:** `PRD.md` na raiz com visão, personas, features, critérios de aceite e fora do escopo  
**Alternativas consideradas:** Usar PROJECT_BRIEF (descartado — formato de histórico, não de especificação), PRD dentro de outputs/ (descartado — precisa de acesso imediato, não é arquivo histórico)  
**Consequências:** Qualquer feature nova é avaliada contra o PRD antes de ser implementada; scope creep identificado antes de virar código

### Decisão: RULES.md Sempre Ativo
**Data:** 2026-05-10  
**Contexto:** Regras de código, HTML, acessibilidade e Design System eram violadas por falta de referência ativa  
**Decisão:** `RULES.md` lido obrigatoriamente antes de toda execução, sem exceção  
**Alternativas consideradas:** Embutir regras no Start.md (descartado — tornaria o Start.md muito pesado), depender de CONTEXT.md (descartado — RULES.md é universal, CONTEXT.md é por projeto)  
**Consequências:** Critérios de aceite sempre visíveis; código entregue nunca viola W3C, WCAG AA ou Design System

### Decisão: Camada Estrutural Antes de Skill Funcional
**Data:** 2026-05-10  
**Contexto:** Projetos começavam com estrutura de pastas improvisada, gerando inconsistência  
**Decisão:** Para projetos novos, executar sempre uma `structure/` skill antes de qualquer skill funcional  
**Alternativas consideradas:** Estrutura ad hoc por projeto (descartado — gera divergência entre projetos), única estrutura universal (descartado — stacks diferentes têm necessidades diferentes)  
**Consequências:** 7 stacks suportadas com arquiteturas de referência; estrutura de pastas nunca improvisada

### Decisão: Start.md como Orchestrator Único
**Data:** 2026-05-10  
**Contexto:** Precisávamos de um ponto de entrada único para toda interação  
**Decisão:** Start.md (115 linhas) interpreta intenção, roteia skill, aplica governance e coordena outputs  
**Alternativas consideradas:** Múltiplos orquestradores por domínio (descartado — aumenta complexidade), sem orquestrador (descartado — cada sessão requer interpretação ad hoc)  
**Consequências:** Consistência garantida; Start.md mantido enxuto para não onerar leitura a cada sessão

---

## 🗓️ Histórico de Mudanças

| Data | Mudança | Impacto |
|---|---|---|
| 2026-05-10 | Arquitetura v2.2 — RULES.md, CONTEXT.md, PRD.md, structure/ (7 skills) | Alto — novo modelo de operação completo |
| 2026-05-10 | Arquitetura v2.0 — runtime modular implementado | Alto — modelo base estabelecido |
| 2026-04-11 | Estrutura inicial de pastas criada | Médio — organização da base |
