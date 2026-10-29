import type { Metadata } from "next";
import { GuideApplicationForm } from "@/components/forms";
import { SiteHeader } from "@/components/site-header";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kļūsti par gidu",
  description: `Esi makšķerēšanas gids Latvijā? Pievienojies ${site.name} un saņem pieprasījumus tieši no makšķerniekiem.`,
};

const benefits = [
  { title: "Tieši pieprasījumi", text: "Makšķernieki raksta tieši tev. Tu pats apstiprini datumus un saņem apmaksu." },
  { title: "Bez komisijas sākumā", text: "Pirmajā sezonā profils un pieprasījumi ir bez maksas." },
  { title: "Tavs profils, tavs stāsts", text: "Palīdzēsim sagatavot aprakstu, fotogrāfijas un braucienu piedāvājumu." },
];

export default function BecomeGuidePage() {
  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Gidiem"
        title="Vadi braucienus? Ļauj makšķerniekiem tevi atrast."
        intro="Mēs meklējam neatkarīgus gidus visā Latvijā, kuriem rūp droša, godīga un kvalitatīva cope."
      />
      <Container className="grid items-start gap-12 pb-24 pt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <ol className="border-t border-rule">
            {benefits.map((b, i) => (
              <li key={b.title} className="border-b border-rule py-6">
                <span className="font-mono text-sm text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="title mt-3">{b.title}</h2>
                <p className="mt-1 text-muted">{b.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Pēc pieteikuma mēs sazvanīsimies, lai iepazītos un izrunātu sezonu, cenas, drošību un atsauksmes.
          </p>
        </div>
        <div className="card p-6 shadow-lift-1 sm:p-8">
          <GuideApplicationForm />
        </div>
      </Container>
    </>
  );
}
