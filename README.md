# NestIndex

**every Nest tool, ranked by real browser sessions (Cloudflare Web Analytics).**

Public static gallery of [neferpi](https://github.com/neferpi) Nest tools, sorted by Cloudflare **Web Analytics (RUM)** visits — JS beacon browser sessions, closer to real people than CF edge crawler counts. Still not perfect unique humans.

- Live: https://nest.darthcassan.com  
- Cloudflare Pages preview may remain at `*.pages.dev`  
- Repo: https://github.com/neferpi/nestindex

## Stack

- Next.js App Router + TypeScript + Tailwind
- Static export (`output: 'export'`, `images.unoptimized: true`)
- Client fetch of `/stats.json` for ranking (no Cloudflare token in the frontend)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# → out/  (includes out/stats.json)
```

## Catalog

Project metadata is hardcoded in `src/lib/projects.ts` (slug, name, pitch, category, live URL, Cloudflare host, GitHub URL, accent). Hosts may get a `-suffix` on Pages after first deploy; patch `host` / `url` if needed. Extensions without a Pages host (NestPin) show n/a.

## Daily stats refresh

Stats are **precomputed** into `public/stats.json`. The site never calls Cloudflare APIs.

**Honesty:** `visits` / `pageviews` are Cloudflare Web Analytics (JS beacon). Closer to real browsers than edge metrics; still not perfect unique humans (adblockers, shared devices, etc.). UI labels say “Real browsers · 7d”. Optional `edgeVisits` may be included for comparison.

Shape:

```json
{
  "updatedAt": "2026-09-15T17:00:00Z",
  "window": "7d",
  "note": "Cloudflare Web Analytics browser sessions (JS beacon) — …",
  "sites": [
    { "host": "cronnest.pages.dev", "visits": 5, "pageviews": 10, "edgeVisits": 147, "requests": 973 }
  ]
}
```

### One-shot helper

```bash
# from nestindex repo root — fetches RUM (+ optional edge) → public/stats.json
./scripts/refresh-stats.sh
# SKIP_EDGE=1 ./scripts/refresh-stats.sh   # RUM only
```

### From `pages-rum.py` manually

On the box: `/workspace/scripts/pages-rum.py`. Prints JSON with `note`, `window`, `last_7d` map of host → `{visits, pageviews}`.

```bash
python3 /workspace/scripts/pages-rum.py > /tmp/pages-rum.json
python3 /workspace/scripts/pages-traffic.py > /tmp/pages-traffic.json   # optional
node scripts/write-stats.mjs /tmp/pages-rum.json --edge /tmp/pages-traffic.json
```

Or pipe RUM only:

```bash
python3 /workspace/scripts/pages-rum.py | node scripts/write-stats.mjs -
```

Then rebuild / redeploy so `out/stats.json` ships with the site:

```bash
npm run build
npx wrangler@3.114.15 pages deploy out --project-name=nestindex
```

## Pages

| Path | Description |
|------|-------------|
| `/` | Gallery grid sorted by RUM visits desc; optional category filter |
| `/about` | What NestIndex is, stats source (WA ≠ edge), privacy |

## License

MIT — see repo; tools remain under their own licenses.
