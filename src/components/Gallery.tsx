"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  PROJECTS,
  type Category,
  type Project,
} from "@/lib/projects";
import {
  relativeUpdated,
  visitsByHost,
  type StatsFile,
} from "@/lib/stats";
import { ProjectCard } from "./ProjectCard";

export function Gallery() {
  const [stats, setStats] = useState<StatsFile | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ok" | "error">(
    "loading",
  );
  const [category, setCategory] = useState<Category | "all">("all");

  useEffect(() => {
    let cancelled = false;
    fetch("/stats.json", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`stats ${r.status}`);
        return (await r.json()) as StatsFile;
      })
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setLoadState("ok");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStats(null);
          setLoadState("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visitsMap = useMemo(() => visitsByHost(stats), [stats]);

  const ranked: { project: Project; visits: number | null }[] = useMemo(() => {
    const filtered =
      category === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === category);
    return [...filtered]
      .map((project) => ({
        project,
        visits: project.host
          ? (visitsMap.get(project.host) ?? 0)
          : null,
      }))
      .sort((a, b) => {
        // Hostless projects (NestPin) sort last
        const av = a.visits ?? -1;
        const bv = b.visits ?? -1;
        if (a.visits == null && b.visits != null) return 1;
        if (b.visits == null && a.visits != null) return -1;
        return bv - av || a.project.name.localeCompare(b.project.name);
      });
  }, [category, visitsMap]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Nest tools, ranked
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400 sm:text-base">
            Every Nest tool, sorted by Cloudflare Web Analytics browser sessions
            (JS beacon — closer to real people than edge crawler counts). New
            sites start at zero and still appear in the gallery.
          </p>
        </div>
        <div className="text-sm text-zinc-500">
          {loadState === "loading" && <span>Loading browser stats…</span>}
          {loadState === "error" && (
            <span>Browser stats unavailable — showing all tools at 0.</span>
          )}
          {loadState === "ok" && stats && (
            <span>
              Updated {relativeUpdated(stats.updatedAt)} · window{" "}
              {stats.window}
            </span>
          )}
          <p className="mt-1 max-w-sm text-xs text-zinc-600">
            Cloudflare Web Analytics (JS) — not edge traffic; still not perfect
            unique humans.
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c.id)}
              className={
                active
                  ? "rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-950"
                  : "rounded-full border border-zinc-800 bg-zinc-900/40 px-3.5 py-1.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map(({ project, visits }, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            visits={visits}
            rank={i + 1}
          />
        ))}
      </div>

      {ranked.length === 0 && (
        <p className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
          No tools in this category yet.
        </p>
      )}
    </div>
  );
}
