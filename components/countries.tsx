import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { Section, SectionHeading, card, cardHover } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { blogPath } from "@/lib/routes";

type Item = { name: string; time: string; text: string; slug?: string };

const copy: Record<Lang, { eyebrow: string; title: string; sub: string; read: string; items: Item[] }> = {
  pl: {
    eyebrow: "Polonia w świecie",
    title: "Polska telewizja tam, gdzie mieszkasz",
    sub: "Polonia mieszka w wielu krajach. Zobacz, na co zwrócić uwagę w najpopularniejszych kierunkach.",
    read: "Czytaj poradnik",
    items: [
      { name: "Wielka Brytania", time: "−1 godz. względem Polski", text: "Duże skupiska Polaków, dobre łącza szerokopasmowe i najczęściej wynajmowane mieszkania, w których talerz satelitarny to problem.", slug: "polska-telewizja-w-wielkiej-brytanii" },
      { name: "Niemcy", time: "ten sam czas co w Polsce", text: "Ta sama strefa czasowa, więc program leci o tej samej godzinie. Kablówka często jest w czynszu, ale polskie kanały to osobna sprawa.", slug: "polska-telewizja-w-niemczech" },
      { name: "Irlandia", time: "−1 godz. względem Polski", text: "Rosnąca polska społeczność. Przy mobilnej pracy i przeprowadzkach internet i aplikacja są prostsze niż sprzęt satelitarny." },
      { name: "Inne kraje", time: "sprawdź strefę czasową", text: "Holandia, Norwegia, USA, Kanada i wszędzie tam, gdzie masz dobry internet. Napisz do nas, a podpowiemy, jak zacząć." },
    ],
  },
  en: {
    eyebrow: "Polonia around the world",
    title: "Polish TV wherever you live",
    sub: "Polonia lives in many countries. Here is what to keep in mind in the most popular destinations.",
    read: "Read the guide",
    items: [
      { name: "United Kingdom", time: "1 hour behind Poland", text: "Large Polish communities, good broadband and many rented homes where a satellite dish is a problem.", slug: "polish-tv-in-the-uk" },
      { name: "Germany", time: "same time as Poland", text: "The same time zone, so programmes air at the same hour. Cable is often included in the rent, but Polish channels are a separate matter.", slug: "polish-tv-in-germany" },
      { name: "Ireland", time: "1 hour behind Poland", text: "A growing Polish community. When you move often, an app and an internet connection are simpler than satellite equipment." },
      { name: "Other countries", time: "check your time zone", text: "Netherlands, Norway, USA, Canada and anywhere with a good internet connection. Message us and we will help you start." },
    ],
  },
};

export function Countries({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((c) => (
          <article key={c.name} className={`${card} ${cardHover} relative flex flex-col p-6`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-brand"><Globe2 size={22} aria-hidden="true" /></span>
            <h3 className="font-display mt-4 text-xl font-bold text-header">{c.name}</h3>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-brand">{c.time}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{c.text}</p>
            {c.slug && (
              <Link href={blogPath(lang, c.slug)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand after:absolute after:inset-0">
                {t.read} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
