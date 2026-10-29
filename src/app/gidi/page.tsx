import type { Metadata } from "next";
import { Suspense } from "react";
import { GuideExplorer, GuideGrid } from "@/components/explorers";
import { Container, PageHeader } from "@/components/ui";
import { allLanguages, guides } from "@/data/guides";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "Makšķerēšanas gidi Latvijā",
  description: "Neatkarīgi makšķerēšanas gidi visā Latvijā — Kurzemē, Vidzemē, Latgalē, Zemgalē un Rīgā.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mūsu gidi"
        title="Mūsu gidi"
        intro={`${guides.length} gidi · ${regions.length} reģioni · ${allLanguages.length} valodas. Katrs gids ir sava biznesa īpašnieks.`}
      />
      <Container className="pb-24 pt-10">
        <Suspense fallback={<GuideGrid items={guides} />}>
          <GuideExplorer />
        </Suspense>
      </Container>
    </>
  );
}
