#!/usr/bin/env node
/**
 * Merge RUM (and optional edge) traffic into public/stats.json
 *
 * Usage:
 *   node scripts/write-stats.mjs rum.json
 *   node scripts/write-stats.mjs rum.json --edge edge.json
 *   echo '{...}' | node scripts/write-stats.mjs -
 *
 * Primary input (RUM / pages-rum.py):
 *   { "as_of", "note", "window":"7d", "last_7d": { "host": { "visits", "pageviews" } } }
 *
 * Also accepts:
 *   - plain host→{visits,pageviews} map
 *   - legacy pages-traffic.py edge JSON (last_7d visits/requests) — treated as
 *     visits for backward compat, but prefer RUM
 *   - already NestIndex-shaped { sites: [...] }
 *
 * --edge <path>: optional pages-traffic.py JSON; adds edgeVisits (+ requests)
 *
 * Output: public/stats.json
 *   { updatedAt, window, note, sites: [ { host, visits, pageviews, edgeVisits?, requests? } ] }
 *
 * Primary sort key for the gallery is RUM `visits` (browser sessions).
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
];

const DEFAULT_NOTE =
  "Cloudflare Web Analytics browser sessions (JS beacon) — closer to real people; still not perfect unique humans.";

function readJson(arg) {
  if (!arg || arg === "-") {
    return JSON.parse(fs.readFileSync(0, "utf8"));
  }
  return JSON.parse(fs.readFileSync(arg, "utf8"));
}

function parseArgs(argv) {
  const args = { input: null, edge: null };
  const rest = [...argv];
  while (rest.length) {
    const a = rest.shift();
    if (a === "--edge") {
      args.edge = rest.shift() || null;
    } else if (!args.input) {
      args.input = a;
    }
  }
  return args;
}

function hostMapFromTraffic(raw) {
  if (raw && typeof raw === "object" && raw.last_7d) {
    return {
      map: raw.last_7d,
      updatedAt: raw.as_of || null,
      note: typeof raw.note === "string" && raw.note.trim() ? raw.note.trim() : null,
      window: raw.window || "7d",
    };
  }
  return { map: raw, updatedAt: null, note: null, window: "7d" };
}

function normalize(raw, edgeRaw) {
  let updatedAt = new Date().toISOString();
  let window = "7d";
  let note = DEFAULT_NOTE;

  if (raw && typeof raw === "object" && Array.isArray(raw.sites)) {
    const sites = raw.sites.map((s) => {
      const row = {
        host: s.host,
        visits: Number(s.visits) || 0,
        pageviews: Number(s.pageviews) || 0,
      };
      if (s.edgeVisits != null) row.edgeVisits = Number(s.edgeVisits) || 0;
      if (s.requests != null) row.requests = Number(s.requests) || 0;
      return row;
    });
    return {
      updatedAt: raw.updatedAt || updatedAt,
      window: raw.window || window,
      note: (typeof raw.note === "string" && raw.note.trim()) || DEFAULT_NOTE,
      sites,
    };
  }

  const { map, updatedAt: asOf, note: rumNote, window: win } =
    hostMapFromTraffic(raw);
  if (asOf) updatedAt = asOf;
  if (rumNote) note = rumNote;
  if (win) window = win;

  const byHost = new Map();
  for (const h of KNOWN_HOSTS) {
    byHost.set(h, { host: h, visits: 0, pageviews: 0 });
  }

  for (const [host, vals] of Object.entries(map || {})) {
    const visits = Number(vals?.visits) || 0;
    // RUM: pageviews; legacy edge: requests mapped only via --edge
    const pageviews =
      Number(vals?.pageviews) ||
      Number(vals?.pageViews) ||
      0;
    byHost.set(host, { host, visits, pageviews });
  }

  if (edgeRaw) {
    const edgeMap = hostMapFromTraffic(edgeRaw).map || {};
    for (const [host, vals] of Object.entries(edgeMap)) {
      const row = byHost.get(host) || {
        host,
        visits: 0,
        pageviews: 0,
      };
      row.edgeVisits = Number(vals?.visits) || 0;
      row.requests = Number(vals?.requests) || 0;
      byHost.set(host, row);
    }
  }

  return {
    updatedAt,
    window,
    note,
    sites: [...byHost.values()],
  };
}

const { input, edge } = parseArgs(process.argv.slice(2));
if (!input) {
  console.error(
    "Usage: node scripts/write-stats.mjs <rum.json|-> [--edge edge.json]\n" +
      "  Primary: pages-rum.py JSON (last_7d visits + pageviews).\n" +
      "  Optional --edge: pages-traffic.py JSON → edgeVisits/requests.",
  );
  process.exit(1);
}

const edgeRaw = edge ? readJson(edge) : null;
const out = normalize(readJson(input), edgeRaw);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(
  `Wrote ${outPath} (${out.sites.length} sites, window=${out.window}, RUM primary)`,
);
