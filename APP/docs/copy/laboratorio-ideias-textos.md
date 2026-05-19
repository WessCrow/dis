# Laboratório de Ideias — textos da página

**UI canónica:** `public/laboratorio-ideias.html` (e `public/js/laboratorio-ideias.js`). Este ficheiro descreve sobretudo o espelho em `prototype/`; para inventário de copy do dossié e tríade por secção, ver [`laboratorio-dossie-copy.md`](laboratorio-dossie-copy.md).

## Metadados

- **Título da página (`<title>`):** Laboratório de Ideias — Disrupta

## Menu lateral direito (`#float-dash`)

- **Aria-label do nav:** Navegação rápida — ícones com tooltip (sem painel expandido)
- **Botão spark:** oculto (`hidden`); painel expandido desativado no mock
- **Pilha de ícones** (ordem de cima para baixo), cada um com `title`, `data-float-tip` e texto em **`.visually-hidden`** igual ao rótulo:
  1. **Dashboard** — `href="#"`
  2. **Avaliação de Inovação** — `href="#"`
  3. **Laboratório de Ideias** — `href="laboratorio-ideias.html"`, classe **`is-active`**, **`aria-current="page"`**
  4. **Workspace** — `href="#"`
  5. **Billing & Invoices** — `href="#"` (tooltip/atributos com entidade `&amp;` onde aplicável)
  6. **Experimentos** — `href="#"`
- **Painel expandido** (HTML legacy): mesmos seis rótulos em **`.float-dash__list`**, oculto no CSS nesta página

## Cabeçalho

- **Marca no header:** só o ícone `img.brand-logo` dentro de **`.lab-brand`** (`padding-left: 0.85rem` no link), `alt` **Disrupta**, link com aria-label **Disrupta — início (Laboratório de Ideias)**; **sem** `gap` entre blocos esquerdo/direito na `lab-top-bar` (centro vazio).
- **Breadcrumb** (`nav` com aria-label **Navegação**): Projetos · **Laboratório de Ideias** (página atual) · Resultado do Laboratório
- **Tema** (`aria-label` do grupo): **Tema da interface** — botões **Claro** · **Técnico**
- **Barra fixa (`lab-top-bar`):** `justify-content: space-between` e **`gap: 0`** — grupo da marca à **extrema esquerda**; **Ver Histórico** (borda clara tipo mock), **Tokens: ∞** (+), **Notificações** e **Perfil** agrupados com **espaçamento curto** (`0.45rem`) à **extrema direita**; **`.lab-top-bar__end`** com **`padding-right: 0.85rem`**. **`float-dash`** centrado na vertical da viewport; tooltips nos ícones (`data-float-tip`).

## Coluna principal — Diagnóstico da ideia (`aside.bench`)

- **Título (`h2`):** Diagnóstico da ideia
- **Interruptor:** Monitoramento em tempo real
- **Status do scan** (`#scan-status`, exemplos conforme script):
  - Aguardando entrada (estado inicial com monitoramento ligado)
  - Scanning… (durante debounce após digitação)
  - Diagnóstico atualizado (após análise)
  - Monitoramento desativado (toggle desligado)
  - Monitoramento ativo (ao religar o toggle)

### Prontidão da tese (medidor)

- **Rótulo da faixa:** Prontidão da tese
- **Estados do medidor** (rótulo dinâmico `#meter-status`):
  - Rigor insuficiente (nível baixo)
  - Tese em formação (nível médio)
  - Pronto para processamento (nível alto)

### Componentes da tese (checklist)

`aria-label` da lista: **Componentes da tese**

- Escopo do problema — Pendente / Detectado
- Segmentação de público — Pendente / Detectado
- Métrica de sucesso (outcome) — Pendente / Detectado
- Atrito de mercado — Pendente / Detectado

### Sugestões de refinamento

`aria-label` da pilha: **Sugestões de refinamento** (cartões podem ficar ocultos até o texto disparar as regras do script)

