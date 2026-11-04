export type Locale = "lv" | "en";
export const locales: Locale[] = ["lv", "en"];
const routes = [
  ["/cope/ziemas-cope", "/winter-fishing"],
  ["/klusti-par-gidu", "/become-a-guide"],
  ["/par-mums", "/about"],
  ["/privatums", "/privacy"],
  ["/braucieni", "/trips"],
  ["/regioni", "/regions"],
  ["/zivis", "/fish"],
  ["/gidi", "/guides"],
] as const;

export function latvianPath(path: string) {
  let value = path.replace(/^\/(?:en|lv)(?=\/|$)/, "") || "/";
  for (const [lv, en] of routes) {
    if (value === en || value.startsWith(`${en}/`)) {
      value = lv + value.slice(en.length);
      break;
    }
  }
  return value;
}

/** Public URLs stay stable in Latvian; English uses its own readable route names. */
export function localizedPath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const split = href.search(/[?#]/);
  const suffix = split < 0 ? "" : href.slice(split);
  let path = latvianPath(split < 0 ? href : href.slice(0, split));
  if (locale === "lv") return path + suffix;
  for (const [lv, en] of routes) {
    if (path === lv || path.startsWith(`${lv}/`)) {
      path = en + path.slice(lv.length);
      break;
    }
  }
  return `/en${path === "/" ? "" : path}${suffix}`;
}
