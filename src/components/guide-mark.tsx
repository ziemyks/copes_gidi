import Image from "next/image";
import type { Guide } from "@/data/types";
import { initials } from "@/lib/site";

/** Gida logotips no viņa mājaslapas vai, ja tāda nav, iniciāļi. Fotogrāfijas — tikai ar gida atļauju. */
export function GuideMark({ guide, className = "" }: { guide: Guide; className?: string }) {
  if (guide.logo) {
    const tone = guide.logo.bg === "light" ? "bg-[#f4f4f4]" : "border border-white/10 bg-[#0b0b0b]";
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-2xl ${tone} ${className}`}>
        <Image
          src={guide.logo.src}
          alt={`${guide.brand ?? guide.name} logotips`}
          fill
          unoptimized
          className="object-contain p-[12%]"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#e6e6e6] to-[#7c7c7c] font-display font-black tracking-wider text-[#151515] ${className}`}
    >
      {initials(guide.name)}
    </div>
  );
}
