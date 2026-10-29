export const site = {
  name: "Copes Gidi",
  tagline: "Neatkarīgi makšķerēšanas gidi visā Latvijā",
  description:
    "Latvijas makšķerēšanas gidi vienuviet — publicētās cenas, laivas un ūdeņi ar avotu pie katra fakta. Sazinies tieši ar gidu.",
  url: "https://copesgidi.lv",
  email: "info@copesgidi.lv",
  /** Datums, kad gidu publiskie avoti pēdējo reizi pārbaudīti */
  checked: "2026-10-29",
};

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") return site.url;
  // Preview izvietojumi rāda paši savu adresi, lai saites neved uz produkciju
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "Kaspars Holms" → "KH", "WHITELAKE ADVENTURE" → "WA" */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
