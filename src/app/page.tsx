import Link from "next/link";
import { GuideDeck } from "@/components/guide-deck";
import { formatDate } from "@/components/guide-parts";
import { Scene } from "@/components/scene";
import { Bobber, Fish, Hook, Lure, Sparkle } from "@/components/stickers";
import { Container, Photo } from "@/components/ui";
import { guides, kindLabels } from "@/data/guides";
import { getRegion, regions } from "@/data/regions";
import { species } from "@/data/species";
import { tripTypes, trips, tripsByRegion } from "@/data/trips";
import type { Trip, TripType } from "@/data/types";
import { formatPrice, site } from "@/lib/site";

const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"];

const steps = [
  {
    title: "Salīdzini",
    text: "Cenas, ilgumi, laivas un ūdeņi no gidu pašu lapām. Pie katra fakta — avots. Nekādu “garantēta loma” solījumu.",
  },
  {
    title: "Sazinies tieši",
    text: "Tālrunis, WhatsApp vai e-pasts — tie, ko gids pats publicējis. Mēs neesam starpnieks un neņemam komisiju.",
  },
  {
    title: "Precizē noteikumus",
    text: "Brīvos datumus, gala cenu, PVN, licences un atcelšanu apstiprina gids. Publiski tie bieži nav norādīti.",
  },
  {
    title: "Uz ūdens",
    text: "Tu copē, gids zina kur. Lineālu zivju mērīšanai — ņem līdzi.",
  },
];

const faq = [
  {
    q: "Vai man vajag makšķerēšanas karti?",
    a: "Jā. Latvijā makšķerēšanas karte parasti nepieciešama makšķerniekiem no 16 līdz 65 gadu vecumam, un to var iegādāties tiešsaistē. Licencētajos ūdeņos (piemēram, lašu posmos Ventā un Salacā) papildus vajag licenci. Gids pastāstīs, kas tieši nepieciešams, bet pirms brauciena pārbaudi aktuālos noteikumus.",
  },
  {
    q: "No kurienes šī informācija?",
    a: `No gidu pašu mājaslapām, sociālajiem tīkliem, tūrisma katalogiem un uzņēmumu reģistra datiem. Avoti pārbaudīti ${formatDate(site.checked)} Katrā profilā ir avotu saraksts, un gida paša apgalvojumi ir atzīmēti. Gidi nav mūsu partneri, un ar viņiem neesam sazinājušies.`,
  },
  {
    q: "Kā notiek apmaksa?",
    a: "Copes Gidi maksājumus nepieņem. Cenu, priekšapmaksu un atlikuma samaksu saskaņo tieši ar gidu. Pievērs uzmanību, vai cena ir par visu braucienu vai par katru personu — to profilos norādām atsevišķi.",
  },
  {
    q: "Vai varu braukt bez pieredzes?",
    a: "Jā. Vairāki gidi piedāvā iesācēju vai ģimenes braucienus, un makšķerēšanas inventārs bieži ir iekļauts. Ko tieši cena ietver, redzams katra brauciena aprakstā.",
  },
  {
    q: "Kas notiek, ja ir slikts laiks?",
    a: "To nosaka katrs gids. Lielākā daļa atcelšanas noteikumus publiski nav aprakstījuši, tāpēc vienojies par tiem pirms priekšapmaksas.",
  },
  {
    q: "Vai drīkst paturēt zivis?",
    a: "Atbilstoši Latvijas noteikumiem par izmēriem un lomu limitiem — parasti jā. Vairāki gidi publiski raksta, ka trofejas zivis atlaiž. Gida nostāja redzama profilā, ja tā ir publicēta.",
  },
];

// Pakalpojumu kāršu krāsas — kā paraugā: tumšs, gaišs, gaišs, oranžs papīrs
const cardStyles = [
  { box: "paper paper-dark text-ink", pill: "border-white/15 hover:bg-white/10", fold: "#5a5a5a", arrow: "text-accent" },
  { box: "paper", pill: "border-black/15 hover:bg-black/5", fold: "#8d8d8d", arrow: "text-accent" },
  { box: "paper", pill: "border-black/15 hover:bg-black/5", fold: "#8d8d8d", arrow: "text-accent" },
  { box: "paper paper-accent", pill: "border-black/20 hover:bg-black/10", fold: "#a83a12", arrow: "text-on-accent" },
];

