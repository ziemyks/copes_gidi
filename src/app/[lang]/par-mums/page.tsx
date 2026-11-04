import { getLocale, localize } from "@/i18n/server";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo";
import { formatDate } from "@/components/guide-parts";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() { return pageMetadata({
  title: "Par Copes Gidi un informācijas avotiem", path: "/par-mums",
  description: "Kā Copes Gidi atlasa makšķerēšanas gidus, apkopo publiskās cenas un norāda avotus. Kataloga secība, pārbaudes datumi un informācijas labošana.",
}); }

export default async function AboutPage() {
  const locale = await getLocale();
  return localize((
    <>
      <PageHeader eyebrow="Par katalogu" title="Gidi, cenas un avoti" intro="Copes Gidi ir neatkarīgs Latvijas makšķerēšanas gidu un braucienu katalogs. Mēs palīdzam salīdzināt publiski pieejamo informāciju un sazināties tieši ar gidu.">
        <div className="mt-8"><Breadcrumbs items={[{ name: "Sākums", path: "/" }, { name: "Par mums", path: "/par-mums" }]} /></div>
      </PageHeader>
      <Container className="max-w-3xl space-y-12 py-16">
        <section><h2 className="headline">Kā atlasām profilus</h2><p className="mt-5 text-muted">Iekļaujam gidus un komandas ar publiski aprakstītu makšķerēšanas piedāvājumu Latvijā. Izmantojam viņu mājaslapas, publiskās publikācijas, tūrisma katalogus un citus profilā nosauktos avotus. Profila esamība nenozīmē sadarbību vai gida apstiprinājumu.</p></section>
        <section><h2 className="headline">Avots pie fakta</h2><p className="mt-5 text-muted">Profila beigās redzami izmantotie avoti un to pārbaudes datums. Gida paša apgalvojumi par pieredzi un sasniegumiem ir nošķirti no neatkarīgiem avotiem. Ja informācija nav publicēta, to neizdomājam.</p><p className="mt-4 text-muted">Pašreizējie profili apkopoti no publiskiem avotiem, kas pārbaudīti {formatDate(site.checked)} Pārbaudes datums nav apliecinājums šodienas pieejamībai vai gala cenai.</p></section>
        <section><h2 className="headline">Ko nozīmē publicētā cena</h2><p className="mt-5 text-muted">Norādām cenas avotu un pamatu: par braucienu, personu, stundu vai citu publicēto vienību. Atšķirīgus cenu pamatus nedrīkst salīdzināt kā vienādu pakalpojumu. PVN, papildu izdevumus, brīvos datumus un atcelšanas noteikumus pirms rezervācijas precizē pie gida.</p></section>
        <section><h2 className="headline">Kāpēc gidi ir šādā secībā</h2><p className="mt-5 text-muted">Vispirms rādām profilus ar redzamu publisku darbību, tad ņemam vērā jaunākā datētā pierādījuma laiku. Tā nav kvalitātes vai labāko gidu tabula. Atzīme “Aktīvs” raksturo publisku darbības pazīmi, nevis brīvus datumus.</p></section>
        <section><h2 className="headline">Sazinies tieši</h2><p className="mt-5 text-muted">Copes Gidi nepieņem braucienu rezervācijas vai maksājumus un neņem komisiju. Norādītie gidi ir neatkarīgi pakalpojumu sniedzēji. Rakstot vai zvanot profilā publicētajiem kontaktiem, tu sazinies ar pašu gidu vai skaidri norādīto kontaktpersonu.</p></section>
        <section><h2 className="headline">Labojumi un saziņa</h2><p className="mt-5 text-muted">Kataloga satura jautājumus un labojumus pieņemam <a className="link" href={`mailto:${site.email}`}>{site.email}</a>. Norādi profila saiti un, ja iespējams, aktuālo publisko avotu. Gids var lūgt papildināt, labot vai dzēst savu profilu.</p><div className="mt-6 flex flex-wrap gap-4"><Link className="btn btn-primary" href="/klusti-par-gidu">Pievienot vai labot profilu</Link><Link className="btn btn-secondary" href="/privatums">Privātuma politika</Link></div></section>
      </Container>
    </>
  ), locale);
}
