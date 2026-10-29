import Link from "next/link";
import { regions } from "@/data/regions";
import { site } from "@/lib/site";
import { Logo } from "./site-header";

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
      title: "Informācija",
      links: [
        { href: "/#buj", label: "Biežākie jautājumi" },
        { href: "/privatums", label: "Privātuma politika" },
        { href: site.instagram, label: "Instagram" },
      ],
    },
  ];

  return (
    <footer className="border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted">{site.tagline}.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-text transition-colors hover:text-ink hover:underline hover:decoration-gold hover:underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="eyebrow mt-14 flex flex-col gap-2 border-t border-rule pt-6 normal-case tracking-[0.04em] sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}</p>
          {site.demoContent && <p>Parauga gidi un braucieni — tie nav īsti piedāvājumi.</p>}
        </div>
      </div>
    </footer>
  );
}