export default function Home() {
  const showcase = trips.slice(0, 6);
  const regionNames = Object.fromEntries(regions.map((r) => [r.slug, r.name]));

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[100svh] max-h-[1000px] min-h-[640px] items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">
        <Sparkle className="twinkle absolute left-[16%] top-[24%] h-8 w-8 text-ink" />
        <Sparkle className="twinkle absolute bottom-[22%] right-[14%] h-5 w-5 text-ink [animation-delay:1.4s]" />
        <Sparkle className="twinkle absolute right-[30%] top-[18%] h-3 w-3 text-accent [animation-delay:0.7s]" />
        <div>
          <h1 className="mega">
            <span className="sr-only">Cope bez pasakām</span>
            <span aria-hidden="true">
              C
              <span className="sticker">
                <Bobber />
              </span>
              pe <span className="text-accent">bez</span>
              <br />
              pasakām
              <span className="sticker w-[0.25em] [&>svg]:h-[0.95em] [&>svg]:w-[1.35em] [&>svg]:translate-x-[-62%]">
                <Fish />
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-md font-mono text-sm text-muted sm:text-base">
            Īsti gidi. Publicētas cenas. Avots pie katra fakta. Jo stāsti par “tik lielu” mums arī ir apnikuši.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/braucieni" className="btn btn-primary">
              Atrast braucienu
            </Link>
            <Link href="/gidi" className="btn btn-secondary">
              Iepazīt gidus
            </Link>
          </div>
        </div>
      </section>

      {/* Rādīt, nevis stāstīt */}
      <section className="section relative overflow-hidden">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <h2 className="display" data-reveal>
              Rādīt,
              <br />
              nevis stāstīt
            </h2>
            <div data-reveal>
              <p className="eyebrow text-ink">Braucieni</p>
              <p className="mt-5 max-w-sm font-mono text-sm text-muted">
                Stāsti ir lēti. Zivis — nē. Cenas un ilgumi no gidu pašu cenrāžiem — salīdzini pats.
              </p>
            </div>
          </div>

          <div className="relative mt-20 grid gap-6 sm:grid-cols-2 sm:gap-10">
            <Tape label="Braucieni" className="top-[30%]" />
            <div data-speed="0.06" className="relative z-10 space-y-10">
              {showcase.filter((_, i) => i % 2 === 0).map((t, i) => (
                <ShowcaseCard key={t.slug} trip={t} tall={i % 2 === 0} />
              ))}
            </div>
            <div data-speed="-0.05" className="relative z-10 space-y-10 sm:pt-48">
              {showcase.filter((_, i) => i % 2 === 1).map((t, i) => (
                <ShowcaseCard key={t.slug} trip={t} tall={i % 2 === 1} />
              ))}
            </div>
          </div>

          <div className="mt-20 flex justify-center sm:justify-end">
            <ShowMore href="/braucieni" label="Visi braucieni" />
          </div>
        </Container>
      </section>

      {/* Ko mēs ķeram */}
      <section className="section">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display" data-reveal>
              Ko mēs ķeram
              <br />
              (un ķeram labi)
            </h2>
            <div className="flex flex-col gap-4 lg:items-end" data-reveal>
              <p className="eyebrow text-ink">Braucienu veidi</p>
              <p
                aria-hidden="true"
                className="font-mono text-5xl font-bold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)] sm:text-6xl"
              >
                {"><(((º>"}
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {(Object.keys(tripTypes) as TripType[]).map((type, i) => (
              <ServiceCard key={type} type={type} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Pieeja */}
      <section id="ka-tas-strada" className="section scroll-mt-24">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <h2 className="display">
              <span className="sr-only">Mūsu pieeja</span>
              <span aria-hidden="true">
                <span className="text-accent">Mūsu</span>{" "}
                <span className="sticker">
                  <Hook />
                </span>
                <br />
                pieeja
              </span>
            </h2>
            <p className="mt-8 max-w-sm font-mono text-sm text-muted">
              Bez reģistrācijas un bez komisijas. Tu runā tieši ar gidu — mēs tikai apkopojam, kas par viņu publiski zināms.
            </p>
          </div>

          <ol data-progress className="relative pl-10 sm:pl-14">
            <span aria-hidden="true" className="absolute bottom-2 left-3 top-2 w-px bg-white/15 sm:left-5" />
            <span
              aria-hidden="true"
              className="absolute left-3 top-2 w-px bg-accent sm:left-5"
              style={{ height: "calc((100% - 1rem) * var(--progress, 0))" }}
            />
            {steps.map((s, i) => (
              <li key={s.title} data-step className="relative pb-28 last:pb-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[34px] top-3 h-3 w-3 rounded-full bg-accent sm:-left-[42px]"
                />
                <h3 className="flex items-baseline gap-3 font-display text-xl font-black uppercase leading-tight text-ink [font-variation-settings:'wdth'_115] sm:gap-4 sm:text-4xl sm:leading-none">
                  <span className="slashed font-mono text-base text-accent sm:text-xl">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md font-mono text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Reģioni */}
      <section id="regioni" className="section scroll-mt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display" data-reveal>
              Kur? <span className="text-accent">Visur.</span>
            </h2>
            <p className="eyebrow text-ink">Reģioni</p>
          </div>
          <ul className="mt-14 border-t border-rule">
            {regions.map((r, i) => (
              <li key={r.slug} className="border-b border-rule">
                <Link href={`/regioni/${r.slug}`} className="group relative flex items-center justify-between gap-6 py-6 sm:py-8">
                  <span className="flex items-baseline gap-5">
                    <span className="slashed font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-black uppercase leading-none text-ink transition-[color,translate] duration-300 [font-variation-settings:'wdth'_125] group-hover:translate-x-3 group-hover:text-accent sm:text-6xl">
                      {r.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[24%] top-1/2 z-10 hidden h-40 w-60 -translate-y-1/2 rotate-[-6deg] scale-75 overflow-hidden rounded-2xl opacity-0 shadow-lift-2 transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    <Scene variant={r.scene} seed={`region-${r.slug}`} className="h-full w-full" />
                  </span>
                  <span className="hidden text-right font-mono text-xs uppercase leading-relaxed text-muted md:block">
                    {tripsByRegion(r.slug).length || "Pagaidām nav"} braucieni
                    <br />
                    {r.waters.slice(0, 3).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Gidi */}
      <section className="section overflow-hidden">
        <Container>
          <h2 className="mega text-center">
            <span className="sr-only">Īsti gidi</span>
            <span aria-hidden="true">
              Īsti
              <span className="sticker w-[0.6em] [&>svg]:h-[1em] [&>svg]:w-[1.7em]">
                <Lure />
              </span>
              <br />
              gidi
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-center font-mono text-sm text-muted">
            Neatkarīgi gidi ar savām laivām un saviem ūdeņiem. Viņi nav mūsu partneri — pāršķir un sazinies tieši.
          </p>
          <div className="mt-20">
            <GuideDeck guides={guides} regionNames={regionNames} kindNames={kindLabels} />
          </div>
          <div className="mt-14 text-center">
            <Link href="/gidi" className="btn btn-secondary">
              Visi gidi →
            </Link>
          </div>
        </Container>
      </section>

      {/* Sezonas */}
      <section className="section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display" data-reveal>
              Kad ko
              <br />
              <span className="text-accent">ķert</span>
            </h2>
            <p className="max-w-xs font-mono text-xs text-muted">
              Aptuvens kalendārs. Pirms brauciena pārbaudi aktuālos makšķerēšanas noteikumus un liegumus.
            </p>
          </div>
          <div className="mt-12 overflow-hidden rounded-[24px] bg-raised">
            <div className="overflow-x-auto p-3 sm:p-6">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="font-mono text-[0.68rem] uppercase text-muted">
                    <th className="px-4 py-3 text-left font-bold">Zivs</th>
                    {months.map((m) => (
                      <th key={m} className="px-1 py-3 text-center font-bold">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {species.map((s) => (
                    <tr key={s.slug} className="border-t border-white/[0.07]">
                      <td className="px-4 py-2.5">
                        <Link href={`/braucieni?suga=${s.slug}`} className="inline-block py-1 font-medium text-ink hover:text-accent">
                          {s.name}
                        </Link>
                      </td>
                      {months.map((m, i) => {
                        const month = i + 1;
                        const cls = s.best.includes(month)
                          ? "bg-accent shadow-led"
                          : s.good.includes(month)
                            ? "bg-accent/30"
                            : "bg-white/[0.06]";
                        return (
                          <td key={m} className="px-1 py-2.5">
                            <div className={`mx-auto h-5 w-full max-w-10 rounded-full ${cls}`} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-6 border-t border-white/[0.07] px-6 py-4 font-mono text-[0.68rem] font-bold uppercase text-muted">
              <span className="flex items-center gap-2">
                <span className="h-3 w-5 rounded-full bg-accent shadow-led" /> Labākais laiks
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-5 rounded-full bg-accent/30" /> Labs laiks
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* BUJ */}
      <section id="buj" className="section scroll-mt-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="display lg:sticky lg:top-36 lg:self-start">
            Jautā
            <br />
            <span className="text-accent">droši</span>
          </h2>
          <div className="border-t border-rule">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-rule py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg font-black uppercase leading-tight text-ink [font-variation-settings:'wdth'_110] sm:text-2xl">
                  {item.q}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-edge text-xl transition group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-on-accent">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ShowcaseCard({ trip, tall }: { trip: Trip; tall: boolean }) {
  const region = getRegion(trip.region);
  return (
    <div data-reveal>
      <Link href={`/braucieni/${trip.slug}`} className="card dogear group block overflow-hidden">
        <div className={`relative ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <div className="absolute inset-0 transition duration-700 group-hover:scale-105">
            <Photo alt={trip.title} scene={trip.scene} seed={trip.slug} sizes="(min-width: 640px) 45vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
          <div className="absolute inset-x-5 bottom-6 flex flex-col items-start gap-3 pr-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="eyebrow text-ink/75">
                {region?.name ?? "Visa Latvija"} · {trip.waters[0]}
              </p>
              <h3 className="mt-2 font-display text-xl font-black uppercase leading-tight text-ink [font-variation-settings:'wdth'_110] sm:text-2xl">
                {trip.title}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-black/80 px-3 py-1.5 font-mono text-xs font-bold text-ink">
              {trip.priceFrom !== undefined ? `no ${formatPrice(trip.priceFrom)}` : "Cena pēc pieprasījuma"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Tape({ label, className }: { label: string; className: string }) {
  const run = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="flex items-center gap-6 px-6 font-display text-2xl font-black uppercase text-on-accent [font-variation-settings:'wdth'_120] sm:text-3xl"
        >
          {label}
          <Sparkle className="h-4 w-4" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -left-[15%] w-[130%] -rotate-[9deg] bg-accent py-3 shadow-lift-2 ${className}`}
    >
      <div className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  );
}

function ShowMore({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative flex h-48 w-48 items-center justify-center rounded-full bg-bezel transition hover:bg-ink sm:h-56 sm:w-56"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute h-[70%] w-[70%] transition duration-500 group-hover:rotate-[-45deg]">
        <path d="M50 8 L92 50 L50 92 L50 68 L12 68 L12 32 L50 32 Z" fill="#0a0a0a" strokeLinejoin="round" />
      </svg>
      <span className="relative pr-2 font-mono text-[0.7rem] font-bold uppercase text-ink">{label}</span>
    </Link>
  );
}

function ServiceCard({ type, index }: { type: TripType; index: number }) {
  const style = cardStyles[index % cardStyles.length];
  const list = trips.filter((t) => t.type === type);
  return (
    <div
      data-reveal
      className={`dogear relative flex min-h-[380px] flex-col rounded-[24px] p-7 sm:p-9 ${style.box}`}
      style={{ "--fold-color": style.fold } as React.CSSProperties}
    >
      <p className="slashed font-mono text-6xl font-bold leading-none">{String(index + 1).padStart(2, "0")}</p>
      <ul className="mt-8 flex flex-col items-start gap-2">
        {list.slice(0, 4).map((t) => (
          <li key={t.slug}>
            <Link
              href={`/braucieni/${t.slug}`}
              className={`inline-flex items-center gap-3 rounded-full border py-1.5 pl-4 pr-1.5 text-sm transition ${style.pill}`}
            >
              {t.title}
              <span className="rounded-full bg-black px-2.5 py-1 font-mono text-[0.7rem] font-bold text-ink">
                {t.priceFrom !== undefined ? `no ${formatPrice(t.priceFrom)}` : "pēc piepr."}
              </span>
            </Link>
          </li>
        ))}
        {list.length > 4 && (
          <li>
            <Link href={`/braucieni?veids=${type}`} className="inline-block py-2 font-mono text-xs font-bold uppercase underline underline-offset-4">
              +{list.length - 4} vairāk
            </Link>
          </li>
        )}
      </ul>
      <h3 className="mt-auto flex items-center gap-3 pt-10 font-display text-xl font-black uppercase leading-tight [font-variation-settings:'wdth'_115] sm:text-3xl sm:leading-none">
        <span aria-hidden="true" className={style.arrow}>
          ↘
        </span>
        <Link href={`/braucieni?veids=${type}`} className="py-1 hover:underline hover:underline-offset-4">
          {tripTypes[type]}
        </Link>
      </h3>
    </div>
  );
}
