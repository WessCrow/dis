# Copy — Laboratório de Ideias e dossié Método Disrupta

**Fonte canónica da UI:** `public/laboratorio-ideias.html` · **Script (strings dinâmicas):** `public/js/laboratorio-ideias.js` · **Template visual clonado:** `#lab-viz-board-tmpl` no mesmo HTML.

**Sincronização:** o espelho em `prototype/` deve manter a mesma copy ao evoluir o protótipo.

**Revisão de UX writing:** alinhada à skill [`.agents/skills/ux-writing/SKILL.md`](../.agents/skills/ux-writing/SKILL.md) (clareza, CTAs com verbo, tom humano, consistência). Diretriz de produto/contexto: [`skills/guidelines/designer2627.md`](../skills/guidelines/designer2627.md).

---

## 0. Eixo de leitura (reduzir vieses)

Em blocos de apoio sob títulos do dossié (classe `lab-result-dossier__rational`), o padrão desejado é **tríade explícita** numa ou duas frases:

1. **O que clarifica** — o papel do bloco (ex.: texto bruto, interpretação, mercado).
2. **Pergunta que responde** — preferencialmente entre «…», para o leitor saber o que procurar.
3. **Para que serve na leitura curta** — frase que começa por **Serve para…** (decisão, conferência, rastreio).

O painel colapsável **Papel desta secção no dossié** (JS) complementa com Resumo · Análise · Justificativa · Fontes relacionadas.

---

## 1. Revisão rápida (recomendações em aberto)

| Tema | Observação | Sugestão |
|------|------------|----------|
| Idioma misto | Títulos em PT + parênteses EN (`need statement`); labels `Problem`, `Target population`; tags `newSolution` | Manter glossário intencional **ou** unificar com tooltip/glossário para termos EN |
| Placeholder | Frase longa em minúscula inicial nos campos de ideia | Capitalizar ou bullets curtos (placeholder como exemplo, não bloco de instruções) |
| Pricing | Preços em **$** e «Starter», «Pro» | Confirmar moeda/locale alvo (€, R$, copy legal) |
| Conteúdo mock | Painel visual e callouts podem falar em **funerais / luto** enquanto o dossié textual usa **redes sociais / marcas** | Alinhar narrativa de exemplo num único domínio para o protótipo não «quebrar» a leitura |

**Já alinhado na UI:** acento **Método Disrupta**; eyebrow e `#intent-hint` orientados ao fluxo; racionais do dossié em tríade; **Setor**; reflexivas com **Objetivo:**; **utilizador** em `SECTION_FLOW_MAP` e painel JS.

---

## 2. Metadados e acessibilidade global

| Chave | Texto |
|-------|--------|
| `<title>` | Laboratório de Ideias — Disrupta |
| Skip link 1 | Pular para o conteúdo principal |
| Skip link 2 | Pular para o menu |

---

## 3. Navegação rápida (`#float-dash`)

| Chave | Texto |
|-------|--------|
| `aria-label` do `<nav>` | Navegação rápida — ícones com tooltip (sem painel expandido) |
| Botão spark (oculto) | `title`: Menu expandido desativado nesta página · `.visually-hidden`: Menu expandido desativado |
| Ícones colapsados (tooltip / hidden) | Dashboard · Avaliação de Inovação · Laboratório de Ideias · Workspace · Billing & Invoices · Experimentos |
| Painel expandido (labels de linha) | Dashboard · Avaliação de Inovação · Laboratório de Ideias · Workspace · Billing & Invoices · Experimentos |

---

## 4. Cabeçalho (`lab-top-bar`)

| Chave | Texto |
|-------|--------|
| Marca (`aria-label` do link) | Disrupta — início (Laboratório de Ideias) |
| `alt` da imagem | Disrupta |
| Histórico | Ver Histórico |
| Grupo tokens (`aria-label`) | Saldo de tokens |
| Botão saldo | Tokens: ∞ |
| Botão `+` (`aria-label`) | Planos e tokens — adicionar |
| Notificações (`aria-label`) | Notificações, 1 não lida |
| `.visually-hidden` badge | 1 nova notificação |
| Perfil (`aria-label`) | Menu do perfil |

---

## 5. Painel lateral — forja (`lab-context` + drawer)

