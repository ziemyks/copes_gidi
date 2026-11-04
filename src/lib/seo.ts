import type { Metadata } from "next";
import { isPreviewDeployment, site, siteUrl } from "./site";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl()}/`).toString();
}

/** Keep snippets readable without cutting a word or replacing the full page copy. */
export function searchDescription(text: string, limit = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const sentence = clean.match(/^.+?[.!?](?=\s|$)/u)?.[0];
  if (sentence && sentence.length >= 80 && sentence.length <= limit) return sentence;
  return `${clean.slice(0, limit - 1).replace(/\s+\S*$/, "").replace(/[ ,;:—–-]+$/, "")}…`;
}

export function pageMetadata({ title, description, path, noindex = false }: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const summary = searchDescription(description);
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description: summary,
    // Utility facets are excluded explicitly, rather than assigned an unrelated canonical.
    alternates: { canonical: noindex ? null : absoluteUrl(path) },
    robots: noindex || isPreviewDeployment() ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "lv_LV",
      siteName: site.name,
      title: fullTitle,
      description: summary,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Copes Gidi — makšķerēšanas gidi Latvijā" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [{ url: absoluteUrl("/opengraph-image"), alt: "Copes Gidi — makšķerēšanas gidi Latvijā" }],
    },
  };
}

export type CatalogQuery = Record<string, string | string[] | undefined>;

export function queryValue(query: CatalogQuery, key: string) {
  const value = query[key];
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function hasCatalogFacets(query: CatalogQuery, keys: string[]) {
  return keys.some((key) => Boolean(queryValue(query, key)));
}

export type Breadcrumb = { name: string; path: string };

export function breadcrumbData(items: Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionData(path: string, name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#page`,
    url: absoluteUrl(path),
    name,
    inLanguage: "lv",
    isPartOf: { "@id": `${absoluteUrl()}#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem", position: i + 1, name: item.name, url: absoluteUrl(item.path),
      })),
    },
  };
}
