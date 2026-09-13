import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE_NAME} ·{" "}
          <a
            href="https://github.com/neferpi"
            className="text-zinc-400 hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            neferpi
          </a>
        </p>
        <p className="flex gap-4">
          <Link href="/about" className="hover:text-zinc-300">
            About & privacy
          </Link>
          <span title="Precomputed into stats.json — CF edge visits, not unique humans; no Cloudflare token in the browser">
            CF edge visits (bots count) · refreshed daily
          </span>
        </p>
      </div>
    </footer>
  );
}
