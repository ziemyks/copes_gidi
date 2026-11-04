import { cloneElement, isValidElement, type ReactNode } from "react";
import { localizedPath, type Locale } from "./routing";

const textProps = new Set(["title", "label", "intro", "eyebrow", "caption", "alt", "placeholder", "aria-label", "message", "error"]);
const dataProps = new Set(["guides", "regionNames", "kindNames", "filters"]);
const identifiers = new Set(["slug", "value", "key", "kind", "region", "status", "type", "src", "href", "url", "source", "checked", "date", "lastSeen", "brand", "model", "latin"]);

export function translateData<T>(value: T, translate: (text: string) => string, key = ""): T {
  if (identifiers.has(key)) return value;
  if (typeof value === "string") return translate(value) as T;
  if (Array.isArray(value)) return value.map((item) => translateData(item, translate, key)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, translateData(v, translate, k)])) as T;
  return value;
}

/** Translate rendered copy and navigational URLs, preserving IDs, form values and event handlers. */
export function localizeTree(node: ReactNode, locale: Locale, translate: (text: string) => string): ReactNode {
  if (typeof node === "string") return translate(node);
  if (Array.isArray(node)) return node.map((child) => localizeTree(child, locale, translate));
  if (!isValidElement<Record<string, unknown>>(node)) return node;
  const props: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node.props)) {
    if (key === "children") props[key] = localizeTree(value as ReactNode, locale, translate);
    else if (key === "href" && typeof value === "string") props[key] = localizedPath(value, locale);
    else if (textProps.has(key) && typeof value === "string") props[key] = translate(value);
    else if (dataProps.has(key)) props[key] = translateData(value, translate);
  }
  return cloneElement(node, props);
}
