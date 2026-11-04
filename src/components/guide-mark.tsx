import { localize } from "@/i18n/ui-translate";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import type { Guide } from "@/data/types";
import { initials } from "@/lib/site";

/** Gida logotips no viņa mājaslapas vai, ja tāda nav, iniciāļi. Fotogrāfijas — tikai ar gida atļauju. */
export function GuideMark({ guide, className = "", locale = "lv" }: { guide: Pick<Guide, "name" | "brand" | "logo">; className?: string; locale?: Locale }) {
  if (guide.logo) {
    const tone = guide.logo.bg === "light" ? "bg-[#f4f4f4]" : "border border-white/10 bg-[#0b0b0b]";
    return localize((
      <div className={`relative shrink-0 overflow-hidden rounded-2xl ${tone} ${className}`}>
        <Image
          src={guide.logo.src}
          alt={`${guide.brand ?? guide.name} logotips`}
          fill
          unoptimized
          className="object-contain p-[12%]"
        />
      </div>
    ), locale);
  }
  return localize((
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#e6e6e6] to-[#7c7c7c] font-display font-black tracking-wider text-[#151515] ${className}`}
    >
      {initials(guide.name)}
    </div>
  ), locale);
}
