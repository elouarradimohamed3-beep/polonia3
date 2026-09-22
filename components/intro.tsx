import Link from "next/link";
import { Section, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { blogPath, sectionHref } from "@/lib/routes";

const copy = {
  en: {
    eyebrow: "What is IPTV Poland?",
    title: "IPTV Poland is Polish television delivered over the internet",
    p1: "IPTV, short for Internet Protocol Television, sends the picture through your internet connection instead of an aerial, a satellite dish or a cable.",
    p2: "brings Polish live channels and an on-demand library to your own screen, wherever a good internet connection reaches. Choose a plan for as long as you need, from one day to two years, and for 1 to 5 devices, then get your login details by e-mail and follow our setup guide.",
    read: "Read the full guide", slug: "iptv-poland-getting-started", plans: "See plans",
    specTitle: "At a glance",
    spec: [["Screens", "1 to 5 devices at the same time"], ["Periods", "1 day to 2 years"], ["Price", "from €3 for a day, from €15 a month"], ["Devices", "Smart TV, Fire TV Stick, Android, iPhone and iPad, MAG, Windows, Mac"], ["Payment", "PayPal, plus Visa and Mastercard through PayPal"], ["Start", "login details usually within 5 minutes to 6 hours"]],
  },
  pl: {
    eyebrow: "Czym jest IPTV Poland?",
    title: "IPTV Poland to polska telewizja dostarczana przez internet",
    p1: "IPTV, czyli telewizja internetowa, przesyła obraz przez łącze internetowe zamiast anteny, talerza satelitarnego czy kabla.",
    p2: "dostarcza polskie kanały na żywo i bibliotekę na żądanie na Twój ekran, wszędzie tam, gdzie dociera dobry internet. Wybierasz plan na tyle czasu, ile potrzebujesz, od jednego dnia do dwóch lat, na 1 do 5 urządzeń, dostajesz dane logowania e-mailem i instalujesz aplikację według naszej instrukcji.",
    read: "Przeczytaj pełny poradnik", slug: "iptv-poland-pierwsze-kroki", plans: "Zobacz plany",
    specTitle: "W skrócie",
    spec: [["Ekrany", "1 do 5 urządzeń jednocześnie"], ["Okresy", "1 dzień do 2 lat"], ["Cena", "od 3 € za dzień, od 15 € miesięcznie"], ["Urządzenia", "Smart TV, Fire TV Stick, Android, iPhone i iPad, MAG, Windows, Mac"], ["Płatności", "PayPal oraz karty Visa i Mastercard przez PayPal"], ["Start", "dane logowania zwykle w ciągu 5 minut do 6 godzin"]],
  },
} as const;

export function Intro({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-header md:text-[2.65rem]">{t.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.p1}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft"><strong className="text-header">IPTV Poland</strong> {t.p2}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={sectionHref(lang, "plans")} className="btn btn-primary">{t.plans}</Link>
            <Link href={blogPath(lang, t.slug)} className="font-bold text-brand underline underline-offset-4 hover:text-brand-dark">{t.read}</Link>
          </div>
        </div>
        <aside className={`${card} p-7 lg:col-span-5`} aria-label={t.specTitle}>
          <h3 className="font-display text-xl font-bold text-header">{t.specTitle}</h3>
          <dl className="mt-4 divide-y divide-border">{t.spec.map(([k, v]) => (<div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3 text-sm"><dt className="font-bold uppercase tracking-wider text-brand">{k}</dt><dd className="text-header">{v}</dd></div>))}</dl>
        </aside>
      </div>
    </Section>
  );
}