**Sugestão de rigor**

> Sua descrição de impacto é qualitativa. Quantifique perda de tempo, capital ou risco operacional observável.

**Provocação técnica**

> Você citou automação. Determine se a barreira de entrada predominante é técnica (integração, dados, SLAs) ou cultural (mudança de processo, governança, incentivos).

## A Forja — entrada da tese (`section.forge` > `forge-panel` + `forge-process`)

Bloco principal de redação da tese e CTA de processamento no **mesmo cartão** (`div.forge-panel`): textarea, métricas (`forge-footer`) e região `div.forge-process` com o botão e o intent preview.

### Título e campo

- **Título (`h1`):** A Forja — entrada da tese
- **Label do campo (oculto):** Tese para diagnóstico
- **Placeholder do textarea:** Descreva a tese do problema, a população afetada e a evidência de ineficiência atual…

### Métricas do rodapé da forja (`forge-footer`)

- **Linha 1:** `N` caracteres · `N` palavras · `N` sentenças
- **Linha 2 — rótulo:** Densidade informacional:
- **Linha 2 — valor:** `N` (vírgula decimal no mock, ex.: `0,0`) seguido do sufixo **palavras / sentença** (classe `forge-density-suffix`, cor muted)

### CTA e textos da região de geração (`forge-process`)

`role="region"` e **aria-label: Geração de ideia**; o botão usa **aria-describedby** apontando para `#intent-hint`.

| Papel | Texto exato na UI |
|--------|-------------------|
| **Botão primário (`#btn-process`)** | Gerar ideia |
| **Parágrafo de apoio (`#intent-hint`)** | O dossié central será preenchido com o seu prompt, gráficos e módulos de leitura rápida. |

- **Estado do botão:** inicia **desabilitado** (`disabled`); o script habilita quando a pontuação de rigor e o mínimo de palavras atingem o critério definido em `laboratorio-ideias.html`.
- **Classes:** `btn-primary forge-process__cta` no botão; `intent-hint forge-process__hint` no parágrafo.

### Pré-visualização central (`#lab-center-preview`)

- **Eyebrow:** Pré-visualização
- **Título:** Painel de ideia
- **Corpo:** Descreva a aposta no painel à esquerda e use **Gerar ideia** para atualizar este espaço com o dossié, gráficos e módulos.

### Comportamento associado (não visível como cópia na tela)

- Ao clicar no botão **habilitado**, o conteúdo do textarea (trim) é salvo em `sessionStorage` na chave `disrupta-forge-prompt`, a pré-visualização central oculta-se, o dossié `#lab-result-dossier` revela-se no mesmo ecrã (prompt em `#lab-rd-prompt-quote`, data em `#lab-result-dossier-date`, painel visual clonado de `#lab-viz-board-tmpl` para `#lab-rd-viz-root`), com foco movido para o título do dossié.

### Dossié — Fontes e materiais (`#lab-rd-sources-section`)

- **`h4`:** Fontes e materiais  
- **Parágrafo introdutório:** Ligações, PDFs e documentos… (dados de exemplo)  
- **Tabela** `#lab-rd-source-evidence-table` (`aria-labelledby` no `#lab-rd-sources-h`): colunas Dado bruto (fonte) · Tema inicial / Portfólio · Tipo de dado · Justificativa de inclusão · Resumo do achado · Destaques · Pergunta Desafio · Oportunidades Preliminares; **duas linhas mock**; classes `matrix matrix--sources` + `matrix-wrap`; especificação de conteúdo em [`skills/guidelines/disrupta-laboratorio-resultado-tabela-fontes.md`](../../skills/guidelines/disrupta-laboratorio-resultado-tabela-fontes.md)  
- **Lead da lista:** “Lista rápida de materiais citados…” seguido de **`ul.lab-sources`** (itens PDF / Web / Doc como antes)
