# Resultado do Laboratório — textos da página

Fonte: `prototype/resultado-laboratorio.html` (HTML estático + strings do script que montam o relatório)

## Eixo de leitura (triagem)

Para reduzir vieses, blocos de apoio e faixas superiores devem deixar claro **o que clarificam**, **a pergunta que respondem** e **para que servem na leitura curta** (padrão alinhado a [`skills/governance/Start.md`](../skills/governance/Start.md) e ao inventário do Laboratório em [`laboratorio-dossie-copy.md`](laboratorio-dossie-copy.md)). Abaixo, aplicação por bloco principal desta página.

| Bloco | O que clarifica | Pergunta que responde | Para que serve na leitura curta |
|-------|-----------------|----------------------|----------------------------------|
| **Intent preview** / pílulas de confiança | Nível de confiança na narrativa antes de mergulhar nos dados | «Posso confiar nesta visão agora?» | Calibrar ceticismo e prioridade de revisão |
| **Radar de risco / mapa de momentum** | Onde a ideia está exposta ou alinhada ao mercado (mock) | «Onde está o risco e o impulso?» | Escolher onde aprofundar antes da validação |
| **Executive summary preview** | Posição da ideia vs. média do setor (mock) | «Estamos acima ou abaixo do par?» | Framing para comité em segundos |
| **Scores & mercado** | Feasibility, atrito, TAM/SAM/SOM (regras PDR) | «Os números-resumo dizem o quê?» | Âncora quantitativa antes da tabela de fontes |
| **Tabela de fontes** | Rastreio dado → achado → pergunta de desafio | «De onde veio isto e por que importa?» | Auditoria rápida da linha de raciocínio |
| **Matriz de Inteligência** | Cruzamento input × fonte (mock) | «Que inputs estão cobertos por que evidência?» | Ver lacunas de cobertura |

## Metadados

- **Título da página:** Resultado do Laboratório — Disrupta

## Cabeçalho

- **Logo:** Disrupta (alt)
- **Breadcrumb:** Projetos · Laboratório de Ideias · **Resultado do Laboratório** (página atual)
- **Tema:** Claro | Técnico

## Cabeçalho do relatório

- **Título:** Resultado do Laboratório
- **Meta:** Gerado em 22 de abril de 2026
- **Versão (exemplo):** RDL-7F3A-0192 (atualizada ao remoldar)

## Original Prompt (conteúdo padrão)

> Quero um produto B2B que use microalgas em fachadas de prédios comerciais para capturar CO₂ do ar interno e gerar dados de ESG auditáveis para fundos imobiliários.

*(Se o usuário vier do Laboratório de Ideias com texto salvo, o parágrafo substitui o prompt acima.)*

## Barra de ações (CTA)

- **Avançar para Validação**
- **Nova moldagem**

## Modal — Nova moldagem

- **Título:** Nova moldagem
- **Texto:** Edite o prompt. Ao confirmar, o Resultado do Laboratório recalcula scores e fontes simuladas (mock) conforme o PDR.
- **Label:** Prompt
- **Dica:** Ação auditável: substitui o dossiê até a próxima ingestão — alinhado à camada agêntica (IAA).
- **Cancelar**
- **Iniciar nova moldagem**

## Toast (mensagens simuladas)

- Validação registrada no fluxo (simulação). Action audit: Resultado do Laboratório → etapa seguinte.
- Dossiê recalculado com matriz e scores mock (PDR).

---

## Conteúdo dinâmico do relatório (labels e textos fixos do script)

### Faixa superior (intent / confiança)

- **Intent preview** — Preparando visão consolidada de risco e tendências para leitura em < 3s.
- **Pílulas de confiança (conforme regras):**
  - Confiança média — validar premissas de mercado
  - Confiança alta — sinais de exequibilidade e adoção favoráveis
  - Confiança baixa — revisar arquitetura de valor antes de validar
- **Banner de risco (condicional):** Exposição agregada `N`/100 — priorizar revisão antes de avançar (orquestração de risco).
- **Action audit:** Action audit · leitura do dossiê sem mutação até confirmar próxima ação (simulação).

