import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { trips } from "@/data/trips";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "",
    "/braucieni",
    "/gidi",
    "/klusti-par-gidu",
    ...trips.map((t) => `/braucieni/${t.slug}`),
    ...guides.map((g) => `/gidi/${g.slug}`),
    ...regions.map((r) => `/regioni/${r.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
