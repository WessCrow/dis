# Disrupta APP

Protótipos HTML do ecossistema Disrupta (Laboratório de Ideias, Calculadora, Avaliação SIID).

## Início rápido

```bash
# Servir localmente (qualquer servidor estático na pasta public)
npx --yes serve public
```

Abrir: [http://localhost:3000/laboratorio-ideias.html](http://localhost:3000/laboratorio-ideias.html) (porta pode variar).

## GitHub Pages

O site [wesscrow.github.io/dis](https://wesscrow.github.io/dis/) é publicado na branch **`gh-pages`** (landing Next.js). Os protótipos ficam em **`/APP/`** nessa branch — não basta push em `main`.

| Página | URL publicada |
|--------|----------------|
| APP (entrada) | https://wesscrow.github.io/dis/APP/ |
| Laboratório | https://wesscrow.github.io/dis/APP/laboratorio-ideias.html |
| Storybook | https://wesscrow.github.io/dis/APP/storybook.html |

Deploy (no clone do repo [WessCrow/dis](https://github.com/WessCrow/dis)):

```bash
bash scripts/deploy-github-pages.sh
```

## Mapa do repositório

| Caminho | Conteúdo |
|---|---|
| [`public/`](public/) | App deployável (Vercel) |
| [`design-system/`](design-system/) | Tokens, previews, README do DS |
| [`src/features/`](src/features/) | `SPEC.md` por feature (governança V2) |
| [`docs/`](docs/) | PRDs, PDRs, copy — ver [`docs/README.md`](docs/README.md) |
| [`skills/`](skills/) | Runtime de agentes — começar em [`skills/governance/Start.md`](skills/governance/Start.md) |
| [`CONTEXT.md`](CONTEXT.md) | Estado global do projeto (≤50 linhas) |

## Páginas

| Página | Arquivo |
|---|---|
| Laboratório de Ideias | `public/laboratorio-ideias.html` |
| Calculadora SIID (canónica) | `public/evaluation-v2.html` |
| Avaliação SIID (redirect) | `public/evaluation.html` → v2 |
| Avaliação de Inovação (resultado) | `public/evaluation-result.html` |
| Storybook (DS + app) | `public/storybook.html` |

Fluxo: **evaluation** → VALIDAR IDEIA → **evaluation-result** (item ativo no menu lateral).

## Agentes (Cursor)

1. Ler `skills/governance/RULES.md`
2. Ler `CONTEXT.md`
3. Identificar feature → carregar `src/features/<nome>/SPEC.md`
4. Seguir `skills/governance/Start.md`
