"use client";
import { useLocale, localize } from "@/i18n/client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { useEffect, useTransition } from "react";

export type FilterOption = { value: string; label: string };
export type CatalogFilter = { key: string; label: string; options: FilterOption[] };

/** Only controls hydrate; the filtered catalog cards stay on the server. */
export function CatalogExplorer({ filters, count, noun, children }: {
  filters: CatalogFilter[];
  count: number;
  noun: "gidi" | "braucieni";
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (count === 0) track("catalog_empty", { catalog: noun, path: pathname });
  }, [count, noun, pathname]);

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    startTransition(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
  }

  return localize((
    <div aria-busy={pending} className={pending ? "opacity-60 transition-opacity" : "transition-opacity"}>
      <form action={pathname} className="mb-10 flex flex-col gap-5 border-b border-rule pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => {
            const value = params.get(filter.key) ?? "";
            return (
              <label key={filter.key} className="flex flex-col gap-2">
                <span className="eyebrow">{filter.label}</span>
                <select name={filter.key} value={value} onChange={(e) => set(filter.key, e.target.value)} className="field min-w-44 py-0">
                  <option value="">Visi</option>
                  {value && !filter.options.some((option) => option.value === value) && <option value={value}>Nezināms filtrs</option>}
                  {filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow" aria-live="polite"><span className="text-ink">{count}</span> {noun}</span>
          <button type="submit" className="btn btn-secondary min-h-9 px-4 text-[0.8125rem]">Atlasīt</button>
          <button type="button" onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))} className="btn btn-secondary min-h-9 px-4 text-[0.8125rem]">Notīrīt</button>
        </div>
      </form>
      {children}
    </div>
  ), locale);
}
