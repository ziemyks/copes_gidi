import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactPanel, PublicDataNotice, SourceList, formatDate } from "@/components/guide-parts";
import { Avatar, Chip, Container, Eyebrow, TripCard } from "@/components/ui";
import { getGuide, guideFrom, guides, kindLabels } from "@/data/guides";
import { getRegion } from "@/data/regions";
import { speciesNames } from "@/data/species";
import { tripsByGuide } from "@/data/trips";
import { formatPrice } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gidi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: `${guide.name} — ${guide.tagline}`, description: guide.summary };
}

function List({ items, mark, muted }: { items: string[]; mark: string; muted?: boolean }) {
  return (
    <ul className={`space-y-2.5 ${muted ? "text-muted" : ""}`}>
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className={muted ? "text-faint" : "text-patina-deep"}>{mark}</span> {i}
        </li>
      ))}
    </ul>
  );
}

export default async function GuidePage({ params }: PageProps<"/gidi/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const region = getRegion(guide.region);
  const guideTrips = tripsByGuide(guide.slug);
  const from = guideFrom(guide.slug);

  const stats = [
    { label: "Piedāvājumi", value: String(guideTrips.length) },
    { label: "Cena no", value: from !== undefined ? formatPrice(from) : "—" },
    { label: "Makšķernieki", value: guide.maxAnglers ? `līdz ${guide.maxAnglers}` : "—" },
  ];

  const details = [
    { label: "Bāze", value: guide.base },
    { label: "Ūdeņi", value: guide.waters.join(", ") },
    guide.techniques.length > 0 && { label: "Metodes", value: guide.techniques.join(", ") },
    guide.audiences.length > 0 && { label: "Kam piemērots", value: guide.audiences.join(", ") },
    { label: "Valodas", value: guide.languages.length ? guide.languages.join(", ") : "Publiski nav norādītas" },
    guide.season && { label: "Sezona", value: guide.season },
    guide.catchPolicy && { label: "Lomi", value: guide.catchPolicy },
    { label: "Rezervēšana", value: guide.booking.join("; ") },
    guide.company && {
      label: "Uzņēmums",
      value: guide.company.regNo ? `${guide.company.name}, reģ. nr. ${guide.company.regNo}` : guide.company.name,
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <section className="border-b border-rule">
        <Container className="pb-12 pt-32 sm:pt-40">
          <nav className="eyebrow flex items-center gap-2">
            <Link href="/gidi" className="py-2 hover:text-ink">
              Gidi
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
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar guide={guide} size="lg" />
            <div>
              <h1 className="display">{guide.name}</h1>
              <p className="eyebrow mt-3">
                {kindLabels[guide.kind]}
                {guide.brand && <> · {guide.brand}</>} · {region?.name ?? "Visa Latvija"}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-xl text-ink">{guide.tagline}</p>
        </Container>
      </section>

      <Container className="pb-24 pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-14">
            <dl className="grid grid-cols-3 divide-x divide-rule border-y border-rule">
              {stats.map((s) => (
                <div key={s.label} className="py-6 pl-4 first:pl-0 sm:pl-5">
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-black text-ink sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <section>
              <Eyebrow className="mb-4">Kopsavilkums</Eyebrow>
              <p className="text-xl leading-relaxed text-ink">{guide.summary}</p>
              {guide.people.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {guide.people.map((p) => (
                    <li key={p.name} className="rounded-2xl border border-rule px-4 py-2 text-sm">
                      <span className="text-ink">{p.name}</span>
                      {p.role && <span className="text-muted"> · {p.role}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="border-t border-rule pt-10">
              <Eyebrow className="mb-4">Zivis</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {speciesNames(guide.species).map((n) => (
                  <Chip key={n}>{n}</Chip>
                ))}
              </div>
              <dl className="mt-8 border-t border-rule">
                {details.map((d) => (
                  <div key={d.label} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[160px_1fr]">
                    <dt className="eyebrow pt-1">{d.label}</dt>
                    <dd className="text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {guide.claims.length > 0 && (
              <section className="border-t border-rule pt-10">
                <Eyebrow className="mb-2">Pieredze un sasniegumi</Eyebrow>
                <p className="mb-6 text-sm text-muted">
                  Atzīme “paša teiktais” nozīmē, ka fakts ņemts no gida publikācijām un nav neatkarīgi pārbaudīts.
                </p>
                <ul className="space-y-4">
                  {guide.claims.map((c) => (
                    <li key={c.text} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] font-bold uppercase ${
                          c.selfClaimed ? "border border-rule text-muted" : "bg-patina/20 text-patina"
                        }`}
                      >
                        {c.selfClaimed ? "Paša teiktais" : "Neatkarīgs avots"}
                      </span>
                      <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                        {c.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {guide.boats.length > 0 && (
              <section className="border-t border-rule pt-10">
                <Eyebrow className="mb-6">Laiva un aprīkojums</Eyebrow>
                <div className="grid gap-4 sm:grid-cols-2">
                  {guide.boats.map((b) => (
                    <div key={b.model} className="card p-5">
                      {b.owner && <p className="eyebrow">{b.owner}</p>}
                      <h3 className="title mt-1">{b.model}</h3>
                      {b.motor && <p className="mt-1 text-sm text-muted">{b.motor}</p>}
                      {b.electronics && b.electronics.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {b.electronics.map((e) => (
                            <li key={e}>
                              <Chip>{e}</Chip>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(guide.included.length > 0 || guide.notIncluded.length > 0) && (
              <section className="grid gap-10 border-t border-rule pt-10 sm:grid-cols-2">
                <div>
                  <Eyebrow className="mb-4">Iekļauts</Eyebrow>
                  {guide.included.length ? <List items={guide.included} mark="✓" /> : <p className="text-muted">Nav norādīts</p>}
                </div>
                <div>
                  <Eyebrow className="mb-4">Nav iekļauts</Eyebrow>
                  {guide.notIncluded.length ? (
                    <List items={guide.notIncluded} mark="—" muted />
                  ) : (
                    <p className="text-muted">Nav norādīts</p>
                  )}
                </div>
              </section>
            )}

            {guideTrips.length > 0 && (
              <section>
                <Eyebrow className="mb-4">Piedāvājumi</Eyebrow>
                <h2 className="headline">Braucieni un cenas</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {guideTrips.map((t) => (
                    <TripCard key={t.slug} trip={t} />
                  ))}
                </div>
              </section>
            )}

            {(guide.mentions.length > 0 || guide.reviews.length > 0) && (
              <section className="border-t border-rule pt-10">
                <Eyebrow className="mb-6">Citur internetā</Eyebrow>
                <ul className="space-y-3">
                  {guide.mentions.map((m) => (
                    <li key={m.url}>
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="link text-ink">
                        {m.title}
                      </a>
                      <span className="block text-sm text-muted">
                        {m.outlet}
                        {m.date && <> · {formatDate(m.date)}</>}
                      </span>
                    </li>
                  ))}
                  {guide.reviews.map((r) => (
                    <li key={r.url}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="link text-ink">
                        Atsauksmes: {r.platform}
                      </a>
                      <span className="block text-sm text-muted">
                        {r.rating !== undefined && <>{r.rating} / 5 · </>}
                        {r.count !== undefined && <>{r.count} atsauksmes · </>}
                        {r.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="border-t border-rule pt-10">
              <Eyebrow className="mb-4">Pirms rezervācijas precizē</Eyebrow>
              <List items={guide.caveats} mark="?" muted />
              <p className="mt-6 flex items-start gap-2 text-sm text-muted">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${guide.activity.status === "redzama" ? "bg-patina" : "bg-vermilion"}`}
                />
                <span>
                  Jaunākā datētā publiskā aktivitāte: {formatDate(guide.activity.lastSeen)} — {guide.activity.note}
                  {guide.activity.url && (
                    <>
                      {" "}
                      <a href={guide.activity.url} target="_blank" rel="noopener noreferrer" className="link">
                        avots
                      </a>
                    </>
                  )}
                </span>
              </p>
            </section>

            <SourceList
              sources={
                guide.logo
                  ? [...guide.sources, { url: guide.logo.source, title: "Logotips — gida mājaslapa", supports: "logotips" }]
                  : guide.sources
              }
              checked={guide.checked}
            />
          </div>

          <aside className="relative z-[45] space-y-4 lg:sticky lg:top-28 lg:self-start">
            <ContactPanel contacts={guide.contacts} title={guide.contactTitle} />
            <PublicDataNotice checked={guide.checked} />
          </aside>
        </div>
      </Container>
    </>
  );
}
