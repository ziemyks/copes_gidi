"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Sākums" },
  { href: "/braucieni", label: "Braucieni" },
  { href: "/gidi", label: "Gidi" },
  { href: "/#regioni", label: "Reģioni" },
  { href: "/klusti-par-gidu", label: "Esi gids?" },
];

export function Wordmark() {
  return (
    <Link href="/" className="font-display text-lg font-extrabold lowercase tracking-tight text-ink [font-variation-settings:'wdth'_112]">
      {site.name}
    </Link>
  );
}

/** Ekrāna rāmis, stūra ielocījums un fiksētās vadīklas */
export function Chrome() {
  const [open, setOpen] = useState(false);
  const [motionOff, setMotionOff] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleMotion() {
    const next = !motionOff;
    setMotionOff(next);
    document.documentElement.dataset.motion = next ? "off" : "on";
  }

  return (
    <>
      {/* Rāmis — virs visa, nereaģē uz klikšķiem */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
        <div className="absolute inset-1.5 rounded-[22px] border-[5px] border-bezel shadow-[0_0_0_40px_#000] sm:inset-2.5 sm:rounded-[28px] sm:border-[6px]" />
        <div className="absolute bottom-2.5 left-2.5 h-10 w-10 rounded-bl-[22px] bg-linear-to-tr from-[#cfcfcf] to-[#7d7d7d] [clip-path:polygon(0_0,0_100%,100%_100%)] sm:bottom-4 sm:left-4 sm:h-12 sm:w-12" />
      </div>

      {/* Augšējā josla */}
      <div className="fixed inset-x-4 top-4 z-40 flex items-start justify-between sm:inset-x-7 sm:top-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full bg-[#262626] px-4 font-mono text-xs font-bold uppercase text-ink transition hover:bg-[#333]"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 5h12M2 11h12" />
            </svg>
            Izvēlne
          </button>
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={motionOff}
            aria-label={motionOff ? "Ieslēgt animācijas" : "Izslēgt animācijas"}
            title={motionOff ? "Ieslēgt animācijas" : "Izslēgt animācijas"}
            className="flex h-10 w-12 items-center justify-center rounded-full bg-[#262626] text-ink transition hover:bg-[#333]"
          >
            <svg viewBox="0 0 28 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {motionOff ? <path d="M2 6h24" /> : <path d="M2 6c3-5 6-5 8 0s5 5 8 0 5-5 8 0" />}
            </svg>
          </button>
        </div>

        <CatchMeter />

        <div className="flex h-10 items-center">
          <Wordmark />
        </div>
      </div>

      {/* Lielā oranžā poga */}
      <Link
        href="/braucieni"
        className="fixed bottom-4 right-4 z-40 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-accent text-center font-mono text-[0.7rem] font-bold uppercase leading-tight text-on-accent shadow-lift-2 transition hover:scale-105 hover:bg-accent-rich sm:bottom-8 sm:right-8 sm:h-24 sm:w-24 sm:text-xs"
      >
        Atrast
        <br />
        braucienu
      </Link>

      {/* Izvēlne visa ekrāna platumā */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Izvēlne" className="fixed inset-0 z-50 flex flex-col bg-paper px-6 pb-10 pt-24 sm:px-12">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute left-4 top-4 flex h-10 items-center rounded-full bg-accent px-4 font-mono text-xs font-bold uppercase text-on-accent sm:left-7 sm:top-6"
          >
            Aizvērt ✕
          </button>
          <nav className="flex flex-1 flex-col justify-center gap-1">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 font-display text-[clamp(2.4rem,8vw,6rem)] font-black uppercase leading-[0.95] text-ink transition-colors [font-variation-settings:'wdth'_125] hover:text-accent"
              >
                <span className="slashed font-mono text-sm font-bold text-accent">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow">{site.email}</p>
        </div>
      )}
    </>
  );
}

/** Pusapaļš mērītājs augšā — adata kustas līdz ar ritināšanu */
function CatchMeter() {
  const ticks = [0, 5, 10, 15, 20];
  return (
    <div aria-hidden="true" className="absolute left-1/2 top-[-12px] hidden -translate-x-1/2 sm:block">
      <div className="relative h-[80px] w-[160px] overflow-hidden">
        <div className="absolute -top-[80px] left-0 h-[160px] w-[160px] rounded-full border-[5px] border-bezel bg-[#0b0b0b]">
          <svg viewBox="-80 -80 160 160" className="absolute inset-0 h-full w-full">
            {ticks.map((t, i) => {
              // Tas pats leņķis, ko izmanto adata: no +70° līdz −70°
              const deg = 70 - (140 * i) / (ticks.length - 1);
              const rad = (deg * Math.PI) / 180;
              const x = -Math.sin(rad) * 58;
              const y = Math.cos(rad) * 58;
              return (
                <text key={t} x={x} y={y + 3} textAnchor="middle" fill="#9b9b9b" fontSize="9" fontFamily="var(--font-spacemono)">
                  {t}
                </text>
              );
            })}
            <text x="0" y="30" textAnchor="middle" fill="#f4f4f4" fontSize="7.5" fontWeight="700" fontFamily="var(--font-spacemono)">
              LOMA METRS
            </text>
            <g className="meter-needle">
              <line x1="0" y1="0" x2="0" y2="48" stroke="#ec5b2a" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle r="5" fill="#f4f4f4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
