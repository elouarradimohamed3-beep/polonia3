import { renderOg } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pl" }];
}

const text = {
  pl: { kicker: "IPTV Polonia", title: "Polska telewizja, gdziekolwiek mieszkasz", footer: "Darmowy test · Wsparcie 24/7 · Plany od 3 €" },
  en: { kicker: "IPTV Polonia", title: "Polish television, wherever you live", footer: "Free trial · 24/7 support · Plans from €3" },
} as const;

export async function GET(_req: Request, ctx: { params: Promise<{ lang: string }> }) {
  const { lang } = await ctx.params;
  return renderOg(text[lang === "en" ? "en" : "pl"]);
}
