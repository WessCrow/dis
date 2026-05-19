# SPEC.md — [Nome da Feature]

> **Feature:** [nome]  
> **Projeto:** [nome do projeto]  
> **Criado em:** YYYY-MM-DD  
> **Última atualização:** YYYY-MM-DD  
> **Contexto global:** ver `CONTEXT.md` na raiz do projeto

---

<!-- 
⚠️  ATENÇÃO AO PREENCHER ESTE TEMPLATE

Este arquivo contém SOMENTE o que é genuinamente local a esta feature.

❌ NÃO colocar aqui:
   - Tokens de cor, fonte ou espaçamento → ficam em CONTEXT.md
   - Regras de código ou acessibilidade → ficam em RULES.md
   - Componentes do Design System global → ficam em CONTEXT.md
   - Stack ou framework → ficam em CONTEXT.md

✅ Colocar aqui:
   - Entidades e tipos de dados desta feature
   - Estados de UI específicos desta feature
   - Fluxos (Happy, Alternative, Exception) desta tela
   - Componentes criados especificamente para esta feature
   - Decisões locais desta feature
   - Armadilhas específicas desta feature
   - Estado atual de implementação desta feature
-->

---

## 📦 Entidades

> Modelos de dados que esta feature cria, lê ou manipula.

```ts
// Exemplo:
type Customer = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
};
```

---

## 🖥️ Estados de UI

> Estados que os componentes desta feature podem assumir.

| Estado | Descrição | Trigger |
|---|---|---|
| `empty` | Nenhum item existe ainda | Lista vazia no primeiro acesso |
| `loading` | Buscando dados | Requisição em andamento |
| `loaded` | Dados disponíveis | Resposta recebida com sucesso |
| `error` | Falha na operação | Erro de rede ou servidor |
| `disabled` | Ação bloqueada | [motivo específico] |

---

## 🗺️ Fluxos

> Mapeie os caminhos que o usuário percorre nesta feature.

### Happy Path — [nome do fluxo principal]

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | [ação] | [resposta] |
| 2 | [ação] | [resposta] |
| 3 | [ação] | [resposta] |

### Alternative Path — [variação]

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | [ação] | [resposta] |

### Exception Path — [erro ou caso limite]

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | [ação] | [resposta: mensagem de erro, estado de fallback] |

---

## 🧩 Componentes desta feature

> Apenas componentes criados especificamente para esta feature.  
> Componentes do Design System global → consultar CONTEXT.md.

| Componente | Arquivo | Propósito |
|---|---|---|
| `CustomerList` | `components/CustomerList.tsx` | Lista paginada de clientes |
| `CustomerCard` | `components/CustomerCard.tsx` | Card individual com ações |

---

## 📐 Decisões locais

> Decisões que afetam apenas esta feature. Não reverter sem motivo.

| Decisão | Motivo |
|---|---|
| Paginação de 20 items por página | Balanceia densidade e performance |
| Ordenação padrão por `createdAt` desc | Clientes novos são mais relevantes |

---

## 📍 Estado atual

> Atualizar ao final de toda sessão que alterar esta feature.

**Fase:** [ex: Em desenvolvimento / Pronto para QA / Em produção]  
**Último trabalho:** [o que foi feito na última sessão]  
**Próximo passo:** [próxima tarefa a executar]  
**Bloqueios:** [o que impede progresso, se houver]

---

## ⚠️ Armadilhas desta feature

> Problemas descobertos que outros devem evitar.

- [armadilha 1 — o que acontece e como evitar]
- [armadilha 2]
