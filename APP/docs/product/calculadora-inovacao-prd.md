# Product Requirements Document (PRD): Módulo de Avaliação de Inovação

## 1. Visão Geral do Produto
O módulo de **Avaliação de Inovação** é uma ferramenta projetada para permitir que usuários qualifiquem e validem ideias de projetos ou novos negócios através de critérios objetivos e subjetivos, confrontando-os com evidências públicas e sinais externos.

## 2. Objetivos Principais
- Fornecer uma estrutura padronizada para descrição de ideias.
- Quantificar o potencial de sucesso através da metodologia SIID.
- Orientar o usuário através de feedbacks dinâmicos durante o preenchimento.

## 3. Personas
- **Inovadores/Empreendedores:** Usuários que precisam validar se uma ideia tem mérito antes de investir recursos.
- **Gestores de Produto:** Profissionais que avaliam múltiplos conceitos para priorização de roadmap.

## 4. Requisitos de Interface (UI) e Funcionalidades

### 4.1. Cabeçalho e Navegação
- **Logo/Ícone:** Placeholder quadrado para identidade visual.
- **Título da Página:** "Avaliação de Inovação" (H1).
- **Subtexto:** "Confronta sua ideia com o mundo real usando evidência pública e sinais externos".
- **Botão "Ver Histórico":** Ação secundária (ícone de relógio) para acessar avaliações anteriores.

### 4.2. Banner de Suporte (CTA)
- **Função:** Encaminhar usuários que ainda não têm uma ideia madura para o ambiente de rascunho.
- **Elementos:** 
    - Caixa horizontal com bordas arredondadas.
    - Título "Não sabe como preencher?".
    - Subtexto instrutivo sobre o uso do Laboratório.
    - Botão primário "Ir para Laboratório" (com ícone de lâmpada).

### 4.3. Estrutura do Formulário (Layout de Colunas)
O corpo principal utiliza um grid de duas colunas (proporção aprox. 70/30).

#### Coluna da Esquerda: Entrada de Dados (Formulário)
- **Bloco 1: Contexto da Ideia**
    - **Label:** "Sua ideia em uma frase *" (Campo Obrigatório).
    - **Instrução:** Texto explicativo "(Contexto da Ideia)".
    - **Input:** Área de texto grande com placeholder exemplificando uma plataforma para agricultores.
- **Bloco 2: Descrição da Dor**
    - **Label:** "Que problema isso resolve?".
    - **Instrução:** Texto explicativo "(Descrição da Dor)" indicando ser opcional.
    - **Input:** Área de texto média com placeholder sobre perdas de receita.

#### Coluna da Direita: Card de Status e Ação
- **Título do Card:** "Pontuações SIID".
- **Indicador de Total:** Display destacado com "Total" e o valor (ex: 24/40).
- **Badge de Custo:** Tag visual com ícone de diamante (ex: "15 tokens").
- **Botão Principal:** "Validar Ideia" (Full Width, destaque visual).

### 4.4. Seção Detalhada: Critérios SIID
Seção inferior para avaliação granular baseada em 8 dimensões.

- **Controles de Seção:**
    - **Toggle:** Interruptor para "Mostrar nomes da metodologia".
    - **Barra de Pontuação:** Display horizontal que fixa o total (24/40) para acompanhamento.

- **Componente de Critério (Repetitivo):**
    Cada critério (Ajuste Estratégico, Potencial de Inovação, Dificuldade, Demanda, Vantagem Competitiva, Recursos, Risco e Escalabilidade) possui:
    1. **Pergunta:** Texto em destaque (ex: "Quão difícil é construir e operar isso?").
    2. **Escala 1-5:** Conjunto de 5 botões quadrados. O selecionado deve ter preenchimento de cor (ex: Verde).
    3. **Feedback Quantitativo:** Caixa de texto ao lado da escala que descreve a nota (ex: "Moderado: Complexidade média...").

## 5. Regras de Negócio e Lógica
- **Cálculo da Pontuação:** Soma simples (Σ) das notas dos 8 critérios.
- **Validação de Envio:** O botão "Validar Ideia" só deve ser liberado se o campo "Sua ideia em uma frase" possuir conteúdo e todos os 8 critérios tiverem uma nota selecionada.
- **Consumo de Créditos:** A ação de validar deve disparar o débito de 15 tokens da conta do usuário.

## 6. Requisitos Não Funcionais
- **Responsividade:** O layout deve colapsar para coluna única em telas < 768px.
- **Estado Visual:** Uso de Dark Mode conforme a referência visual (fundo escuro, textos claros e acentos em verde).
- **Feedback de Interface:** Animação suave na troca de textos de feedback dos critérios.

---

### Apêndice — Matriz de Governança (Designer2627)

#### A. Fluxos (FEER)
| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1. Identificação | Preenche "Ideia em uma frase" | Habilita seção de critérios se > 12 chars. |
| 2. Qualificação | Seleciona notas (1-5) nos 8 critérios | Atualiza "Pontuações SIID" (Real-time). |
| 3. Validação | Clica em "Validar Ideia" | Valida saldo (15 tokens), processa e redireciona. |

#### B. Camada Agêntica (IAA Framework)
- **Intent Preview:** "Ao validar, nossa IA cruzará sua percepção de [Dimensão] com sinais de mercado atuais."
- **Confidence Signal:** Display SIID (ex: 24/40) como indicador de maturidade do input.
