import { guides, rankedTrips } from "@/data/guides";
import type { Trip } from "@/data/types";
import { queryValue, type CatalogQuery } from "./seo";

export function tripServesRegion(trip: Trip, region: string) {
  return trip.region === region || Boolean(trip.regions?.includes(region));
}

export function guidesForRegion(region: string) {
  return guides.filter((guide) => guide.region === region || rankedTrips.some((trip) => trip.guide === guide.slug && tripServesRegion(trip, region)));
}

export function filteredTrips(query: CatalogQuery) {
  const region = queryValue(query, "regions");
  const fish = queryValue(query, "suga");
  const type = queryValue(query, "veids");
  return rankedTrips
    .filter((trip) => !region || tripServesRegion(trip, region))
    .filter((trip) => !fish || trip.species.includes(fish))
    .filter((trip) => !type || trip.type === type)
    .sort((a, b) => queryValue(query, "kartot") === "cena" ? (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity) : 0);
}

export function filteredGuides(query: CatalogQuery) {
  const region = queryValue(query, "regions");
  const fish = queryValue(query, "suga");
  const language = queryValue(query, "valoda");
  return (region ? guidesForRegion(region) : guides)
    .filter((guide) => !fish || guide.species.includes(fish))
    .filter((guide) => !language || guide.languages.includes(language));
}
