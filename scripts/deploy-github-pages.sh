#!/usr/bin/env bash
# Deploy: landing (Next export) + APP protótipos → branch gh-pages
# Site: https://wesscrow.github.io/dis/  |  APP: …/dis/APP/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Build landing-page (basePath /dis)…"
cd "$ROOT/landing-page"
if [[ ! -d node_modules ]]; then
  npm ci
fi
DEPLOY_GH=true npm run build

echo "→ Montar APP/ em out/APP (symlinks resolvidos)…"
mkdir -p "$ROOT/landing-page/out/APP"
rsync -aL --delete "$ROOT/APP/public/" "$ROOT/landing-page/out/APP/"
cat > "$ROOT/landing-page/out/APP/index.html" <<'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=laboratorio-ideias.html" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Disrupta APP</title>
    <link rel="canonical" href="laboratorio-ideias.html" />
  </head>
  <body>
    <p><a href="laboratorio-ideias.html">Abrir protótipo Disrupta APP</a> · <a href="storybook.html">Storybook</a></p>
  </body>
</html>
EOF

touch "$ROOT/landing-page/out/.nojekyll"
cd "$ROOT/landing-page"
echo "→ Publicar gh-pages…"
npx --yes gh-pages@6.3.0 -d out -t -m "Deploy: landing + APP protótipos"

echo "✓ https://wesscrow.github.io/dis/APP/"
