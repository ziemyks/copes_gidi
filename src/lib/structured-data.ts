import type { Guide, Trip } from "@/data/types";
import { absoluteUrl } from "./seo";

const personSlugs = new Set([
  "imants-tiltins", "martins-iskrovs", "kaspars-holms", "romans-astapovs", "ricards-milass",
  "raznas-breksi", "rainers-dzerins", "normunds-ikomass", "goldmans-fishing", "dzintars-vjakse",
]);

export function guideEntity(guide: Guide) {
  return {
    "@type": personSlugs.has(guide.slug) ? "Person" : "Organization",
    "@id": `${absoluteUrl(`/gidi/${guide.slug}`)}#guide`,
    name: guide.name,
    url: absoluteUrl(`/gidi/${guide.slug}`),
    description: guide.summary,
  };
}

export function guideProfileData(guide: Guide) {
  return {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(`/gidi/${guide.slug}`)}#page`,
    name: guide.name,
    url: absoluteUrl(`/gidi/${guide.slug}`),
    inLanguage: "lv",
    publisher: { "@id": `${absoluteUrl()}#publisher` },
    mainEntity: guideEntity(guide),
  };
}

export function tripServiceData(trip: Trip, guide?: Guide) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(`/braucieni/${trip.slug}`)}#page`,
    name: trip.title,
    url: absoluteUrl(`/braucieni/${trip.slug}`),
    inLanguage: "lv",
    publisher: { "@id": `${absoluteUrl()}#publisher` },
    mainEntity: {
      "@type": "Service",
      "@id": `${absoluteUrl(`/braucieni/${trip.slug}`)}#service`,
      name: trip.title,
      description: trip.summary,
      url: absoluteUrl(`/braucieni/${trip.slug}`),
      areaServed: trip.waters,
      ...(guide ? { provider: guideEntity(guide) } : {}),
      // Prices describe the published source, with the same basis/caveat as the visible table.
      ...(trip.prices.length ? { offers: trip.prices.map((price) => ({
        "@type": "Offer",
        url: trip.source,
        name: price.label,
        description: `${price.basis}. PVN un gala cena jāprecizē pie gida.`,
        priceSpecification: {
          "@type": "UnitPriceSpecification", price: price.amount, priceCurrency: "EUR", unitText: price.basis,
        },
      })) } : {}),
    },
  };
}
