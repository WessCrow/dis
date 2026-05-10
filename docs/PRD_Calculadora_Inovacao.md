# PRD — Calculadora de Inovação Disrupta (v2.0)

## 1. Visão Geral
A Calculadora de Inovação é a ferramenta de triagem inicial do ecossistema Disrupta. Ela permite que utilizadores validem a viabilidade de uma ideia através da metodologia SIID antes de avançarem para o Laboratório de Ideias.

**Status:** Implementado (Paridade Total com Laboratório)
**Design System:** Bugatti (Stark Mode / Absolute Black)

---

## 2. Experiência do Usuário (UX) & Design de Conteúdo

### I. Camada Visual & Alinhamento
- **Corredor Central:** O conteúdo é centralizado em um container de `1000px`, garantindo foco e legibilidade.
- **Header Compartimentado:** Unificação total com o Laboratório, incluindo boxes de bordas secas (`1px solid var(--ds-c-4)`) para Tokens, Notificações e Perfil.
- **Microtexto SIID:** Feedbacks qualitativos dinâmicos para cada nota (1-5), eliminando a ambiguidade na pontuação.

### II. Fluxos Principais (Matriz FEER)

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | Inserção da Ideia | O campo "Sua ideia em uma frase" é obrigatório. |
| 2 | Descrição da Dor | Campo opcional para aprofundar o problema resolvido. |
| 3 | Pontuação SIID | Seleção de notas de 1 a 5 em 8 dimensões estratégicas. |
| 4 | Validação | Botão "VALIDAR IDEIA" habilita apenas após preenchimento total. |

---

## 3. Especificações Técnicas (Engenharia)

### I. Componentes & Organismos
- **Header Tools:**
    - `lab-tokens-box`: Gestão de saldo e upgrade.
    - `lab-notify-trigger`: Aciona o `lab-notify-dialog` (Histórico).
    - `lab-profile-trigger`: Aciona o `lab-profile-dialog` (Identidade e Idioma).
- **SIID Grid:** Grid responsivo que transita de 3 colunas para lista única em dispositivos móveis.

### II. Estados de UI
- **Empty:** Inputs vazios e score em `0/40`.
- **Partial:** Pontuação em andamento, botão de validação `disabled`.
- **Loaded:** 8 critérios preenchidos + texto de ideia, botão `enabled`.
- **Dialogs:** Estado `open` via API nativa `<dialog>`, com `backdrop` escurecido.

---

### III. Regras & Governança
- **Acessibilidade:** Uso de `aria-selected` nas abas de histórico e `aria-labelledby` em todos os modais.
- **Tokens:** `@import` de tokens Geist localizados em `src/vercel-geist-tokens/` para garantir fidelidade cromática.
- **Ativos:** Imagens servidas a partir da raiz `src/img/` para compatibilidade com o servidor local de desenvolvimento.

---

## 4. Métricas de Sucesso (HEART)
- **Task Success:** Conclusão da validação SIID (preenchimento dos 8 campos).
- **Adoption:** Migração da Calculadora para o Laboratório de Ideias (click-through no resultado).
- **Happiness:** Percepção de valor nos feedbacks qualitativos da escala 1-5.
