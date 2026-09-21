import Link from "next/link";
import { CheckCircle2, Headset, RotateCcw, Sparkles, MonitorSmartphone } from "lucide-react";
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
    art: "Ilustracja: telewizor, telefon i tablet połączone z Polską",
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
    art: "Illustration: a TV, a phone and a tablet connected to Poland",
  },
} as const;

function HeroArt({ label }: { label: string }) {
  const nodes: [number, number][] = [[52, 84], [536, 62], [566, 196], [58, 352], [520, 372]];
  return (
    <svg viewBox="0 0 620 430" role="img" aria-label={label} className="h-auto w-full">
      {[92, 148, 204].map((r) => (
        <circle key={r} cx="310" cy="215" r={r} fill="none" stroke="#fff" strokeOpacity="0.09" />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1={x} y1={y} x2="310" y2="215" stroke="#fff" strokeOpacity="0.16" strokeDasharray="4 6" />
          <circle cx={x} cy={y} r="5" fill="#ff8a9a" />
        </g>
      ))}
      {/* TV */}
      <rect x="128" y="96" width="364" height="226" rx="18" fill="#15305a" stroke="#2c4a7d" strokeWidth="3" />
      <rect x="141" y="109" width="338" height="200" rx="9" fill="#0a1830" />
      <circle cx="310" cy="196" r="38" fill="#c8102e" />
      <path d="M298 176 L328 196 L298 216 Z" fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <rect x="164" y="128" width="96" height="8" rx="4" fill="#fff" opacity="0.28" />
      <rect x="164" y="146" width="60" height="6" rx="3" fill="#fff" opacity="0.16" />
      <rect x="141" y="269" width="338" height="20" fill="#fff" />
      <rect x="141" y="289" width="338" height="20" fill="#c8102e" />
      <path d="M141 289 H479 V300 A9 9 0 0 1 470 309 H150 A9 9 0 0 1 141 300 Z" fill="#c8102e" />
      <rect x="276" y="322" width="68" height="11" fill="#2c4a7d" />
      <rect x="240" y="333" width="140" height="8" rx="4" fill="#2c4a7d" />
      {/* Phone */}
      <rect x="34" y="196" width="86" height="158" rx="15" fill="#15305a" stroke="#2c4a7d" strokeWidth="3" />
      <rect x="42" y="208" width="70" height="134" rx="8" fill="#0a1830" />
      <circle cx="77" cy="266" r="14" fill="#c8102e" />
      <path d="M73 259 L84 266 L73 273 Z" fill="#fff" />
      <rect x="50" y="222" width="40" height="5" rx="2.5" fill="#fff" opacity="0.25" />
      <rect x="50" y="302" width="54" height="22" rx="5" fill="#fff" opacity="0.12" />
      {/* Tablet */}
      <rect x="500" y="214" width="92" height="124" rx="13" fill="#15305a" stroke="#2c4a7d" strokeWidth="3" />
      <rect x="508" y="224" width="76" height="104" rx="7" fill="#0a1830" />
      <rect x="514" y="232" width="64" height="40" rx="5" fill="#fff" opacity="0.9" />
      <rect x="514" y="248" width="64" height="24" rx="0" fill="#c8102e" />
      <rect x="514" y="284" width="64" height="6" rx="3" fill="#fff" opacity="0.25" />
    </svg>
  );
}

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
          <div className="lg:col-span-6"><HeroArt label={t.art} /></div>
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
