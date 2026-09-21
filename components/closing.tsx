import Link from "next/link";
import { Section } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { path, sectionHref } from "@/lib/routes";

const copy = {
  pl: { teaserTitle: "Chcesz sprzedawać IPTV?", teaserText: "Program resellerski z własnym panelem, kredytami bez terminu ważności i wsparciem 24/7.", teaserCta: "Zobacz program resellerski", title: "Gotowy, żeby włączyć polską telewizję?", text: "Zacznij od darmowego testu albo wybierz plan już teraz.", trial: "Odbierz darmowy test", plans: "Zobacz plany" },
  en: { teaserTitle: "Want to sell IPTV?", teaserText: "A reseller program with your own panel, credits that never expire and 24/7 support.", teaserCta: "See the reseller program", title: "Ready to switch on Polish TV?", text: "Start with a free trial or pick a plan now.", trial: "Get a free trial", plans: "See plans" },
} as const;

export function Closing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <>
      <Section>
        <div className="card flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-header">{t.teaserTitle}</h2>
            <p className="mt-2 max-w-xl text-ink-soft">{t.teaserText}</p>
          </div>
          <Link href={path(lang, "reseller")} className="btn btn-ghost shrink-0">{t.teaserCta}</Link>
        </div>
      </Section>
      <Section tone="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{t.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={sectionHref(lang, "trial")} className="btn btn-primary !px-8 !py-4">{t.trial}</Link>
            <Link href={sectionHref(lang, "plans")} className="btn btn-outline !px-8 !py-4">{t.plans}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
