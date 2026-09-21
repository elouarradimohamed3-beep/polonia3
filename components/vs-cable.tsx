import { Check, Minus } from "lucide-react";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";

const copy = {
  pl: {
    eyebrow: "IPTV czy kablówka?", title: "Telewizja przez internet a kablówka i satelita", sub: "Krótkie porównanie z perspektywy osoby, która mieszka za granicą.",
    cols: ["", "IPTV Polonia", "Kablówka i satelita"], caption: "Porównanie IPTV Polonia z kablówką i satelitą", note: "Porównanie ogólne. Warunki różnią się między dostawcami.",
    rows: [
      ["Umowa", "Wybierasz okres od 1 dnia do 2 lat.", "Często umowa na 12 do 24 miesięcy."],
      ["Rachunek", "Jedna cena za okres i liczbę urządzeń.", "Często pakiet podstawowy plus dopłaty."],
      ["Montaż", "Bez montera. Aplikacja i nasza instrukcja.", "Często wizyta montera lub talerz na balkonie."],
      ["Ekrany", "Smart TV, telefon, tablet, komputer, Fire TV Stick.", "Zwykle telewizor z dekoderem."],
      ["Przeprowadzka", "Zabierasz konto ze sobą, potrzebujesz internetu.", "Trzeba przenosić lub zamawiać usługę od nowa."],
    ],
  },
  en: {
    eyebrow: "IPTV or cable?", title: "Internet TV compared with cable and satellite", sub: "A short comparison from the point of view of someone living abroad.",
    cols: ["", "IPTV Polonia", "Cable and satellite"], caption: "IPTV Polonia compared with cable and satellite", note: "A general comparison. Terms differ between providers.",
    rows: [
      ["Contract", "You choose a period from 1 day to 2 years.", "Often a contract of 12 to 24 months."],
      ["Bill", "One price for the period and number of devices.", "Often a base package plus extras."],
      ["Installation", "No technician. An app and our guide.", "Often an installer visit or a dish on the balcony."],
      ["Screens", "Smart TV, phone, tablet, computer, Fire TV Stick.", "Usually one TV with a box."],
      ["Moving home", "Take your account with you, you need internet.", "You move or order the service again."],
    ],
  },
} as const;

export function VsCable({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section>
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className={`${card} mx-auto max-w-5xl overflow-x-auto`}>
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="bg-muted text-xs uppercase tracking-wider">
              <th scope="col" className="px-5 py-4"><span className="sr-only">{lang === "pl" ? "Temat" : "Topic"}</span></th>
              <th scope="col" className="px-5 py-4 font-extrabold text-brand">{t.cols[1]}</th>
              <th scope="col" className="px-5 py-4 font-bold text-ink-soft">{t.cols[2]}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map(([label, a, b]) => (
              <tr key={label} className="border-t border-border align-top">
                <th scope="row" className="whitespace-nowrap px-5 py-4 font-bold text-header">{label}</th>
                <td className="px-5 py-4 text-header"><span className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />{a}</span></td>
                <td className="px-5 py-4 text-ink-soft"><span className="flex items-start gap-2.5"><Minus size={18} className="mt-0.5 shrink-0 text-ink-soft/60" aria-hidden="true" />{b}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-ink-soft">{t.note}</p>
    </Section>
  );
}
