export type Dictionary = Record<string, string>;

/** Exact copy, parameterised sentences, and joined lists share one translation source. */
export function createTranslator(dictionary: Dictionary) {
  const patterns = Object.entries(dictionary).filter(([key]) => /\{\d+\}/.test(key)).map(([key, value]) => ({
    pattern: new RegExp(`^${key.split(/(\{\d+\})/).map((part) => /^\{\d+\}$/.test(part) ? "(.+?)" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")}$`),
    value,
  }));
  const translate = (text: string): string => {
    const clean = text.replace(/\s+/g, " ").trim();
    let result = dictionary[clean];
    if (result === undefined) {
      for (const { pattern, value } of patterns) {
        const match = clean.match(pattern);
        if (match) { result = value.replace(/\{(\d+)\}/g, (_, n) => translate(match[Number(n) + 1])); break; }
      }
    }
    if (result === undefined && /[,;] | · /.test(clean)) {
      const parts = clean.split(/([,;] | · )/);
      if (parts.length > 1) {
        const translated: string[] = [];
        for (let i = 0; i < parts.length;) {
          if (i % 2) { translated.push(parts[i++]); continue; }
          let end = parts.length;
          while (end > i + 1 && dictionary[parts.slice(i, end).join("")] === undefined) end -= 2;
          translated.push(translate(parts.slice(i, end).join("")));
          i = end;
        }
        result = translated.join("");
      }
    }
    if (result === undefined) return text;
    return `${/^\s/.test(text) ? " " : ""}${result}${/\s$/.test(text) ? " " : ""}`;
  };
  return translate;
}
