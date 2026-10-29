import type { Metadata } from "next";
import { GuideApplicationForm } from "@/components/forms";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kļūsti par gidu",
  description: `Esi makšķerēšanas gids Latvijā? Pievienojies ${site.name} vai labo savu profilu.`,
};

const benefits = [
  { title: "Tieši kontakti", text: "Profilā ir tavi tālrunis, WhatsApp un e-pasts. Makšķernieki zvana un raksta tieši tev." },
  { title: "Bez komisijas", text: "Mēs neesam starpnieks — rezervācijas un apmaksa paliek starp tevi un klientu." },
  { title: "Tavs profils tavās rokās", text: "Pievieno fotogrāfijas, valodas un atcelšanas noteikumus vai labo to, ko esam apkopojuši." },
];

export default function BecomeGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Gidiem"
        title="Vadi braucienus?"
        intro="Ļauj makšķerniekiem tevi atrast. Ja tavs profils jau ir lapā, tas apkopots no publiskiem avotiem — palīdzi to papildināt vai labot."
      />
      <Container className="grid items-start gap-12 pb-24 pt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <ol className="border-t border-rule">
            {benefits.map((b, i) => (
              <li key={b.title} className="border-b border-rule py-6">
                <span className="font-mono text-sm text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="title mt-3">{b.title}</h2>
                <p className="mt-1 text-muted">{b.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Vēlies profilu labot vai dzēst? Raksti uz {site.email} — izdarīsim to bez liekiem jautājumiem.
          </p>
        </div>
        <div className="card p-6 shadow-lift-1 sm:p-8">
          <GuideApplicationForm />
        </div>
      </Container>
    </>
  );
}
