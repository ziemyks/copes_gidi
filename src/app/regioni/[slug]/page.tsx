import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink, Chip, Container, Eyebrow, Figure, GuideCard, PageHeader, SectionHeading, TripCard } from "@/components/ui";
import { rankedTrips } from "@/data/guides";
import { getRegion, regions } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { regionPlanning, speciesLandingPath } from "@/data/discovery";
import { guidesForRegion, tripServesRegion } from "@/lib/catalog";
import { pageMetadata, collectionData } from "@/lib/seo";
import { Breadcrumbs, JsonLd } from "@/components/seo";
import Link from "next/link";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/regioni/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();
  const planning = regionPlanning[slug];
  return pageMetadata({ title: `Makšķerēšana ar gidu ${planning.locative}`, description: planning.description, path: `/regioni/${slug}` });
}

export default async function RegionPage({ params }: PageProps<"/regioni/[slug]">) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const regionTrips = rankedTrips.filter((t) => tripServesRegion(t, region.slug));
  const regionGuides = guidesForRegion(region.slug);
  const planning = regionPlanning[slug];

  return (
    <>
      <JsonLd data={collectionData(`/regioni/${slug}`, `Makšķerēšana ar gidu ${planning.locative}`, regionTrips.map((t) => ({ name: t.title, path: `/braucieni/${t.slug}` })))} />
      <PageHeader eyebrow="Reģions" title={`Makšķerēšana ar gidu ${planning.locative}`} intro={region.tagline}>
        <div className="mt-8"><Breadcrumbs items={[{ name: "Sākums", path: "/" }, { name: region.name, path: `/regioni/${slug}` }]} /></div>
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

      <Container className="pb-16">
        <h2 className="headline">Plāno braucienu {planning.locative}</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">{planning.tips.map((tip) => <section key={tip.title}><h3 className="title">{tip.title}</h3><p className="mt-4 text-muted">{tip.text}</p></section>)}</div>
        <p className="mt-8 max-w-3xl text-sm text-muted">Sezonas norāde neaizstāj konkrētā ūdens noteikumus. Pirms brauciena pārbaudi <a className="link" href="https://likumi.lv/ta/id/279205-makskeresanas-vezosanas-un-zemudens-medibu-noteikumi" target="_blank" rel="noopener noreferrer">aktuālos liegumus un atļaujas</a> un vienojies ar gidu par gala cenu.</p>
        <div className="mt-6 flex flex-wrap gap-3">{region.species.filter((fish) => ["lidaka", "zandarts", "sams"].includes(fish)).map((fish) => <Link key={fish} className="btn btn-secondary" href={speciesLandingPath(fish)}>{speciesNames([fish])[0]}: braucieni →</Link>)}</div>
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
