import type { Lang } from "@/lib/i18n";

export const SITE = {
  name: "IPTV Poland",
  /** Must equal the host your hosting actually serves. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iptvpoland.example",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "goldengateiptv@gmail.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212707711512",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+212 707 711 512",
} as const;

/** Business details shown on legal pages only when set (never invent them). */
export const COMPANY = {
  legalName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "",
  taxId: process.env.NEXT_PUBLIC_COMPANY_TAX_ID ?? "",
} as const;

export const SITE_HOST = new URL(SITE.url).hostname;

export function whatsappLink(text?: string) {
  const params = new URLSearchParams({ phone: SITE.whatsappNumber });
  if (text) params.set("text", text);
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

/* ---------------- Plans and prices (same offer as the existing service) ---------------- */

export const CONNECTION_OPTIONS = [1, 2, 3, 4, 5] as const;
export type Connections = (typeof CONNECTION_OPTIONS)[number];

export const PLAN_DEFS = [
  { id: "1-day", months: null },
  { id: "1-month", months: 1 },
  { id: "3-months", months: 3 },
  { id: "6-months", months: 6 },
  { id: "1-year", months: 12 },
  { id: "2-years", months: 24 },
] as const;
export type PlanId = (typeof PLAN_DEFS)[number]["id"];

export const PLAN_NAMES: Record<Lang, Record<PlanId, string>> = {
  en: { "1-day": "1 day", "1-month": "1 month", "3-months": "3 months", "6-months": "6 months", "1-year": "1 year", "2-years": "2 years" },
  pl: { "1-day": "1 dzień", "1-month": "1 miesiąc", "3-months": "3 miesiące", "6-months": "6 miesięcy", "1-year": "1 rok", "2-years": "2 lata" },
};

export function deviceLabel(lang: Lang, n: number) {
  if (lang === "en") return n === 1 ? "1 device" : `${n} devices`;
  if (n === 1) return "1 urządzenie";
  if (n >= 2 && n <= 4) return `${n} urządzenia`;
  return `${n} urządzeń`;
}

/** Same prices (EUR) as the provider's existing offer. Tiers 4-5 extrapolated; confirm before launch. */
export const PRICES: Record<Connections, Record<PlanId, number | null>> = {
  1: { "1-day": 3, "1-month": 15, "3-months": 32, "6-months": 42, "1-year": 62, "2-years": 110 },
  2: { "1-day": 6, "1-month": 24, "3-months": 47, "6-months": 67, "1-year": 94, "2-years": 199 },
  3: { "1-day": 9, "1-month": 35, "3-months": 80, "6-months": 99, "1-year": 150, "2-years": 297 },
  4: { "1-day": 12, "1-month": 45, "3-months": 104, "6-months": 128, "1-year": 194, "2-years": 384 },
  5: { "1-day": 15, "1-month": 55, "3-months": 128, "6-months": 156, "1-year": 238, "2-years": 471 },
};
