import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms";
import { Avatar, Chip, Container, Eyebrow, Figure, TripCard } from "@/components/ui";
import { getGuide, guides } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { tripsByGuide } from "@/data/trips";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gidi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: `${guide.name} — ${guide.tagline}`, description: guide.bio };
}

export default async function GuidePage({ params }: PageProps<"/gidi/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const region = getRegion(guide.region);
  const guideTrips = tripsByGuide(guide.slug);

  const stats = [
    { label: "Pieredze", value: `${guide.yearsExperience} g.` },
    { label: "Braucieni", value: guideTrips.length },
    { label: "Valodas", value: guide.languages.length },
  ];

  const details = [
    { label: "Valodas", value: guide.languages.join(", ") },
    guide.boat && { label: "Laiva", value: guide.boat },
    { label: "Atcelšana", value: guide.cancellation },
    { label: "Bāze", value: `${guide.base}, ${region?.name}` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>

      <section className="border-b border-rule">
        <Container className="pb-12 pt-32 sm:pt-40">
          <nav className="eyebrow flex items-center gap-2">
            <Link href="/gidi" className="py-2 hover:text-ink">
              Gidi
            </Link>
            <span className="text-faint">/</span>
            <Link href={`/regioni/${guide.region}`} className="py-2 hover:text-ink">
              {region?.name}
            </Link>
          </nav>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar guide={guide} size="lg" />
            <div>
              <h1 className="display">{guide.name}</h1>
              <p className="eyebrow mt-3">
                {guide.business && <>{guide.business} · </>}
                {guide.base}, {region?.name}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-xl text-ink">{guide.tagline}</p>
        </Container>
      </section>

      <Container className="pb-24 pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <dl className="grid grid-cols-3 divide-x divide-rule border-y border-rule">
              {stats.map((s) => (
                <div key={s.label} className="py-6 pl-5 first:pl-0">
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="mt-2 font-display text-5xl font-extralight text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            <section>
              <Eyebrow className="mb-4">Par gidu</Eyebrow>
              <p className="text-xl leading-relaxed text-ink">{guide.bio}</p>
              <div className="mt-5 space-y-4 text-muted">
                {guide.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="border-t border-rule pt-10">
              <Eyebrow className="mb-4">Zivis</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {speciesNames(guide.species).map((n) => (
                  <Chip key={n}>{n}</Chip>
                ))}
              </div>
              <dl className="mt-8 border-t border-rule">
                {details.map((d) => (
                  <div key={d.label} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[160px_1fr]">
                    <dt className="eyebrow pt-1">{d.label}</dt>
                    <dd className="text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {region && (
              <Figure
                scene={region.scene}
                seed={`cover-${guide.slug}`}
                caption={region.waters.slice(0, 3).join(" · ")}
                meta={region.name}
              />
            )}

            {guideTrips.length > 0 && (
              <section>
                <Eyebrow className="mb-4">Braucieni</Eyebrow>
                <h2 className="headline">Gida braucieni</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {guideTrips.map((t) => (
                    <TripCard key={t.slug} trip={t} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="relative z-[45] lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6 shadow-lift-1">
              <h2 className="title text-xl">Sazinies ar gidu</h2>
              <p className="mb-6 mt-1 text-sm text-muted">Parasti atbild 24–48 stundu laikā.</p>
              <InquiryForm guideSlug={guide.slug} />
            </div>
            <p className="eyebrow mt-4 flex items-center gap-2 px-1">
              <span className="h-1.5 w-1.5 rounded-full bg-patina" />
              Gids pārbaudīts personīgi
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
