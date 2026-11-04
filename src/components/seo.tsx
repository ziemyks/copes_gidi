import Link from "next/link";
import { breadcrumbData, type Breadcrumb } from "@/lib/seo";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const value = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
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
  );
}
