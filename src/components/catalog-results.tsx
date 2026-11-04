import { allLanguages } from "@/data/guides";
import { regions } from "@/data/regions";
import { species } from "@/data/species";
import { tripTypes } from "@/data/trips";
import { filteredGuides, filteredTrips } from "@/lib/catalog";
import { collectionData, hasCatalogFacets, type CatalogQuery } from "@/lib/seo";
import { CatalogExplorer, type CatalogFilter } from "./explorers";
import { GuideGrid, TripGrid } from "./catalog-grids";
import { JsonLd } from "./seo";

const commonFilters: CatalogFilter[] = [
  { key: "regions", label: "Reģions", options: regions.map((r) => ({ value: r.slug, label: r.name })) },
  { key: "suga", label: "Zivs", options: species.map((s) => ({ value: s.slug, label: s.name })) },
];

export async function TripResults({ searchParams }: { searchParams: Promise<CatalogQuery> }) {
  const query = await searchParams;
  const results = filteredTrips(query);
  return (
    <div data-catalog="braucieni" data-result-count={results.length}>
      {!hasCatalogFacets(query, ["regions", "suga", "veids"]) && <JsonLd data={collectionData("/braucieni", "Makšķerēšanas braucieni ar gidu Latvijā", results.map((t) => ({ name: t.title, path: `/braucieni/${t.slug}` })))} />}
      <CatalogExplorer count={results.length} noun="braucieni" filters={[
        ...commonFilters,
        { key: "veids", label: "Veids", options: Object.entries(tripTypes).map(([value, label]) => ({ value, label })) },
        { key: "kartot", label: "Kārtot", options: [{ value: "cena", label: "Pēc zemākās cenas" }] },
      ]}>
        <TripGrid items={results} />
      </CatalogExplorer>
    </div>
  );
}

export async function GuideResults({ searchParams }: { searchParams: Promise<CatalogQuery> }) {
  const query = await searchParams;
  const results = filteredGuides(query);
  return (
    <div data-catalog="gidi" data-result-count={results.length}>
      {!hasCatalogFacets(query, ["regions", "suga", "valoda"]) && <JsonLd data={collectionData("/gidi", "Makšķerēšanas gidi Latvijā", results.map((g) => ({ name: g.name, path: `/gidi/${g.slug}` })))} />}
      <CatalogExplorer count={results.length} noun="gidi" filters={[
        ...commonFilters,
        { key: "valoda", label: "Valoda", options: allLanguages.map((language) => ({ value: language, label: language })) },
      ]}>
        <GuideGrid items={results} />
      </CatalogExplorer>
    </div>
  );
}
