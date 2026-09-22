import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card, cardHover } from "@/components/ui";
import { CHANNEL_CATEGORIES } from "@/lib/channel-categories";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES, sectionHref } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";

const copy = {
  en: { title: "Channels and content on IPTV Poland", description: "What you can watch with IPTV Poland: live Polish TV, an on-demand library, sport, news and children's programmes. Availability depends on plan and region.", eyebrow: "Channels", h1: "What you can watch", sub: "IPTV Poland groups content into a few categories. Exact availability depends on your plan and your region, so request a free trial to see the current line-up before you order.", crumb: "Channels", note: "We do not publish fixed channel counts, because the line-up can change and depends on licensing in your region. Ask us for the current details for your country.", trial: "Ask for a free trial", plans: "See plans" },
  pl: { title: "Kanały i treści w IPTV Poland", description: "Co możesz oglądać w IPTV Poland: polską telewizję na żywo, bibliotekę na żądanie, sport, wiadomości i programy dla dzieci. Dostępność zależy od planu i regionu.", eyebrow: "Kanały", h1: "Co możesz oglądać", sub: "IPTV Poland dzieli treści na kilka kategorii. Dokładna dostępność zależy od planu i regionu, dlatego poproś o darmowy test, aby zobaczyć aktualną ofertę przed zamówieniem.", crumb: "Kanały", note: "Nie publikujemy stałej liczby kanałów, ponieważ oferta może się zmieniać i zależy od licencji w danym regionie. Zapytaj nas o aktualne szczegóły dla swojego kraju.", trial: "Poproś o darmowy test", plans: "Zobacz plany" },
} as const;

export const channelsMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.channels } });

export function ChannelsPage({ lang }: { lang: Lang }) {
  const t = copy[lang]; const p = path(lang, "channels"); const cats = CHANNEL_CATEGORIES[lang];
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd data={webPageLd({ lang, path: p, name: t.title, description: t.description, type: "CollectionPage" })} />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.sub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map(({ icon: Icon, title, text }) => (
            <div key={title} className={`${card} ${cardHover} p-7`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-brand"><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
              <h2 className="font-display mt-4 text-lg font-bold text-header">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
        <p className={`${card} mx-auto mt-8 max-w-3xl p-6 text-center text-sm leading-relaxed text-ink-soft`}>{t.note}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={sectionHref(lang, "trial")} className="btn btn-primary">{t.trial}</Link><Link href={sectionHref(lang, "plans")} className="btn btn-ghost">{t.plans}</Link></div>
      </Section>
    </>
  );
}
