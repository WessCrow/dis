# Particle Text Effect — integração (shadcn + Tailwind + TypeScript)

Skill de referência para colar o efeito de texto com partículas (canvas 2D) em projetos alinhados à **estrutura shadcn/ui**, **Tailwind CSS** e **TypeScript**.

Implementação de referência no monorepo: `wtty/`

- `src/components/ui/particle-text-effect.tsx` — primitive (canvas + props de tuning).
- `src/components/ui/particle-text-editor.tsx` — **ferramenta de edição** (painel lateral: palavras, sliders, cor da máscara, dimensões, aplicar / restaurar), layout grid + zinc (alinhado a padrões de UI premium, sem emoji).
- Vista **Partículas** no `App.tsx` usa o editor; import `@/components/ui/particle-text-editor`.

---

## 0. Pré-requisitos do projeto

| Requisito | Como conferir / instalar |
|-----------|---------------------------|
| **TypeScript** | `tsconfig.json` com `"strict": true` (recomendado). Projeto novo: `npm create vite@latest` e escolher React + TS. |
| **Tailwind CSS** | v4 com Vite: `@tailwindcss/vite` no `vite.config`; ou seguir [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite). |
| **shadcn/ui** (opcional mas recomendado para design system) | `npx shadcn@latest init` — gera `components.json`, alias `@/`, pasta `src/components/ui/`. |

Se o projeto **não** tiver shadcn ainda, rode o CLI acima **ou** crie manualmente:

- `src/components/ui/` — primitives reutilizáveis (padrão shadcn).
- `src/lib/utils.ts` — tipicamente `cn()` com `clsx` + `tailwind-merge` (este componente **não exige** `cn`; só usa classes Tailwind no JSX).

---

## 1. Por que `src/components/ui/`?

- O **shadcn CLI** instala componentes em `components/ui` por convenção; documentação e exemplos importam `@/components/ui/button`, etc.
- Separar **`ui/`** de **`components/`** deixa claro: primitivas genéricas vs. componentes de domínio da aplicação.
- Se o seu repo usa outro caminho, ajuste `components.json` (`aliases`) e o **mesmo** caminho no bundler (`tsconfig` `paths` + Vite `resolve.alias`).

---

## 2. Alias `@/` (TypeScript + Vite)

**`tsconfig.app.json`** (ou equivalente):

```json
"compilerOptions": {
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

(Em TypeScript recente, `baseUrl` com `paths` pode ser deprecado; `paths` relativos ao diretório do `tsconfig` costumam bastar — como no `wtty`.)

**`vite.config.ts`:**

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**Next.js:** o `init` do shadcn costuma configurar `@/` em `tsconfig` automaticamente.

---

## 3. Arquivo do componente

- **Caminho:** `src/components/ui/particle-text-effect.tsx` (kebab-case, como no registry shadcn).
- **Next.js App Router:** primeira linha do arquivo: `"use client"`.
- **Vite / CRA:** **não** use `"use client"` (diretiva específica do RSC).

### Melhorias aplicadas em relação ao snippet “cru”

1. **`runningRef` + `cancelAnimationFrame`** no cleanup do `useEffect` — o loop de `requestAnimationFrame` para ao desmontar (evita leak e CPU em abas fechadas).
2. **`wordsRef`** — lista de palavras atualizada sem re-montar o efeito inteiro a cada render.
3. **Tipagem** de `animationRef` como `number | undefined`.
4. **Props opcionais** `lang?: 'pt' | 'en'` para textos de rodapé (i18n leve).

Props públicas:

- `words?: string[]` — default pode ser branding do produto ou o array do exemplo original (`HELLO`, `21st.dev`, …).

---

## 4. Dependências externas

- **Nenhuma** além de React. Não exige `lucide-react`, imagens Unsplash nem context providers.
- Se quiser ícones ou imagens à volta do canvas, adicione depois com `lucide-react` / assets estáticos.

---

## 5. Uso (demo)

```tsx
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';

export function DemoParticleText() {
  return <ParticleTextEffect />;
}
```

Com palavras e idioma:

```tsx
<ParticleTextEffect
  lang="pt"
  words={['PRODUTO', 'ASCII', 'MOTION']}
/>
```

---

## 6. Checklist de integração (agente / dev)

1. Garantir **TS + Tailwind** no projeto; opcionalmente `shadcn init`.
2. Criar pasta **`src/components/ui/`** se não existir.
3. Colar **`particle-text-effect.tsx`** nessa pasta (com `"use client"` só se for Next App Router).
4. Configurar alias **`@/`** em `tsconfig` e no bundler (Vite `resolve.alias`).
5. Importar onde fizer sentido (página demo, rota `/lab`, ou toggle na `App` principal).
6. Perguntas úteis antes de integrar em produção:
   - Que **textos** entram em `words`? (marketing, marquee, nomes de features)
   - Precisa de **estado global**? (normalmente não; o canvas é autossuficiente.)
   - **Responsivo:** o canvas tem tamanho interno fixo (1000×500); o CSS `maxWidth: 100%` escala visualmente — ajuste `canvas.width/height` se precisar de DPI / layout fluido real.
   - **Onde na app:** telas de “showcase”, sobre, ou alternador de modo (como no `wtty`).

---

## 7. O que **não** fazer literalmente do prompt genérico

- “Preencher com imagens Unsplash” — **não se aplica** a este componente (só canvas + texto).
- “Instalar ícones lucide” — **opcional**, não obrigatório para o efeito funcionar.

---

**Última revisão:** alinhado ao `wtty` (Vite + React 19 + Tailwind 4).
