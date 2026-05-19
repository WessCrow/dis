# context-scoping.md — Protocolo de Escopo de Contexto (V2)

> **Papel:** Define o que a IA carrega por sessão — global vs feature-level  
> **Objetivo:** Reduzir consumo de tokens sem sacrificar consistência  
> **Ativado por:** `Start.md` — etapa 2, antes de qualquer skill  
> **Versão:** 2.0

---

## 🔒 A Regra Fundamental

> **Qualidade de output não vem de ler mais. Vem de ler as coisas certas.**

O sistema V2 separa o contexto em dois escopos:

| Escopo | Arquivo | Carregado quando |
|---|---|---|
| **Global** | `RULES.md` + `CONTEXT.md` (raiz) | **Sempre. Toda sessão. Sem exceção.** |
| **Feature** | `src/features/[x]/SPEC.md` | Somente quando a tarefa toca aquela feature |
| **Skill** | `local-skills/` ou `linked-skills/` | Somente quando o domínio técnico exige |

---

## 🌐 O que É Global — nunca mover para SPEC.md

Estes itens existem **apenas** no `CONTEXT.md` raiz e no `RULES.md`.
Duplicá-los em um `SPEC.md` de feature é um erro de arquitetura.

### 1. Tokens do Design System
```
--color-primary, --color-error, --spacing-md, --radius-sm, --font-body...
```
Um botão em `customers/` e um em `auth/` **precisam usar o mesmo token**.
Se cada SPEC.md definir seus próprios valores, o produto vira inconsistente.

### 2. Regras de código invioláveis (RULES.md)
```
Zero hardcode · Zero any · HTML semântico · WCAG AA mínimo · Mobile-first
```
Não se repetem. Nunca se contextualizam. São critérios de aceite globais.

### 3. Decisões arquiteturais do projeto
```
Stack · Padrões de import · Convenção de nomenclatura · Estrutura de pastas
```
Se `customers/` e `auth/` tomam decisões arquiteturais independentes, o projeto fragmenta.

### 4. Componentes disponíveis no Design System
```
Button · Input · Modal · Toast · Card...
```
A IA precisa saber que `<Button>` existe antes de criar `<CustomerButton>`.

---

## 📦 O que É Feature-Level — vai no SPEC.md

Tudo que é **genuinamente local** àquela feature. Não afeta outras features se mudar.

```
✅ Entidades e tipos de dados daquela feature
✅ Estados de UI específicos (empty, loading, error daquele fluxo)
✅ Fluxos (Happy Path, Alternative, Exception) daquela tela
✅ Componentes criados especificamente para aquela feature
✅ Decisões locais (ex: "paginação de 20 items por página")
✅ Armadilhas específicas daquela feature
✅ Estado atual de implementação daquela feature
```

```
❌ Tokens de cor ou fonte → ficam no CONTEXT.md global
❌ Regras de acessibilidade → ficam no RULES.md
❌ Componentes do DS → ficam no CONTEXT.md global
❌ Stack / framework → ficam no CONTEXT.md global
❌ Padrões de código → ficam no RULES.md
```

---

## 🗺️ Protocolo de resolução de contexto

Executar esta sequência antes de qualquer tarefa:

```
[1] RULES.md          → carregar sempre (regras invioláveis)
[2] CONTEXT.md (raiz) → carregar sempre (DS tokens, stack, componentes)
[3] Identificar feature da tarefa
      "Adiciona botão delete na lista de clientes"
       → feature: customers
[4] src/features/customers/SPEC.md existe?
      SIM → carregar SPEC.md da feature
      NÃO → criar SPEC.md via template antes de executar a tarefa
[5] Skill necessária?
      A tarefa exige domínio técnico específico? → carregar skill
      É tarefa simples/direta? → não carregar skill
```

---

## 🧮 Comparativo de tokens — antes e depois

| Cenário | V1 (antes) | V2 (depois) |
|---|---|---|
| "Adiciona botão delete em customers" | RULES + CONTEXT(107L) + skill | RULES + CONTEXT(40L) + SPEC(60L) |
| "Cria modal de confirmação no auth" | RULES + CONTEXT(107L) + skill | RULES + CONTEXT(40L) + SPEC(60L) |
| "Auditar UX geral do produto" | RULES + CONTEXT(107L) + skill | RULES + CONTEXT(40L) + todas SPEC.md necessárias |
| **Overhead fixo/sessão** | ~350 tokens de contexto | ~100 tokens (global leve) |

**Redução estimada em tarefas localizadas: 60–70% do contexto carregado.**

---

## ⚠️ Guardrails — o que protege a qualidade

### Guardrail 1 — CONTEXT.md global deve ser leve e completo
O CONTEXT.md raiz deve ter no máximo **50 linhas úteis**.
Conteúdo acima disso geralmente é feature-level mal posicionado.

**Seções obrigatórias no CONTEXT.md global:**
- Stack e estrutura
- Tokens do Design System (lista dos tokens, não os valores)
- Componentes disponíveis
- Decisões arquiteturais (só as que afetam todo o projeto)
- Estado atual (fase, próximo passo)
- Link para as features existentes

### Guardrail 2 — SPEC.md nunca redefine o que é global
Se um SPEC.md de feature contém qualquer um destes itens → mover para CONTEXT.md:
- Valor de cor, fonte ou espaçamento
- Regra de código ou acessibilidade
- Nome de componente do DS

### Guardrail 3 — SPEC.md sempre tem estado atual
O maior risco de SPEC.md é ficar desatualizado.
**Toda sessão que alterar uma feature deve atualizar o SPEC.md ao final.**
Seção `## 📍 Estado atual` obrigatória em todo SPEC.md.

### Guardrail 4 — feature sem SPEC.md = criar antes de implementar
Nunca implementar em uma feature sem SPEC.md existente.
Criar o SPEC.md (via template) é parte do trabalho — não overhead.

---

## 📁 Estrutura de pastas esperada nos projetos

```
projeto/
├── CONTEXT.md              ← global, ≤50 linhas (DS tokens, stack, componentes)
├── RULES.md ou link        ← sempre ativo
│
└── src/
    └── features/
        ├── customers/
        │   ├── SPEC.md     ← contexto local de customers
        │   └── ...código
        ├── auth/
        │   ├── SPEC.md
        │   └── ...código
        └── dashboard/
            ├── SPEC.md
            └── ...código
```

---

> **Lembrete:** context scoping não é otimização prematura.  
> É a diferença entre uma IA que lê muito e entende pouco  
> e uma IA que lê pouco e entende exatamente o que precisa.
