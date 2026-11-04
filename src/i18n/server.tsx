import "server-only";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import catalog from "./en/catalog.json";
import ui from "./en/ui.json";
import { createTranslator } from "./translate";
import { localizeTree } from "./render";
import type { Locale } from "./routing";

const english = createTranslator({ ...catalog, ...ui });
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (locale !== "lv" && locale !== "en") notFound();
  return locale;
}
export function translate(text: string, locale: Locale) { return locale === "en" ? english(text) : text; }
export function localize(node: ReactNode, locale: Locale) { return localizeTree(node, locale, (text) => translate(text, locale)); }
