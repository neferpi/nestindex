#!/usr/bin/env bash
# Refresh NestIndex public/stats.json from Cloudflare Web Analytics (RUM).
# Optionally merges CF edge metrics as edgeVisits for comparison.
#
# Usage (from nestindex repo root):
#   ./scripts/refresh-stats.sh
#   SKIP_EDGE=1 ./scripts/refresh-stats.sh   # RUM only
#
# Then: npm run build && wrangler pages deploy out --project-name=nestindex
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RUM_PY="${PAGES_RUM_PY:-/workspace/scripts/pages-rum.py}"
EDGE_PY="${PAGES_TRAFFIC_PY:-/workspace/scripts/pages-traffic.py}"
TMP_RUM="${TMPDIR:-/tmp}/pages-rum.$$.json"
TMP_EDGE="${TMPDIR:-/tmp}/pages-traffic.$$.json"

cleanup() { rm -f "$TMP_RUM" "$TMP_EDGE"; }
trap cleanup EXIT

echo "Fetching Cloudflare Web Analytics (RUM)…"
python3 "$RUM_PY" > "$TMP_RUM"

if [[ "${SKIP_EDGE:-0}" == "1" ]]; then
  echo "Skipping edge fetch (SKIP_EDGE=1)"
  node "$ROOT/scripts/write-stats.mjs" "$TMP_RUM"
else
  echo "Fetching Cloudflare edge traffic (optional edgeVisits)…"
  python3 "$EDGE_PY" > "$TMP_EDGE"
  node "$ROOT/scripts/write-stats.mjs" "$TMP_RUM" --edge "$TMP_EDGE"
fi

echo "Ready for build. Sample unitnest:"
node -e "
const s=require('$ROOT/public/stats.json');
const u=s.sites.find(x=>x.host==='unitnest.pages.dev');
console.log(JSON.stringify(u,null,2));
console.log('note:', s.note.slice(0,80)+'…');
"
