export const site = {
  name: "Copes Gidi",
  tagline: "Neatkarīgi makšķerēšanas gidi visā Latvijā",
  description:
    "Atrodi vietējo makšķerēšanas gidu Latvijā — lasis Ventā, līdakas Latgales ezeros, sami Daugavā. Sazinies tieši ar gidu un rezervē braucienu.",
  email: "info@copesgidi.lv",
  instagram: "https://www.instagram.com/",
  // Kamēr lapā ir parauga gidi, kājenē rāda brīdinājumu. Nomaini uz false, kad dati ir īsti.
  demoContent: true,
};

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
