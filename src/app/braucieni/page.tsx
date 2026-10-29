import type { Metadata } from "next";
import { Suspense } from "react";
import { TripExplorer, TripGrid } from "@/components/explorers";
import { Container, PageHeader } from "@/components/ui";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Makšķerēšanas braucieni ar gidu",
  description: "Makšķerēšanas braucieni ar gidu Latvijā — publicētās cenas, ilgumi un iekļautais no gidu pašu cenrāžiem.",
};

export default function TripsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${trips.length} braucieni`}
        title="Visi braucieni"
        intro="Cenas un ilgumi no gidu pašu cenrāžiem. Pievērs uzmanību, vai cena ir par braucienu vai no personas — rezervē tieši pie gida."
      />
      <Container className="pb-24 pt-10">
        {/* Bez JS (un meklētājiem) rāda visu sarakstu; filtri ielādējas klienta pusē */}
        <Suspense fallback={<TripGrid items={trips} />}>
          <TripExplorer />
        </Suspense>
      </Container>
    </>
  );
}
