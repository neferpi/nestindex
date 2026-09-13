# NestIndex

**every Nest tool, ranked by real traffic.**

Public static gallery of [neferpi](https://github.com/neferpi) Nest tools, sorted by Cloudflare view counts.

- Live (expected): https://nestindex.pages.dev  
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

Do **not** deploy Cloudflare from this agent — Pitou deploys Pages.

## Catalog

Project metadata is hardcoded in `src/lib/projects.ts` (slug, name, pitch, category, live URL, Cloudflare host, GitHub URL, accent). Hosts may get a `-suffix` on Pages after first deploy; patch `host` / `url` if needed.

## Daily stats refresh

Stats are **precomputed** into `public/stats.json`. The site never calls Cloudflare APIs.

Shape:

```json
{
  "updatedAt": "2026-09-13T10:00:00Z",
  "window": "7d",
  "sites": [
    { "host": "cronnest.pages.dev", "visits": 0, "requests": 0 }
  ]
}
```

### From `pages-traffic.py`

On the box, Pitou’s script lives at `/workspace/scripts/pages-traffic.py`. It prints JSON with `last_7d` / `last_24h` maps of host → `{visits, requests, bytes}`.

Merge into NestIndex:

```bash
# from nestindex repo root
python3 /workspace/scripts/pages-traffic.py > /tmp/pages-traffic.json
node scripts/write-stats.mjs /tmp/pages-traffic.json
# writes public/stats.json (uses last_7d)
```

Or pipe:

```bash
python3 /workspace/scripts/pages-traffic.py | node scripts/write-stats.mjs -
```

### From a plain host map

```bash
echo '{"cronnest.pages.dev":{"visits":12,"requests":40}}' | node scripts/write-stats.mjs -
```

Then rebuild / redeploy so `out/stats.json` ships with the site:

```bash
npm run build
```

## Pages

| Path | Description |
|------|-------------|
| `/` | Gallery grid sorted by visits desc; optional category filter |
| `/about` | What NestIndex is, stats source, privacy |

## License

MIT — see repo; tools remain under their own licenses.
