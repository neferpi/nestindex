import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE_NAME} is, how rankings work, and privacy notes.`,
};

export default function AboutPage() {
  return (
    <article className="prose-invert mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          About
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {SITE_NAME}
        </h1>
        <p className="text-lg text-zinc-400">{SITE_TAGLINE}</p>
      </header>

      <section className="space-y-3 text-zinc-300">
        <h2 className="text-xl font-semibold text-zinc-100">What this is</h2>
        <p>
          NestIndex is a public gallery of Nest tools by{" "}
          <a
            href="https://github.com/neferpi"
            className="text-emerald-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            neferpi
          </a>
          . Cards link out to each live tool and its GitHub repo. The list is
          sorted by Cloudflare Web Analytics browser sessions so tools with real
          people float up — without any login or account. Those numbers are{" "}
          <strong className="font-medium text-zinc-100">closer to real
          browsers</strong>{" "}
          than edge crawler counts, but still not perfect unique humans.
        </p>
      </section>

      <section className="space-y-3 text-zinc-300">
        <h2 className="text-xl font-semibold text-zinc-100">How stats work</h2>
        <p>
          Counts come from{" "}
          <strong className="font-medium text-zinc-100">
            Cloudflare Web Analytics (RUM)
          </strong>{" "}
          — the JS beacon on each tool&apos;s{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm text-emerald-300">
            *.pages.dev
          </code>{" "}
          host. We query{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm text-emerald-300">
            rumPageloadEventsAdaptiveGroups
          </code>{" "}
          and use{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm text-emerald-300">
            sum.visits
          </code>{" "}
          as browser sessions and{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm text-emerald-300">
            count
          </code>{" "}
          as pageviews. UI labels say{" "}
          <em>Real browsers · 7d</em> (or WA visits) — not CF edge.
        </p>
        <p>
          This is different from Cloudflare{" "}
          <em>edge</em> analytics, which count crawlers, IndexNow, Googlebot,
          deploy previews, and smoke tests. Edge numbers can be hundreds or
          thousands with almost no real people; RUM only counts browsers that
          load the analytics beacon.
        </p>
        <p>
          RUM is still imperfect: ad blockers, privacy mode, shared devices, and
          JS failures mean it is not a perfect unique-human count. Chrome
          extensions without a Pages host (e.g. NestPin) show n/a.
        </p>
        <p>
          Numbers are aggregated offline, written into{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm text-emerald-300">
            public/stats.json
          </code>
          , and refreshed daily. The site only fetches that static JSON — it
          never calls Cloudflare APIs and never embeds API tokens.
        </p>
        <p className="text-sm text-zinc-500">
          Window is typically the last 7 days. New tools start at zero and still
          appear in the gallery.
        </p>
      </section>

      <section className="space-y-3 text-zinc-300">
        <h2 className="text-xl font-semibold text-zinc-100">Privacy</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            NestIndex itself stores no personal data and sets no tracking
            cookies.
          </li>
          <li>
            Rankings use aggregate host-level Web Analytics visit/pageview
            totals from Cloudflare — not individual visitor profiles.
          </li>
          <li>
            Each Nest tool is a separate static site; see that tool for its own
            privacy notes.
          </li>
        </ul>
      </section>

      <p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
        >
          ← Back to gallery
        </Link>
      </p>
    </article>
  );
}
