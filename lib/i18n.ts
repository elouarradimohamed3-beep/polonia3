export type Lang = "en" | "pl";
export const LANGS: Lang[] = ["en", "pl"];
export const DEFAULT_LANG: Lang = "en";

export const other = (lang: Lang): Lang => (lang === "en" ? "pl" : "en");

export const locales: Record<Lang, { html: string; og: string; intl: string; name: string }> = {
  en: { html: "en", og: "en_GB", intl: "en-IE", name: "English" },
  pl: { html: "pl", og: "pl_PL", intl: "pl-PL", name: "Polski" },
};
