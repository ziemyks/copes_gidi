import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Sākums" },
  { href: "/braucieni", label: "Braucieni" },
  { href: "/gidi", label: "Gidi" },
  { href: "/#regioni", label: "Reģioni" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${light ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12" />
        <path
          d="M6 17c4-6 12-7 17-2l3-3v8l-3-3c-5 5-13 4-17-2z"
          fill="currentColor"
        />
        <circle cx="19.5" cy="15" r="1" fill={light ? "#0e2a31" : "#fbf8f2"} />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const wrapper = overlay
    ? "absolute inset-x-0 top-0 z-30 text-white"
    : "sticky top-0 z-30 border-b border-line bg-paper/90 text-ink backdrop-blur";

  return (
    <header className={wrapper}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo light={overlay} />

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="opacity-85 transition hover:opacity-100">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/braucieni"
            className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-dark sm:inline-block"
          >
            Atrast braucienu →
          </Link>

          <details className="relative md:hidden">
            <summary className="cursor-pointer rounded-full p-2" aria-label="Izvēlne">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-paper p-2 text-ink shadow-xl">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-sand"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/klusti-par-gidu"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-sand"
              >
                Kļūsti par gidu
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
