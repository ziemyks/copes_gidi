import Image from "next/image";
import Link from "next/link";
import { getGuide, type Guide } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { tripTypes, type Trip } from "@/data/trips";
import { formatPrice } from "@/lib/site";
import { Scene, type SceneVariant } from "./scene";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-water">
            <span className="h-px w-8 bg-water" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Chip({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  const styles = tone === "dark" ? "bg-ink/70 text-white backdrop-blur" : "bg-mist text-deep";
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles}`}>{children}</span>;
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

export function Avatar({ guide, size = "md" }: { guide: Guide; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-28 w-28 text-3xl" : "h-14 w-14 text-lg";
  const initials = guide.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-linear-to-br from-water to-deep font-display font-semibold text-white ring-4 ring-paper ${dims}`}
    >
      {guide.photo ? (
        <Image src={guide.photo} alt={guide.name} fill sizes="112px" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">{initials}</span>
      )}
    </div>
  );
}

export function TripCard({ trip }: { trip: Trip }) {
  const guide = getGuide(trip.guide);
  const region = getRegion(trip.region);
  return (
    <Link
      href={`/braucieni/${trip.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
          <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Chip tone="dark">{tripTypes[trip.type]}</Chip>
          {trip.familyFriendly && <Chip tone="dark">Ģimenēm</Chip>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-water">
          {region?.name} · {trip.water}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">{trip.title}</h3>
        <p className="mt-1 text-sm text-muted">Gids: {guide?.name}</p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-sm text-muted">
            no <span className="text-lg font-semibold text-ink">{formatPrice(trip.priceFrom)}</span> /{" "}
            {trip.priceUnit}
          </p>
          <span className="text-xs text-muted">{trip.hours} h</span>
        </div>
      </div>
    </Link>
  );
}

export function GuideCard({ guide, showBio = false }: { guide: Guide; showBio?: boolean }) {
  const region = getRegion(guide.region);
  const names = speciesNames(guide.species);
  return (
    <Link
      href={`/gidi/${guide.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <Avatar guide={guide} />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold text-ink">{guide.name}</h3>
          {guide.business && <p className="truncate text-sm text-muted">{guide.business}</p>}
          <p className="text-sm text-water">
            {guide.base}, {region?.name}
          </p>
        </div>
      </div>
      {showBio && <p className="mt-4 line-clamp-3 text-sm text-muted">{guide.bio}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {names.slice(0, 3).map((n) => (
          <Chip key={n}>{n}</Chip>
        ))}
        {names.length > 3 && <Chip>+{names.length - 3}</Chip>}
      </div>
      <div className="mt-auto flex items-center justify-between pt-5 text-sm">
        <span className="text-muted">
          {guide.yearsExperience} g. pieredze · {guide.languages.length} valodas
        </span>
        <span className="font-semibold text-deep group-hover:underline">Profils →</span>
      </div>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  scene,
  seed,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  scene: SceneVariant;
  seed: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Scene variant={scene} seed={seed} className="absolute inset-0 h-full w-full opacity-60" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" />
      <Container className="relative py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
      </Container>
    </section>
  );
}
