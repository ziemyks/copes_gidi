import { getLocale, localize } from "@/i18n/server";
import { Suspense } from "react";
import { GuideGrid } from "@/components/catalog-grids";
import { GuideResults } from "@/components/catalog-results";
import { Container, PageHeader } from "@/components/ui";
import { guides } from "@/data/guides";
import { trips } from "@/data/trips";
import { hasCatalogFacets, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }: PageProps<"/[lang]/gidi">) {
  return pageMetadata({
    title: "Makšķerēšanas gidi Latvijā", path: "/gidi",
    description: "Salīdzini Latvijas makšķerēšanas gidus: publicētās cenas, laivas, ūdeņus un aprīkojumu. Profili ar avotiem un tiešajiem kontaktiem.",
    noindex: hasCatalogFacets(await searchParams, ["regions", "suga", "valoda"]),
  });
}

export default async function GuidesPage({ searchParams }: PageProps<"/[lang]/gidi">) {
  const locale = await getLocale();
  return localize((
    <>
      <PageHeader
        eyebrow={`${guides.length} profili · ${trips.length} piedāvājumi`}
        title="Makšķerēšanas gidi Latvijā"
        intro="Visi gidi un komandas, kuru piedāvājums ir publiski pieejams. Katrs ir sava biznesa īpašnieks un nav mūsu partneris — sazinies ar viņiem tieši."
      />
      <Container className="pb-24 pt-10">
        <Suspense fallback={<GuideGrid items={guides} />}>
          <GuideResults searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  ), locale);
}
