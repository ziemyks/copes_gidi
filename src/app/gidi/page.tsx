import type { Metadata } from "next";
import { Suspense } from "react";
import { GuideExplorer, GuideGrid } from "@/components/explorers";
import { Container, PageHeader } from "@/components/ui";
import { guides } from "@/data/guides";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Makšķerēšanas gidi Latvijā",
  description: "Latvijas makšķerēšanas gidi ar publiski pieejamu piedāvājumu — cenas, laivas, ūdeņi un tiešie kontakti ar avotiem.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${guides.length} profili · ${trips.length} piedāvājumi`}
        title="Gidi"
        intro="Visi gidi un komandas, kuru piedāvājums ir publiski pieejams. Katrs ir sava biznesa īpašnieks un nav mūsu partneris — sazinies ar viņiem tieši."
      />
      <Container className="pb-24 pt-10">
        <Suspense fallback={<GuideGrid items={guides} />}>
          <GuideExplorer />
        </Suspense>
      </Container>
    </>
  );
}
