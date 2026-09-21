import type { Lang } from "@/lib/i18n";

/**
 * Every page exists in both languages. Polish (the original language of the site) lives at the root so
 * existing addresses keep working; English lives under /en.
 */
export const ROUTES = {
  home: { pl: "/", en: "/en" },
  reseller: { pl: "/sprzedawca-iptv", en: "/en/reseller-program" },
  guide: { pl: "/przewodnik-instalacji", en: "/en/setup-guide" },
  contact: { pl: "/skontaktuj-sie-z-nami", en: "/en/contact" },
  about: { pl: "/o-nas", en: "/en/about" },
  terms: { pl: "/regulamin-iptv", en: "/en/terms" },
  refunds: { pl: "/zasady-zwrotow-i-anulowania", en: "/en/refund-policy" },
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  copyright: { pl: "/prawa-autorskie", en: "/en/copyright-policy" },
  blog: { pl: "/blog", en: "/en/blog" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export const path = (lang: Lang, key: RouteKey) => ROUTES[key][lang];
export const pathsFor = (key: RouteKey): Record<Lang, string> => ({ ...ROUTES[key] });

/** Home-page section link that works in both languages, e.g. sectionHref("en", "plans") -> "/en#plans". */
export const sectionHref = (lang: Lang, id: string) => `${ROUTES.home[lang]}#${id}`;

export const blogPath = (lang: Lang, slug: string) => `${ROUTES.blog[lang]}/${slug}`;
