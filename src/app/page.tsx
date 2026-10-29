import Link from "next/link";
import { Carousel, CarouselItem } from "@/components/carousel";
import { Scene } from "@/components/scene";
import { SiteHeader } from "@/components/site-header";
import { Container, GuideCard, SectionHeading, TripCard } from "@/components/ui";
import { guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { species } from "@/data/species";
import { trips, tripsByRegion, tripsBySpecies } from "@/data/trips";
import { site } from "@/lib/site";

const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"];

const steps = [
  {
    title: "Izvēlies braucienu un gidu",
    text: "Salīdzini braucienus pēc reģiona, zivs un cenas. Katram gidam ir profils ar pieredzi un valodām.",
  },
  {
    title: "Nosūti pieprasījumu",
    text: "Norādi vēlamos datumus un pastāsti par sevi. Tas ir bez maksas un bez saistībām.",
  },
  {
    title: "Gids apstiprina 48 h laikā",
    text: "Gids atbild personīgi. Priekšapmaksu veic tikai pēc tam, kad datumi ir apstiprināti.",
  },
];

const faq = [
  {
    q: "Vai man vajag makšķerēšanas karti?",
    a: "Jā. Latvijā makšķerēšanas karte parasti nepieciešama makšķerniekiem no 16 līdz 65 gadu vecumam, un to var iegādāties tiešsaistē. Licencētajos ūdeņos (piemēram, lašu posmos Ventā un Salacā) papildus vajag licenci. Gids pastāstīs, kas tieši nepieciešams, bet pirms brauciena pārbaudi aktuālos noteikumus.",
  },
  {
    q: "Kā notiek apmaksa?",
    a: "Pieprasījuma nosūtīšana ir bezmaksas. Kad gids apstiprina datumus, tu veic priekšapmaksu tieši gidam. Atlikumu parasti maksā brauciena dienā.",
  },
  {
    q: "Vai varu braukt bez iepriekšējas pieredzes?",
    a: "Protams. Daudzi braucieni ir paredzēti iesācējiem un ģimenēm, un aprīkojums ir iekļauts. Braucienu sarakstā vari atlasīt piemērotākos.",
  },
  {
    q: "Kas notiek, ja ir slikti laikapstākļi?",
    a: "Drošība ir pirmajā vietā. Ja gids uzskata, ka laikapstākļi ir bīstami, brauciens tiek pārcelts uz citu datumu vai nauda tiek atmaksāta.",
  },
  {
    q: "Vai drīkst paturēt noķertās zivis?",
    a: "Atbilstoši Latvijas noteikumiem par izmēriem un lomu limitiem — jā. Daudzi gidi lielās zivis (īpaši samus un lašus) iesaka atlaist pēc fotografēšanas.",
  },
];

export default function Home() {
  const featuredTrips = trips.slice(0, 8);
  const featuredGuides = guides.slice(0, 6);

  return (
    <>
      <SiteHeader overlay />

      {/* Hero */}
      <section className="relative flex h-[92svh] min-h-[640px] max-h-[960px] items-end overflow-hidden bg-ink text-white">
        <Scene variant="lake" seed="hero-latgale" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/20" />
        <Container className="relative w-full pb-16 pt-32 sm:pb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Neatkarīgi gidi · visa Latvija
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Noķer savas dzīves zivi.
          </h1>
          <p className="mt-3 font-display text-2xl text-white/90 sm:text-3xl">
            Kopā ar kādu, kas šos ūdeņus pazīst.
          </p>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Artūrs zina katru Ventas bedri. Jānis 18 gadus ķer līdakas Rāznā. Māris naktīs medī samus Daugavā.
            Tu maksā tikai pēc tam, kad gids apstiprina datumus.
          </p>

          <form
            action="/braucieni"
            className="mt-10 flex max-w-3xl flex-col gap-3 rounded-3xl bg-white/95 p-3 text-ink shadow-2xl sm:flex-row"
          >
            <select name="regions" className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm outline-none">
              <option value="">Jebkurš reģions</option>
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
            <select name="suga" className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm outline-none">
              <option value="">Jebkura zivs</option>
              {species.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <button className="rounded-2xl bg-amber px-6 py-3 font-semibold text-white transition hover:bg-amber-dark">
              Meklēt braucienus →
            </button>
          </form>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-sand">
        <Container className="grid gap-8 py-12 sm:grid-cols-3">
          {[
            { value: `${guides.length}+`, label: "Vietējie gidi", text: "Katru gidu esam satikuši un pārbaudījuši personīgi." },
            { value: `${regions.length}`, label: "Reģioni", text: "No Kurzemes jūras krasta līdz Latgales ezeriem." },
            { value: "24 h", label: "Personīga atbilde", text: "Uz katru pieprasījumu atbild īsts cilvēks, nevis robots." },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-semibold text-deep">{s.value}</p>
              <p className="mt-2 font-semibold text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Par mums" title="Mēs neesam ceļojumu aģentūra." />
            <div className="-mt-4 space-y-4 text-lg text-muted">
              <p className="font-display text-2xl text-ink">Esam makšķernieki, kas atrada savējos.</p>
              <p>
                Latvijā ir vairāk nekā 12 000 upju un 2 000 ezeru, bet labākās vietas zina tikai vietējie. Mēs
                izveidojām {site.name}, lai tos vietējos būtu viegli atrast.
              </p>
              <p>
                Katrs gids šeit ir neatkarīgs — tas ir viņa paša bizness, viņa laiva un viņa ūdeņi. Pirms gids
                parādās lapā, mēs ar viņu izrunājam sezonu, cenas, drošību un atsauksmes. Nekādu paketes ceļojumu,
                nekādu starpnieku uzcenojumu.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Scene variant="river" seed="story-venta" className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
              <Scene variant="forest" seed="story-gauja" className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Trips carousel */}
      <section className="bg-sand py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Braucieni"
            title="Braucieni, ko vari rezervēt."
            action={
              <Link href="/braucieni" className="font-semibold text-deep hover:underline">
                Visi braucieni →
              </Link>
            }
          />
          <Carousel>
            {featuredTrips.map((t) => (
              <CarouselItem key={t.slug}>
                <TripCard trip={t} />
              </CarouselItem>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Kā tas strādā"
            title="Vienkāršāk nekā meklēt pašam."
            intro="Bez reģistrācijas un bez komisijas. Tu runā tieši ar gidu."
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-white p-8">
                <span className="font-display text-5xl font-semibold text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/braucieni"
              className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-deep"
            >
              Apskatīt braucienus
            </Link>
            <p className="text-sm text-muted">Pārlūkot un sūtīt pieprasījumus var bez maksas.</p>
          </div>
        </Container>
      </section>

      {/* Regions */}
      <section id="regioni" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <span className="h-px w-8 bg-white/70" />
              Reģioni
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Pieci reģioni. Tūkstošiem ezeru.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r, i) => (
              <Link
                key={r.slug}
                href={`/regioni/${r.slug}`}
                className={`group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl p-6 ${i === 0 ? "lg:row-span-2" : ""}`}
              >
                <Scene
                  variant={r.scene}
                  seed={`region-${r.slug}`}
                  className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-2xl font-semibold">{r.name}</h3>
                  <p className="mt-1 text-white/85">{r.tagline}</p>
                  <p className="mt-3 text-xs text-white/70">
                    {tripsByRegion(r.slug).length} braucieni · {r.season}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold">Atklāt →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Guides */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Gidi"
            title="Cilvēki, ar kuriem copēsi."
            action={
              <Link href="/gidi" className="font-semibold text-deep hover:underline">
                Visi gidi →
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Container>
      </section>

      {/* Species */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Zivis" title="Ko tu gribi noķert?" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {species.map((s) => (
              <Link
                key={s.slug}
                href={`/braucieni?suga=${s.slug}`}
                className="group rounded-3xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <FishIcon className="h-10 w-16 text-water transition group-hover:text-amber" />
                <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
                <p className="text-xs italic text-muted">{s.latin}</p>
                <p className="mt-3 text-sm font-medium text-deep">{tripsBySpecies(s.slug).length} braucieni</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Season calendar */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Sezonas"
            title="Kad ko ķert."
            intro="Aptuvens kalendārs. Pirms brauciena pārbaudi aktuālos makšķerēšanas noteikumus un liegumus."
          />
          <div className="overflow-x-auto rounded-3xl border border-line bg-white">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="px-5 py-4 text-left font-medium">Zivs</th>
                  {months.map((m) => (
                    <th key={m} className="px-1 py-4 text-center font-medium">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {species.map((s) => (
                  <tr key={s.slug} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium">
                      <Link href={`/braucieni?suga=${s.slug}`} className="hover:text-water">
                        {s.name}
                      </Link>
                    </td>
                    {months.map((m, i) => {
                      const month = i + 1;
                      const cls = s.best.includes(month)
                        ? "bg-deep"
                        : s.good.includes(month)
                          ? "bg-water/35"
                          : "bg-sand";
                      return (
                        <td key={m} className="px-1 py-3">
                          <div className={`mx-auto h-6 rounded-md ${cls}`} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-6 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-deep" /> Labākais laiks
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-water/35" /> Labs laiks
            </span>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="buj" className="scroll-mt-20 bg-sand py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="BUJ" title="Biežākie jautājumi." />
          <div className="divide-y divide-line rounded-3xl border border-line bg-white">
            {faq.map((item) => (
              <details key={item.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-semibold">
                  {item.q}
                  <span className="text-2xl text-water transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Season CTA */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Scene variant="ice" seed="cta-ziema" className="absolute inset-0 h-full w-full opacity-50" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/30" />
        <Container className="relative grid gap-10 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Rudens plēsēji. Ziemā — ledus.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Labākās nedēļas aizpildās ātri. Raksti gidam jau tagad, un viņš ieteiks piemērotāko laiku.
            </p>
            <Link
              href="/braucieni"
              className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-white transition hover:bg-amber-dark"
            >
              Atrast braucienu →
            </Link>
          </div>
          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
            <h3 className="font-display text-2xl font-semibold">Runā ar mums</h3>
            <p className="mt-2 text-white/80">
              Nezini, kuru gidu izvēlēties? Uzraksti, un mēs ieteiksim. Atbildam 24 stundu laikā latviešu, angļu vai
              krievu valodā.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block font-semibold underline underline-offset-4">
              {site.email}
            </a>
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-sm text-white/80">Esi makšķerēšanas gids?</p>
              <Link href="/klusti-par-gidu" className="font-semibold hover:underline">
                Pievienojies {site.name} →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FishIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 16c8-11 26-13 40-4l12-8v24l-12-8C30 29 12 27 4 16z" />
      <circle cx="14" cy="14" r="2" fill="#fff" />
    </svg>
  );
}
