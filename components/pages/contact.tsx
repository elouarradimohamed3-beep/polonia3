import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card, cardHover } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES, sectionHref } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/site";

const copy = {
  en: { title: "Contact IPTV Poland – 24/7 support", description: "Contact IPTV Poland by WhatsApp or e-mail in English or Polish. Ask about plans, request a free trial or get help with setup.", eyebrow: "Contact", h1: "Talk to us in English or Polish", sub: "Our team helps with connection problems, setup and device compatibility. Support is available 24/7.", waText: "The quickest way to reach us.", waBtn: "Open WhatsApp", waMsg: "Hello! I have a question about IPTV Poland.", mailText: "For longer questions and copyright notices.", trialTitle: "Want to try it first?", trialText: "Request a free trial and check the service on your own device.", trialBtn: "Get a free trial", crumb: "Contact", copyright: "Rights holders: see our copyright policy." },
  pl: { title: "Kontakt z IPTV Poland – wsparcie 24/7", description: "Skontaktuj się z IPTV Poland przez WhatsApp lub e-mail po angielsku albo polsku. Zapytaj o plany, poproś o darmowy test lub pomoc w instalacji.", eyebrow: "Kontakt", h1: "Porozmawiaj z nami po angielsku lub polsku", sub: "Nasz zespół pomaga w rozwiązywaniu problemów z połączeniem, konfiguracją i zgodnością urządzeń. Wsparcie działa 24/7.", waText: "Najszybszy sposób na kontakt.", waBtn: "Otwórz WhatsApp", waMsg: "Cześć! Mam pytanie o IPTV Poland.", mailText: "Dla dłuższych pytań i zgłoszeń praw autorskich.", trialTitle: "Chcesz najpierw wypróbować?", trialText: "Poproś o darmowy test i sprawdź usługę na własnym urządzeniu.", trialBtn: "Odbierz darmowy test", crumb: "Kontakt", copyright: "Właściciele praw: zobacz politykę praw autorskich." },
} as const;

export const contactMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.contact } });

export function ContactPage({ lang }: { lang: Lang }) {
  const t = copy[lang]; const p = path(lang, "contact");
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd data={webPageLd({ lang, path: p, name: t.title, description: t.description, type: "ContactPage" })} />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.sub} />
        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
          <div className={`${card} ${cardHover} p-7`}><span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><MessageCircle size={24} aria-hidden="true" /></span><h2 className="font-display mt-4 text-xl font-bold text-header">WhatsApp</h2><p className="mt-1 text-sm text-ink-soft">{t.waText}</p><p className="mt-3 font-bold text-header">{SITE.phoneDisplay}</p><a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">{t.waBtn}</a></div>
          <div className={`${card} ${cardHover} p-7`}><span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-brand"><Mail size={24} aria-hidden="true" /></span><h2 className="font-display mt-4 text-xl font-bold text-header">E-mail</h2><p className="mt-1 text-sm text-ink-soft">{t.mailText}</p><p className="mt-3 break-all font-bold text-header">{SITE.email}</p><a href={`mailto:${SITE.email}`} className="btn btn-ghost mt-5">E-mail</a></div>
        </div>
        <div className={`${card} mx-auto mt-6 max-w-3xl p-7 text-center`}><h2 className="font-display text-xl font-bold text-header">{t.trialTitle}</h2><p className="mt-2 text-ink-soft">{t.trialText}</p><Link href={sectionHref(lang, "trial")} className="btn btn-teal mt-5">{t.trialBtn}</Link></div>
        <p className="mt-8 text-center text-sm"><Link href={path(lang, "copyright")} className="font-semibold text-brand underline underline-offset-2">{t.copyright}</Link></p>
      </Section>
    </>
  );
}
