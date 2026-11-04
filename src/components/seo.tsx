import { localizedPath, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getLocale, localize, translate } from "@/i18n/server";
import Link from "next/link";
import { breadcrumbData, type Breadcrumb } from "@/lib/seo";

export async function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const locale = await getLocale();
  data = localizedSchema(data, locale) as typeof data;
  const value = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}

export async function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const locale = await getLocale();
  return localize((
    <>
      <JsonLd data={breadcrumbData(items)} />
      <nav aria-label="Lapas ceļš" className="eyebrow">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-faint">/</span>}
              {i === items.length - 1
                ? <span aria-current="page" className="py-2">{item.name}</span>
                : <Link href={item.path} className="py-2 hover:text-ink">{item.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  ), locale);
}

function localizedSchema(value: unknown, locale: Locale, key = ""): unknown {
  if (typeof value === "string") {
    if (key === "inLanguage") return locale;
    if (value.startsWith(siteUrl()) && !/#(?:publisher|website)$/.test(value)) {
      const url = new URL(value);
      return new URL(localizedPath(url.pathname + url.search + url.hash, locale), siteUrl()).toString();
    }
    return key.startsWith("@") ? value : translate(value, locale);
  }
  if (key === "inLanguage" && Array.isArray(value)) return value;
  if (Array.isArray(value)) return value.map((item) => localizedSchema(item, locale, key));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localizedSchema(v, locale, k)]));
  return value;
}
