# RULES.md — Regras Invioláveis

> **Leia este arquivo antes de qualquer execução. Sem exceções.**
> Estas regras se aplicam a toda sessão, toda skill, todo projeto.
> Não há contexto em que possam ser ignoradas.

---

## 🚫 Código — O que nunca fazer

- **Zero linhas mortas** — nenhuma variável, import, função ou bloco declarado e não usado
- **Zero `console.log`** em código de produção — usar sistema de logging adequado se necessário
- **Zero `any` explícito** em TypeScript — tipar sempre; se incerto, usar `unknown` com narrowing
- **Zero comentários óbvios** — código deve se auto-explicar; comentar apenas *por quê*, nunca *o quê*
- **Zero `// TODO` sem contexto** — se for deixar, incluir: o quê, por quê, e quando resolver
- **Zero lógica duplicada** — extrair função antes de duplicar
- **Zero `!important` em CSS** — refatorar especificidade em vez de forçar

---

## ✅ Código — O que sempre fazer

- **Funções com responsabilidade única** — se a função faz mais de uma coisa, dividir
- **Nomes descritivos** — `getUserById` não `getU`, `isLoading` não `flag`
- **Constantes nomeadas** para valores mágicos — nunca `if (status === 3)`, sempre `if (status === STATUS.PENDING)`
- **Tratamento de erro explícito** — nunca silenciar um `catch {}` vazio
- **Imports organizados** — externos → internos → relativos, com linha em branco separando grupos

---

## 🌐 HTML / W3C — Semântica obrigatória

### Estrutura
- Usar elementos semânticos: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Nunca usar `<div>` ou `<span>`** onde existe elemento semântico adequado
- Um único `<h1>` por página — hierarquia de headings nunca quebrada (`h1 → h2 → h3`, nunca pular nível)
- `<title>` descritivo e único por página — nunca genérico como "Home" ou "Page"

### Imagens
- **Alt text obrigatório** em toda `<img>` — nunca vazio (`alt=""`), exceto quando a imagem é puramente decorativa e o elemento pode ser ignorado por leitores de tela
- Alt text descritivo do conteúdo, nunca "imagem de", nunca repetir o texto ao lado
- Imagens decorativas: `alt=""` + `role="presentation"` ou usar CSS background-image

### Links e botões
- Links com texto descritivo — **nunca** "clique aqui", "saiba mais", "leia mais" sem contexto
- `<a>` para navegação, `<button>` para ações — nunca inverter
- Botões com `type="button"` explícito quando não é submit
- Links externos com `rel="noopener noreferrer"` obrigatório

### Formulários
- Cada `<input>` com `<label>` associado via `for`/`id` — nunca usar placeholder como substituto de label
- `<fieldset>` + `<legend>` para grupos de inputs relacionados (radio, checkbox)
- Mensagens de erro associadas ao campo via `aria-describedby`
- Campos obrigatórios marcados com `required` e indicação visual

### Outros
- `lang` obrigatório no `<html>` — `lang="pt-BR"` para projetos em português
- Meta charset e viewport obrigatórios
- Nunca usar `target="_blank"` sem `rel="noopener noreferrer"`

---

## 🎨 CSS / Design — Tokens obrigatórios

- **Zero valores hardcoded** de cor, fonte, espaçamento, border-radius, shadow
- Sempre usar tokens do Design System do projeto (ver `CONTEXT.md` → seção Design System)
- **Zero `px` para font-size** — usar `rem` para respeitar preferências de acessibilidade do usuário
- **Mobile-first obrigatório** — escrever estilos base para mobile, sobrescrever para desktop
- Evitar `position: absolute` e `z-index` sem necessidade — documentar quando inevitável
- **Zero `outline: none`** sem alternativa de foco visível acessível

---

## 🧩 Design System — Regras de uso

- **Antes de criar qualquer componente:** verificar se já existe no Design System do projeto
- Consultar `CONTEXT.md` → seção **Design System** para lista de componentes disponíveis
- **Nunca improvisar variante** de componente existente — usar as variantes definidas pelo DS
- **Nunca hardcodar** cor, fonte ou espaçamento que existe como token no DS
- Componentes primitivos do DS não devem ser modificados diretamente — criar wrapper se necessário
- Nomear componentes novos respeitando a nomenclatura do DS existente

---

## ♿ Acessibilidade — WCAG AA mínimo obrigatório

### Contraste
- Texto normal: **mínimo 4.5:1** em relação ao fundo
- Texto grande (≥18px regular ou ≥14px bold): **mínimo 3:1**
- Elementos de UI e bordas informativas: **mínimo 3:1**
- Nunca usar cor como único meio de transmitir informação

### Navegação e foco
- **Foco visível em todos os elementos interativos** — nunca remover sem substituto
- Ordem de foco lógica seguindo a ordem visual da página
- Todos os fluxos interativos navegáveis por teclado (Tab, Enter, Esc, setas)
- Skip links para conteúdo principal em páginas com navegação extensa

### ARIA
- **Usar ARIA somente quando HTML semântico não resolve** — ARIA de primeira escolha é anti-padrão
- `aria-label` quando texto visível não descreve suficientemente o elemento
- `aria-describedby` para instruções e erros associados a campos
- `aria-live` para conteúdo que muda dinamicamente sem recarregar página
- `role` somente quando elemento nativo não existe

### Componentes interativos
- Modais: foco aprisionado dentro, fechamento com Esc, foco retorna ao trigger ao fechar
- Dropdowns: navegação por setas, fechamento com Esc
- Toasts/Alertas: `aria-live="polite"` para informações, `aria-live="assertive"` para erros críticos

---

## 📱 Responsividade

- Testar sempre em: 375px (mobile S), 768px (tablet), 1280px (desktop)
- Touch targets mínimo **44×44px** para elementos interativos em mobile
- Nunca usar `vh` em mobile sem fallback — usar `dvh` ou `svh` quando disponível
- Texto nunca menor que **16px** (1rem) em mobile

---

## ⚡ Performance (regras básicas)

- Imagens com `width` e `height` explícitos para evitar layout shift (CLS)
- Imagens abaixo do fold com `loading="lazy"`
- Fontes com `font-display: swap`
- Nunca bloquear o thread principal com loops síncronos pesados

---

## 🔒 Segurança básica

- **Nunca** expor credenciais, tokens ou chaves em código fonte
- Sanitizar inputs de usuário antes de renderizar como HTML
- Nunca usar `dangerouslySetInnerHTML` sem sanitização explícita
- Variáveis de ambiente: sempre via `.env` e validadas no build

---

> **Lembrete:** estas regras não são sugestões. São critérios de aceite.
> Código que viola qualquer regra acima não está pronto para entrega.
