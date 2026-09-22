import { Section, SectionHeading, card } from "@/components/ui";
import { cheapestPerMonthId, eur, getPlans } from "@/lib/pricing";
import type { Lang } from "@/lib/i18n";
import { CONNECTION_OPTIONS, PLAN_DEFS, PLAN_NAMES, PRICES, deviceLabel } from "@/lib/site";

const copy = { en: { eyebrow: "Compare", title: "Every price in one table", sub: "Prices in euros by period and number of devices. Longer plans cost less per month.", plan: "Plan", best: "Best price", onRequest: "on request", mo: "/ mo.", caption: "IPTV Poland prices by period and number of devices" }, pl: { eyebrow: "Porównanie", title: "Wszystkie ceny w jednej tabeli", sub: "Ceny w euro według okresu i liczby urządzeń. Dłuższe plany kosztują mniej za miesiąc.", plan: "Plan", best: "Najlepsza cena", onRequest: "na zapytanie", mo: "/ mies.", caption: "Ceny IPTV Poland według okresu i liczby urządzeń" } } as const;

export function PlanMatrix({ lang }: { lang: Lang }) {
  const t = copy[lang]; const bestId = cheapestPerMonthId(1);
  return (
    <Section tone="white">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className={`${card} mx-auto max-w-5xl overflow-x-auto`}>
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr className="bg-header text-xs uppercase tracking-wider text-white"><th scope="col" className="px-5 py-4 font-bold">{t.plan}</th>{CONNECTION_OPTIONS.map((n) => (<th key={n} scope="col" className="px-5 py-4 text-right font-bold">{deviceLabel(lang, n)}</th>))}</tr></thead>
          <tbody>
            {PLAN_DEFS.map((def) => { const best = def.id === bestId; return (
              <tr key={def.id} className={`border-t border-border transition-colors hover:bg-background/60 ${best ? "bg-background" : ""}`}>
                <th scope="row" className="whitespace-nowrap px-5 py-4 font-bold text-header">{PLAN_NAMES[lang][def.id]}{best && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[0.65rem] font-extrabold uppercase tracking-wide text-[#1c1204]">{t.best}</span>}</th>
                {CONNECTION_OPTIONS.map((n) => { const price = PRICES[n][def.id]; const plan = getPlans(n).find((p) => p.id === def.id)!; const perMonth = price != null && plan.months && plan.months > 1 ? price / plan.months : null; return (
                  <td key={n} className="px-5 py-4 text-right tabular-nums">{price != null ? (<><span className="font-bold text-header">{eur(lang, price)}</span>{perMonth != null && <span className="mt-0.5 block text-xs text-ink-soft">{eur(lang, perMonth)} {t.mo}</span>}</>) : (<span className="text-sm text-ink-soft">{t.onRequest}</span>)}</td>
                ); })}
              </tr>
            ); })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
