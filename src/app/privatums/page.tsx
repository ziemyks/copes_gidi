import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privātuma politika" };

// Šis ir sākuma teksts — pirms publicēšanas to vajadzētu pārskatīt juristam.
export default function PrivacyPage() {
  return (
    <>
      <Container className="max-w-3xl pb-24 pt-32 sm:pt-40">
        <h1 className="headline">Privātuma politika</h1>
        <div className="mt-8 space-y-5 text-muted">
          <h2 className="title text-ink">Makšķerniekiem</h2>
          <p>
            {site.name} nepieņem rezervācijas un maksājumus. Kad zvani vai raksti gidam, tu sazinies ar viņu tieši —
            mēs šos datus nesaņemam.
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
  );
}
