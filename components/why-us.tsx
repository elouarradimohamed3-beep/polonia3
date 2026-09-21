import { CalendarClock, Languages, MonitorSmartphone, ShieldCheck, Tag, Wrench, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import type { Lang } from "@/lib/i18n";

const icons: LucideIcon[] = [Languages, Wrench, CalendarClock, MonitorSmartphone, ShieldCheck, Tag];

const copy = {
  pl: {
    eyebrow: "Dlaczego IPTV Polonia", title: "Prosto, po polsku i bez niespodzianek",
    items: [
      ["Rozmawiamy po polsku", "Pomoc przez WhatsApp i e-mail po polsku lub angielsku, o każdej porze."],
      ["Instalacja krok po kroku", "Instrukcje dla Smart TV, Fire TV Stick, Androida, iPhone'a, Windows i Maca."],
      ["Płacisz za tyle czasu, ile chcesz", "Plany od 1 dnia do 2 lat. Zacznij krótko, wydłuż, gdy Ci pasuje."],
      ["Cała rodzina, kilka ekranów", "W jednym planie od 1 do 5 urządzeń oglądających jednocześnie."],
      ["Najpierw sprawdź", "Darmowy test i zwrot w 7 dni, gdy usługa nie działa na Twoim urządzeniu."],
      ["Ceny bez niespodzianek", "Znasz cenę swojego okresu i liczby urządzeń, zanim zamówisz."],
    ],
  },
  en: {
    eyebrow: "Why IPTV Polonia", title: "Simple, in Polish and without surprises",
    items: [
      ["We speak Polish", "Help by WhatsApp and e-mail in Polish or English, at any time."],
      ["Step-by-step setup", "Guides for Smart TV, Fire TV Stick, Android, iPhone, Windows and Mac."],
      ["Pay for as long as you like", "Plans from 1 day to 2 years. Start short, extend when it suits you."],
      ["The whole family, several screens", "One plan covers 1 to 5 devices watching at the same time."],
      ["Check first", "A free trial and a 7-day refund if the service does not work on your device."],
      ["No pricing surprises", "You know the price for your period and device count before you order."],
    ],
  },
} as const;

export function WhyUs({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <ul className="grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
        {t.items.map(([title, text], i) => {
          const Icon = icons[i];
          return (
            <li key={title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-border"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <div>
                <h3 className="font-display text-lg font-bold text-header">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
