import type { ReactNode } from "react";
import ui from "./en/ui.json";
import { createTranslator } from "./translate";
import { localizeTree } from "./render";
import type { Locale } from "./routing";
const english = createTranslator(ui);
export function localize(node: ReactNode, locale: Locale) { return localizeTree(node, locale, (text) => locale === "en" ? english(text) : text); }
