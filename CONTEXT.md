# CONTEXT.md

## 📌 Estado Atual
- **Projeto:** Disrupta Lab - Landing Page
- **Fase:** UX, Refatoração Visual (Brutalist) e Deploy Vercel
- **Último Trabalho:** Equalização de ritmo vertical (gaps de 192px), remoção de bordas arredondadas para adoção do estilo Brutalist, inicialização do repositório Git e deploy do projeto na Vercel.
- **Próximo Passo:** Configurar repositório remoto no GitHub do usuário e avançar na integração do form/aplicativo de auditoria.

## 🎨 Design System
- **Variáveis de Cor:** `ds-bg-1`, `ds-bg-2`, `ds-c-4`, `ds-c-9`, `ds-c-10`, `ds-blue`.
- **Componentes:** 
  - `Navbar`
  - `Hero` (WovenLightHero com Black Hole Engine em Three.js)
  - `ValidationRigor`
  - `WasteNotSection`
  - `AuditGrid`
  - `DoomSection`

## 🛠️ Decisões Tomadas
- **UX Writing (CTA):** "Acessar Protocolo de Validação" foi alterado para "Iniciar Validação Técnica". Traz o usuário para o contexto de ação sem jargão burocrático, preservando a autoridade.
- **Acessibilidade & POUR:** Implementada navegação visível por teclado (`focus:ring`, `focus:underline`) no CTA e rodapé.
- **Semântica (W3C):** `div#method` convertido em `section#method`. Inclusão obrigatória do `type="button"` conforme as diretrizes estritas do `RULES.md`.
- **Next.js Routing:** Tags `<a>` convertidas para `<Link>` do `next/link` no footer para evitar âncoras cegas (`href="#"`) que quebram acessibilidade por teclado.
- **Design Brutalista:** Remoção absoluta de bordas arredondadas e varíaveis de radius nos tokens, garantindo linhas secas e retas como decisão de posicionamento técnico/incisivo.
- **Ritmo Vertical:** Solução do "padding duplo" equalizando o espaçamento entre as seções para 48 unidades Tailwind (`192px`).
- **Deploy Setup:** Git local inicializado e deploy imediato na Vercel (Production) concluído sem interrupções.

## ⚠️ Atenção (Armadilhas Descobertas)
- Tempos de transição excessivamente longos (`duration-1000`) em botões interativos podem simular "lag" na interface. Mantido em `duration-300` para garantir uma resposta tátil rápida (FEER - States).
