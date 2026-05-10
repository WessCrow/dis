#!/usr/bin/env bash
# Monta ./public para deploy estático na Vercel.
# Source: src/  |  Brand assets: assets/brand/  |  Tokens: design-system/vercel-geist/tokens/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
rm -rf public
mkdir public
shopt -s nullglob
for path in "$ROOT"/src/*; do
  base="$(basename "$path")"
  case "$base" in
    .vercel) continue ;;
  esac
  cp -R "$path" "$ROOT/public/"
done
cp -R "$ROOT/assets/brand" "$ROOT/public/img"
mkdir -p "$ROOT/public/vercel-geist-tokens"
cp -R "$ROOT/design-system/vercel-geist/tokens/." "$ROOT/public/vercel-geist-tokens/"
