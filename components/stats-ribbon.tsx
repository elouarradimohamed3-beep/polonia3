import { Headset, MonitorSmartphone, RotateCcw, Sparkles, type LucideIcon } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const copy: Record<Lang, { icon: LucideIcon; t: string; d: string }[]> = {
  en: [
    { icon: Sparkles, t: "Free trial", d: "check before you buy" },
    { icon: Headset, t: "24/7 support", d: "in English and Polish" },
    { icon: RotateCcw, t: "7-day refund", d: "if it does not work for you" },
    { icon: MonitorSmartphone, t: "1 to 5 devices", d: "in a single plan" },
  ],
  pl: [
    { icon: Sparkles, t: "Darmowy test", d: "sprawdź przed zakupem" },
    { icon: Headset, t: "Wsparcie 24/7", d: "po angielsku i polsku" },
    { icon: RotateCcw, t: "Zwrot w 7 dni", d: "gdy usługa nie działa u Ciebie" },
    { icon: MonitorSmartphone, t: "1 do 5 urządzeń", d: "w jednym planie" },
  ],
};

export function StatsRibbon({ lang }: { lang: Lang }) {
  const items = copy[lang];
  return (
    <section aria-label={lang === "pl" ? "Najważniejsze zalety" : "Key benefits"} className="border-b border-border bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 md:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <li key={t} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-brand"><Icon size={20} aria-hidden="true" /></span>
            <span><span className="block font-bold text-header">{t}</span><span className="block text-sm text-ink-soft">{d}</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}
