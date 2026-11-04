import { getLocale, localize } from "@/i18n/server";
import { FishingLanding } from "@/components/fishing-landing";
import { winterLanding } from "@/data/discovery";
import { rankedTrips } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

const path = "/cope/ziemas-cope";
export async function generateMetadata() { return pageMetadata({ ...winterLanding, path }); }

export default async function WinterFishingPage() {
  const locale = await getLocale();
  return localize(<FishingLanding {...winterLanding} path={path} trips={rankedTrips.filter((trip) => trip.type === "ledus")} />, locale);
}
