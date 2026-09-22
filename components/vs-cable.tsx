import { Check, Minus } from "lucide-react";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";

const copy = {
  en: { eyebrow: "IPTV or cable?", title: "IPTV Poland compared with cable and satellite", sub: "A short, general comparison to help you decide.", cols: ["", "IPTV Poland", "Cable and satellite"], caption: "IPTV Poland compared with cable and satellite television", note: "A general comparison. Terms differ between providers.", rows: [["Contract", "Choose a period from 1 day to 2 years.", "Often a contract of 12 to 24 months."], ["Bill", "One price for the period and number of devices.", "Often a base package plus extras."], ["Installation", "No technician. An app and our guide.", "Often an installer visit or a dish."], ["Screens", "Smart TV, phone, tablet, computer, Fire TV Stick.", "Usually one TV with a box."], ["Moving home", "Take your account with you, you need internet.", "You move or order the service again."]] },
  pl: { eyebrow: "IPTV czy kablówka?", title: "IPTV Poland a kablówka i satelita", sub: "Krótkie, ogólne porównanie, które pomoże Ci zdecydować.", cols: ["", "IPTV Poland", "Kablówka i satelita"], caption: "Porównanie IPTV Poland z kablówką i satelitą", note: "Porównanie ogólne. Warunki różnią się między dostawcami.", rows: [["Umowa", "Wybierasz okres od 1 dnia do 2 lat.", "Często umowa na 12 do 24 miesięcy."], ["Rachunek", "Jedna cena za okres i liczbę urządzeń.", "Często pakiet podstawowy plus dopłaty."], ["Montaż", "Bez montera. Aplikacja i nasza instrukcja.", "Często wizyta montera lub talerz."], ["Ekrany", "Smart TV, telefon, tablet, komputer, Fire TV Stick.", "Zwykle telewizor z dekoderem."], ["Przeprowadzka", "Zabierasz konto ze sobą, potrzebujesz internetu.", "Trzeba przenosić lub zamawiać usługę od nowa."]] },
} as const;

export function VsCable({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section>
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className={`${card} mx-auto max-w-5xl overflow-x-auto`}>
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead><tr className="bg-background text-xs uppercase tracking-wider"><th scope="col" className="px-5 py-4"><span className="sr-only">{lang === "pl" ? "Temat" : "Topic"}</span></th><th scope="col" className="px-5 py-4 font-extrabold text-brand">{t.cols[1]}</th><th scope="col" className="px-5 py-4 font-bold text-ink-soft">{t.cols[2]}</th></tr></thead>
          <tbody>{t.rows.map(([label, a, b]) => (<tr key={label} className="border-t border-border align-top"><th scope="row" className="whitespace-nowrap px-5 py-4 font-bold text-header">{label}</th><td className="px-5 py-4 text-header"><span className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />{a}</span></td><td className="px-5 py-4 text-ink-soft"><span className="flex items-start gap-2.5"><Minus size={18} className="mt-0.5 shrink-0 text-ink-soft/60" aria-hidden="true" />{b}</span></td></tr>))}</tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-ink-soft">{t.note}</p>
    </Section>
  );
}
