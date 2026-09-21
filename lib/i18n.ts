export type Lang = "en" | "pl";
export const LANGS: Lang[] = ["en", "pl"];
export const DEFAULT_LANG: Lang = "pl";

export const other = (lang: Lang): Lang => (lang === "en" ? "pl" : "en");

/** Pick the right text for a language. */
export function pick<T>(lang: Lang, value: Record<Lang, T>): T {
  return value[lang];
}

export const locales: Record<Lang, { html: string; og: string; intl: string; name: string }> = {
  en: { html: "en", og: "en_GB", intl: "en-IE", name: "English" },
  pl: { html: "pl", og: "pl_PL", intl: "pl-PL", name: "Polski" },
};
