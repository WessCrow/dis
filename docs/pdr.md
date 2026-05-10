# PDR: Matriz de Inteligência e Fontes de Dados (MVP Disrupta)

## 1. Objetivo Técnico
Definir as fontes de dados e a lógica de processamento que a IA deve simular para transformar o "Original Prompt" do usuário num **Resultado do Laboratório** (relatório) de alto rigor técnico. Isto garante a defensabilidade do "Efeito Espelho".

## 2. Matriz de Mapeamento (Input vs. Fonte)

| Componente do Relatório | O que a IA analisa | Fonte Simulada (Simulated API) |
| :--- | :--- | :--- |
| **Problem Fundamentals** | Maturidade do setor e volume de buscas. | Google Trends API / Statista |
| **Trends & Market Shift** | Sinais de ruptura e adoção tecnológica. | Gartner / Gartner / TechCrunch Index |
| **Idea Classification** | Similaridade com patentes e soluções existentes. | Google Patents / Product Hunt API |
| **Target Population** | Volume de CPFs/CNPJs afetados pela dor. | LinkedIn Sales Navigator / IBGE / Eurostat |
| **Adoption Friction** | Barreiras regulatórias e custos de troca (Switching Cost). | Relatórios de Setor (ex: McKinsey/Deloitte) |

## 3. Lógica para Geração de Scores (Mock Data Logic)
Para que o botão "Avançar para Validação" seja credível, os scores mockados devem seguir estas premissas:

### A. Score de Exequibilidade (Feasibility Score)
- **Cálculo Simulado:** Se a ideia envolve "Hardware" ou "BioTech", o score base é **-30%**. Se for "SaaS" ou "Software", o score base é **+40%**.
- **Fator IA:** A IA deve procurar palavras-chave como "Automação", "API" ou "Integração" para aumentar o score.

### B. Atrito de Adoção (Adoption Friction)
- **Alto:** Se a solução exige que o usuário mude um hábito cultural (ex: parar de usar e-mail).
- **Médio:** Se a solução substitui uma ferramenta cara por uma barata (ex: ERP legado por SaaS).
- **Baixo:** Se a solução é invisível ou integrada ao fluxo atual (ex: um plugin).

### C. Estimativa TAM/SAM/SOM
- A IA deve extrair o "Setor" (ex: Marketing Digital) e aplicar um multiplicador padrão de mercado (ex: Marketing Digital Global = $600B) para gerar os números no card de preview.

## 4. Prompt Engineering para o Resultado do Laboratório
Instrução para a LLM que processa o relatório:

> "Aja como um Consultor de Estratégia da McKinsey. Analise o prompt do usuário: [PROMPT]. 
> 1. Identifique o setor primário. 
> 2. Projete 3 tendências científicas/técnicas que impactam este setor em 2024. 
> 3. Gere 5 'Reflective Questions' que forcem o usuário a pensar na condição de sobrevivência do modelo.
> 4. Retorne os dados estruturados no formato JSON para a UI."

## 5. Especificações de UI para o Cursor (Visualização de Dados)
Ao renderizar o "Executive Summary Preview", o Cursor deve utilizar:
- **Bullet Graphs:** Para comparar o score da ideia com a média do setor.
- **Micro-copy Técnico:** Usar termos como 'Moat Defense', 'Scalability Cap' e 'Unit Economics Preview' para reforçar o rigor.