| Chave | Texto |
|-------|--------|
| `h1` | Qual é a sua próxima grande aposta? |
| `aria-label` da `section.forge` | Edição da ideia, atalho de geração e dossié |
| Requisitos (`#forge-input-requirements`, oculto) | Para ativar o botão Gerar ideia, escreva pelo menos três palavras e doze caracteres. |
| Label oculto forja | insira aqui a ideia que deseja refinar ou o problema que deseja resolver. |
| `placeholder` textarea lateral | insira aqui a ideia que deseja refinar ou o problema que deseja resolver. |
| `aria-label` barra teclas/tokens | Atalho de teclado e saldo de tokens |
| Atalho | Pressione **⌘** / **Ctrl** (dinâmico) **+** **Enter** **para gerar** |
| Pill tokens | 10 tokens |
| `aria-label` região geração | Geração de ideia |
| CTA `#btn-process` | Gerar ideia |
| `#intent-hint` | Gera o dossié aqui mesmo: o teu texto fica citado, as secções guiam a leitura e os gráficos mostram o estado num relance. |

### Drawer (modo resposta)

| Estado | `aria-label` / `title` do toggle |
|--------|----------------------------------|
| Expandido | Recolher painel da ideia |
| Recolhido | Abrir painel da ideia para editar o prompt |

---

## 6. Hero central — pré-visualização (`#lab-center-preview`)

| Chave | Texto |
|-------|--------|
| `aria-label` da região | Pré-visualização do laboratório |
| Título | Qual é a sua próxima grande aposta? |
| Legenda oculta comando | Descreva a ideia ou o problema; em seguida use Gerar ideia para preencher o dossié. |
| Label oculto centro | insira aqui a ideia que deseja refinar ou o problema que deseja resolver. |
| `placeholder` inicial textarea centro | insira aqui a ideia que deseja refinar ou o problema que deseja resolver. |
| CTA `#btn-process-center` | Gerar ideia |
| `aria-label` barra abaixo do comando | Atalho e tokens |
| Atalho (igual ao painel) | Pressione ⌘/Ctrl + Enter para gerar |
| Pill | 10 tokens |
| Título sugestões (`h2`) | Experimente estas sugestões: |
| `aria-label` toolbar chips | Modos de contexto para a ideia |
| Chip 1 (`title`) | Pedir raciocínio mais explícito na geração (protótipo) |
| Chip 1 rótulo | Refinar raciocínio |
| Chip 2 (`title`) | Incluir leitura mais ampla de contexto na geração (protótipo) |
| Chip 2 rótulo | Contexto amplo |

### Placeholders rotativos (`public/js/laboratorio-ideias.js` — `PLACEHOLDERS`)

1. insira aqui a ideia que deseja refinar ou o problema que deseja resolver.
2. Descreva a dor do utilizador e o resultado mensurável que imagina alcançar.
3. Que hipótese de negócio ou produto quer validar nesta sessão?
4. Qual contexto de mercado ou tendência quer associar à sua aposta?
5. Resuma em poucas frases o problema — o dossié será montado a partir daqui.

### Cartões de sugestão (texto visível = `data-suggestion`)

1. Uma plataforma que ajuda pequenas empresas a gerenciar seu estoque usando IA  
2. Um app que conecta freelancers com oportunidades de projetos baseado em habilidades  
3. Uma ferramenta que automatiza a criação de conteúdo para redes sociais de marcas  
4. Um serviço que usa blockchain para verificar a autenticidade de produtos  

---

## 7. Dossié — masthead e ações (`#lab-result-dossier`)

| Chave | Texto |
|-------|--------|
| `aria-labelledby` | id `lab-result-dossier-title` |
| Eyebrow | Dossié a partir do teu prompt · leitura guiada |
| Título (`h2`) | Método Disrupta |
| Subtítulo | Data: · **data dinâmica** · \| · Gerado por Disrupta |
| `aria-label` toolbar | Ações do relatório |
| Botão PDF | Descarregar PDF (`aria-label`) |
| Botão partilha | Partilhar relatório (`aria-label`) |
| Botão arquivo | Arquivar relatório (`aria-label`) |

---

## 8. Dossié — secções (títulos `h4` + copy de apoio fixa)

### 8.1 Prompt original

- **Título:** Prompt original  
- **Tríade (racional):** texto bruto que gerou o dossié · responde «O que foi pedido, palavra a palavra?» · serve para conferir alinhamento antes das interpretações.  
- **Corpo:** preenchido pelo utilizador (`#lab-rd-prompt-quote`).

### 8.2 Declaração de necessidade (need statement)

- **Título:** Declaração de necessidade (need statement)  
- **Tríade:** traduz o pedido em problema, público, métrica e frase-síntese · «A necessidade já está formulável?» · base para as secções seguintes.  
- **Labels `dt`:** Problem · Target population · Measurable outcome · Statement  
- **Corpo `dd`:** (mock redes sociais — ver HTML).

