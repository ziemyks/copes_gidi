import { getLocale, localize } from "@/i18n/server";
import { Suspense } from "react";
import { TripGrid } from "@/components/catalog-grids";
import { TripResults } from "@/components/catalog-results";
import { Container, PageHeader } from "@/components/ui";
import { rankedTrips as trips } from "@/data/guides";
import { hasCatalogFacets, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }: PageProps<"/[lang]/braucieni">) {
  return pageMetadata({
    title: "Makšķerēšanas braucieni ar gidu Latvijā", path: "/braucieni",
    description: "Salīdzini makšķerēšanas braucienus ar gidu Latvijā: publicētās cenas, ilgumu, ūdeņus un iekļauto inventāru. Sazinies un rezervē tieši pie gida.",
    noindex: hasCatalogFacets(await searchParams, ["regions", "suga", "veids"]),
  });
}

export default async function TripsPage({ searchParams }: PageProps<"/[lang]/braucieni">) {
  const locale = await getLocale();
  return localize((
    <>
      <PageHeader
        eyebrow={`${trips.length} braucieni`}
        title="Makšķerēšanas braucieni ar gidu Latvijā"
        intro="Cenas un ilgumi no gidu pašu cenrāžiem. Pievērs uzmanību, vai cena ir par braucienu vai no personas — rezervē tieši pie gida."
      />
      <Container className="pb-24 pt-10">
        {/* Pilnais saraksts ir statiskajā čaulā; atlasītie rezultāti tiek renderēti serverī. */}
        <Suspense fallback={<TripGrid items={trips} />}>
          <TripResults searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  ), locale);
}