### Síntese visual — risco & tendências

- **Subtítulo:** Radar de exposição ao risco e mapa de calor de momentum (dados simulados).

#### Radar de risco (mock)

- **Título:** Radar de risco (mock)
- **Eixos (legendas curtas no gráfico):** técnico · mercado · regulatório · adoção · competitivo · CAPEX
- **Legenda:** Preenchimento · Ideia | Traço · Benchmark setor
- **Nota:** Eixos 0–100: quanto maior, maior exposição ao risco nesta dimensão (simulação).

#### Mapa de calor — momentum das tendências

- **Colunas:** Volume de sinais · Ruptura tech · Pressão regulatória · Horizonte 18m
- **Escala:** Baixa … Alta
- **Nota:** Células = índice agregado mock (24–82). Útil para priorizar onde a narrativa da ideia colide com o mercado.

### Executive Summary Preview

- **Intro:** Comparativo rápido da ideia frente à média do setor — linguagem de comitê técnico.
- **Bullets:** Feasibility Score (mock) · Adoption ease (inverso do atrito) · Moat / defensibilidade percebida
- **Legenda dos marcadores:** Ideia · Média do setor

#### Micro-cards (textos variam por regra; exemplos)

**Moat Defense**

- Moat Defense: moderada — integração reduz switching, mas copiar fluxo ainda é viável.
- Moat Defense: alta se ancorada em dados proprietários e compliance.
- Moat Defense: média — depende de contratos multi-anuais e dados de ativo.

**Scalability Cap**

- Scalability Cap: limitada por instalação física e ciclo de capex por ativo.
- Scalability Cap: alta margem digital após playbooks de implantação repetíveis.

**Unit Economics Preview**

- Unit Economics Preview: receita recorrente por m² monitorado; custo marginal cai com densidade de sensores e automação de MRV.

### Scores & mercado (mock)

- **Feasibility Score** — `%` + sub: Regra PDR: hardware/bio −30 pts; SaaS/software +40; +5 por Automação/API/Integração.
- **Adoption Friction** — nível (Baixo / Médio / Alto) + descrições:
  - Substituição de ferramenta cara por stack mais enxuta — atrito médio de adoção.
  - Exige mudança de hábito cultural — atrito elevado (ex.: abandono de e-mail).
  - Solução invisível ou integrada ao fluxo — atrito baixo (ex.: plugin).
  - Substitui ERP ou stack legada por oferta mais barata — atrito médio.
- **TAM / SAM / SOM** — valores formatados + sub com rótulos de setor (ex.: PropTech / Green Building / Climate Finance; SaaS B2B; etc.)

### Tabela de fontes (conteúdo do dossiê)

Secção tabular com **uma linha por fonte**. Especificação completa (colunas, instruções por campo, valores fechados de **Tipo de dado**, nomenclatura de portfólio): [`skills/guidelines/disrupta-laboratorio-resultado-tabela-fontes.md`](../../skills/guidelines/disrupta-laboratorio-resultado-tabela-fontes.md).

**Cabeçalhos:** Dado bruto (fonte) · Tema inicial / Portfólio · Tipo de dado · Justificativa de inclusão · Resumo do achado · Destaques (dados, números, citações) · Pergunta Desafio · Oportunidades Preliminares.

**No protótipo (`?demo=1`):** `<section class="card" aria-label="Tabela de fontes">` com tabela `#source-evidence-table`, classe `matrix matrix--sources` (scroll horizontal em ecrãs estreitos); sem subtítulo nem nota de skill acima da grelha; linhas mock geradas em `analyzeLab()` → `sourceEvidenceRows`.

### Matriz de Inteligência (Input × Fonte)

