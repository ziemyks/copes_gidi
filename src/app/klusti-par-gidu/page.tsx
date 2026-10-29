import type { Metadata } from "next";
import { GuideApplicationForm } from "@/components/forms";
import { SiteHeader } from "@/components/site-header";
import { Container, PageHero } from "@/components/ui";
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
      <PageHero
        eyebrow="Gidiem"
        title="Vadi braucienus? Ļauj makšķerniekiem tevi atrast."
        intro="Mēs meklējam neatkarīgus gidus visā Latvijā, kuriem rūp droša, godīga un kvalitatīva cope."
        scene="sea"
        seed="become-guide"
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-6">
          {benefits.map((b) => (
            <div key={b.title}>
              <h2 className="font-display text-xl font-semibold">{b.title}</h2>
              <p className="mt-1 text-muted">{b.text}</p>
            </div>
          ))}
          <p className="rounded-2xl bg-sand p-5 text-sm text-muted">
            Pēc pieteikuma mēs sazvanīsimies, lai iepazītos un izrunātu sezonu, cenas, drošību un atsauksmes.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <GuideApplicationForm />
        </div>
      </Container>
    </>
  );
}
