import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms";
import { Scene } from "@/components/scene";
import { SiteHeader } from "@/components/site-header";
import { Avatar, Chip, Container, TripCard } from "@/components/ui";
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

  return (
    <>
      <SiteHeader />
      <div className="relative h-64 overflow-hidden bg-ink sm:h-80">
        <Scene variant={region?.scene ?? "lake"} seed={`cover-${guide.slug}`} className="absolute inset-0 h-full w-full" />
      </div>

      <Container className="pb-20">
        <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end">
          <Avatar guide={guide} size="lg" />
          <div className="pb-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{guide.name}</h1>
            <p className="text-muted">
              {guide.business && <>{guide.business} · </>}
              {guide.base},{" "}
              <Link href={`/regioni/${guide.region}`} className="text-water hover:underline">
                {region?.name}
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl font-display text-xl text-ink">{guide.tagline}</p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <dl className="grid grid-cols-3 gap-4 rounded-3xl border border-line bg-white p-6 text-center">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Pieredze</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{guide.yearsExperience} g.</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Braucieni</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{guideTrips.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Valodas</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{guide.languages.length}</dd>
              </div>
            </dl>

            <section>
              <h2 className="font-display text-2xl font-semibold">Par gidu</h2>
              <p className="mt-4 text-lg text-ink">{guide.bio}</p>
              <div className="mt-4 space-y-4 text-muted">
                {guide.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Zivis</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {speciesNames(guide.species).map((n) => (
                    <Chip key={n}>{n}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Valodas</h3>
                <p className="mt-3">{guide.languages.join(", ")}</p>
              </div>
              {guide.boat && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Laiva</h3>
                  <p className="mt-3">{guide.boat}</p>
                </div>
              )}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Atcelšana</h3>
                <p className="mt-3">{guide.cancellation}</p>
              </div>
            </section>

            {guideTrips.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-semibold">Gida braucieni</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {guideTrips.map((t) => (
                    <TripCard key={t.slug} trip={t} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold">Sazinies ar gidu</h2>
              <p className="mb-5 mt-1 text-sm text-muted">Parasti atbild 24–48 stundu laikā.</p>
              <InquiryForm guideSlug={guide.slug} />
            </div>
            <p className="mt-4 flex items-center gap-2 px-2 text-sm text-muted">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-reed text-xs text-white">✓</span>
              Gids pārbaudīts personīgi
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
