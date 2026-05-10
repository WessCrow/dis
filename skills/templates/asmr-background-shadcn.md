# ASMR Static Background — integração (shadcn + Tailwind + TypeScript)

Referência para o fundo cinético em canvas (`ASMRStaticBackground`) no padrão **shadcn/ui** + **`@/lib/utils`** (`cn`).

Implementação no monorepo: `wtty/src/components/ui/asmr-background.tsx`, utilitário `wtty/src/lib/utils.ts` (`clsx` + `tailwind-merge`).

---

## 1. Dependências

```bash
npm install clsx tailwind-merge
```

---

## 2. Estrutura de pastas

| Caminho | Função |
|---------|--------|
| `src/components/ui/asmr-background.tsx` | Primitive de UI (canvas + overlay). |
| `src/lib/utils.ts` | `cn(...)` para mesclar classes Tailwind sem conflito. |

Se o CLI shadcn ainda não foi executado: `npx shadcn@latest init` cria `components.json` e o alias `@/`. No `wtty`, alias `@/` já está em `vite.config.ts` e `tsconfig.app.json`.

---

## 3. Por que `components/ui/` + `lib/utils`

- **shadcn** assume primitives em `components/ui` e `cn` em `lib/utils` para composição com o registry.
- O snippet original com `<script dangerouslySetInnerHTML>` **não** é adequado em React: no `wtty` o rastro do cursor usa `useEffect` + `setProperty` em `:root`.

---

## 4. API do componente

Props opcionais:

- `particleCount` — default `1000`, limitado entre 200 e 2500.
- `lang` — `'pt' | 'en'` textos do overlay.
- `showOverlay`, `showCursorRing` — defaults `true`.
- `className` — mesclado com `cn()` no wrapper (ex.: `absolute inset-0 h-full` quando embutido abaixo de header fixo).

Export: `ASMRStaticBackground` (nomeado) e `default`.

---

## 5. Integração no app

Ver modo **ASMR** no `App.tsx` (header: Partículas | ASMR). O canvas usa **`ResizeObserver`** + `getBoundingClientRect()` para preencher o container (não só `window.innerWidth`).

---

## 6. O que não se aplica ao prompt genérico

- **Unsplash / imagens** — não usados.
- **lucide-react** — opcional para ícones ao redor do overlay; o núcleo é só canvas.

---

**Última revisão:** alinhado ao `wtty` (Vite + React 19 + Tailwind 4).
