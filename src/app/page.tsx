import Link from "next/link";
import { Carousel, CarouselItem } from "@/components/carousel";
import { Scene } from "@/components/scene";
import { SiteHeader } from "@/components/site-header";
import { ArrowLink, Container, Eyebrow, Figure, GuideCard, SectionHeading, TripCard } from "@/components/ui";
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

const darkSelect =
  "min-h-11 flex-1 rounded-[3px] border border-instrument-rule bg-instrument-raised px-3 text-[0.9375rem] text-instrument-text outline-none focus:border-gold";

export default function Home() {
  const featuredTrips = trips.slice(0, 8);
  const featuredGuides = guides.slice(0, 6);

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-rule">
        <Container className="pb-12 pt-16 sm:pb-16 sm:pt-24">
          <Eyebrow>
            {guides.length} gidi · {regions.length} reģioni · {trips.length} braucieni
          </Eyebrow>
          <h1 className="display mt-6 max-w-5xl">
            Noķer savas dzīves zivi.{" "}
            <span className="text-muted">Kopā ar kādu, kas šos ūdeņus pazīst.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Artūrs zina katru Ventas bedri. Jānis 18 gadus ķer līdakas Rāznā. Māris naktīs medī samus Daugavā. Tu
            maksā tikai pēc tam, kad gids apstiprina datumus.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/braucieni" className="btn btn-primary">
              Atrast braucienu
            </Link>
            <Link href="#ka-tas-strada" className="btn btn-secondary">
              Kā tas strādā
            </Link>
          </div>
        </Container>

        <Container className="pb-16 sm:pb-24">
          <div className="relative">
            <Figure
              scene="lake"
              seed="hero-latgale"
              caption="Rāzna, Latgale — rītausma"
              meta="56.3° N · 27.5° E"
              className="aspect-[4/3] sm:aspect-[21/9]"
            />
            <form
              action="/braucieni"
              className="relative mt-4 flex flex-col gap-2 rounded-lg bg-instrument p-2 shadow-lift-2 sm:flex-row lg:absolute lg:bottom-14 lg:left-6 lg:mt-0 lg:w-[640px]"
            >
              <select name="regions" aria-label="Reģions" className={darkSelect}>
                <option value="">Jebkurš reģions</option>
                {regions.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
              <select name="suga" aria-label="Zivs" className={darkSelect}>
                <option value="">Jebkura zivs</option>
                {species.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-gold min-h-11">Meklēt</button>
            </form>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-rule">
        <Container className="grid grid-cols-3 divide-x divide-rule">
          {[
            { value: `${guides.length}+`, label: "Vietējie gidi", text: "Katru gidu esam satikuši un pārbaudījuši personīgi." },
            { value: `${regions.length}`, label: "Reģioni", text: "No Kurzemes jūras krasta līdz Latgales ezeriem." },
            { value: "24 h", label: "Personīga atbilde", text: "Uz katru pieprasījumu atbild īsts cilvēks." },
          ].map((s) => (
            <div key={s.label} className="py-8 pl-4 first:pl-0 sm:py-10 sm:pl-8">
              <p className="font-display text-5xl font-extralight leading-none text-ink sm:text-7xl">{s.value}</p>
              <p className="eyebrow mt-4">{s.label}</p>
              <p className="mt-2 hidden text-sm text-muted sm:block">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Story */}
      <section className="section">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow index="01" className="mb-5">
              Par mums
            </Eyebrow>
            <h2 className="headline">Mēs neesam ceļojumu aģentūra.</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p className="text-ink">Esam makšķernieki, kas atrada savējos.</p>
              <p>
                Latvijā ir vairāk nekā 12 000 upju un 2 000 ezeru, bet labākās vietas zina tikai vietējie. Mēs
                izveidojām {site.name}, lai tos vietējos būtu viegli atrast.
              </p>
              <p>
                Katrs gids šeit ir neatkarīgs — tas ir viņa paša bizness, viņa laiva un viņa ūdeņi. Pirms gids
                parādās lapā, mēs izrunājam sezonu, cenas, drošību un atsauksmes. Nekādu paketes ceļojumu, nekādu
                starpnieku uzcenojumu.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Figure scene="river" seed="story-venta" caption="Venta" className="aspect-[3/4]" />
            <div className="pt-16">
              <Figure scene="forest" seed="story-gauja" caption="Gauja" className="aspect-[3/4]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Trips carousel */}
      <section className="section border-t border-rule bg-paper-deep">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Braucieni"
            title="Braucieni, ko vari rezervēt."
            action={<ArrowLink href="/braucieni">Visi braucieni</ArrowLink>}
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
      <section id="ka-tas-strada" className="section scroll-mt-16 border-t border-rule">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Kā tas strādā"
            title="Vienkāršāk nekā meklēt pašam."
            intro="Bez reģistrācijas un bez komisijas. Tu runā tieši ar gidu."
          />
          <ol className="grid border-t border-rule md:grid-cols-3 md:divide-x md:divide-rule">
            {steps.map((s, i) => (
              <li key={s.title} className="py-8 md:px-8 md:first:pl-0">
                <span className="font-mono text-sm text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="title mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/braucieni" className="btn btn-primary">
              Apskatīt braucienus
            </Link>
            <p className="text-sm text-muted">Pārlūkot un sūtīt pieprasījumus var bez maksas.</p>
          </div>
        </Container>
      </section>

      {/* Regions */}
      <section id="regioni" className="section scroll-mt-16 border-t border-rule">
        <Container>
          <SectionHeading index="04" eyebrow="Reģioni" title="Pieci reģioni. Tūkstošiem ezeru." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => (
              <Link key={r.slug} href={`/regioni/${r.slug}`} className="card group flex flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-rule">
                  <Scene variant={r.scene} seed={`region-${r.slug}`} className="absolute inset-0 h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-3xl font-light text-ink">{r.name}</h3>
                  <p className="mt-1 text-muted">{r.tagline}</p>
                  <p className="eyebrow mt-auto pt-5">
                    {tripsByRegion(r.slug).length} braucieni · {r.waters.slice(0, 3).join(", ")}
                  </p>
                </div>
              </Link>
            ))}
            <div className="flex flex-col justify-between rounded-lg border border-dashed border-edge/40 p-6">
              <p className="text-muted">Nezini, kur braukt? Pastāsti, ko gribi noķert, un mēs ieteiksim gidu.</p>
              <a href={`mailto:${site.email}`} className="link mt-6 self-start font-medium">
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Guides */}
      <section className="section border-t border-rule bg-paper-deep">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Gidi"
            title="Cilvēki, ar kuriem copēsi."
            action={<ArrowLink href="/gidi">Visi gidi</ArrowLink>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Container>
      </section>

      {/* Species */}
      <section className="section border-t border-rule">
        <Container>
          <SectionHeading index="06" eyebrow="Zivis" title="Ko tu gribi noķert?" />
          <div className="grid grid-cols-2 border-l border-t border-rule md:grid-cols-3 lg:grid-cols-5">
            {species.map((s) => (
              <Link
                key={s.slug}
                href={`/braucieni?suga=${s.slug}`}
                className="group border-b border-r border-rule p-5 transition-colors hover:bg-raised"
              >
                <FishIcon className="h-6 w-12 text-faint transition-colors group-hover:text-gold" />
                <h3 className="title mt-5">{s.name}</h3>
                <p className="text-sm italic text-muted">{s.latin}</p>
                <p className="eyebrow mt-4">{tripsBySpecies(s.slug).length} braucieni →</p>
              </Link>
            ))}
            <div className="hidden border-b border-r border-rule bg-paper-deep lg:block" />
          </div>
        </Container>
      </section>

      {/* Season calendar */}
      <section className="section border-t border-rule">
        <Container>
          <SectionHeading
            index="07"
            eyebrow="Sezonas"
            title="Kad ko ķert."
            intro="Aptuvens kalendārs. Pirms brauciena pārbaudi aktuālos makšķerēšanas noteikumus un liegumus."
          />
          <div className="overflow-hidden rounded-lg bg-instrument shadow-lift-2">
            <div className="overflow-x-auto p-2 sm:p-4">
              <table className="w-full min-w-[720px] text-sm text-instrument-text">
                <thead>
                  <tr className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-instrument-muted">
                    <th className="px-4 py-3 text-left font-normal">Zivs</th>
                    {months.map((m) => (
                      <th key={m} className="px-1 py-3 text-center font-normal">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {species.map((s) => (
                    <tr key={s.slug} className="border-t border-instrument-rule">
                      <td className="px-4 py-2.5">
                        <Link href={`/braucieni?suga=${s.slug}`} className="hover:text-gold">
                          {s.name}
                        </Link>
                      </td>
                      {months.map((m, i) => {
                        const month = i + 1;
                        const cls = s.best.includes(month)
                          ? "bg-gold shadow-led"
                          : s.good.includes(month)
                            ? "bg-gold/30"
                            : "bg-instrument-raised";
                        return (
                          <td key={m} className="px-1 py-2.5">
                            <div className={`mx-auto h-4 w-full max-w-9 rounded-[2px] ${cls}`} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-6 border-t border-instrument-rule px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-instrument-muted">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-gold shadow-led" /> Labākais laiks
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-gold/30" /> Labs laiks
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="buj" className="section scroll-mt-16 border-t border-rule bg-paper-deep">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow index="08" className="mb-5">
              BUJ
            </Eyebrow>
            <h2 className="headline">Biežākie jautājumi.</h2>
          </div>
          <div className="border-t border-rule">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-rule py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium text-ink">
                  {item.q}
                  <span className="font-mono text-faint transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-instrument-deep text-instrument-text">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-instrument-muted">Sezona 2026/27</p>
            <h2 className="display text-instrument-text">Rudens plēsēji. Ziemā — ledus.</h2>
            <p className="mt-6 max-w-lg text-lg text-instrument-muted">
              Labākās nedēļas aizpildās ātri. Raksti gidam jau tagad, un viņš ieteiks piemērotāko laiku.
            </p>
            <Link href="/braucieni" className="btn btn-gold mt-8">
              Atrast braucienu
            </Link>
          </div>
          <div className="space-y-8 border-t border-instrument-rule pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <h3 className="title text-instrument-text">Runā ar mums</h3>
              <p className="mt-2 text-sm text-instrument-muted">
                Nezini, kuru gidu izvēlēties? Atbildam 24 stundu laikā latviešu, angļu vai krievu valodā.
              </p>
              <a href={`mailto:${site.email}`} className="mt-3 inline-block text-instrument-text underline decoration-gold underline-offset-4">
                {site.email}
              </a>
            </div>
            <div>
              <h3 className="title text-instrument-text">Esi makšķerēšanas gids?</h3>
              <Link href="/klusti-par-gidu" className="mt-2 inline-block text-instrument-text underline decoration-instrument-rule underline-offset-4 hover:decoration-gold">
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
    </svg>
  );
}
