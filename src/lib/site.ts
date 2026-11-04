export const site = {
  name: "Copes Gidi",
  tagline: "Neatkarīgi makšķerēšanas gidi visā Latvijā",
  description:
    "Salīdzini makšķerēšanas gidus un braucienus Latvijā: publicētās cenas, ūdeņus, laivas un aprīkojumu. Sazinies tieši ar izvēlēto gidu.",
  url: "https://www.copesgidi.lv",
  email: "info@copesgidi.lv",
  /** Datums, kad gidu publiskie avoti pēdējo reizi pārbaudīti */
  checked: "2026-10-29",
};

export function siteUrl() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL");
  // Vecais produkcijas mainīgais arī tiek normalizēts uz faktisko galamērķi.
  if (url.hostname === "copesgidi.lv" || url.hostname === "www.copesgidi.lv") {
    return site.url;
  }
  return url.origin;
}

export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
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
