import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES, sectionHref } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";

const copy = {
  en: { title: "About IPTV Poland", description: "IPTV Poland provides Polish live TV and on-demand programmes over the internet, with a free trial and support in English and Polish. Learn about our offer.", eyebrow: "About us", h1: "About IPTV Poland", crumb: "About",
    lead: "IPTV Poland delivers Polish television over the internet to people who want it simple: clear plans, a free trial and help when you need it.",
    blocks: [["Who it is for", "Anyone who wants Polish live channels and on-demand programmes, in Poland or abroad, on a smart TV, phone, tablet or computer."], ["What we offer", "Plans for 1 to 5 devices, from one day to two years, a free trial before you buy and setup guides for every device."], ["Rights and responsibility", "We respect intellectual property. If you are a rights holder and believe something infringes your rights, our copyright policy explains how to contact us."]],
    links: ["Read the setup guide", "See plans", "Copyright policy"] },
  pl: { title: "O IPTV Poland", description: "IPTV Poland dostarcza polską telewizję na żywo i programy na żądanie przez internet, z darmowym testem i wsparciem po angielsku i polsku. Poznaj naszą ofertę.", eyebrow: "O nas", h1: "O IPTV Poland", crumb: "O nas",
    lead: "IPTV Poland dostarcza polską telewizję przez internet osobom, które lubią prostotę: jasne plany, darmowy test i pomoc, gdy jej potrzebujesz.",
    blocks: [["Dla kogo", "Dla każdego, kto chce polskich kanałów na żywo i programów na żądanie, w Polsce lub za granicą, na Smart TV, telefonie, tablecie lub komputerze."], ["Co oferujemy", "Plany na 1 do 5 urządzeń, od jednego dnia do dwóch lat, darmowy test przed zakupem i instrukcje instalacji dla każdego urządzenia."], ["Prawa i odpowiedzialność", "Szanujemy własność intelektualną. Jeśli jesteś właścicielem praw i uważasz, że coś je narusza, nasza polityka praw autorskich wyjaśnia, jak się z nami skontaktować."]],
    links: ["Zobacz instrukcję instalacji", "Zobacz plany", "Prawa autorskie"] },
} as const;

export const aboutMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.about } });

export function AboutPage({ lang }: { lang: Lang }) {
  const t = copy[lang]; const p = path(lang, "about");
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd data={webPageLd({ lang, path: p, name: t.title, description: t.description, type: "AboutPage" })} />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.lead} />
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">{t.blocks.map(([h, d]) => (<div key={h} className={`${card} p-7`}><h2 className="font-display text-lg font-bold text-header">{h}</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">{d}</p></div>))}</div>
        <div className="mt-10 flex flex-wrap justify-center gap-3"><Link href={path(lang, "guide")} className="btn btn-ghost">{t.links[0]}</Link><Link href={sectionHref(lang, "plans")} className="btn btn-primary">{t.links[1]}</Link><Link href={path(lang, "copyright")} className="btn btn-ghost">{t.links[2]}</Link></div>
      </Section>
    </>
  );
}