### 8.3 Identificação da necessidade (need identification)

- **Título:** Identificação da necessidade (need identification)  
- **Tríade:** quem sofre, contexto, frequência, custo de não resolver · «Em que situação real esta dor aparece?» · evitar soluções desligadas do contexto.  
- **Labels `dt`:** Who suffers · Context · Frequency · Consequences  

### 8.4 Fundamentos do problema (problem fundamentals)

- **Título:** Fundamentos do problema (problem fundamentals)  
- **Tríade:** setor + forças de mercado · «Em que terreno competitivo estamos?» · alinhar vocabulário e risco.  
- **Rótulo:** **Setor** — Marketing Digital  
- **Trends** + três bullets (mock).

### 8.5 Classificação da ideia (idea classification)

- **Título:** Classificação da ideia (idea classification)  
- **Tríade:** tipo e concretude (etiquetas + parágrafo) · «Que género de aposta é esta?» · calibrar risco e tipo de prova.  
- **Tags:** newSolution \| concrete  
- **Parágrafo:** (mock).

### 8.6 Questões reflexivas (reflective questions)

- **Título:** Questões reflexivas (reflective questions)  
- **Tríade:** perguntas de tensão sobre a tese · «O que ainda pode falhar ou ficar por demonstrar?» · moldar a decisão antes de investir.  
- **Tags por item:** Pergunta · Leitura  
- **Perguntas + linha de intenção:** cinco itens no HTML; rótulo **Objetivo:** (PT).

### 8.7 Variações da ideia (idea variations)

- **Título:** Variações da ideia (idea variations)  
- **Tríade:** caminhos alternativos de execução · «Que variações valem um segundo olhar?» · ampliar opções sem perder a dor.  
- **Variação 1 / 2:** títulos e **Focus:** (mock).

### 8.8 Elementos visuais e gráficos

- **Título:** Elementos visuais e gráficos  
- **Tag estado:** Em geração  
- **Tríade:** números e mapas num relance (protótipo) · «Qual é o “termómetro” da ideia agora?» · leitura executiva antes do texto denso.  
- **`aria-label` região:** Painel visual da ideia  

### 8.9 Fontes e materiais

- **Título:** Fontes e materiais  
- **Tríade:** liga evidência a pergunta e oportunidades (exemplo) · «De onde veio isto e por que conta?» · rastreio e confiança na leitura curta.  
- **Cabeçalhos de tabela:** Dado bruto (fonte) · Tema inicial / Portfólio · Tipo de dado · Justificativa de inclusão · Resumo do achado · Destaques (dados, números, citações) · Pergunta Desafio · Oportunidades Preliminares  
- **Lead lista:** Lista rápida de materiais citados (formato anterior do protótipo):  
- **Tipos lista:** PDF · Web · Doc · Link  
- **Metas de linha:** PDF · consultado na análise · Ligação externa · Documento interno · PDF / tabelas · Material de referência  
- **Ligações:** (textos completos das âncoras — ver HTML).

---

## 9. Painel visual clonado (`#lab-viz-board-tmpl`)

### Módulos (`lab-viz-module`)

| Rótulo | Valor | Meta |
|--------|-------|------|
| Prontidão da tese | 78 % | Síntese automática do prompt |
| Matriz de risco | Médio | Incerteza de mercado moderada |
| Sinais de mercado | 4 /5 | Tendências alinhadas à aposta |

### Gráficos

| Elemento | Texto |
|----------|--------|
| Legenda barras | Peso por dimensão |
| `aria-label` SVG barras | Barras: clareza, diferenciação, mercado, execução |
| Eixos barras | Clareza · Diferenciação · Mercado · Execução |
| Legenda donut | Índice de confiança |
| `aria-label` donut | Confiança sintética 72 por cento |

### Matriz impacto × esforço

- **Título:** Mapa impacto × esforço  
- **Eixos:** Impacto · Esforço  
- **`aria-label`:** Matriz impacto versus esforço com três variações  
- **Pontos:** title Variação A / B / C — rótulos A B C  

### Valor da ideia

- **Título:** Valor da ideia  
- **Legenda:** Valor funcional · Valor estratégico · Valor transformacional  
- **`aria-label` ripple:** Raios concêntricos: impacto considerável  
- **Núcleo:** Impacto considerável  
- **Tags:** Tipo de valor: Social · Magnitude: Significativo  
- **Callout:** Justificativa + parágrafo (mock funerais)  

### Classificação cognitiva

