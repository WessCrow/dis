# PROJECT_BRIEF — STARTER

> **Status:** Documento vivo — atualizado a cada sessão  
> **Criado em:** 2026-05-10  
> **Última atualização:** 2026-05-10

---

## 🎯 Visão Geral

**Nome do projeto:** STARTER  
**Objetivo principal:** Runtime modular de skills para inicialização, evolução e manutenção contínua de projetos  
**Problema que resolve:** Falta de consistência, contexto e governança no ciclo de vida de projetos — cada sessão recomeça do zero sem memória operacional

---

## 👤 Audiência

**Usuário primário:** Agente de IA operando no contexto do projeto  
**Usuário secundário:** Desenvolvedor/Designer dono do projeto  
**Contexto de uso:** Sessões de trabalho onde pedidos precisam ser interpretados, roteados e executados com consistência

---

## 📐 Escopo

### Incluso neste projeto
- Sistema de orquestração via `Start.md`
- Resolução de skills em ordem: local → linked → remota
- Caching de skills remotas
- Outputs vivos (brief, roadmap, architecture)
- Templates reutilizáveis para novos projetos
- Governance de Git e inicialização de projeto
- Skills locais: project-starter, web-design-cloner, ux-audit

### Explicitamente fora do escopo
- Execução de código de produção
- Gerenciamento de CI/CD automático
- Integração com ferramentas externas (além do que já existe em linked-skills)

---

## 🧩 Casos de Uso Principais

1. **Iniciar novo projeto**  
   Como agente, quero interpretar a intenção do usuário e criar toda a estrutura inicial com documentação viva.

2. **Aplicar alteração em projeto existente**  
   Como agente, quero ler o contexto atual, aplicar a mudança sem quebrar padrões e atualizar outputs automaticamente.

3. **Rotear para skill correta**  
   Como agente, quero sempre encontrar a skill mais aderente na ordem: local → linked → remota.

4. **Auditar UX de um produto**  
   Como agente, quero aplicar framework estruturado e gerar relatório priorizado.

---

## ⚙️ Restrições

**Tecnologia:** Markdown, arquivos locais, symlinks para linked-skills  
**Convenção:** Toda skill deve existir antes de ser chamada (nunca assumir)  
**Governance:** gitprotocol.md obrigatório antes de qualquer deploy

---

## 📊 Métricas de Sucesso

| Métrica | Meta |
|---|---|
| Skills resolvidas corretamente na ordem | 100% |
| Outputs atualizados após sessão significativa | 100% |
| Projetos iniciados com os 3 outputs preenchidos | 100% |
| Skills remotas salvas em cache antes de execução | 100% |

---

## 🗓️ Histórico

| Data | Mudança |
|---|---|
| 2026-05-10 | Criação da nova arquitetura modular (v2.0) |
| 2026-04-23 | INDEX.md e STRUCTURE.md atualizados |
| 2026-04-11 | Reorganização inicial da pasta /skills |
