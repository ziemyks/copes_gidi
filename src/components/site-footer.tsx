import Link from "next/link";
import { regions } from "@/data/regions";
import { site } from "@/lib/site";
import { Wordmark } from "./chrome";
import { Bobber } from "./stickers";

export function SiteFooter() {
  const columns = [
    {
      title: "Atklāj",
      links: [
        { href: "/braucieni", label: "Visi braucieni" },
        { href: "/gidi", label: "Gidi" },
        { href: "/braucieni?suga=lasis", label: "Lašu makšķerēšana" },
        { href: "/braucieni?veids=ledus", label: "Zemledus cope" },
      ],
    },
    {
      title: "Reģioni",
      links: regions.map((r) => ({ href: `/regioni/${r.slug}`, label: r.name })),
    },
    {
      title: "Gidiem",
      links: [
        { href: "/klusti-par-gidu", label: "Kļūsti par gidu" },
        { href: `mailto:${site.email}`, label: site.email },
      ],
    },
    {
      title: "Info",
      links: [
        { href: "/#buj", label: "Biežākie jautājumi" },
        { href: "/privatums", label: "Privātuma politika" },
        { href: site.instagram, label: "Instagram" },
      ],
    },
  ];

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-24 sm:px-10">
        <div className="flex flex-col items-start gap-8 border-b border-rule pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="mega">
            <span className="sr-only">Uz ūdens?</span>
            <span aria-hidden="true">
              Uz{" "}
              <span className="sticker">
                <Bobber />
              </span>
              <br />
              ūdens?
            </span>
          </h2>
          <Link href="/braucieni" className="btn btn-primary">
            Atrast braucienu →
          </Link>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="space-y-3">
            <Wordmark />
            <p className="max-w-xs text-sm text-muted">{site.tagline}.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4 text-accent">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-text transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="eyebrow mt-14 flex flex-col gap-2 font-normal normal-case sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}</p>
          {site.demoContent && <p>Parauga gidi un braucieni — tie nav īsti piedāvājumi.</p>}
        </div>
      </div>
    </footer>
  );
}
