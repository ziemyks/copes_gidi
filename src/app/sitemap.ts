import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { trips } from "@/data/trips";
import { isPreviewDeployment } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { fishingLandings } from "@/data/discovery";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment()) return [];
  const paths = [
    "",
    "/braucieni",
    "/gidi",
    "/klusti-par-gidu",
    "/par-mums",
    "/privatums",
    "/cope/ziemas-cope",
    ...fishingLandings.map((landing) => `/zivis/${landing.slug}`),
    ...trips.map((t) => `/braucieni/${t.slug}`),
    ...guides.map((g) => `/gidi/${g.slug}`),
    ...regions.map((r) => `/regioni/${r.slug}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path || "/") }));
}
