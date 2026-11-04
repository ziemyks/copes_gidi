**SEO implementation and maintenance**

The canonical production origin is `https://www.copesgidi.lv`. `siteUrl()` normalizes the former apex origin, strips trailing paths, and never substitutes a Vercel preview hostname. `NEXT_PUBLIC_SITE_URL` should name the public production origin in every environment. The existing hosting redirect sends the apex hostname to `www`.

All public page metadata is built with `src/lib/seo.ts`. Supply the real route path and a concise, distinct title/description. The root layout deliberately has no inherited homepage canonical. Full biographies remain in page content; `src/data/search-copy.ts` supplies shorter guide snippets. Metadata has page-specific canonical/Open Graph URLs and large-image Twitter cards. `src/app/opengraph-image.tsx` generates the shared social PNG at build time.

**Indexing policy**

- Core pages, real guides/trips/regions, the About/privacy pages, and the selected fishing landing pages are indexable and listed in the sitemap.
- Catalog filters (`regions`, `suga`, `veids`, `valoda` as applicable) with nonempty values are `noindex,follow`, including invalid values and combinations. They have no canonical. The first value is used for repeated keys.
- Sorting-only URLs retain the base catalog canonical. Tracking parameters do not create new canonical URLs.
- Catalog results are filtered on the server; the client receives only filter options and server-rendered children. The cached loading fallback contains the full catalog so discovery does not depend on filter JavaScript.
- Curated search pages are `/zivis/lidaka`, `/zivis/zandarts`, `/zivis/sams`, and `/cope/ziemas-cope`. Add further pages only when real inventory and useful distinct content support them. Do not generate every filter combination.
- Unknown guide, trip, region and species landing slugs must return a real 404 with noindex.
- Metadata streaming is disabled (`htmlLimitedBots: /.*/`) because metadata only reads local catalog data. This keeps facet directives in the initial response and allows metadata existence checks to return a real 404 before a cached shell is streamed. Keep metadata resolution fast; do not add remote calls without revisiting this tradeoff.
- Vercel preview/development deployments set noindex metadata, omit the robots sitemap announcement, and return an empty sitemap. Crawling is allowed so the noindex can be read. Deployment access protection remains a separate hosting setting.

**Content and structured data**

The shared layout identifies the real directory publisher and WebSite. Visible breadcrumbs and BreadcrumbList are generated together. Guide pages describe a Person or Organization as appropriate; trip pages identify an independent Service provider. Offers use the published price basis and do not claim live availability or platform-owned bookings. JSON-LD escapes `<` to prevent script termination. No ratings, customer reviews, addresses, availability, affiliation, or source-verification dates are invented.

Region listings include guides with a published trip in that region, even when their base is elsewhere. Additional regions must be supported by the published offer; the LV GROUP offer explicitly names Dagda lakes as well as Vidzeme waters. Unspecified coverage is not assumed to cover every region.

The salmon, sea-trout and cod calendar rows no longer recommend national fishing months. They link readers to current official rules and water-specific information. A calendar of expected activity must not imply legal access or permission to retain a catch. Existing source-check dates remain historical until the sources are actually checked again.

**Performance and measurement**

The artificial introductory loader is removed from the layout. Only the display font preloads; other fonts retain Latvian glyph coverage and load when needed. Full guide data is omitted from the homepage deck props and catalog client bundle. Reveal effects have a CSS visibility fallback.

Vercel Analytics custom events:

| Event | Fields | Purpose |
| --- | --- | --- |
| `guide_contact` | guide slug, channel, page path | Measure clicks on guide phone/email/WhatsApp/website/social links |
| `catalog_empty` | catalog type, page path | Identify result sets with zero matches |

These explicit fields exclude contact details and message contents. No booking completion is inferred from an outbound click. The privacy page describes these events. Dashboard availability depends on the deployed analytics service and plan; no account or billing setting is changed here.

**Verification**

Google Search Console HTML-file ownership verification uses `public/googleb964ec0d368cdbab.html`, copied unchanged from Google's download. Next.js serves it at `https://www.copesgidi.lv/googleb964ec0d368cdbab.html`. Keep its exact filename and contents, and retain it after verification so Google can recheck ownership. This is a verification resource, not a content page; do not add it to `sitemap.xml` or page navigation. In Search Console use HTML-file verification for the URL-prefix property `https://www.copesgidi.lv/`, then submit `https://www.copesgidi.lv/sitemap.xml` separately. Domain properties require DNS verification instead.

```bash
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

In a second terminal:

```bash
npm run test:seo
```

`SEO_TEST_BASE_URL` can select another production server. The check crawls every sitemap URL with a crawler user agent and validates status, unique concise titles/descriptions, canonical/OG URLs, social metadata, H1/language, JSON-LD, breadcrumbs, internal links, filtered result counts, facet exclusion, sorting consolidation, 404s, robots and the social PNG. It does not measure rankings, rendered layout, analytics delivery, rich-result eligibility or Core Web Vitals.

After deployment, verify a production URL from every template with Search Console URL Inspection and submit the production sitemap. Check actual preview headers and access protection. Use field/lab browser tooling for mobile layout, font behavior and Core Web Vitals. Source data and the dated audit are not a substitute for those measurements.

Follow the mandatory after-change SEO review in `AGENTS.md`. Update this document when conventions change; retain `seo-audit-2026-11-04.md` as the pre-implementation baseline.

**Implementation validation — 4 November 2026**

- ESLint and the production build, including TypeScript and static generation, pass.
- The production HTTP checks pass for all 69 sitemap pages, internal links, structured data, facet/sorting behavior, browser/crawler 404 responses, robots and the 1200×630 social PNG. The generated social image was visually inspected.
- Isolated configuration checks confirm production indexing and preview/development noindex, sitemap omission and production canonical origin, including an old apex URL environment value.
- The catalog first-load JavaScript in the local build is 510,114 uncompressed bytes versus 620,136 in the pre-change local build diagnostics. No client chunk contains the full profile source/claim fields. These are build measurements, not network transfer sizes or Core Web Vitals.
- Live deployment, Search Console inspection/submission, browser mobile-layout checks, field performance and analytics delivery remain deployment/browser verification work; no rankings or traffic uplift is claimed.
