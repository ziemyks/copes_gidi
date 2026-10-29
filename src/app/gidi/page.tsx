import type { Metadata } from "next";
import { Suspense } from "react";
import { GuideExplorer, GuideGrid } from "@/components/explorers";
import { SiteHeader } from "@/components/site-header";
import { Container, PageHero } from "@/components/ui";
import { allLanguages, guides } from "@/data/guides";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "Makšķerēšanas gidi Latvijā",
  description: "Neatkarīgi makšķerēšanas gidi visā Latvijā — Kurzemē, Vidzemē, Latgalē, Zemgalē un Rīgā.",
};

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Mūsu gidi"
        title="Gidi, kas pazīst katru bedri."
        intro={`${guides.length} gidi · ${regions.length} reģioni · ${allLanguages.length} valodas. Katrs gids ir sava biznesa īpašnieks.`}
        scene="lake"
        seed="guides-hero"
      />
      <Container className="py-12">
        <Suspense fallback={<GuideGrid items={guides} />}>
          <GuideExplorer />
        </Suspense>
      </Container>
    </>
  );
}
