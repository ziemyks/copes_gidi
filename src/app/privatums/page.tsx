import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privātuma politika" };

// Šis ir sākuma teksts — pirms publicēšanas to vajadzētu pārskatīt juristam.
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <Container className="max-w-3xl pb-24 pt-16">
        <h1 className="headline">Privātuma politika</h1>
        <div className="mt-8 space-y-5 text-muted">
          <p>
            Kad tu nosūti pieprasījumu caur {site.name}, mēs saņemam tavu vārdu, e-pastu, tālruni (ja norādīts) un
            ziņas saturu. Šos datus izmantojam tikai, lai nodotu pieprasījumu izvēlētajam gidam un atbildētu uz
            taviem jautājumiem.
          </p>
          <p>
            Mēs nepārdodam un nenododam tavus datus trešajām personām mārketinga nolūkos. Pieprasījumus glabājam ne
            ilgāk kā nepieciešams, lai nodrošinātu saziņu par braucienu.
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
