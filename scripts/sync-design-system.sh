#!/usr/bin/env bash
# sync-design-system.sh — espelha tokens canônicos do design-system/ para os consumidores
# que não conseguem importar diretamente (Turbopack bloqueia paths fora do projeto).
#
# Uso: bash scripts/sync-design-system.sh
# Idealmente rodar antes de `npm run dev` ou `npm run build` da landing-page.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/design-system/vercel-geist/tokens"
LP_TOKENS="$ROOT/landing-page/src/styles/tokens"
LP_FONTS="$ROOT/landing-page/public/fonts"
DS_FONTS="$ROOT/design-system/fonts"

echo "→ Sync tokens: $SRC → $LP_TOKENS"
mkdir -p "$LP_TOKENS"
cp "$SRC/geist-semantic.css"        "$LP_TOKENS/"
cp "$SRC/typography-utilities.css"  "$LP_TOKENS/"

echo "→ Sync fontes TTArtnikDemo: $DS_FONTS → $LP_FONTS"
mkdir -p "$LP_FONTS"
cp "$DS_FONTS"/*.ttf "$LP_FONTS/"

echo "✓ Design system sincronizado."
