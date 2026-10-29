"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { allLanguages, guides } from "@/data/guides";
import { regions } from "@/data/regions";
import { species } from "@/data/species";
import { tripTypes, trips, type TripType } from "@/data/trips";
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
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-44 rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-water"
      >
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
    <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-wrap gap-4">{children}</div>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-muted">
          Atrasti <strong className="text-ink">{count}</strong> {noun}
        </span>
        <button type="button" onClick={onClear} className="font-medium text-deep hover:underline">
          Notīrīt
        </button>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="rounded-3xl border border-dashed border-line p-12 text-center text-muted">
      Pēc šiem kritērijiem nekas netika atrasts. Pamēģini mainīt filtrus.
    </p>
  );
}

const regionOptions = regions.map((r) => ({ value: r.slug, label: r.name }));
const speciesOptions = species.map((s) => ({ value: s.slug, label: s.name }));

export function TripGrid({ items }: { items: typeof trips }) {
  if (!items.length) return <Empty />;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    .sort((a, b) => (sort === "cena" ? a.priceFrom - b.priceFrom : 0));

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
          options={[{ value: "cena", label: "Pēc cenas" }]}
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
