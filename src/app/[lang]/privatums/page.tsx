import { getLocale, localize } from "@/i18n/server";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() { return pageMetadata({ title: "Privātuma politika", path: "/privatums", description: "Kā Copes Gidi izmanto publisko gidu informāciju, pieteikumus un apkopotu apmeklējuma statistiku. Saziņa datu labošanai un dzēšanai." }); }

// Šis ir sākuma teksts — pirms publicēšanas to vajadzētu pārskatīt juristam.
export default async function PrivacyPage() {
  const locale = await getLocale();
  return localize((
    <>
      <Container className="max-w-3xl pb-24 pt-32 sm:pt-40">
        <h1 className="headline">Privātuma politika</h1>
        <div className="mt-8 space-y-5 text-muted">
          <h2 className="title text-ink">Makšķerniekiem</h2>
          <p>
            {site.name} nepieņem rezervācijas un maksājumus. Kad zvani vai raksti gidam, tu sazinies ar viņu tieši —
            mēs šos datus nesaņemam.
          </p>
          <h2 className="title text-ink">Apmeklējuma statistika</h2>
          <p>
            Lapas apmeklējumu skaitīšanai izmantojam Vercel Web Analytics. Tas nelieto sīkdatnes un neveido
            apmeklētāju profilus — redzam tikai apkopotus skaitļus, piemēram, cik reizes atvērta kāda lapa.
            Reģistrējam arī klikšķus uz gida saziņas saitēm un meklējumus bez rezultātiem, lai uzlabotu katalogu.
            Šajos notikumos izmantojam profila identifikatoru, saites veidu un lapas ceļu; nenosūtām tālruņa
            numuru, e-pasta adresi vai ziņas saturu.
          </p>
          <h2 className="title text-ink">Gidiem</h2>
          <p>
            Gidu profili ir apkopoti tikai no publiskiem avotiem: gidu pašu mājaslapām, sociālajiem tīkliem, tūrisma
            katalogiem un uzņēmumu reģistra datiem. Izmantojam tikai darba informāciju — vārdu vai zīmolu, publicētos
            kontaktus, pakalpojumus, cenas un aprīkojumu. Privātas adreses, ģimenes informāciju un fotogrāfijas
            nepublicējam. Katrā profilā ir norādīti avoti un pārbaudes datums.
          </p>
          <p>
            Ja esi gids un vēlies informāciju labot, papildināt vai dzēst savu profilu, raksti mums — izdarīsim to
            bez liekiem jautājumiem.
          </p>
          <h2 className="title text-ink">Pieteikumi</h2>
          <p>
            Ja aizpildi pieteikuma formu lapā “Kļūsti par gidu”, mēs saņemam tajā norādītos datus un izmantojam tos
            tikai, lai ar tevi sazinātos. Datus nepārdodam un nenododam trešajām personām.
          </p>
          <p>
            Tev ir tiesības pieprasīt savu datu kopiju, labošanu vai dzēšanu. Raksti mums:{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  ), locale);
}
