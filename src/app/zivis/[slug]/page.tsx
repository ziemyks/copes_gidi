import { notFound } from "next/navigation";
import { FishingLanding } from "@/components/fishing-landing";
import { fishingLandings } from "@/data/discovery";
import { rankedTrips } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return fishingLandings.map((landing) => ({ slug: landing.slug }));
}

export async function generateMetadata({ params }: PageProps<"/zivis/[slug]">) {
  const { slug } = await params;
  const landing = fishingLandings.find((item) => item.slug === slug);
  if (!landing) notFound();
  return pageMetadata({ title: landing.title, description: landing.description, path: `/zivis/${slug}` });
}

export default async function SpeciesLanding({ params }: PageProps<"/zivis/[slug]">) {
  const { slug } = await params;
  const landing = fishingLandings.find((item) => item.slug === slug);
  if (!landing) notFound();
  return <FishingLanding {...landing} path={`/zivis/${slug}`} trips={rankedTrips.filter((trip) => trip.species.includes(slug))} />;
}
