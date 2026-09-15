/** Site traffic row. `visits` = Cloudflare Web Analytics (RUM) browser sessions. */
export type SiteStats = {
  host: string;
  /** RUM visits (JS beacon browser sessions). */
  visits: number;
  /** RUM pageviews (pageload events). */
  pageviews?: number;
  /** Optional CF edge visits for comparison (bots count). */
  edgeVisits?: number;
  /** Optional CF edge request count. */
  requests?: number;
};

export type StatsFile = {
  updatedAt: string;
  window: string;
  /** Optional honesty note from the stats pipeline. */
  note?: string;
  sites: SiteStats[];
};

export function visitsByHost(stats: StatsFile | null): Map<string, number> {
  const map = new Map<string, number>();
  if (!stats?.sites) return map;
  for (const s of stats.sites) {
    map.set(s.host, s.visits ?? 0);
  }
  return map;
}

export function formatVisits(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

export function relativeUpdated(iso: string | undefined): string {
  if (!iso) return "unknown";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "unknown";
  const diff = Date.now() - then;
  if (diff < 0) return "just now";
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
