"use client";

import Link from "next/link";
import { useState } from "react";
import type { Guide } from "@/data/guides";

// Kārtis guļ kaudzē; augšējā ir aktīvā, pārējās sagrieztas zem tās
const tilt = [0, -5, 4, -2];

export function GuideDeck({ guides, regionNames }: { guides: Guide[]; regionNames: Record<string, string> }) {
  const [index, setIndex] = useState(0);
  const count = guides.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
      <RoundButton label="Iepriekšējais gids" onClick={() => go(-1)} className="hidden md:flex">
        ↑
      </RoundButton>

      <div className="relative h-[400px] w-full max-w-[460px]" aria-live="polite">
        {guides.map((guide, i) => {
          const offset = (i - index + count) % count;
          if (offset >= tilt.length) return null;
          const initials = guide.name
            .split(" ")
            .map((p) => p[0])
            .join("");
          return (
            <article
              key={guide.slug}
              inert={offset !== 0}
              className="absolute inset-0 flex flex-col rounded-[24px] border border-white/5 bg-[#202020] p-7 shadow-lift-2 transition-[transform,opacity] duration-500 ease-out"
              style={{
                transform: `translateY(${-offset * 16}px) rotate(${tilt[offset]}deg) scale(${1 - offset * 0.04})`,
                zIndex: tilt.length - offset,
                opacity: offset === tilt.length - 1 ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#e6e6e6] to-[#7c7c7c] font-display text-2xl font-black text-[#151515]">
                    {initials}
                  </div>
                  <span className="absolute -left-3 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent font-mono text-[0.68rem] font-bold text-on-accent">
                    {guide.yearsExperience} g.
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-black uppercase leading-none text-ink [font-variation-settings:'wdth'_110]">
                    {guide.name.split(" ").map((part) => (
                      <span key={part} className="block">
                        {part}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-2 truncate font-mono text-xs text-muted">
                    {guide.business ? `${guide.business} · ` : ""}
                    {guide.base}, {regionNames[guide.region]}
                  </p>
                </div>
              </div>

              <hr className="my-6 border-dashed border-white/15" />

              <p className="font-mono text-sm leading-relaxed text-text">“{guide.bio}”</p>

              <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                <span className="slashed font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                <Link href={`/gidi/${guide.slug}`} className="btn btn-primary min-h-10 px-5">
                  Profils →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex gap-4">
        <RoundButton label="Iepriekšējais gids" onClick={() => go(-1)} className="md:hidden">
          ↑
        </RoundButton>
        <RoundButton label="Nākamais gids" onClick={() => go(1)}>
          ↓
        </RoundButton>
      </div>
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  className = "",
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/20 text-2xl text-ink transition hover:border-accent hover:bg-accent hover:text-on-accent ${className}`}
    >
      {children}
    </button>
  );
}
