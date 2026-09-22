import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Section, card } from "@/components/ui";
import { formatDate } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import { LEGAL, type LegalKey } from "@/lib/legal";
import { path, ROUTES, type RouteKey } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { COMPANY, SITE } from "@/lib/site";

const labels = { en: { updated: "Last updated", contact: "Contact", company: "Company", address: "Address", tax: "Tax ID" }, pl: { updated: "Ostatnia aktualizacja", contact: "Kontakt", company: "Firma", address: "Adres", tax: "NIP / numer podatkowy" } } as const;

export const legalMetadata = (lang: Lang, key: LegalKey): Metadata => pageMetadata({ lang, title: LEGAL[key][lang].title, description: LEGAL[key][lang].description, paths: { ...ROUTES[key as RouteKey] } });

export function LegalPage({ lang, docKey }: { lang: Lang; docKey: LegalKey }) {
  const doc = LEGAL[docKey][lang]; const l = labels[lang]; const p = path(lang, docKey as RouteKey);
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: doc.title, path: p }]} />
      <JsonLd data={webPageLd({ lang, path: p, name: doc.title, description: doc.description })} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-header md:text-4xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{l.updated}: <time dateTime={doc.updated}>{formatDate(lang, doc.updated)}</time></p>
          <p className="mt-6 leading-relaxed text-header">{doc.intro}</p>
          <div className="mt-8 space-y-8">{doc.sections.map((s) => (<section key={s.h}><h2 className="font-display text-xl font-bold text-header">{s.h}</h2><div className="mt-3 space-y-3 leading-relaxed text-ink-soft">{s.p?.map((x) => <p key={x}>{x}</p>)}{s.ul && (<ul className="list-disc space-y-1.5 pl-6 marker:text-brand">{s.ul.map((x) => <li key={x}>{x}</li>)}</ul>)}</div></section>))}</div>
          <div className={`${card} mt-10 p-6`}>
            <h2 className="font-display text-lg font-bold text-header">{l.contact}</h2>
            <ul className="mt-3 space-y-1.5 text-ink-soft">
              {COMPANY.legalName && <li>{l.company}: {COMPANY.legalName}</li>}
              {COMPANY.address && <li>{l.address}: {COMPANY.address}</li>}
              {COMPANY.taxId && <li>{l.tax}: {COMPANY.taxId}</li>}
              <li>E-mail: <a className="font-semibold text-brand underline underline-offset-2" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>WhatsApp: {SITE.phoneDisplay}</li>
            </ul>
          </div>
        </article>
      </Section>
    </>
  );
}
