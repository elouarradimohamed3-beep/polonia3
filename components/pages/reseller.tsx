import type { Metadata } from "next";
import { Check, Palette, Settings2, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card, cardHover } from "@/components/ui";
import { eur } from "@/lib/pricing";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES } from "@/lib/routes";
import { ORG_ID, abs, pageMetadata, webPageLd } from "@/lib/seo";
import { RESELLER_PACKAGES, whatsappLink } from "@/lib/site";

const copy = {
  pl: {
    title: "Sprzedawca IPTV – program resellerski z własnym panelem", description: "Zostań resellerem IPTV: pakiety od 120 kredytów (290 €), własny panel, kredyty bez terminu ważności i wsparcie 24/7.", eyebrow: "Program resellerski", h1: "Zostań resellerem IPTV Polonia", crumb: "Sprzedawca IPTV",
    lead: "Sprzedawaj polską telewizję przez internet pod własną marką. Wybierz pakiet kredytów, dostań własny panel i zarabiaj na abonamentach swoich klientów.",
    credits: "kredytów", buy: "Kup pakiet", msg: (c: number, p: string) => `Cześć! Chcę kupić pakiet resellerski: ${c} kredytów (${p}).`,
    features: ["Kredyty nigdy nie wygasają", "Własny panel resellerski", "1 kredyt za 1 miesiąc", "12 kredytów na 1 rok", "Przewodnik telewizyjny (EPG)", "Wsparcie 24/7"],
    whyTitle: "Dlaczego nasz program", why: [["Panel white label", "Zbuduj własną markę: panel z Twoim logo, kolorami i nazwą domeny."], ["Automatyczne zarządzanie", "Fakturowanie, zakładanie kont i obsługa klientów w jednym systemie."], ["Start bez zwłoki", "Wybierz pakiet, dostań szkolenie i zacznij sprzedawać."]],
    stepsTitle: "Jak zacząć", steps: ["Wybierz pakiet resellerski", "Otrzymaj szkolenie", "Zacznij sprzedawać"], cta: "Zapytaj o program", ctaMsg: "Cześć! Chcę dowiedzieć się więcej o programie resellerskim IPTV.",
  },
  en: {
    title: "IPTV reseller program with your own panel", description: "Become an IPTV reseller: packages from 120 credits (€290), your own panel, credits that never expire and 24/7 support.", eyebrow: "Reseller program", h1: "Become an IPTV Polonia reseller", crumb: "Reseller",
    lead: "Sell Polish television over the internet under your own brand. Choose a credit package, get your own panel and earn from your customers' subscriptions.",
    credits: "credits", buy: "Buy package", msg: (c: number, p: string) => `Hello! I would like to buy the reseller package: ${c} credits (${p}).`,
    features: ["Credits never expire", "Your own reseller panel", "1 credit for 1 month", "12 credits for 1 year", "TV guide (EPG)", "24/7 support"],
    whyTitle: "Why our program", why: [["White-label panel", "Build your own brand: a panel with your logo, colours and domain name."], ["Automated management", "Billing, account creation and customer handling in one system."], ["A quick start", "Choose a package, get training and start selling."]],
    stepsTitle: "How to start", steps: ["Choose a reseller package", "Get trained", "Start selling"], cta: "Ask about the program", ctaMsg: "Hello! I would like to know more about the IPTV reseller program.",
  },
} as const;

const whyIcons = [Palette, Settings2, Users];

export const resellerMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.reseller } });

export function ResellerPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const p = path(lang, "reseller");
  const service = {
    "@type": "Service", "@id": `${abs(p)}#service`, name: lang === "pl" ? "Program resellerski IPTV" : "IPTV reseller program", description: t.description, provider: { "@id": ORG_ID }, inLanguage: lang,
    hasOfferCatalog: { "@type": "OfferCatalog", name: lang === "pl" ? "Pakiety resellerskie" : "Reseller packages", itemListElement: RESELLER_PACKAGES.map((r) => ({ "@type": "Offer", name: `${r.credits} ${t.credits}`, price: r.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: abs(p) })) },
  };
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd data={[webPageLd({ lang, path: p, name: t.title, description: t.description }), service]} />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.lead} />
        <div className="grid gap-6 md:grid-cols-3">
          {RESELLER_PACKAGES.map((r) => (
            <article key={r.credits} className={`${card} ${cardHover} flex flex-col p-7`}>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand">{r.credits} {t.credits}</p>
              <p className="font-display mt-3 text-5xl font-bold text-header">{eur(lang, r.price)}</p>
              <ul className="my-6 flex-1 space-y-2.5 text-sm">
                {t.features.map((f) => (<li key={f} className="flex gap-2 text-header"><Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{f}</li>))}
              </ul>
              <a href={whatsappLink(t.msg(r.credits, eur(lang, r.price)))} target="_blank" rel="noopener noreferrer" className="btn btn-navy w-full">{t.buy}</a>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading eyebrow={t.eyebrow} title={t.whyTitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.why.map(([h, d], i) => {
            const Icon = whyIcons[i];
            return (
              <div key={h} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand ring-1 ring-border"><Icon size={22} aria-hidden="true" /></span>
                <div><h3 className="font-display text-lg font-bold text-header">{h}</h3><p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p></div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section tone="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t.stepsTitle}</h2>
          <ol className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
            {t.steps.map((s, i) => (<li key={s} className="rounded-xl border border-white/15 bg-white/5 p-5 text-white"><span className="font-display block text-3xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>{s}</li>))}
          </ol>
          <a href={whatsappLink(t.ctaMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 !px-8 !py-4">{t.cta}</a>
        </div>
      </Section>
    </>
  );
}
