import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms";
import { ArrowLink, Avatar, Chip, Container, Eyebrow, Photo, TripCard } from "@/components/ui";
import { getGuide } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { getTrip, tripTypes, trips, tripsByRegion } from "@/data/trips";
import { formatPrice } from "@/lib/site";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/braucieni/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return { title: trip.title, description: trip.summary };
}

export default async function TripPage({ params }: PageProps<"/braucieni/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const guide = getGuide(trip.guide);
  const region = getRegion(trip.region);
  const related = tripsByRegion(trip.region).filter((t) => t.slug !== trip.slug).slice(0, 3);

  const facts = [
    { label: "Ilgums", value: `${trip.hours} stundas` },
    { label: "Grupa", value: `līdz ${trip.maxGuests} pers.` },
    { label: "Līmenis", value: trip.level },
    { label: "Sezona", value: trip.months },
    { label: "Veids", value: tripTypes[trip.type] },
    { label: "Tikšanās vieta", value: trip.meetingPoint },
  ];

  return (
    <>
      <Container className="pb-24 pt-32 sm:pt-40">
        <nav className="eyebrow flex items-center gap-2">
          <Link href="/braucieni" className="py-2 hover:text-ink">
            Braucieni
          </Link>
          <span className="text-faint">/</span>
          <Link href={`/regioni/${trip.region}`} className="py-2 hover:text-ink">
            {region?.name}
          </Link>
        </nav>

        <h1 className="headline mt-6 max-w-4xl sm:text-[3.6rem]">{trip.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-3 text-muted">
            {trip.water}, {region?.name}
          </span>
          {speciesNames(trip.species).map((n) => (
            <Chip key={n}>{n}</Chip>
          ))}
          {trip.familyFriendly && <Chip>Piemērots ģimenēm</Chip>}
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-rule sm:aspect-[21/9]">
          <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} sizes="100vw" priority />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <dl className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-r border-rule p-5">
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="mt-2 text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <section>
              <Eyebrow className="mb-4">Par braucienu</Eyebrow>
              <p className="text-xl leading-relaxed text-ink">{trip.summary}</p>
              <div className="mt-5 space-y-4 text-muted">
                {trip.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="grid gap-10 border-t border-rule pt-10 sm:grid-cols-2">
              <div>
                <Eyebrow className="mb-4">Iekļauts</Eyebrow>
                <ul className="space-y-2.5">
                  {trip.included.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-patina-deep">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow className="mb-4">Nav iekļauts</Eyebrow>
                <ul className="space-y-2.5 text-muted">
                  {trip.notIncluded.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-faint">—</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {guide && (
              <section className="border-t border-rule pt-10">
                <Eyebrow className="mb-5">Tavs gids</Eyebrow>
                <div className="flex items-center gap-4">
                  <Avatar guide={guide} />
                  <div>
                    <h3 className="title">{guide.name}</h3>
                    <p className="eyebrow mt-1">
                      {guide.yearsExperience} g. pieredze · {guide.languages.join(", ")}
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-2xl text-muted">{guide.bio}</p>
                <div className="mt-5">
                  <ArrowLink href={`/gidi/${guide.slug}`}>Skatīt profilu</ArrowLink>
                </div>
              </section>
            )}
          </div>

          <aside className="relative z-[45] lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6 shadow-lift-1">
              <p className="eyebrow">Cena no</p>
              <p className="mt-1">
                <span className="font-display text-5xl font-light text-ink">{formatPrice(trip.priceFrom)}</span>
                <span className="ml-2 text-sm text-muted">/ {trip.priceUnit}</span>
              </p>
              <hr className="my-6 border-rule" />
              <InquiryForm tripSlug={trip.slug} guideSlug={trip.guide} maxGuests={trip.maxGuests} />
            </div>
            {guide && <p className="mt-4 px-1 text-sm text-muted">Atcelšana: {guide.cancellation.toLowerCase()}.</p>}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-rule pt-14">
            <Eyebrow className="mb-4">Tajā pašā reģionā</Eyebrow>
            <h2 className="headline">Vēl braucieni: {region?.name}</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
