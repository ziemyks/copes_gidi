import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ArrowLink, Chip, Container, Eyebrow, Figure, GuideCard, PageHeader, SectionHeading, TripCard } from "@/components/ui";
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
      <PageHeader eyebrow="Reģions" title={region.name} intro={region.tagline}>
        <div className="mt-12">
          <Figure scene={region.scene} seed={`region-${region.slug}`} caption={region.waters.join(" · ")} />
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <p className="text-xl leading-relaxed text-ink">{region.description}</p>
        <dl className="border-t border-rule">
          <div className="border-b border-rule py-4">
            <dt className="eyebrow">Zivis</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {speciesNames(region.species).map((n) => (
                <Chip key={n}>{n}</Chip>
              ))}
            </dd>
          </div>
          <div className="border-b border-rule py-4">
            <dt className="eyebrow">Sezona</dt>
            <dd className="mt-2 text-ink">{region.season}</dd>
          </div>
        </dl>
      </Container>

      <section className="section border-t border-rule bg-paper-deep">
        <Container>
          <SectionHeading
            eyebrow="Braucieni"
            title={`Braucieni: ${region.name}`}
            action={<ArrowLink href={`/braucieni?regions=${region.slug}`}>Filtrēt braucienus</ArrowLink>}
          />
          {regionTrips.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regionTrips.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          ) : (
            <p className="text-muted">Šajā reģionā braucienu pagaidām nav.</p>
          )}
        </Container>
      </section>

      {regionGuides.length > 0 && (
        <section className="section border-t border-rule">
          <Container>
            <Eyebrow className="mb-5">Gidi</Eyebrow>
            <h2 className="headline mb-12">Gidi šajā reģionā</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
