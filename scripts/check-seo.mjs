import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run against `next start`, not the development server: Cache Components and metadata differ.
const base = process.env.SEO_TEST_BASE_URL || "http://localhost:3100";
const configuredOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.copesgidi.lv");
const canonicalOrigin = ["copesgidi.lv", "www.copesgidi.lv"].includes(configuredOrigin.hostname)
  ? "https://www.copesgidi.lv" : configuredOrigin.origin;

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}

function inspect(html) {
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const schemas = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => attributes(match[1]).type === "application/ld+json")
    .flatMap((match) => {
      const value = JSON.parse(match[2]);
      assert.equal(value["@context"], "https://schema.org");
      return value["@graph"] || [value];
    });
  return {
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""),
    meta: (key) => meta.find((item) => item.name === key || item.property === key)?.content,
    canonical: [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((item) => item.rel === "canonical").map((item) => item.href),
    h1Count: [...html.matchAll(/<h1(?:\s|>)/g)].length,
    anchors: [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag)),
    links: [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag).href).filter(Boolean),
    alternates: [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((item) => item.rel === "alternate" && item.hrefLang),
    schemas,
  };
}

async function get(path, userAgent = "Googlebot") {
  const response = await fetch(new URL(path, base), { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(30000) });
  return { response, html: await response.text() };
}

const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.response.status, 200, "Sitemap must be available");
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert(urls.length >= 138, "All catalog pages and curated landing pages must be listed");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URL");
const routePairs = [
  ["/cope/ziemas-cope", "/winter-fishing"], ["/klusti-par-gidu", "/become-a-guide"], ["/par-mums", "/about"], ["/privatums", "/privacy"],
  ["/braucieni", "/trips"], ["/gidi", "/guides"], ["/regioni", "/regions"], ["/zivis", "/fish"],
];
function englishPath(path) {
  if (path === "/") return "/en";
  for (const [lv, en] of routePairs) if (path === lv || path.startsWith(`${lv}/`) || path.startsWith(`${lv}?`)) return `/en${en}${path.slice(lv.length)}`;
  return `/en${path}`;
}
const paths = new Set(urls.map((url) => new URL(url).pathname));
const translations = Object.assign({}, ...await Promise.all(["catalog", "ui"].map(async (name) => JSON.parse(await readFile(new URL(`../src/i18n/en/${name}.json`, import.meta.url), "utf8")))));
const untranslatedCopy = Object.entries(translations).filter(([lv, en]) => lv !== en && lv.length > 20 && /[āčēģīķļņšūž]/i.test(lv) && !lv.includes("{0}"));
const titles = new Set();
const descriptions = new Set();
const graph = new Map();
let checked = 0;

// Small batches avoid overwhelming the local production server.
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map(async (url) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, canonicalOrigin, `Wrong sitemap origin: ${url}`);
    assert.equal(parsed.search, "", `Query string in sitemap: ${url}`);
    const { response, html } = await get(parsed.pathname);
    assert.equal(response.status, 200, `Page status: ${url}`);
    const page = inspect(html);
    assert.deepEqual(page.canonical.map((value) => new URL(value).href), [url], `Canonical must match final page URL: ${url}`);
    assert(!page.meta("robots")?.includes("noindex"), `Indexable page excluded: ${url}`);
    assert.equal(new URL(page.meta("og:url")).href, url, `Open Graph URL: ${url}`);
    assert(page.title.length > 0 && page.title.length <= 70, `Missing or crowded title: ${url} (${page.title.length})`);
    assert(!titles.has(page.title), `Duplicate title: ${url}`);
    titles.add(page.title);
    const description = page.meta("description");
    assert(description && description.length <= 160, `Missing or crowded description: ${url}`);
    assert(!descriptions.has(description), `Duplicate description: ${url}`);
    descriptions.add(description);
    assert.equal(page.h1Count, 1, `Expected one H1: ${url}`);
    const locale = parsed.pathname === "/en" || parsed.pathname.startsWith("/en/") ? "en" : "lv";
    assert(html.includes(`lang="${locale}"`), `Language: ${url}`);
    assert.equal(page.meta("og:locale"), locale === "en" ? "en_GB" : "lv_LV", `Open Graph language: ${url}`);
    for (const language of ["lv", "en", "x-default"]) {
      const alternate = page.alternates.find((item) => item.hrefLang === language);
      assert(alternate && paths.has(new URL(alternate.href).pathname), `Missing language alternate ${language}: ${url}`);
      if (language === locale) assert.equal(new URL(alternate.href).href, url, `Self language alternate: ${url}`);
    }
    const lvAlternate = new URL(page.alternates.find((item) => item.hrefLang === "lv").href);
    assert.equal(new URL(page.alternates.find((item) => item.hrefLang === "en").href).pathname, englishPath(lvAlternate.pathname), `Matching English page: ${url}`);
    assert.equal(new URL(page.alternates.find((item) => item.hrefLang === "x-default").href).href, lvAlternate.href, `Default language: ${url}`);
    const switchLink = page.anchors.find((item) => item.hrefLang === (locale === "en" ? "lv" : "en"));
    assert(switchLink, `Language switch: ${url}`);
    assert.equal(new URL(switchLink.href, url).pathname, locale === "en" ? lvAlternate.pathname : englishPath(parsed.pathname), `Language switch destination: ${url}`);
    for (const anchor of page.anchors.filter((item) => !item.hrefLang && item.href)) {
      const destination = new URL(anchor.href, url);
      if (destination.origin === canonicalOrigin) assert.equal(destination.pathname === "/en" || destination.pathname.startsWith("/en/"), locale === "en", `Navigation must keep language: ${url} -> ${anchor.href}`);
    }
    if (locale === "en") {
      const visibleCopy = decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
      for (const [lv] of untranslatedCopy) assert(!visibleCopy.includes(lv), `Untranslated copy: ${url}: ${lv}`);
    }
    for (const schema of page.schemas.filter((node) => typeof node.inLanguage === "string")) assert.equal(schema.inLanguage, locale, `Structured data language: ${url}`);
    assert.equal(page.meta("twitter:card"), "summary_large_image", `Twitter card: ${url}`);
    assert(page.meta("og:image"), `Open Graph image: ${url}`);
    assert(page.meta("twitter:image"), `Twitter image: ${url}`);
    assert(page.schemas.some((node) => node["@type"] === "WebSite"), `WebSite markup: ${url}`);
    assert(page.schemas.some((node) => node["@type"] === "Organization"), `Publisher markup: ${url}`);
    for (const breadcrumb of page.schemas.filter((node) => node["@type"] === "BreadcrumbList")) {
      assert.equal(breadcrumb.itemListElement.at(-1).item, url, `Breadcrumb current page: ${url}`);
      assert(breadcrumb.itemListElement.every((item, i) => item.position === i + 1));
    }
    if (/^\/(?:en\/guides|gidi)\//.test(parsed.pathname)) assert(page.schemas.some((node) => node["@type"] === "ProfilePage" && node.mainEntity?.name), `Profile entity: ${url}`);
    if (/^\/(?:en\/trips|braucieni)\//.test(parsed.pathname)) assert(page.schemas.some((node) => node.mainEntity?.["@type"] === "Service" && node.mainEntity.provider), `Independent trip provider: ${url}`);
    const destinations = new Set();
    for (const href of page.links) {
      const destination = new URL(href, url);
      if (destination.origin !== canonicalOrigin) continue;
      assert(paths.has(destination.pathname), `Internal link outside sitemap: ${url} -> ${href}`);
      destinations.add(destination.pathname);
    }
    graph.set(parsed.pathname, destinations);
    checked++;
  }));
}

