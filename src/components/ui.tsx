import Image from "next/image";
import Link from "next/link";
import { getGuide, guideFrom, kindLabels } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { durationLabel, tripTypes } from "@/data/trips";
import type { Guide, Trip } from "@/data/types";
import { formatPrice } from "@/lib/site";
import { ActivityBadge } from "./guide-parts";
import { GuideMark } from "./guide-mark";
import { Scene, type SceneVariant } from "./scene";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ index, children, className = "" }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && <span className="text-accent-deep">{index}</span>}
      {index && <span className="h-px w-6 bg-current opacity-40" />}
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <Eyebrow index={index} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="headline">{title}</h2>
        {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link inline-block shrink-0 py-2 text-[0.9375rem] font-medium">
      {children} →
    </Link>
  );
}

export function Chip({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  const styles =
    tone === "dark"
      ? "bg-black/75 text-ink backdrop-blur"
      : "border border-rule bg-black/40 text-text";
  return <span className={`inline-block rounded-full px-3 py-1 font-mono text-[0.72rem] font-bold uppercase ${styles}`}>{children}</span>;
}

/** Fotogrāfija, ja tāda ir, citādi ilustrēta ainava. */
export function Photo({
  src,
  alt,
  scene,
  seed,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  src?: string;
  alt: string;
  scene: SceneVariant;
  seed: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  }
  return <Scene variant={scene} seed={seed} className="absolute inset-0 h-full w-full" />;
}

/** Ierāmēts attēls ar mono parakstu zem tā */
export function Figure({
  scene,
  seed,
  caption,
  meta,
  className = "aspect-[21/9]",
}: {
  scene: SceneVariant;
  seed: string;
  caption: string;
  meta?: string;
  className?: string;
}) {
  return (
    <figure>
      <div className={`card dogear overflow-hidden ${className}`}>
        <Scene variant={scene} seed={seed} className="absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="eyebrow mt-3 flex justify-between gap-4">
        <span>{caption}</span>
        {meta && <span className="text-faint">{meta}</span>}
      </figcaption>
    </figure>
  );
}

export function Avatar({ guide, size = "md" }: { guide: Guide; size?: "md" | "lg" }) {
  // Logotipi parasti ir plati, tāpēc tiem taisnstūris; iniciāļiem — aplis
  const dims = guide.logo
    ? size === "lg"
      ? "h-24 w-40"
      : "h-14 w-24"
    : size === "lg"
      ? "h-24 w-24 text-3xl"
      : "h-14 w-14 text-xl";
  return <GuideMark guide={guide} className={dims} />;
}

/** "no 150 € / par braucienu" vai "Cena pēc pieprasījuma" */
export function PriceTag({ trip, className = "" }: { trip: Trip; className?: string }) {
  if (trip.priceFrom === undefined) return <p className={`text-sm text-muted ${className}`}>Cena pēc pieprasījuma</p>;
  return (
    <p className={`text-sm text-muted ${className}`}>
      no <span className="font-display text-lg font-black text-ink">{formatPrice(trip.priceFrom)}</span>
      {trip.priceBasis && <> / {trip.priceBasis}</>}
    </p>
  );
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto pt-5">
      <div className="flex items-baseline justify-between gap-3 border-t border-rule pr-7 pt-4">{children}</div>
    </div>
  );
}

export function TripCard({ trip }: { trip: Trip }) {
  const guide = getGuide(trip.guide);
  const region = getRegion(trip.region);
  return (
    <Link href={`/braucieni/${trip.slug}`} className="card dogear group flex h-full min-w-0 flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-rule">
        <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Chip tone="dark">{tripTypes[trip.type]}</Chip>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">
          {region?.name ?? "Visa Latvija"} · {trip.waters[0]}
        </p>
        <h3 className="title mt-2">{trip.title}</h3>
        <p className="mt-1 text-sm text-muted">{guide?.name}</p>
        <CardFooter>
          <PriceTag trip={trip} />
          <span className="eyebrow shrink-0 pl-3">{durationLabel(trip)}</span>
        </CardFooter>
      </div>
    </Link>
  );
}

export function GuideCard({ guide, showBio = false }: { guide: Guide; showBio?: boolean }) {
  const region = getRegion(guide.region);
  const names = speciesNames(guide.species);
  const from = guideFrom(guide.slug);
  return (
    <Link href={`/gidi/${guide.slug}`} className="card dogear group flex h-full min-w-0 flex-col p-6">
      <div className="flex items-center gap-4">
        <Avatar guide={guide} />
        <div className="min-w-0">
          <h3 className="title">{guide.name}</h3>
          <p className="eyebrow mt-1 truncate">
            {kindLabels[guide.kind]} · {region?.name ?? "Visa Latvija"}
          </p>
        </div>
      </div>
      {showBio && <p className="mt-4 line-clamp-3 text-sm text-muted">{guide.summary}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {names.slice(0, 3).map((n) => (
          <Chip key={n}>{n}</Chip>
        ))}
        {names.length > 3 && <Chip>+{names.length - 3}</Chip>}
      </div>
      <ActivityBadge activity={guide.activity} className="mt-4 self-start" />
      <CardFooter>
        <span className="eyebrow">{from !== undefined ? `Copes brauciens no ${formatPrice(from)}` : "Cena pēc pieprasījuma"}</span>
        <span className="shrink-0 whitespace-nowrap font-mono text-xs font-bold uppercase text-accent">
          Profils →
        </span>
      </CardFooter>
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-rule">
      <Container className="pb-16 pt-32 sm:pt-44">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h1 className="display max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
