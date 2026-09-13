#!/usr/bin/env node
/**
 * Merge host→{visits,requests} JSON into public/stats.json
 *
 * Usage:
 *   node scripts/write-stats.mjs input.json
 *   echo '{"cronnest.pages.dev":{"visits":12,"requests":40}}' | node scripts/write-stats.mjs -
 *
 * Input shapes accepted:
 *   1) { "host": { "visits": n, "requests": n }, ... }
 *   2) pages-traffic.py style:
 *      { "as_of": "...", "note": "...", "last_7d": { "host": { "visits", "requests", "bytes" }, ... } }
 *      → uses last_7d (visits key kept for compat; UI labels them as CF edge, not humans)
 *
 * Output: public/stats.json
 *   { "updatedAt": ISO8601, "window": "7d", "note": "...", "sites": [ { host, visits, requests } ] }
 *
 * Honesty: `visits` are Cloudflare edge visits (crawlers/probes count), NOT unique humans.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "public", "stats.json");

const KNOWN_HOSTS = [
  "stamply-cdm.pages.dev",
  "cronnest.pages.dev",
  "miltime-2tu.pages.dev",
  "chromanest.pages.dev",
  "calcnest-7k5.pages.dev",
  "unitnest.pages.dev",
  "nestindex.pages.dev",
  "pixnest-e9z.pages.dev",
  "nestkits-launch.pages.dev",
  "desarrolla.pages.dev",
  "rafterspace.pages.dev",
  "fishmouth.pages.dev",
];;

const DEFAULT_NOTE =
  "Cloudflare edge visits — crawlers and probes count; not unique humans.";

function readInput(arg) {
  if (!arg || arg === "-") {
    return JSON.parse(fs.readFileSync(0, "utf8"));
  }
  return JSON.parse(fs.readFileSync(arg, "utf8"));
}

function normalize(raw) {
  let map = raw;
  let updatedAt = new Date().toISOString();
  let window = "7d";
  let note = DEFAULT_NOTE;

  if (raw && typeof raw === "object" && raw.last_7d) {
    map = raw.last_7d;
    if (raw.as_of) updatedAt = raw.as_of;
    if (typeof raw.note === "string" && raw.note.trim()) note = raw.note.trim();
    window = "7d";
  } else if (raw && typeof raw === "object" && Array.isArray(raw.sites)) {
    // already NestIndex shape — refresh timestamp, keep sites
    return {
      updatedAt: raw.updatedAt || updatedAt,
      window: raw.window || window,
      note: (typeof raw.note === "string" && raw.note.trim()) || DEFAULT_NOTE,
      sites: raw.sites.map((s) => ({
        host: s.host,
        visits: Number(s.visits) || 0,
        requests: Number(s.requests) || 0,
      })),
    };
  }

  const byHost = new Map();
  for (const h of KNOWN_HOSTS) {
    byHost.set(h, { host: h, visits: 0, requests: 0 });
  }
  for (const [host, vals] of Object.entries(map || {})) {
    const visits = Number(vals?.visits) || 0;
    const requests = Number(vals?.requests) || 0;
    byHost.set(host, { host, visits, requests });
  }

  return {
    updatedAt,
    window,
    note,
    sites: [...byHost.values()],
  };
}

const arg = process.argv[2];
if (!arg) {
  console.error(
    "Usage: node scripts/write-stats.mjs <input.json|->\n" +
      "  Input: host→{visits,requests} or pages-traffic.py JSON (uses last_7d).\n" +
      "  Output visits are CF edge metrics, not unique humans.",
  );
  process.exit(1);
}

const out = normalize(readInput(arg));
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${outPath} (${out.sites.length} sites, window=${out.window})`);
