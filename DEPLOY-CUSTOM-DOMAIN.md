# Deploy NestIndex on Cloudflare Pages (custom domain)

Canonical site: **https://nest.darthcassan.com**  
Repo: [neferpi/nestindex](https://github.com/neferpi/nestindex)

`SITE_URL` in `src/lib/site.ts` is already set to the custom domain (used for sitemap, robots, Open Graph).

## 1. Create the Pages project

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize GitHub if needed
3. Select repository **`neferpi/nestindex`**
4. Production branch: **`main`**

## 2. Build settings

| Setting | Value |
|--------|--------|
| Framework preset | Next.js (Static HTML Export) or None |
| Build command | `npm ci && npm run build` |
| Build output directory | **`out`** |

Confirmed in `next.config.ts`: `output: "export"` (static export → `out/`).

No Node server / SSR adapter required.

## 3. Custom domain

1. Pages project → **Custom domains** → **Set up a domain**
2. Enter **`nest.darthcassan.com`**
3. Follow Cloudflare’s DNS instructions (usually automatic if the zone is on the same account)

## 4. DNS (if you add it manually)

In the **darthcassan.com** zone:

| Type | Name | Target |
|------|------|--------|
| CNAME | `nest` | `<your-pages-project>.pages.dev` |

Use the exact target Cloudflare shows for this project (often `nestindex.pages.dev` or a project-specific `*.pages.dev`). Proxied (orange cloud) is fine.

`*.pages.dev` can remain as the Cloudflare preview / fallback URL.

## 5. After go-live checklist

- [ ] https://nest.darthcassan.com loads
- [ ] https://nest.darthcassan.com/sitemap.xml exists
- [ ] https://nest.darthcassan.com/robots.txt points at that sitemap
- [ ] https://nest.darthcassan.com/about loads
- [ ] HTTPS / certificate active (Cloudflare manages this)

## Notes

- Pushing to `main` triggers a new Pages deploy when Git is connected.
- Do **not** deploy this site to a different (e.g. pitou) Cloudflare account for production — use Daniel’s Cloudflare for `darthcassan.com`.
- Stats (`public/stats.json`) still key off analytics hosts; update hosts later if RUM moves to custom domains.
