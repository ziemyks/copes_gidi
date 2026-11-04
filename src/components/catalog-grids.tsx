import type { Guide, Trip } from "@/data/types";
import { GuideCard, TripCard } from "./ui";

function Empty() {
  return <p className="rounded-lg border border-dashed border-edge/40 p-12 text-center text-muted">Pēc šiem kritērijiem nekas netika atrasts. Pamēģini mainīt filtrus.</p>;
}

export function TripGrid({ items }: { items: Trip[] }) {
  if (!items.length) return <Empty />;
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((trip) => <TripCard key={trip.slug} trip={trip} />)}</div>;
}

export function GuideGrid({ items }: { items: Guide[] }) {
  if (!items.length) return <Empty />;
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((guide) => <GuideCard key={guide.slug} guide={guide} showBio />)}</div>;
}
