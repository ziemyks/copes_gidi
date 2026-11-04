import { getLocale, localize } from "@/i18n/server";
import Link from "next/link";
import type { Trip } from "@/data/types";
import { guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { Breadcrumbs, JsonLd } from "./seo";
import { GuideGrid, TripGrid } from "./catalog-grids";
import { Container, PageHeader } from "./ui";
import { collectionData } from "@/lib/seo";

export async function FishingLanding({ path, title, intro, tips, trips }: {
  path: string; title: string; intro: string; tips: { title: string; text: string }[]; trips: Trip[];
}) {
  const locale = await getLocale();
  const providers = guides.filter((guide) => trips.some((trip) => trip.guide === guide.slug));
  const destinations = regions.filter((region) => trips.some((trip) => trip.region === region.slug || trip.regions?.includes(region.slug)));
  return localize((
    <>
      <JsonLd data={collectionData(path, title, trips.map((trip) => ({ name: trip.title, path: `/braucieni/${trip.slug}` })))} />
      <PageHeader eyebrow={`${trips.length} publicēti piedāvājumi`} title={title} intro={intro}>
        <div className="mt-8"><Breadcrumbs items={[{ name: "Sākums", path: "/" }, { name: "Braucieni", path: "/braucieni" }, { name: title, path }]} /></div>
      </PageHeader>
      <Container className="py-16">
        <section aria-labelledby="choose-trip" className="mb-16">
          <h2 id="choose-trip" className="headline">Kā izvēlēties braucienu</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {tips.map((tip) => <div key={tip.title}><h3 className="title">{tip.title}</h3><p className="mt-4 text-muted">{tip.text}</p></div>)}
          </div>
        </section>
        <section aria-labelledby="trip-offers">
          <h2 id="trip-offers" className="headline">Braucieni un publicētās cenas</h2>
          <p className="mb-8 mt-4 max-w-3xl text-muted">Pie katras cenas norādīts, vai tā ir par braucienu vai personu. Gala cenu, brīvo datumu un iekļauto apstiprina gids — sazinies ar viņu tieši.</p>
          <TripGrid items={trips} />
        </section>
        <section className="mt-16" aria-labelledby="landing-guides">
          <h2 id="landing-guides" className="headline mb-8">Gidi šiem braucieniem</h2>
          <GuideGrid items={providers} />
        </section>
        <section className="mt-16 border-t border-rule pt-10">
          <h2 className="title">Pirms došanās uz ūdens</h2>
          <p className="mt-4 max-w-3xl text-muted">Noskaidro konkrētā ūdens atļaujas un aktuālos ierobežojumus. Brauciena apraksts vai sezonas norāde neaizstāj spēkā esošos noteikumus.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <a className="link" href="https://likumi.lv/ta/id/279205-makskeresanas-vezosanas-un-zemudens-medibu-noteikumi" target="_blank" rel="noopener noreferrer">Makšķerēšanas noteikumi</a>
            <a className="link" href="https://www.manacope.lv/calendar" target="_blank" rel="noopener noreferrer">Mana Cope kalendārs</a>
            <Link className="link" href="/par-mums">Kā pārbaudām informāciju</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">{destinations.map((region) => <Link key={region.slug} href={`/regioni/${region.slug}`} className="btn btn-secondary">{region.name} →</Link>)}</div>
        </section>
      </Container>
    </>
  ), locale);
}
