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
      ],
    },
  ];

  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="space-y-4">
            <Logo light />
            <p className="max-w-xs text-sm">{site.tagline}.</p>
            <a href={site.instagram} className="inline-block text-sm text-white hover:underline">
              Instagram
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}. Visas tiesības aizsargātas.</p>
          {site.demoContent && (
            <p>Šobrīd lapā redzami parauga gidi un braucieni — tie nav īsti piedāvājumi.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
