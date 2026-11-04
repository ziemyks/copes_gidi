"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/client";
import { localizedPath, type Locale } from "@/i18n/routing";

function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 30 20" className="h-4 w-6 shrink-0 overflow-hidden rounded-[3px]">
      {locale === "lv" ? (
        <>
          <path fill="#9e1b34" d="M0 0h30v20H0z" />
          <path fill="#fff" d="M0 8h30v4H0z" />
        </>
      ) : (
        <>
          <path fill="#012169" d="M0 0h30v20H0z" />
          <path stroke="#fff" strokeWidth="6" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#c8102e" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#fff" strokeWidth="8" d="M15 0v20M0 10h30" />
          <path stroke="#c8102e" strokeWidth="4" d="M15 0v20M0 10h30" />
        </>
      )}
    </svg>
  );
}

export function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useSearchParams();
  const other = locale === "lv" ? "en" : "lv";
  const query = params.toString();
  const label = other === "en" ? "View this page in English" : "Skatīt šo lapu latviski";

  return (
    <a
      href={localizedPath(pathname, other) + (query ? `?${query}` : "")}
      hrefLang={other}
      lang={other}
      aria-label={label}
      title={label}
      className="inline-flex h-11 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-accent bg-accent px-4 font-mono text-xs font-bold text-on-accent shadow-lift-1 transition hover:border-ink hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <LanguageFlag locale={other} />
      <span>{other === "en" ? "English" : "Latviski"}</span>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
        <path d="M2 5h11m-3-3 3 3-3 3M14 11H3m3-3-3 3 3 3" />
      </svg>
    </a>
  );
}
