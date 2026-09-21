import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES, sectionHref } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";

const copy = {
  pl: {
    title: "O IPTV Polonia – polska telewizja dla Polonii", description: "IPTV Polonia to dostawca abonamentów IPTV dla Polonii i wszystkich, którzy chcą oglądać polską telewizję przez internet. Poznaj naszą ofertę i zasady.", eyebrow: "O nas", h1: "Polska telewizja dla Polonii", crumb: "O nas",
    lead: "IPTV Polonia to dostawca abonamentów telewizji internetowej dla Polaków mieszkających za granicą i wszystkich, którzy chcą oglądać polskie programy bez kabla i anteny.",
    blocks: [
      { h: "Dla kogo", p: "Dla Polonii w Wielkiej Brytanii, Niemczech, Irlandii i innych krajach, dla rodzin oraz dla osób w Polsce, które szukają nowoczesnej alternatywy dla kablówki." },
      { h: "Co oferujemy", p: "Rodzinne abonamenty na 1 do 5 urządzeń, plany od jednego dnia do dwóch lat, darmowy test przed zakupem oraz instrukcje instalacji dla każdego urządzenia." },
      { h: "Jak działamy", p: "Stawiamy na prostotę i jasne ceny. Pomagamy po polsku i angielsku, a jeśli usługa nie działa na Twoim urządzeniu, w ciągu 7 dni zwracamy pieniądze." },
    ],
    links: ["Zobacz instrukcję instalacji", "Zobacz plany", "Prawa autorskie"],
  },
  en: {
    title: "About IPTV Polonia – Polish TV for Poles abroad", description: "IPTV Polonia is an IPTV subscription provider for Poles abroad and anyone who wants Polish television over the internet. Learn about our offer and rules.", eyebrow: "About us", h1: "Polish television for Polonia", crumb: "About",
    lead: "IPTV Polonia is an internet TV subscription provider for Poles living abroad and anyone who wants Polish programmes without a cable or a dish.",
    blocks: [
      { h: "Who it is for", p: "For Polonia in the United Kingdom, Germany, Ireland and other countries, for families, and for people in Poland who want a modern alternative to cable." },
      { h: "What we offer", p: "Family subscriptions for 1 to 5 devices, plans from one day to two years, a free trial before you buy and setup guides for every device." },
      { h: "How we work", p: "We keep things simple and prices clear. We help in Polish and English, and if the service does not work on your device we refund you within 7 days." },
    ],
    links: ["Read the setup guide", "See plans", "Copyright policy"],
  },
} as const;

export const aboutMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.about } });

export function AboutPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const p = path(lang, "about");
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd data={webPageLd({ lang, path: p, name: t.title, description: t.description, type: "AboutPage" })} />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.lead} />
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {t.blocks.map((b) => (
            <div key={b.h} className={`${card} p-7`}>
              <h2 className="font-display text-lg font-bold text-header">{b.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={path(lang, "guide")} className="btn btn-ghost">{t.links[0]}</Link>
          <Link href={sectionHref(lang, "plans")} className="btn btn-primary">{t.links[1]}</Link>
          <Link href={path(lang, "copyright")} className="btn btn-ghost">{t.links[2]}</Link>
        </div>
      </Section>
    </>
  );
}
