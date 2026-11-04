#!/usr/bin/env bash
# Descarga las fotos de la web antigua (Wix) a assets/img/, redimensionadas a 2000 px como máximo.
# Uso (Mac/Linux), desde la carpeta de la web:   bash descargar-imagenes.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/img
grep -v '^#' imagenes.txt | while read -r nombre id; do
  [ -z "$nombre" ] && continue
  url="https://static.wixstatic.com/media/$id/v1/fit/w_2000,h_2000,q_85/$nombre"
  if curl -fsSL "$url" -o "assets/img/$nombre"; then echo "✓ $nombre"
  else curl -fsSL "https://static.wixstatic.com/media/$id" -o "assets/img/$nombre" && echo "✓ $nombre (original)" || echo "✗ $nombre"; fi
done
echo "Listo."
