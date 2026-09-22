import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card } from "@/components/ui";
import { GUIDE, GUIDE_TEXT } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES, sectionHref } from "@/lib/routes";
import { abs, pageMetadata, webPageLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const guideMetadata = (lang: Lang): Metadata => pageMetadata({ lang, title: GUIDE_TEXT[lang].title, description: GUIDE_TEXT[lang].description, paths: { ...ROUTES.guide } });

function Steps({ steps }: { steps: string[] }) {
  return <ol className="list-decimal space-y-1.5 pl-6 leading-relaxed text-header marker:font-bold marker:text-brand">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>;
}

export function GuidePage({ lang }: { lang: Lang }) {
  const g = GUIDE_TEXT[lang]; const sections = GUIDE[lang]; const p = path(lang, "guide");
  const howTo = sections.map((s) => ({ "@type": "HowTo", "@id": `${abs(p)}#${s.id}`, name: s.title, inLanguage: lang, step: s.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, name: `${g.stepWord} ${i + 1}`, text })) }));
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: g.crumb, path: p }]} />
      <JsonLd data={[webPageLd({ lang, path: p, name: g.title, description: g.description }), ...howTo]} />
      <Section>
        <SectionHeading as="h1" eyebrow={g.eyebrow} title={g.h1} sub={g.intro} />
        <nav aria-label={g.h1} className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2">{sections.map((s) => (<a key={s.id} href={`#${s.id}`} className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-header hover:border-brand hover:text-brand">{s.title}</a>))}</nav>
        <div className="mx-auto max-w-3xl space-y-5">
          {sections.map((s, i) => (
            <article key={s.id} id={s.id} className={`${card} scroll-mt-28 p-6 md:p-8`}>
              <h2 className="font-display text-xl font-bold text-header md:text-2xl"><span className="text-brand">{String(i + 1).padStart(2, "0")}</span> {s.title}</h2>
              <div className="mt-4"><Steps steps={s.steps} /></div>
              {s.note && (<p className="mt-4 rounded-lg bg-background p-3 text-sm text-header"><strong>{g.note}:</strong> {s.note}</p>)}
              {s.link && (<a href={s.link.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-bold text-brand underline underline-offset-2">{s.link.label}</a>)}
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h2 className="font-display text-2xl font-bold text-header">{g.ctaTitle}</h2>
          <p className="mt-2 text-ink-soft">{g.ctaText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={whatsappLink(g.helpMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{g.help}</a><Link href={sectionHref(lang, "trial")} className="btn btn-ghost">{g.trial}</Link></div>
        </div>
      </Section>
    </>
  );
}
