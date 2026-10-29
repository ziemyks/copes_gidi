import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/braucieni", label: "Braucieni" },
  { href: "/gidi", label: "Gidi" },
  { href: "/#regioni", label: "Reģioni" },
  { href: "/#buj", label: "BUJ" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${light ? "text-instrument-text" : "text-ink"}`}>
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path d="M5 17c4-6 12-7 17-2l4-3.5v9L22 17c-5 5-13 4-17-2z" fill="currentColor" />
        <circle cx="10.5" cy="15.2" r="1.3" className="fill-gold" />
      </svg>
      <span className="font-display text-xl font-medium uppercase tracking-[0.18em]">{site.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-[0.8125rem] text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/klusti-par-gidu" className="btn hidden px-3 text-[0.8125rem] text-muted hover:text-ink lg:inline-flex">
            Esi gids?
          </Link>
          <Link href="/braucieni" className="btn btn-primary hidden min-h-9 px-4 text-[0.8125rem] sm:inline-flex">
            Atrast braucienu
          </Link>

          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-rule" aria-label="Izvēlne">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-rule bg-raised p-1.5 shadow-lift-2">
              {[...nav, { href: "/klusti-par-gidu", label: "Kļūsti par gidu" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[3px] px-3 py-2.5 text-sm text-text hover:bg-paper-deep"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
