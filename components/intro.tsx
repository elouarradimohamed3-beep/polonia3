import Link from "next/link";
import { Section, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { blogPath, sectionHref } from "@/lib/routes";

const copy = {
  pl: {
    eyebrow: "Czym jest IPTV Polonia?",
    title: "IPTV Polonia to polska telewizja przez internet",
    p1: "IPTV, czyli telewizja internetowa, dostarcza program przez łącze internetowe zamiast anteny czy kabla.",
    p2: "to usługa stworzona dla Polonii, czyli Polaków mieszkających za granicą, oraz dla wszystkich, którzy chcą oglądać polskie kanały i programy na żądanie na własnych urządzeniach. Wybierasz plan na tyle czasu, ile potrzebujesz, dostajesz dane logowania e-mailem i instalujesz aplikację według naszej instrukcji.",
    p3: "W wyszukiwarce często pojawia się także pod nazwą IPTV Polska.",
    read: "Przeczytaj przewodnik: polska telewizja za granicą",
    slug: "iptv-polonia-polska-telewizja-za-granica",
    plans: "Zobacz plany",
    specTitle: "W skrócie",
    spec: [
      ["Dla kogo", "Polonia za granicą i mieszkańcy Polski"],
      ["Ekrany", "1 do 5 urządzeń jednocześnie"],
      ["Okresy", "od 1 dnia do 2 lat"],
      ["Cena", "od 3 € za dzień, od 15 € miesięcznie"],
      ["Urządzenia", "Smart TV, Fire TV Stick, Android, iPhone i iPad, MAG, Windows, Mac"],
      ["Płatności", "PayPal oraz karty Visa i Mastercard przez PayPal"],
      ["Start", "dane logowania zwykle w ciągu 5 minut do 6 godzin"],
    ],
  },
  en: {
    eyebrow: "What is IPTV Polonia?",
    title: "IPTV Polonia is Polish television over the internet",
    p1: "IPTV, or internet television, delivers TV through your internet connection instead of an aerial or a cable.",
    p2: "is a service made for Polonia, meaning Poles living abroad, and for anyone who wants Polish channels and on-demand programmes on their own devices. You choose a plan for as long as you need, receive your login details by e-mail and install an app with our guide.",
    p3: "It is also often searched for as IPTV Polska.",
    read: "Read the guide: Polish TV abroad",
    slug: "iptv-polonia-polish-tv-abroad",
    plans: "See plans",
    specTitle: "At a glance",
    spec: [
      ["Who for", "Poles abroad and people in Poland"],
      ["Screens", "1 to 5 devices at the same time"],
      ["Periods", "from 1 day to 2 years"],
      ["Price", "from €3 for a day, from €15 a month"],
      ["Devices", "Smart TV, Fire TV Stick, Android, iPhone and iPad, MAG, Windows, Mac"],
      ["Payment", "PayPal, plus Visa and Mastercard through PayPal"],
      ["Start", "login details usually within 5 minutes to 6 hours"],
    ],
  },
} as const;

export function Intro({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-header md:text-[2.75rem]">{t.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.p1}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            <strong className="text-header">IPTV Polonia</strong> {t.p2}
          </p>
          <p className="mt-4 text-ink-soft">{t.p3}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={sectionHref(lang, "plans")} className="btn btn-primary">{t.plans}</Link>
            <Link href={blogPath(lang, t.slug)} className="font-bold text-brand underline underline-offset-4 hover:text-brand-dark">{t.read}</Link>
          </div>
        </div>
        <aside className={`${card} p-7 lg:col-span-5`} aria-label={t.specTitle}>
          <h3 className="font-display text-xl font-bold text-header">{t.specTitle}</h3>
          <dl className="mt-4 divide-y divide-border">
            {t.spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3 text-sm">
                <dt className="font-bold uppercase tracking-wider text-brand">{k}</dt>
                <dd className="text-header">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
