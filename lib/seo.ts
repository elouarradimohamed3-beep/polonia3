import type { Metadata } from "next";
import { ALL_PRICES } from "@/lib/pricing";
import { SITE, deviceLabel } from "@/lib/site";

/** Date the content was last reviewed. Update when page content really changes. */
export const LAST_MODIFIED = "2026-09-19";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const abs = (path: string) => `${SITE.url}${path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the site name. */
  absolute?: boolean;
  /** Set false when the route has its own opengraph-image file. */
  defaultImage?: boolean;
};

export function pageMetadata({ title, description, path, absolute, defaultImage = true }: PageMeta): Metadata {
  const fullTitle = absolute ? title : `${title} | ${SITE.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      locale: "pl_PL",
      siteName: SITE.name,
      ...(defaultImage
        ? { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} – ${title}` }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(defaultImage ? { images: ["/twitter-image"] } : {}),
    },
  };
}

export const organizationLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: "IPTV Polski",
  url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/images/logo-mark.svg"), width: 512, height: 512 },
  image: abs("/images/hero.webp"),
  email: SITE.email,
  foundingDate: "2018",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      telephone: "+212707711512",
      availableLanguage: ["Polish", "English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: abs("/"),
  name: SITE.name,
  inLanguage: "pl-PL",
  publisher: { "@id": ORG_ID },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function webPageLd(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  image?: string;
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "pl-PL",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    dateModified: LAST_MODIFIED,
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(opts.image) } } : {}),
  };
}

export const productLd = {
  "@type": "Product",
  "@id": `${SITE.url}/#product`,
  name: "Abonament IPTV Polska",
  description:
    "Subskrypcja telewizji internetowej IPTV: kanały na żywo, filmy i seriale VOD, jakość 4K/FHD/HD, EPG, natychmiastowa aktywacja i wsparcie 24/7.",
  image: [abs("/images/hero.webp")],
  brand: { "@id": ORG_ID },
  category: "Telewizja internetowa (IPTV)",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: Math.min(...ALL_PRICES.map((o) => o.price)),
    highPrice: Math.max(...ALL_PRICES.map((o) => o.price)),
    offerCount: ALL_PRICES.length,
    offers: ALL_PRICES.map((o) => ({
      "@type": "Offer",
      name: `IPTV Polska – ${o.plan.name}, ${deviceLabel(o.connections)}`,
      price: o.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/#pricing`,
      seller: { "@id": ORG_ID },
    })),
  },
};
