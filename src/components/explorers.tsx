"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { allLanguages, guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { species } from "@/data/species";
import { tripTypes, trips } from "@/data/trips";
import type { TripType } from "@/data/types";
import { GuideCard, TripCard } from "./ui";

type Option = { value: string; label: string };

function useFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return { get: (key: string) => params.get(key) ?? "", set, clear: () => router.replace(pathname, { scroll: false }) };
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field min-w-44 py-0">

        <option value="">Visi</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterBar({ children, count, noun, onClear }: { children: React.ReactNode; count: number; noun: string; onClear: () => void }) {
  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-rule pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-wrap gap-4">{children}</div>
      <div className="flex items-center gap-5">
        <span className="eyebrow">
          <span className="text-ink">{count}</span> {noun}
        </span>
        <button type="button" onClick={onClear} className="btn btn-secondary min-h-9 px-4 text-[0.8125rem]">
          Notīrīt
        </button>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="rounded-lg border border-dashed border-edge/40 p-12 text-center text-muted">
      Pēc šiem kritērijiem nekas netika atrasts. Pamēģini mainīt filtrus.
    </p>
  );
}

const regionOptions = regions.map((r) => ({ value: r.slug, label: r.name }));
const speciesOptions = species.map((s) => ({ value: s.slug, label: s.name }));

export function TripGrid({ items }: { items: typeof trips }) {
  if (!items.length) return <Empty />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TripCard key={t.slug} trip={t} />
      ))}
    </div>
  );
}

export function TripExplorer() {
  const f = useFilters();
  const region = f.get("regions");
  const fish = f.get("suga");
  const type = f.get("veids");
  const sort = f.get("kartot");

  const results = trips
    .filter((t) => !region || t.region === region)
    .filter((t) => !fish || t.species.includes(fish))
    .filter((t) => !type || t.type === type)
    // Bez publicētas cenas — saraksta beigās
    .sort((a, b) => (sort === "cena" ? (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity) : 0));

  return (
    <>
      <FilterBar count={results.length} noun="braucieni" onClear={f.clear}>
        <Select label="Reģions" value={region} options={regionOptions} onChange={(v) => f.set("regions", v)} />
        <Select label="Zivs" value={fish} options={speciesOptions} onChange={(v) => f.set("suga", v)} />
        <Select
          label="Veids"
          value={type}
          options={(Object.keys(tripTypes) as TripType[]).map((k) => ({ value: k, label: tripTypes[k] }))}
          onChange={(v) => f.set("veids", v)}
        />
        <Select
          label="Kārtot"
          value={sort}
          options={[{ value: "cena", label: "Pēc zemākās cenas" }]}
          onChange={(v) => f.set("kartot", v)}
        />
      </FilterBar>
      <TripGrid items={results} />
    </>
  );
}

export function GuideGrid({ items }: { items: typeof guides }) {
  if (!items.length) return <Empty />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((g) => (
        <GuideCard key={g.slug} guide={g} showBio />
      ))}
    </div>
  );
}

export function GuideExplorer() {
  const f = useFilters();
  const region = f.get("regions");
  const fish = f.get("suga");
  const language = f.get("valoda");

  const results = guides
    .filter((g) => !region || g.region === region)
    .filter((g) => !fish || g.species.includes(fish))
    .filter((g) => !language || g.languages.includes(language));

  return (
    <>
      <FilterBar count={results.length} noun="gidi" onClear={f.clear}>
        <Select label="Reģions" value={region} options={regionOptions} onChange={(v) => f.set("regions", v)} />
        <Select label="Zivs" value={fish} options={speciesOptions} onChange={(v) => f.set("suga", v)} />
        <Select
          label="Valoda"
          value={language}
          options={allLanguages.map((l) => ({ value: l, label: l }))}
          onChange={(v) => f.set("valoda", v)}
        />
      </FilterBar>
      <GuideGrid items={results} />
    </>
  );
}
