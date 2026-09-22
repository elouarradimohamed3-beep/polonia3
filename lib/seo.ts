import type { Metadata } from "next";
import { ALL_PRICES } from "@/lib/pricing";
import { DEFAULT_LANG, locales, other, type Lang } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { PLAN_NAMES, SITE, deviceLabel } from "@/lib/site";

export const LAST_MODIFIED = "2026-09-22";
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const abs = (p: string) => `${SITE.url}${p === "/" ? "" : p}`;

type PageMeta = {
  lang: Lang; title: string; description: string;
  paths: Partial<Record<Lang, string>>;
  absolute?: boolean; image?: string; type?: "website" | "article";
};

export function pageMetadata({ lang, title, description, paths, absolute, image, type = "website" }: PageMeta): Metadata {
  const own = paths[lang] ?? "/";
  const withBrand = `${title} | ${SITE.name}`;
  const useAbsolute = absolute || withBrand.length > 60;
  const fullTitle = useAbsolute ? title : withBrand;
  const languages: Record<string, string> = {};
  for (const l of ["en", "pl"] as Lang[]) if (paths[l]) languages[l] = paths[l] as string;
  if (paths.en && paths.pl) languages["x-default"] = paths[DEFAULT_LANG] as string;
  const shareImage = image ?? `/og/${lang}`;
  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: own, ...(Object.keys(languages).length > 2 ? { languages } : {}) },
    openGraph: { type, url: own, title: fullTitle, description, locale: locales[lang].og, siteName: SITE.name, ...(paths.en && paths.pl ? { alternateLocale: locales[other(lang)].og } : {}), images: [{ url: shareImage, width: 1200, height: 630, alt: fullTitle }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage] },
  };
}

export const organizationLd = {
  "@type": "Organization", "@id": ORG_ID, name: SITE.name, url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/images/logo-mark.svg"), width: 512, height: 512 },
  email: SITE.email,
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, telephone: `+${SITE.whatsappNumber}`, availableLanguage: ["English", "Polish"] }],
};

export const websiteLd = { "@type": "WebSite", "@id": WEBSITE_ID, url: abs("/"), name: SITE.name, inLanguage: ["en", "pl"], publisher: { "@id": ORG_ID } };

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return { "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: abs(item.path) })) };
}

export function webPageLd(opts: { lang: Lang; path: string; name: string; description: string; type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" }) {
  return { "@type": opts.type ?? "WebPage", "@id": `${abs(opts.path)}#webpage`, url: abs(opts.path), name: opts.name, description: opts.description, inLanguage: opts.lang, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORG_ID }, dateModified: LAST_MODIFIED };
}

export function productLd(lang: Lang) {
  return {
    "@type": "Product", "@id": `${SITE.url}/#product-${lang}`,
    name: lang === "pl" ? "Abonament IPTV Poland" : "IPTV Poland subscription",
    description: lang === "pl" ? "Telewizja internetowa (IPTV) z polskimi kanałami: telewizja na żywo i biblioteka na żądanie na Smart TV, telefonie, tablecie i komputerze. Plany od 1 dnia do 2 lat, dla 1 do 5 urządzeń." : "Internet television (IPTV) with Polish channels: live TV and an on-demand library on smart TVs, phones, tablets and computers. Plans from 1 day to 2 years, for 1 to 5 devices.",
    brand: { "@id": ORG_ID }, inLanguage: lang,
    offers: {
      "@type": "AggregateOffer", priceCurrency: "EUR",
      lowPrice: Math.min(...ALL_PRICES.map((o) => o.price)), highPrice: Math.max(...ALL_PRICES.map((o) => o.price)), offerCount: ALL_PRICES.length,
      offers: ALL_PRICES.map((o) => ({ "@type": "Offer", name: `${SITE.name} – ${PLAN_NAMES[lang][o.plan.id]}, ${deviceLabel(lang, o.connections)}`, price: o.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: abs(`${path(lang, "home")}#plans`.replace("/#", "#")), seller: { "@id": ORG_ID } })),
    },
  };
}
