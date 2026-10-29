import type { Metadata } from "next";
import { Suspense } from "react";
import { TripExplorer, TripGrid } from "@/components/explorers";
import { SiteHeader } from "@/components/site-header";
import { Container, PageHero } from "@/components/ui";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Makšķerēšanas braucieni ar gidu",
  description: "Visi makšķerēšanas braucieni ar vietējiem gidiem Latvijā — lasis, līdaka, zandarts, sams un zemledus cope.",
};

export default function TripsPage() {
  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={`${trips.length} braucieni`}
        title="Makšķerēšanas braucieni ar vietējiem gidiem"
        intro="Atlasi pēc reģiona, zivs vai brauciena veida. Pieprasījuma nosūtīšana ir bez maksas."
        scene="river"
        seed="trips-hero"
      />
      <Container className="py-12">
        {/* Bez JS (un meklētājiem) rāda visu sarakstu; filtri ielādējas klienta pusē */}
        <Suspense fallback={<TripGrid items={trips} />}>
          <TripExplorer />
        </Suspense>
      </Container>
    </>
  );
}
