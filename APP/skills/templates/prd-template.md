# PRD — [Nome do Produto]

> **Arquivo:** `PRD.md` — salvar na raiz do projeto  
> **Versão:** 1.0  
> **Status:** Rascunho · Em revisão · Aprovado  
> **Última atualização:** [DATA]

---

## 1. Visão do Produto

**Problema que resolve:**  
[Descrever o problema real do usuário — não a solução]

**Solução proposta:**  
[O que o produto faz para resolver esse problema]

**Objetivo de negócio:**  
[Qual resultado mensurável se espera — ex: reduzir abandono em X%, aumentar conversão]

**Hipótese central:**  
Se [ação do produto], então [resultado esperado], porque [razão].

---

## 2. Usuários

### Persona primária
**Nome:** [ex: Ana, 32, Product Designer]  
**Contexto:** [onde está, o que faz, qual é o cenário de uso]  
**Dor principal:** [problema que tem hoje]  
**Objetivo:** [o que quer alcançar]  
**Comportamento relevante:** [como usa tecnologia, nível de experiência]

### Persona secundária (se houver)
**Nome:**  
**Contexto:**  
**Dor principal:**  
**Objetivo:**

---

## 3. Fora do escopo — desta versão

> Definir explicitamente evita scope creep e alinha expectativas.

- [ ] [Feature ou comportamento que não será implementado agora]
- [ ] [Ex: integração com X — previsto para v2]
- [ ] [Ex: suporte a mobile — apenas desktop nesta versão]

---

## 4. Features

> Cada feature tem: descrição · critérios de aceite · fluxos · estados · regras de negócio

---

### Feature 1 — [Nome da Feature]

**Descrição:**  
[O que essa feature faz e por que existe]

**Critérios de aceite:**
- [ ] [Comportamento específico e verificável — ex: "usuário consegue filtrar por data sem recarregar a página"]
- [ ] [Outro critério]
- [ ] [Outro critério]

**Fluxos:**

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | [ação] | [resposta] |
| 2 | [ação] | [resposta] |
| 3 | [ação] | [resposta] |

**Fluxo alternativo:**  
[Descrever caminho alternativo — ex: usuário sem permissão, dados não encontrados]

**Fluxo de erro:**  
[Descrever o que acontece quando algo dá errado — ex: API fora, timeout, dado inválido]

**Estados de UI:**

| Estado | Quando ocorre | O que mostrar |
|---|---|---|
| Empty | Nenhum dado disponível | [mensagem + ação sugerida] |
| Loading | Dados sendo carregados | [skeleton / spinner] |
| Loaded | Dados disponíveis | [conteúdo normal] |
| Partial | Dados parcialmente carregados | [o que mostrar] |
| Error | Falha na operação | [mensagem de erro + ação de recuperação] |
| Disabled | Feature indisponível no plano/perfil | [mensagem explicativa] |

**Regras de negócio:**
- [Regra específica — ex: "usuários Free podem criar até 3 projetos"]
- [Outra regra — ex: "data de expiração não pode ser anterior à data atual"]
- [Permissões por papel — ex: "apenas Admin pode deletar"]

**Fora do escopo desta feature:**
- [O que não será implementado nesta feature especificamente]

---

### Feature 2 — [Nome da Feature]

**Descrição:**  

**Critérios de aceite:**
- [ ]
- [ ]

**Fluxos:**

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | | |
| 2 | | |

**Fluxo alternativo:**  

**Fluxo de erro:**  

**Estados de UI:**

| Estado | Quando ocorre | O que mostrar |
|---|---|---|
| Empty | | |
| Loading | | |
| Loaded | | |
| Error | | |

**Regras de negócio:**
-

**Fora do escopo desta feature:**
-

---

## 5. Arquitetura de Informação

### Rotas / Páginas

| Rota | Página | Descrição | Auth necessária |
|---|---|---|---|
| `/` | Home | [descrição] | Não |
| `/dashboard` | Dashboard | [descrição] | Sim |
| `/[recurso]/:id` | Detalhe | [descrição] | Sim |

### Navegação principal
[Descrever estrutura de navegação — ex: sidebar, topbar, tabs]

---

## 6. Integrações e APIs

| Serviço | Propósito | Endpoints principais | Dados necessários |
|---|---|---|---|
| [ex: Supabase] | [ex: auth + banco] | [ex: /auth/login, /rest/v1/] | [ex: email, password] |
| [ex: Stripe] | [ex: pagamentos] | [ex: /checkout/sessions] | [ex: price_id, customer_id] |

---

## 7. Comportamento por Plano / Papel

| Feature | Free | Pro | Enterprise | Admin |
|---|---|---|---|---|
| [Feature 1] | ✅ (limite X) | ✅ (ilimitado) | ✅ | ✅ |
| [Feature 2] | ❌ | ✅ | ✅ | ✅ |
| [Feature 3] | ❌ | ❌ | ✅ | ✅ |

---

## 8. Métricas de Sucesso

| Métrica | Baseline atual | Meta | Como medir |
|---|---|---|---|
| [ex: Taxa de ativação] | [ex: 20%] | [ex: 35%] | [ex: % de usuários que completam onboarding] |
| [ex: Tempo até primeira ação] | [ex: 4 min] | [ex: 2 min] | [ex: analytics de sessão] |
| [ex: Taxa de retenção D7] | [ex: 40%] | [ex: 55%] | [ex: cohort analysis] |

---

## 9. Perguntas em Aberto

> Registrar o que ainda não foi decidido. Resolver antes de implementar.

- [ ] [Pergunta — ex: "Como tratar usuário sem email verificado?"]
- [ ] [Pergunta — ex: "Qual o limite de upload de arquivo?"]

---

## 10. Histórico de Versões

| Versão | Data | Mudança | Autor |
|---|---|---|---|
| 1.0 | [DATA] | Versão inicial | |
