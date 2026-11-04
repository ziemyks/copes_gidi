import { FishingLanding } from "@/components/fishing-landing";
import { winterLanding } from "@/data/discovery";
import { rankedTrips } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

const path = "/cope/ziemas-cope";
export const metadata = pageMetadata({ ...winterLanding, path });

export default function WinterFishingPage() {
  return <FishingLanding {...winterLanding} path={path} trips={rankedTrips.filter((trip) => trip.type === "ledus")} />;
}
