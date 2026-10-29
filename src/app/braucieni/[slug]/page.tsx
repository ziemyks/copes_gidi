import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactPanel, PublicDataNotice } from "@/components/guide-parts";
import { ArrowLink, Avatar, Chip, Container, Eyebrow, Photo, PriceTag, TripCard } from "@/components/ui";
import { getGuide, kindLabels } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { durationLabel, getTrip, tripTypes, trips, tripsByRegion } from "@/data/trips";
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
  const related = (region ? tripsByRegion(region.slug) : [])
    .filter((t) => t.slug !== trip.slug && t.guide !== trip.guide)
    .slice(0, 3);

  const facts = [
    { label: "Ilgums", value: durationLabel(trip) || "Nav norādīts" },
    { label: "Grupa", value: trip.maxGuests ? `līdz ${trip.maxGuests} pers.` : "Jāprecizē" },
    { label: "Veids", value: tripTypes[trip.type] },
    { label: "Sezona", value: trip.season ?? "Nav norādīta" },
  ];

  return (
    <>
      <Container className="pb-24 pt-32 sm:pt-40">
        <nav className="eyebrow flex items-center gap-2">
          <Link href="/braucieni" className="py-2 hover:text-ink">
            Braucieni
          </Link>
          {region && (
            <>
              <span className="text-faint">/</span>
              <Link href={`/regioni/${region.slug}`} className="py-2 hover:text-ink">
                {region.name}
              </Link>
            </>
          )}
        </nav>

        <h1 className="headline mt-6 max-w-4xl sm:text-[3.6rem]">{trip.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-3 text-muted">
            {trip.waters.join(", ")}
            {region && <> · {region.name}</>}
          </span>
          {speciesNames(trip.species).map((n) => (
            <Chip key={n}>{n}</Chip>
          ))}
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-rule sm:aspect-[21/9]">
          <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} sizes="100vw" priority />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-14">
            <dl className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-4">
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
              {trip.notes.length > 0 && (
                <ul className="mt-6 space-y-3 text-muted">
                  {trip.notes.map((n) => (
                    <li key={n} className="flex gap-3">
                      <span className="text-accent">—</span> {n}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="border-t border-rule pt-10">
              <Eyebrow className="mb-6">Publicētās cenas</Eyebrow>
              {trip.prices.length ? (
                <table className="w-full text-left">
                  <tbody>
                    {trip.prices.map((p) => (
                      <tr key={`${p.label}-${p.amount}`} className="border-b border-rule">
                        <th scope="row" className="py-4 pr-4 font-normal text-ink">
                          {p.label}
                        </th>
                        <td className="whitespace-nowrap py-4 text-right">
                          <span className="font-display text-xl font-black text-ink">{formatPrice(p.amount)}</span>
                          <span className="block text-xs text-muted">{p.basis}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">Cena publiski nav norādīta — jautā gidam.</p>
              )}
              <p className="mt-4 text-sm text-muted">
                PVN un gala cena nav apstiprināta.{" "}
                <a href={trip.source} target="_blank" rel="noopener noreferrer" className="link">
                  Cenas avots
                </a>
              </p>
            </section>

            {(trip.included.length > 0 || trip.notIncluded.length > 0) && (
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
                  {!trip.included.length && <p className="text-muted">Nav norādīts</p>}
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
                  {!trip.notIncluded.length && <p className="text-muted">Nav norādīts</p>}
                </div>
              </section>
            )}

            {guide && (
              <section className="border-t border-rule pt-10">
                <Eyebrow className="mb-5">Kas vada</Eyebrow>
                <div className="flex items-center gap-4">
                  <Avatar guide={guide} />
                  <div>
                    <h3 className="title">{guide.name}</h3>
                    <p className="eyebrow mt-1">
                      {kindLabels[guide.kind]}
                      {guide.languages.length > 0 && <> · {guide.languages.join(", ")}</>}
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-2xl text-muted">{guide.summary}</p>
                <div className="mt-5">
                  <ArrowLink href={`/gidi/${guide.slug}`}>Pilns profils un avoti</ArrowLink>
                </div>
              </section>
            )}
          </div>

          <aside className="relative z-[45] space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6 shadow-lift-1">
              <p className="eyebrow">Cena</p>
              <PriceTag trip={trip} className="mt-1 [&>span]:text-4xl" />
            </div>
            {guide && <ContactPanel contacts={guide.contacts} />}
            <PublicDataNotice checked={guide?.checked ?? "2026-10-29"} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-rule pt-14">
            <Eyebrow className="mb-4">Tajā pašā reģionā</Eyebrow>
            <h2 className="headline">Citi gidi: {region?.name}</h2>
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