- **Título:** Classificação cognitiva da ideia  
- **`aria-label` matriz:** Matriz incremental versus disruptivo e mercado emergente versus consolidado  
- **Eixos:** Mercado emergente \| Mercado consolidado · Incremental ↔ Disruptivo  
- **Cantos:** Optimizer · Challenger · Pioneer · Speculative  
- **`title` dot:** Posição da ideia  
- **Tags outline:** Tipo: Nova solução para dor existente · Nível de abstração: Semi-abstrata  
- **Callout:** Descrição + texto (mock)  

### Mapa de incertezas

- **Título:** Mapa de incertezas  
- **`aria-label`:** Impacto versus facilidade de resolver incertezas  
- **Eixos:** Baixo impacto \| Alto impacto · Difícil de resolver ↔ Fácil de resolver  
- **Cantos:** Ir avaliar · Resolver já · Ignorar por agora · Secundário  
- **Itens lista numerada:** (três frases mock)  

---

## 10. Diálogo de planos (`#lab-pricing-dialog`)

| Chave | Texto |
|-------|--------|
| Título (`h2`) | Planos e tokens |
| Fechar (`aria-label`) | Fechar |
| `aria-label` período | Período de cobrança |
| Botões período | Mensal · Anual |
| Planos | Grátis · Starter **Popular** · Pro |
| Sufixo preço | /mês |
| CTA | Começar |

---

## 11. Textos injetados por JavaScript

### 11.1 Secções colapsáveis do dossié

| Chave | Texto |
|-------|--------|
| `aria-expanded` aberto (cabeçalho secção) | Colapsar seção |
| Fechado | Expandir seção |
| Chevron (decoração) | ▾ · ▸ |

### 11.2 Bloco «Papel desta secção no dossié» (`renderSectionFlows`)

| Chave | Texto |
|-------|--------|
| `aria-label` botão (fechado) | Expandir explicação do papel desta secção |
| `aria-label` botão (aberto) | Colapsar explicação do papel desta secção |
| Texto do trigger | Papel desta secção no dossié |
| Título painel | Papel desta secção no dossié |
| Lede | O que esta parte esclarece, como encadeia com o resto do relatório e que sinais entram (protótipo). |
| Rótulos parágrafos | Resumo · Análise · Justificativa |
| Título lista fontes | Fontes relacionadas |

### 11.3 Conteúdo de `SECTION_FLOW_MAP` (por id de cabeçalho)

Cada entrada gera **Resumo**, **Análise**, **Justificativa** e lista **Fontes relacionadas** com os itens em `sources`.

| `headingId` | Resumo (excerto) | Fontes relacionadas (lista completa) |
|-------------|------------------|----------------------------------------|
| `lab-rd-prompt-h` | Leitura do prompt para identificar contexto… | Prompt original do utilizador · Heurística de decomposição problema -> público -> outcome |
| `lab-rd-need-st-h` | Estruturação formal da necessidade… | Prompt consolidado · Template interno de Need Statement |
| `lab-rd-need-id-h` | Mapeamento operacional da dor… | Need Statement · Matriz de diagnóstico de contexto |
| `lab-rd-pf-h` | Leitura de mercado para posicionar a tese no setor certo. | Sinais de mercado simulados · Classificação setorial da tese |
| `lab-rd-class-h` | Classificação da natureza da ideia… | Taxonomia interna de ideias · Sinais extraídos do problema e contexto |
| `lab-rd-rq-h` | Geração de perguntas de tensão… | Framework de perguntas reflexivas · Hipóteses centrais da ideia |
| `lab-rd-var-h` | Proposição de variações… | Conclusões das questões reflexivas · Padrões de pivotagem de solução |
| `lab-rd-viz-h` | Tradução da análise para leitura rápida… | Scorecards internos do protótipo · Regras de visualização do dossié |
| `lab-rd-sources-h` | Rastreabilidade de evidências… | Tabela de fontes do dossié · Lista de materiais citados |

*(Textos completos de summary / analysis / why estão no código-fonte de `SECTION_FLOW_MAP` em `public/js/laboratorio-ideias.js`.)*

---

## 12. Manutenção

- Ao alterar copy na UI, **atualizar este ficheiro** e, se aplicável, [`laboratorio-ideias-textos.md`](laboratorio-ideias-textos.md) (espelho descritivo; a UI canónica está em `public/`).  
- Para novas secções do dossié, acrescentar linha na secção 8 e, se houver fluxo IA, entrada em `SECTION_FLOW_MAP`.

---

**Última revisão de copy (inventário):** 29 de abril de 2026
