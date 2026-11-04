import { getLocale, localize } from "@/i18n/server";
import type { Guide, Trip } from "@/data/types";
import { GuideCard, TripCard } from "./ui";

async function Empty() {
  const locale = await getLocale();
  return localize(<p className="rounded-lg border border-dashed border-edge/40 p-12 text-center text-muted">Pēc šiem kritērijiem nekas netika atrasts. Pamēģini mainīt filtrus.</p>, locale);
}

export async function TripGrid({ items }: { items: Trip[] }) {
  const locale = await getLocale();
  if (!items.length) return localize(<Empty />, locale);
  return localize(<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((trip) => <TripCard key={trip.slug} trip={trip} />)}</div>, locale);
}

export async function GuideGrid({ items }: { items: Guide[] }) {
  const locale = await getLocale();
  if (!items.length) return localize(<Empty />, locale);
  return localize(<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((guide) => <GuideCard key={guide.slug} guide={guide} showBio />)}</div>, locale);
}
