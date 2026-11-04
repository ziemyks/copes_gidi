"use client";
import { createContext, useContext, type ReactNode } from "react";
export { localize } from "./ui-translate";
import type { Locale } from "./routing";

const LocaleContext = createContext<Locale>("lv");
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