- **Subtítulo:** Fontes simuladas para o efeito espelho — conforme PDR.
- **Colunas da tabela:** Componente · O que a IA analisa · Fonte simulada
- **Linhas:**
  1. Problem Fundamentals — Maturidade do setor e volume de buscas — Google Trends API / Statista (simulado)
  2. Trends & Market Shift — Sinais de ruptura e adoção tecnológica — Gartner / TechCrunch Index (simulado)
  3. Idea Classification — Similaridade com patentes e soluções existentes — Google Patents / Product Hunt API (simulado)
  4. Target Population — Volume de CPFs/CNPJs afetados pela dor — LinkedIn Sales Navigator / IBGE / Eurostat (simulado)
  5. Adoption Friction — Barreiras regulatórias e switching cost — Relatórios de setor McKinsey/Deloitte (simulado)

### Need Statement (template padrão do mock)

- **Problem:** Ativos comerciais precisam reduzir emissões e provar impacto com trilhas auditáveis, sem projetos ad-hoc irreplicáveis.
- **Target Population:** Gestores de ESG, facility managers e asset managers de fundos imobiliários em centros urbanos densos.
- **Measurable Outcome:** Redução documentada de tCO₂e/m²·ano com API para dashboards corporativos e due diligence.

### Need Identification

- **Who Suffers:** Equipes de ESG sob metas líquidas-zero sem alavancas físicas no portfólio.
- **Context:** Disclosure climático, investidores institucionais e custo de capital ligado a risco ESG.
- **Frequency:** Reporting trimestral e diligência contínua em aquisições de ativos.
- **Consequences:** Greenwashing acidental, multas reputacionais e perda de certificações verdes.

### Problem Fundamentals

- **Sector:** (rótulo dinâmico, ex.: PropTech / Green Building / Climate Finance)
- **Trends (tags padrão do mock):**
  - Descarbonização de portfólios e metas líquidas-zero
  - MRV digital e trilhas de auditoria em tempo quase real
  - Indoor air quality como KPI contratual em leases verdes
- **Fonte simulada:** Google Trends API / Statista

### Trends & Market Shift

- **Texto:** Rupturas tecnológicas e curvas de adoção usadas no dossiê.
- **Fonte simulada:** Gartner / TechCrunch Index
- **Lista fixa no HTML gerado:**
  - Convergência de edifícios como ativos de dados (digital twin + ESG).
  - Pressão por métricas auditáveis em contratos de green lease.
  - Hardware de borda + APIs de MRV como padrão de mercado.

### Idea Classification

- **Type (exemplos):** Hardware-enabled data service · Hardware / operações físicas · SaaS / Software · Modelo híbrido
- **Patentes / proximidade (exemplos):**
  - Similaridade moderada a patentes de MRV ambiental
  - Similaridade alta a soluções de biofachada e sensores — checar freedom-to-operate
- **Fonte simulada:** Google Patents / Product Hunt API

### Target Population

- **Fonte simulada:** LinkedIn Sales Navigator / IBGE / Eurostat

### Adoption Friction

- **Formato:** Nível: … — (texto do atrito)
- **Fonte simulada:** relatórios de setor (ex.: McKinsey/Deloitte)

### Moldagem — provocar a próxima pesquisa

- **Subtítulo:** Cinco perguntas reflexivas para condição de sobrevivência do modelo (lente McKinsey / PDR).

#### Reflective Questions

1. Qual evidência faria um comitê de investimento aceitar o payback sem projeto piloto de 18 meses?  
   *Sobrevivência do modelo de receita*
2. Se a regulamentação de carbono atrasar 24 meses, o que quebra primeiro: CAPEX ou contratos?  
   *Condição de sobrevivência regulatória*
3. Quem internaliza o risco biológico/operacional — você, o fundo ou o facility manager?  
   *Alocação de risco e unit economics*
4. Que métrica de MRV substitui crédito de carbono volátil na narrativa de venda?  
   *Moat Defense e diferenciação*
5. Por que o cliente não compra apenas dados de IA generativa sobre ESG em vez do seu ativo físico?  
   *Substituição competitiva*

#### Idea Variations

- Pivot residencial premium com subscription de dados para condomínios.
- Parceria com seguradoras: prêmio atrelado a IAQ + carbono auditável.
- SKU software-only: camada de auditoria sobre sensores legados.

### Tendências extras (heatmap — rótulos adicionais)

- Infra de borda + sensores em ativos físicos
- Financeirização de dados de sustentabilidade
