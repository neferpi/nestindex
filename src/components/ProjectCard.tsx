import type { Project } from "@/lib/projects";
import { formatVisits } from "@/lib/stats";

type Props = {
  project: Project;
  /** RUM visits, or null when the project has no Pages host (e.g. NestPin). */
  visits: number | null;
  rank: number;
};

export function ProjectCard({ project, visits, rank }: Props) {
  const hasHost = Boolean(project.host);
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm transition hover:border-zinc-700 hover:bg-zinc-900"
      style={{
        boxShadow: `inset 3px 0 0 0 ${project.accent}`,
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-zinc-950"
            style={{ backgroundColor: project.accent }}
            aria-hidden
          >
            #{rank}
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
              {project.name}
            </h2>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {project.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold tabular-nums text-zinc-100">
            {hasHost ? formatVisits(visits ?? 0) : "—"}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            {hasHost ? "Real browsers · 7d" : "n/a"}
          </p>
        </div>
      </div>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.pitch}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-950 transition hover:opacity-90"
          style={{ backgroundColor: project.accent }}
        >
          Open tool
          <span aria-hidden>↗</span>
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
