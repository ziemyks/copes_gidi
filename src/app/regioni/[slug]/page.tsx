import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Chip, Container, GuideCard, PageHero, SectionHeading, TripCard } from "@/components/ui";
import { guides } from "@/data/guides";
import { getRegion, regions } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { tripsByRegion } from "@/data/trips";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/regioni/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};
  return {
    title: `Makšķerēšana ar gidu: ${region.name}`,
    description: `${region.tagline}. ${region.description}`,
  };
}

export default async function RegionPage({ params }: PageProps<"/regioni/[slug]">) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const regionTrips = tripsByRegion(region.slug);
  const regionGuides = guides.filter((g) => g.region === region.slug);

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Reģions"
        title={region.name}
        intro={region.tagline}
        scene={region.scene}
        seed={`region-${region.slug}`}
      />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1.6fr_1fr]">
        <p className="text-xl leading-relaxed text-ink">{region.description}</p>
        <div className="space-y-6 rounded-3xl border border-line bg-white p-6">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Ūdeņi</h2>
            <p className="mt-2">{region.waters.join(" · ")}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Zivis</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {speciesNames(region.species).map((n) => (
                <Chip key={n}>{n}</Chip>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Sezona</h2>
            <p className="mt-2">{region.season}</p>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <SectionHeading
          title={`Braucieni: ${region.name}`}
          action={
            <Link href={`/braucieni?regions=${region.slug}`} className="font-semibold text-deep hover:underline">
              Filtrēt braucienus →
            </Link>
          }
        />
        {regionTrips.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regionTrips.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Šajā reģionā braucienu pagaidām nav.</p>
        )}
      </Container>

      {regionGuides.length > 0 && (
        <section className="bg-sand py-16">
          <Container>
            <SectionHeading title="Gidi šajā reģionā" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regionGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} showBio />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
