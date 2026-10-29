"use client";

import { useRef } from "react";

export function Carousel({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {children}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? "Iepriekšējie" : "Nākamie"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-sand"
          >
            {dir === -1 ? "←" : "→"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <div className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[30%] xl:w-[23%]">{children}</div>;
}
