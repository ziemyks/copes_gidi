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
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-1 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {children}
      </div>
      <div className="mt-2 flex justify-end gap-1.5">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? "Iepriekšējie" : "Nākamie"}
            className="btn btn-secondary h-10 min-h-10 w-10 px-0"
          >
            {dir === -1 ? "←" : "→"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <div className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[30%] xl:w-[23.5%]">{children}</div>;
}
