<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SEO is required after every webpage change

Every change to a webpage, its content, navigation, data, styling, or rendering must include an SEO review and any necessary SEO updates in the same change. Do not treat SEO as a separate follow-up task.

- Keep the visible page purpose, a single descriptive H1, title, description, canonical URL, Open Graph/Twitter metadata, and structured data consistent with the final content. Use `src/lib/seo.ts` for page metadata.
- Use the canonical production origin from `siteUrl()`. Never point all page canonicals to the homepage or use preview/localhost URLs in production metadata.
- Update the sitemap and internal links when adding, renaming, or removing an indexable route. Preserve real 404 responses and do not index arbitrary catalog filters. Keep filtered results available in server-rendered HTML.
- Update relevant breadcrumbs and JSON-LD when content changes. Only publish supported facts; do not invent prices, ratings, reviews, availability, service areas, or affiliations. Do not change source-verification dates without checking the sources.
- Preserve crawlable links, meaningful image alt text, mobile usability, and loading performance. Keep full guide/source data out of client bundles when only a summary is needed.
- Run `npm run lint`, `npm run build`, and `npm run test:seo` against the production server for changes affecting SEO or page rendering. For a content/style-only change, run the relevant checks and inspect the affected page's rendered metadata, headings, links, and layout. Report any checks that could not be completed.
- Keep `docs/seo-implementation.md` current when changing SEO conventions or indexing policy. The dated SEO audit is a historical baseline; do not rewrite its observations as if they were new measurements.

## Maintain both site languages

Latvian remains the default at the existing URLs; English is available under `/en` with a matching page language switch. Every visible content change must update the English translation in the same change, including guide/trip data, forms, accessible labels, metadata and structured data.

- Keep route mapping in `src/i18n/routing.ts`. Preserve Latvian URLs and add reciprocal `lv`, `en` and `x-default` alternates for indexable pages. Both versions belong in the sitemap.
- Add English interface copy to `src/i18n/en/ui.json` and catalog/editorial copy to `src/i18n/en/catalog.json`. Keys match the Latvian source copy, including punctuation. New or edited source strings require matching English keys; remove obsolete translations when appropriate.
- Server components use `getLocale()` and `localize()` from `src/i18n/server.tsx`; client components use `useLocale()` and `localize()` from `src/i18n/client.tsx`. The render helper translates text and navigation while preserving identifiers, form/filter values and external URLs. Add new human-readable string props to the helper when necessary.
- Keep the full catalog dictionary on the server. Project only the fields a client component needs; translate joined lists before display where necessary. Do not store request locale in mutable module state.
- Preserve guide names, business identities, prices, contacts, source URLs and verification dates. An English site interface does not imply that a guide speaks English.
- Run the bilingual production SEO crawl after changes. Start the test server with `--hostname localhost` so Next.js local rewrite normalization matches the test origin.