const reachable = new Set(["/"]);
for (const path of reachable) for (const destination of graph.get(path) || []) reachable.add(destination);
assert.equal(reachable.size, paths.size, "Orphan page in sitemap");

for (const [path, count] of [
  ["/braucieni?suga=lasis", 2],
  ["/braucieni?suga=unknown-species", 0],
  ["/braucieni?suga=lasis&suga=lidaka", 2],
  ["/braucieni?regions=latgale", 4],
  ["/gidi?regions=latgale", 3],
].flatMap(([path, count]) => [[path, count], [englishPath(path), count]])) {
  const { response, html } = await get(path);
  assert.equal(response.status, 200, path);
  const page = inspect(html);
  assert(page.meta("robots")?.includes("noindex"), `Facet must be noindex: ${path}`);
  assert.deepEqual(page.canonical, [], `Do not combine facet noindex with unrelated canonicals: ${path}`);
  assert(html.includes(`data-result-count="${count}"`), `Server-rendered result count: ${path}`);
}

for (const path of ["/braucieni", "/en/trips"]) {
  const sorted = inspect((await get(`${path}?kartot=cena`)).html);
  assert.deepEqual(sorted.canonical, [`${canonicalOrigin}${path}`]);
  assert(!sorted.meta("robots")?.includes("noindex"), "Sorting is consolidated with the base catalog");
}
for (const [path, destination] of [["/lv/gidi", "/gidi"], ["/en/gidi", "/en/guides"], ["/en/braucieni?suga=lasis", "/en/trips?suga=lasis"]]) {
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  assert.equal(response.status, 308, `Alias redirect: ${path}`);
  const location = new URL(response.headers.get("location"), base);
  assert.equal(location.pathname + location.search, destination);
}
const switched = inspect((await get("/en/trips?suga=lasis")).html).anchors.find((item) => item.hrefLang === "lv");
assert.equal(switched.href, "/braucieni?suga=lasis", "Switching languages must retain filters");

for (const path of ["/seo-check-missing", "/gidi/seo-check-missing", "/braucieni/seo-check-missing", "/regioni/seo-check-missing", "/zivis/seo-check-missing"].flatMap((path) => [path, englishPath(path)])) {
  for (const userAgent of ["Googlebot", "Mozilla/5.0"]) {
    const { response, html } = await get(path, userAgent);
    assert.equal(response.status, 404, `Missing route status: ${path} (${userAgent})`);
    assert(inspect(html).meta("robots")?.includes("noindex"), `Missing route must not index: ${path}`);
  }
}

const browserFiltered = await get("/braucieni?suga=lasis", "Mozilla/5.0");
assert(inspect(browserFiltered.html).meta("robots")?.includes("noindex"));
assert(browserFiltered.html.includes('data-result-count="2"'), "Browser response must contain server-rendered filtered results");

const robots = await get("/robots.txt");
assert(robots.html.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), "Robots sitemap origin");
assert(robots.html.includes("Allow: /"), "Crawlers must be able to read noindex metadata");
for (const path of ["/opengraph-image", "/en/opengraph-image"]) {
  const image = await fetch(new URL(path, base));
  assert.equal(image.status, 200);
  assert(image.headers.get("content-type")?.startsWith("image/png"));
  const png = Buffer.from(await image.arrayBuffer());
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
}

const verification = await get("/googleb964ec0d368cdbab.html");
assert.equal(verification.response.status, 200);
assert.equal(verification.html, "google-site-verification: googleb964ec0d368cdbab.html");
console.log(`SEO checks passed: ${checked} sitemap pages, internal links, structured data, filters, sorting, 404s, robots and 1200×630 social image.`);
