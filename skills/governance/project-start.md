# project-start.md — Protocolo de Inicialização de Projetos

> **Papel:** Protocolo obrigatório para criação de novos projetos  
> **Ativado por:** Start.md quando CONTEXT.md não existe na raiz do projeto  
> **Depende de:** RULES.md (sempre ativo) · templates/ (boilerplates) · structure/ (arquitetura)

---

## 🎯 Objetivo

Garantir que todo novo projeto seja iniciado com:
- RULES.md carregado e ativo desde o primeiro commit
- Design System declarado antes do primeiro componente
- estrutura de arquivos consistente com a stack
- CONTEXT.md criado como fonte única de contexto do projeto
- governance aplicada desde o início

---

## 🔁 Fluxo Completo

```
[1] Ler RULES.md → regras invioláveis ativas
        ↓
[2] Capturar intenção e extrair parâmetros do projeto
        ↓
[3] ★ CAMADA ESTRUTURAL ★
    Detectar stack → selecionar structure skill → criar arquitetura de pastas
        ↓
[4] Criar CONTEXT.md na raiz do projeto
    → preencher: stack, Design System, estrutura de pastas, fase inicial
        ↓
[5] Selecionar skill funcional de inicialização
        ↓
[6] Gerar boilerplates iniciais respeitando RULES.md
        ↓
[7] Registrar primeiras decisões em CONTEXT.md → seção Decisões
        ↓
[8] Entregar projeto pronto para evolução
```

---

## [1] Capturar Intenção

Antes de criar qualquer arquivo, responder:

- **O que** o projeto deve fazer?
- **Para quem** (audiência, usuário final)?
- **Qual escopo** (MVP, protótipo, produto final)?
- **Quais restrições** (tecnologia, prazo, equipe)?
- **Qual o resultado esperado** desta sessão?

Se houver ambiguidade: assumir a interpretação mais provável e explicitar na documentação.

---

## [2] Extrair Parâmetros

Estrutura de parâmetros mínimos:

```
nome do projeto:
objetivo principal:
audiência:
escopo desta sessão:
tecnologias (se definidas):
restrições conhecidas:
referências visuais (se existirem):
```

---

## [3] Camada Estrutural — Obrigatória

Esta etapa acontece **antes** de qualquer skill funcional.

### 3a. Detectar stack

Extrair do pedido ou perguntar se não estiver claro:
- Tipo: frontend / backend / monorepo / fullstack?
- Framework: React? Next.js? Node.js? outro?
- Padrão arquitetural: Clean Architecture? simples?

### 3b. Selecionar e executar structure skill

| Stack detectada | Skill a executar |
|---|---|
| React + Vite | `structure/react-vite-structure.skill` |
| Next.js | `structure/nextjs-structure.skill` |
| Backend / API | `structure/backend-structure.skill` |
| Monorepo | `structure/monorepo-structure.skill` |
| Design System | `structure/design-system-structure.skill` |
| Clean Architecture / DDD | `structure/clean-architecture.skill` |
| Frontend genérico | `structure/frontend-structure.skill` |

### 3c. Criar arquitetura de pastas

Executar a structure skill selecionada:
- Criar todas as pastas definidas na skill
- Gerar arquivos de configuração raiz (tsconfig, vite.config, etc.)
- Criar boilerplates de entrada (main.tsx, app.ts, index.ts)
- Registrar em `outputs/ARCHITECTURE.md` qual skill foi usada e por quê

---

## [4] Selecionar Skill Funcional

Consultar Start.md → Resolução de Skills Funcionais:

1. Verificar `local-skills/project-starter.skill`
2. Se não disponível → verificar `linked-skills/kickoff-doc`
3. Se não disponível → buscar em `https://skills.sh/`

---

## [5] Gerar Estrutura de Documentação

A estrutura mínima de documentação de um projeto é:

```
/projeto
├── README.md       → visão geral rápida
├── CONTEXT.md      → contexto operacional (stack, DS, estado atual, decisões)
├── PRD.md          → especificação do produto (features, critérios, fluxos, regras)
├── [arquivos criados pela structure skill]
└── skills/outputs/
    ├── PROJECT_BRIEF.md
    ├── ROADMAP.md
    └── ARCHITECTURE.md
```

Usar templates de `skills/templates/` como base:
- `context-template.md`      → para CONTEXT.md ← **lido toda sessão**
- `prd-template.md`          → para PRD.md ← **referência de especificação**
- `briefing-template.md`     → para PROJECT_BRIEF
- `roadmap-template.md`      → para ROADMAP
- `architecture-template.md` → para ARCHITECTURE

---

## [6] Popular Outputs Obrigatórios

### PROJECT_BRIEF.md
Preencher com:
- nome e objetivo do projeto
- contexto e problema que resolve
- audiência e casos de uso
- escopo atual e próximos passos
- data de criação

### ROADMAP.md
Preencher com:
- fase atual (ex.: Fase 1 — Estrutura Base)
- itens em progresso
- próximos marcos
- itens futuros / backlog

### ARCHITECTURE.md
Preencher com:
- decisões técnicas tomadas
- stack escolhida (se definida)
- padrões de estrutura adotados
- integrações previstas
- restrições arquiteturais

---

## [7] Registrar Decisões

Toda decisão relevante deve ser registrada em `ARCHITECTURE.md`:

```markdown
## Decisão: [nome da decisão]
**Data:** YYYY-MM-DD  
**Contexto:** Por que esta decisão foi necessária  
**Decisão:** O que foi escolhido  
**Consequências:** O que isso implica no projeto  
```

---

## [8] Checklist de Entrega

Antes de considerar o projeto inicializado:

- [ ] RULES.md lido e ativo
- [ ] Intenção interpretada e documentada
- [ ] Stack detectada e registrada
- [ ] Structure skill executada (arquitetura de pastas criada)
- [ ] `CONTEXT.md` criado na raiz com stack, DS, fase e estrutura de pastas
- [ ] `PRD.md` criado na raiz com visão, personas, features iniciais e fora do escopo
- [ ] Primeiras decisões registradas em CONTEXT.md
- [ ] Nenhum componente criado que já existe no Design System
- [ ] Código inicial não viola nenhuma regra do RULES.md
- [ ] Governance verificada (gitprotocol se houver versionamento)
- [ ] Estrutura de arquivos coerente com o escopo

---

## 🔄 Evolução Contínua

A cada interação subsequente com o projeto:

1. Ler `outputs/` para restaurar contexto
2. Identificar o que mudou desde a última sessão
3. Executar alteração preservando padrões existentes
4. Atualizar o output relevante (brief / roadmap / architecture)
5. Manter consistência entre os três documentos

O projeto nunca começa do zero em uma segunda sessão.  
O contexto está sempre em `outputs/`.

---

## ⚠️ Anti-padrões

- Criar projeto sem preencher ao menos PROJECT_BRIEF
- Ignorar templates disponíveis em `/templates`
- Sobrescrever outputs de sessões anteriores sem preservar histórico
- Iniciar sem identificar escopo da sessão atual
- Usar skills sem verificar a ordem local → linked → remota
