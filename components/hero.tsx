import Link from "next/link";
import { CheckCircle2, Headset, RotateCcw, Sparkles, MonitorSmartphone } from "lucide-react";
import { HeroCollage } from "@/components/hero-collage";
import type { Lang } from "@/lib/i18n";
import { sectionHref } from "@/lib/routes";

const copy = {
  pl: {
    badge: "Dla Polonii i każdego, kto lubi polską telewizję",
    h1a: "IPTV Polonia",
    h1b: "Polska telewizja, gdziekolwiek mieszkasz",
    sub: "Oglądaj polskie kanały i programy na żądanie przez internet na Smart TV, telefonie, tablecie i komputerze. Zacznij od darmowego testu i zostań, jeśli wszystko działa.",
    primary: "Odbierz darmowy test",
    secondary: "Zobacz plany od 3 €",
    bullets: ["Bez anteny i kabla", "Instrukcja krok po kroku", "Wsparcie po polsku"],
    ribbon: [
      { icon: Sparkles, t: "Darmowy test", d: "sprawdź przed zakupem" },
      { icon: Headset, t: "Wsparcie 24/7", d: "po polsku i angielsku" },
      { icon: RotateCcw, t: "Zwrot w 7 dni", d: "gdy usługa nie działa u Ciebie" },
      { icon: MonitorSmartphone, t: "1 do 5 urządzeń", d: "w jednym planie" },
    ],
    art: "Animowana ilustracja: piłka nożna, telewizor w salonie, wybrzeże Bałtyku i kino, a pośrodku znak IPTV Polonia",
    badgeText: "Polska telewizja",
  },
  en: {
    badge: "For Poles abroad and anyone who loves Polish TV",
    h1a: "IPTV Polonia",
    h1b: "Polish television, wherever you live",
    sub: "Watch Polish channels and on-demand programmes over the internet on your smart TV, phone, tablet or computer. Start with a free trial and stay if it all works.",
    primary: "Get a free trial",
    secondary: "See plans from €3",
    bullets: ["No dish, no cable", "Step-by-step setup guide", "Support in Polish and English"],
    ribbon: [
      { icon: Sparkles, t: "Free trial", d: "check before you buy" },
      { icon: Headset, t: "24/7 support", d: "in Polish and English" },
      { icon: RotateCcw, t: "7-day refund", d: "if it does not work for you" },
      { icon: MonitorSmartphone, t: "1 to 5 devices", d: "in a single plan" },
    ],
    art: "Animated illustration: football, a living-room TV, the Baltic coast and cinema, with the IPTV Polonia badge in the centre",
    badgeText: "Polish TV",
  },
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <>
      <section className="band-navy on-navy relative overflow-hidden">
        <div aria-hidden="true" className="dots pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-white">{t.badge}</p>
            <h1 className="mt-6">
              <span className="font-display block text-5xl font-bold leading-none text-white md:text-7xl">{t.h1a}</span>
              <span className="font-display mt-4 block text-2xl font-semibold leading-tight text-accent md:text-4xl">{t.h1b}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{t.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={sectionHref(lang, "trial")} className="btn btn-primary !px-8 !py-4">{t.primary}</Link>
              <Link href={sectionHref(lang, "plans")} className="btn btn-outline !px-8 !py-4">{t.secondary}</Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6"><HeroCollage label={t.art} badge={t.badgeText} /></div>
        </div>
      </section>

      <section aria-label={lang === "pl" ? "Najważniejsze zalety" : "Key benefits"} className="border-b border-border bg-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 md:grid-cols-4">
          {t.ribbon.map(({ icon: Icon, t: title, d }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-brand"><Icon size={20} aria-hidden="true" /></span>
              <span>
                <span className="block font-bold text-header">{title}</span>
                <span className="block text-sm text-ink-soft">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
