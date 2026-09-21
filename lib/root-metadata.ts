import type { Metadata, Viewport } from "next";
import { locales, type Lang } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const rootViewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d1f3c" };

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} – polska telewizja przez internet`, template: `%s | ${SITE.name}` },
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: { type: "website", locale: locales[lang].og, siteName: SITE.name },
    twitter: { card: "summary_large_image" },
  };
}
