# PRD: Laboratório de Ideias — Interações, Sessões, Header, Menus e Textos

## 1. Análise de Contexto & Impacto
O **Laboratório de Ideias** é o ambiente central do Disrupta onde os usuários forjam e diagnosticam novas teses de inovação. O objetivo da tela é fornecer um ambiente de redação (A Forja) com feedback visual em tempo real (Diagnóstico da Ideia) antes de processar os dados para gerar um relatório de viabilidade (Resultado do Laboratório / Avaliação de Inovação). 
O impacto de negócio medido aqui é o aumento na precisão dos inputs dos usuários e a redução do *friction* inicial para a formulação de teses estruturadas.

---

## 2. Especificação Técnica — Matriz FEER (Flows, States, Errors, Rules)

### 2.1. Fluxos (Flows)
| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| **Happy Path** | Usuário entra na tela e escreve uma tese extensa e detalhada no campo "A Forja". | O painel de "Diagnóstico da Ideia" atualiza os status em tempo real (Scanning...). O medidor de "Prontidão da tese" atinge o nível "Pronto para processamento". O botão "Gerar ideia" é habilitado. Ao clicar, a pré-visualização oculta-se e o dossiê completo é revelado. |
| **Alternative Path** | Usuário desativa o "Monitoramento em tempo real". | O sistema pausa a verificação em tempo real. O status muda para "Monitoramento desativado". O usuário pode digitar sem gatilhos até religar. |
| **Exception Path** | Usuário tenta clicar em "Gerar ideia" com um texto muito curto ou insuficiente. | O botão permanece em estado `disabled`. O painel de diagnóstico de ideias emite uma "Sugestão de rigor" orientando a adicionar mais contexto (ex: quantificação da perda de tempo ou escopo numérico). |

### 2.2. Estados (States)
| Componente | Estados Possíveis |
|---|---|
| **Textarea (A Forja)** | `Empty` \| `Typing` \| `Filled` \| `Error (Insufficient)` |
| **Diagnóstico (Status do Scan)** | `Aguardando entrada` \| `Scanning...` \| `Diagnóstico atualizado` \| `Monitoramento desativado` \| `Monitoramento ativo` |
| **Medidor de Prontidão** | `Rigor insuficiente` \| `Tese em formação` \| `Pronto para processamento` |
| **Botão Primário (Gerar ideia)**| `Disabled` \| `Enabled` \| `Loading` |
| **Dossiê Resultante** | `Hidden` \| `Visible` |

### 2.3. Erros (Errors) e Regras (Rules)
- **Regras de Ativação:** O botão "Gerar ideia" só habilita quando o número mínimo de palavras/caracteres é atingido e os critérios da lista (Escopo, Segmentação, Métrica, Atrito) são "Detectados".
- **Comportamento em Erro:** Ausência de jargão técnico punitivo. Utilização de "Sugestões de refinamento" de forma construtiva (ex: *"Sua descrição de impacto é qualitativa. Quantifique..."*).

---

## 3. UX Writing & Design de Conteúdo

### 3.1. Header (Cabeçalho) e Metadados
- **Meta Título:** `Laboratório de Ideias — Disrupta`
- **Breadcrumb:** Projetos · Laboratório de Ideias · Resultado do Laboratório
- **Barra Fixa (lab-top-bar):** Ações de "Ver Histórico", "Tokens: ∞", "Notificações" e "Perfil" na extrema direita. Inclui alternador de temas ("Claro" / "Técnico").

### 3.2. Menu Lateral Direito (`#float-dash`)
Comportamento de Dock macOS (aproximação do ponteiro causa escala, blur de fundo).
**Itens com Tooltip:**
1. Dashboard
2. Avaliação de Inovação (`evaluation.html`)
3. Laboratório de Ideias (Ativo, `aria-current="page"`)
4. Workspace
5. Billing & Invoices
6. Experimentos

### 3.3. Coluna Principal (A Forja e Diagnóstico)
- **A Forja:** "Descreva a tese do problema, a população afetada e a evidência de ineficiência atual..."
- **Botão Primário:** `Gerar ideia`
- **Microtexto / Intent Hint:** "O dossiê central será preenchido com o seu prompt, gráficos e módulos de leitura rápida."
- **Checklist (Diagnóstico):** "Escopo do problema", "Segmentação de público", "Métrica de sucesso", "Atrito de mercado". Valores transitam de "Pendente" para "Detectado".
- **Pré-visualização Central:** Título "Painel de ideia" e corpo orientativo sobre preencher os dados do lado esquerdo para popular a tela.

---

## 4. Camada Agêntica e Confiança — Framework IAA

| Padrão | Aplicação na Tela |
|---|---|
| **Intent Preview** | O microtexto sob o botão CTA deixa claro: *"O dossiê central será preenchido com o seu prompt, gráficos..."* |
| **Explainable Rationale** | O "Diagnóstico da ideia" expõe os critérios (Checklist de componentes) exatos que o modelo busca na tese para considerá-la pronta. |
| **Confidence Signal** | O medidor visual (Gauge) de "Prontidão da tese", oferecendo labels claros como "Rigor insuficiente" ou "Pronto para processamento". |
| **Action Audit & Undo** | Armazenamento do prompt em `sessionStorage` e reflexão do mesmo no `Dossiê Resultante` como citação (quote), permitindo verificação histórica pela funcionalidade "Ver Histórico". |

---

## 5. Métricas & Validação — Framework HEART

Como medir o sucesso do design da tela `laboratorio-ideias`:
- **H (Happiness):** NPS focado na clareza das sugestões de refinamento da AI (as dicas de melhoria são úteis ou irritantes?).
- **E (Engagement):** Quantidade de palavras inseridas no campo *A Forja* após as intervenções da IA.
- **A (Adoption):** Proporção de usuários que migram de prompts curtos para descrições mais ricas com base nos feedbacks visuais do "Diagnóstico".
- **R (Retention):** Taxa de retorno de usuários para gerar novas teses ou refinar prompts antigos através de "Nova Moldagem".
- **T (Task Success):** % de sessões onde o usuário inicia uma tese (Typing) e efetivamente clica em "Gerar ideia" com sucesso (Enabled state atingido).
