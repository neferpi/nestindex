import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20"
            aria-hidden
          >
            N
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-zinc-50 group-hover:text-white">
              {SITE_NAME}
            </span>
            <span className="hidden text-xs text-zinc-500 sm:inline">
              {SITE_TAGLINE}
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            About
          </Link>
          <a
            href="https://github.com/neferpi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
