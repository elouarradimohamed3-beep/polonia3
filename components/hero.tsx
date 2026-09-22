import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { HeroBroadcast } from "@/components/hero-broadcast";
import type { Lang } from "@/lib/i18n";
import { sectionHref } from "@/lib/routes";

const copy = {
  en: {
    badge: "IPTV Poland · Live TV and on-demand",
    h1a: "IPTV Poland,",
    h1b: "Polish channels on every screen",
    sub: "Watch Polish live TV and an on-demand library over the internet on your smart TV, phone, tablet or computer. Try it free, then choose a plan for 1 to 5 devices.",
    primary: "Get a free trial",
    secondary: "See plans from €3",
    bullets: ["No dish, no cable", "Setup help for every device", "Support in English and Polish"],
    art: "Animated illustration: a broadcast tower sending a signal to a wall of channel tiles",
  },
  pl: {
    badge: "IPTV Poland · Telewizja na żywo i na żądanie",
    h1a: "IPTV Poland,",
    h1b: "polskie kanały na każdym ekranie",
    sub: "Oglądaj polską telewizję na żywo i bibliotekę na żądanie przez internet na Smart TV, telefonie, tablecie lub komputerze. Przetestuj za darmo, a potem wybierz plan na 1 do 5 urządzeń.",
    primary: "Odbierz darmowy test",
    secondary: "Zobacz plany od 3 €",
    bullets: ["Bez anteny i kabla", "Pomoc w instalacji dla każdego urządzenia", "Wsparcie po angielsku i polsku"],
    art: "Animowana ilustracja: wieża nadawcza wysyłająca sygnał do ściany kanałów",
  },
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="band-dark on-dark relative overflow-hidden">
      <div aria-hidden="true" className="hex-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 md:pt-20 lg:grid-cols-12 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-white">{t.badge}</p>
          <h1 className="mt-6">
            <span className="font-display block text-5xl font-bold leading-none text-white md:text-6xl">{t.h1a}</span>
            <span className="font-display mt-3 block text-2xl font-semibold leading-tight text-accent md:text-4xl">{t.h1b}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{t.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={sectionHref(lang, "trial")} className="btn btn-primary !px-8 !py-4">{t.primary}</Link>
            <Link href={sectionHref(lang, "plans")} className="btn btn-outline !px-8 !py-4">{t.secondary}</Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            {t.bullets.map((b) => (<li key={b} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" aria-hidden="true" />{b}</li>))}
          </ul>
        </div>
        <div className="lg:col-span-6"><HeroBroadcast label={t.art} /></div>
      </div>
    </section>
  );
}
