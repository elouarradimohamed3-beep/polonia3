import { renderOg } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() { return [{ lang: "en" }, { lang: "pl" }]; }

const text = {
  en: { kicker: "IPTV Poland", title: "Polish TV on every screen", footer: "Free trial · 24/7 support · Plans from €3" },
  pl: { kicker: "IPTV Poland", title: "Polska telewizja na każdym ekranie", footer: "Darmowy test · Wsparcie 24/7 · Plany od 3 €" },
} as const;

export async function GET(_req: Request, ctx: { params: Promise<{ lang: string }> }) {
  const { lang } = await ctx.params;
  return renderOg(text[lang === "pl" ? "pl" : "en"]);
}
