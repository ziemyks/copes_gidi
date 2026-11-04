import assert from "node:assert/strict";

// Run against `next start`, not the development server: Cache Components and metadata differ.
const base = process.env.SEO_TEST_BASE_URL || "http://127.0.0.1:3100";
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
    links: [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag).href).filter(Boolean),
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
assert(urls.length >= 69, "All catalog pages and curated landing pages must be listed");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URL");
const paths = new Set(urls.map((url) => new URL(url).pathname));
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
    assert(html.includes('lang="lv"'), `Language: ${url}`);
    assert.equal(page.meta("twitter:card"), "summary_large_image", `Twitter card: ${url}`);
    assert(page.meta("og:image"), `Open Graph image: ${url}`);
    assert(page.meta("twitter:image"), `Twitter image: ${url}`);
    assert(page.schemas.some((node) => node["@type"] === "WebSite"), `WebSite markup: ${url}`);
    assert(page.schemas.some((node) => node["@type"] === "Organization"), `Publisher markup: ${url}`);
    for (const breadcrumb of page.schemas.filter((node) => node["@type"] === "BreadcrumbList")) {
      assert.equal(breadcrumb.itemListElement.at(-1).item, url, `Breadcrumb current page: ${url}`);
      assert(breadcrumb.itemListElement.every((item, i) => item.position === i + 1));
    }
    if (/^\/gidi\//.test(parsed.pathname)) assert(page.schemas.some((node) => node["@type"] === "ProfilePage" && node.mainEntity?.name), `Profile entity: ${url}`);
    if (/^\/braucieni\//.test(parsed.pathname)) assert(page.schemas.some((node) => node.mainEntity?.["@type"] === "Service" && node.mainEntity.provider), `Independent trip provider: ${url}`);
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
]) {
  const { response, html } = await get(path);
  assert.equal(response.status, 200, path);
  const page = inspect(html);
  assert(page.meta("robots")?.includes("noindex"), `Facet must be noindex: ${path}`);
  assert.deepEqual(page.canonical, [], `Do not combine facet noindex with unrelated canonicals: ${path}`);
  assert(html.includes(`data-result-count="${count}"`), `Server-rendered result count: ${path}`);
}

const sorted = inspect((await get("/braucieni?kartot=cena")).html);
assert.deepEqual(sorted.canonical, [`${canonicalOrigin}/braucieni`]);
assert(!sorted.meta("robots")?.includes("noindex"), "Sorting is consolidated with the base catalog");

for (const path of ["/seo-check-missing", "/gidi/seo-check-missing", "/braucieni/seo-check-missing", "/regioni/seo-check-missing", "/zivis/seo-check-missing"]) {
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
const image = await fetch(new URL("/opengraph-image", base));
assert.equal(image.status, 200);
assert(image.headers.get("content-type")?.startsWith("image/png"));
const png = Buffer.from(await image.arrayBuffer());
assert.equal(png.subarray(1, 4).toString(), "PNG");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);

console.log(`SEO checks passed: ${checked} sitemap pages, internal links, structured data, filters, sorting, 404s, robots and 1200×630 social image.`);
