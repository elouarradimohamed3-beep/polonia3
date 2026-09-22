import { Check, Headset, RotateCcw, ShieldCheck, Wallet, Zap } from "lucide-react";
import { PricingPlans } from "@/components/pricing-plans";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const copy = {
  en: { eyebrow: "Pricing", title: "Choose a plan for your home", sub: "Pick the number of screens and the period. Prices are in euros.", trust: [{ icon: Zap, text: "Free trial first" }, { icon: RotateCcw, text: "7-day refund" }, { icon: Headset, text: "24/7 support" }, { icon: Wallet, text: "PayPal, Visa, Mastercard" }], incEyebrow: "Included in every plan", incTitle: "Every plan includes the same", incText: "Plans differ only in period and number of devices.", features: ["Watching on smart TV, phone, tablet and computer", "Live television and on-demand programmes", "TV guide (EPG)", "Free updates", "Step-by-step setup help", "24/7 support", "7-day refund if the service does not work", "Free trial before you buy"], note: "Need more than five devices? Message us and we will prepare an offer for your household.", noteCta: "Ask about more devices", noteMsg: "Hello! I need a plan for more than five devices." },
  pl: { eyebrow: "Cennik", title: "Wybierz plan dla swojego domu", sub: "Wskaż liczbę ekranów i okres. Ceny podajemy w euro.", trust: [{ icon: Zap, text: "Najpierw darmowy test" }, { icon: RotateCcw, text: "Zwrot w ciągu 7 dni" }, { icon: Headset, text: "Wsparcie 24/7" }, { icon: Wallet, text: "PayPal, Visa, Mastercard" }], incEyebrow: "W cenie każdego planu", incTitle: "Każdy plan zawiera to samo", incText: "Plany różnią się tylko okresem i liczbą urządzeń.", features: ["Oglądanie na Smart TV, telefonie, tablecie i komputerze", "Telewizja na żywo i programy na żądanie", "Program telewizyjny (EPG)", "Bezpłatne aktualizacje", "Pomoc w instalacji krok po kroku", "Wsparcie 24/7", "Zwrot w ciągu 7 dni, gdy usługa nie działa", "Darmowy test przed zakupem"], note: "Potrzebujesz więcej niż pięciu urządzeń? Napisz do nas, a przygotujemy ofertę dla Twojego domu.", noteCta: "Napisz o większej liczbie urządzeń", noteMsg: "Cześć! Potrzebuję planu na więcej niż pięć urządzeń." },
} as const;

export function Pricing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section id="plans">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <PricingPlans lang={lang} />
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">{t.trust.map(({ icon: Icon, text }) => (<li key={text} className={`${card} flex items-center gap-3 px-4 py-3 text-sm font-semibold text-header`}><Icon size={18} className="shrink-0 text-brand" aria-hidden="true" />{text}</li>))}</ul>
      <div className={`${card} mt-6 p-8 md:p-10`}>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="eyebrow">{t.incEyebrow}</p><h3 className="font-display mt-4 text-2xl font-bold text-header">{t.incTitle}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.incText}</p></div>
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:col-span-8">{t.features.map((f) => (<li key={f} className="flex items-start gap-3 text-[0.95rem] text-header"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white"><Check size={13} strokeWidth={3.5} aria-hidden="true" /></span><span>{f}</span></li>))}</ul>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border border-border bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background text-brand"><ShieldCheck size={24} strokeWidth={1.8} aria-hidden="true" /></span><p className="text-sm leading-relaxed text-header">{t.note}</p></div>
        <a href={whatsappLink(t.noteMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-teal shrink-0">{t.noteCta}</a>
      </div>
    </Section>
  );
}
