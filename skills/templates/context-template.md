# CONTEXT.md — [Nome do Projeto]

> **Arquivo:** `CONTEXT.md` — salvar na raiz do projeto
> **Propósito:** Contexto operacional único. Lido no início de toda sessão antes de qualquer execução.
> **Especificação do produto:** ver `PRD.md` na raiz do projeto.
> **Atualizar:** ao final de cada sessão de trabalho. Nunca deixar desatualizado.
> **Última atualização:** [DATA]

---

## 🏗️ Stack e Estrutura

**Stack:** [ex: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui]
**Structure skill usada:** [ex: nextjs-structure.skill]
**Alias de imports:** [ex: `@/` → `src/`]
**Gerenciador de pacotes:** [ex: pnpm]

---

## 🎨 Design System

**Biblioteca base:** [ex: shadcn/ui | Material UI | própria | nenhuma]
**Tema/tokens:** [ex: variáveis em `styles/tokens.css` | `tailwind.config.ts`]

**Tokens principais:**
```
cores:    [ex: --color-primary, --color-destructive, --color-muted]
fontes:   [ex: --font-sans, --font-mono]
espaços:  [ex: Tailwind spacing scale]
radius:   [ex: --radius: 0.5rem]
```

**Componentes já disponíveis — não recriar:**
- [ex: Button (variantes: default, destructive, outline, ghost, link)]
- [ex: Card, CardHeader, CardContent, CardFooter]
- [ex: Dialog, DialogTrigger, DialogContent]
- [ex: Input, Label, Select, Textarea]
- [ex: Table, TableHeader, TableRow, TableCell]
- [ex: Badge, Avatar, Separator, Skeleton]
- [adicionar conforme o projeto crescer]

**Componentes criados neste projeto:**
- [ex: `components/shared/UserCard.tsx` — card de perfil com avatar e nome]
- [adicionar ao criar novos componentes]

**Regra:** Antes de criar qualquer componente, verificar esta lista.

---

## 📍 Estado atual do projeto

**Fase:** [ex: Fase 1 — MVP | Fase 2 — Features | Produção]
**Último trabalho concluído:** [descrever o que foi feito na última sessão]
**Próximo passo:** [o que fazer na próxima sessão]
**Bloqueios conhecidos:** [o que está impedindo progresso, se houver]

---

## 🔗 Integrações ativas

| Serviço | Propósito | Status |
|---|---|---|
| [ex: Supabase] | [ex: banco + auth] | [ex: configurado] |
| [ex: Stripe] | [ex: pagamentos] | [ex: pendente] |

---

## 📐 Decisões tomadas — não reverter sem motivo

| Decisão | Motivo |
|---|---|
| [ex: Auth.js em vez de JWT manual] | [ex: menor complexidade de implementação] |
| [ex: TanStack Query para dados] | [ex: cache automático, sem useEffect direto] |
| [ex: Zod para validação] | [ex: inferência de tipos integrada com React Hook Form] |

---

## 📁 Estrutura de pastas do projeto

```
[colar a estrutura gerada pela structure skill]
```

**Regras de onde colocar o quê:**
- Componentes reutilizáveis globais → `components/shared/`
- Componentes de UI primitivos (DS) → `components/ui/` (não editar)
- Feature encapsulada → `modules/[nome-da-feature]/`
- Chamada de API → `services/` ou `modules/[feature]/services/`
- Hook global → `hooks/`
- Hook de feature → `modules/[feature]/hooks/`

---

## ⚠️ Atenção — armadilhas deste projeto

- [ex: não usar `fetch` direto em Client Components — sempre via TanStack Query]
- [ex: o componente `Button` do DS não aceita `className` diretamente — usar `asChild`]
- [adicionar conforme o projeto revelar suas peculiaridades]
