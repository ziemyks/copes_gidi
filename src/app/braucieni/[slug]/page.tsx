import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms";
import { SiteHeader } from "@/components/site-header";
import { Avatar, Chip, Container, Photo, TripCard } from "@/components/ui";
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
      <SiteHeader />
      <Container className="pb-20 pt-8">
        <nav className="text-sm text-muted">
          <Link href="/braucieni" className="hover:text-ink">
            Braucieni
          </Link>{" "}
          /{" "}
          <Link href={`/regioni/${trip.region}`} className="hover:text-ink">
            {region?.name}
          </Link>
        </nav>

        <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">{trip.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-muted">
            {trip.water}, {region?.name}
          </span>
          {speciesNames(trip.species).map((n) => (
            <Chip key={n}>{n}</Chip>
          ))}
          {trip.familyFriendly && <Chip>Piemērots ģimenēm</Chip>}
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} sizes="100vw" priority />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-white p-5">
                  <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="mt-1 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            <section>
              <h2 className="font-display text-2xl font-semibold">Par braucienu</h2>
              <p className="mt-4 text-lg">{trip.summary}</p>
              <div className="mt-4 space-y-4 text-muted">
                {trip.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold">Iekļauts</h3>
                <ul className="mt-3 space-y-2">
                  {trip.included.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-reed">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Nav iekļauts</h3>
                <ul className="mt-3 space-y-2 text-muted">
                  {trip.notIncluded.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span>–</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {guide && (
              <section className="rounded-3xl bg-sand p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Tavs gids</p>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar guide={guide} />
                  <div>
                    <h3 className="font-display text-xl font-semibold">{guide.name}</h3>
                    <p className="text-sm text-muted">
                      {guide.yearsExperience} gadu pieredze · {guide.languages.join(", ")}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-muted">{guide.bio}</p>
                <Link href={`/gidi/${guide.slug}`} className="mt-4 inline-block font-semibold text-deep hover:underline">
                  Skatīt profilu →
                </Link>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm text-muted">
                no <span className="font-display text-3xl font-semibold text-ink">{formatPrice(trip.priceFrom)}</span> /{" "}
                {trip.priceUnit}
              </p>
              <hr className="my-5 border-line" />
              <InquiryForm tripSlug={trip.slug} guideSlug={trip.guide} maxGuests={trip.maxGuests} />
            </div>
            {guide && <p className="mt-4 px-2 text-sm text-muted">Atcelšana: {guide.cancellation.toLowerCase()}.</p>}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold">Vēl braucieni: {region?.name}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
