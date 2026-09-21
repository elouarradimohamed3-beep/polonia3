import Link from "next/link";
import { Logo } from "@/components/logo";
import type { Lang } from "@/lib/i18n";
import { path, sectionHref, type RouteKey } from "@/lib/routes";
import { SITE } from "@/lib/site";

const copy = {
  pl: {
    blurb: "Polska telewizja przez internet dla Polonii i dla wszystkich, którzy chcą oglądać polskie programy bez kabla i anteny.",
    service: "Serwis", info: "Informacje", contact: "Kontakt", support: "Wsparcie 24/7", rights: "Wszelkie prawa zastrzeżone.", trial: "Darmowy test",
    links: [["home", "Start"], ["guide", "Instalacja"], ["reseller", "Sprzedawca IPTV"], ["blog", "Blog"], ["about", "O nas"]],
    legal: [["terms", "Regulamin"], ["refunds", "Zwroty i anulowanie"], ["privacy", "Polityka prywatności"], ["copyright", "Prawa autorskie"], ["contact", "Kontakt"]],
  },
  en: {
    blurb: "Polish television over the internet for Poles abroad and everyone who wants Polish programmes without a cable or a dish.",
    service: "Service", info: "Information", contact: "Contact", support: "24/7 support", rights: "All rights reserved.", trial: "Free trial",
    links: [["home", "Home"], ["guide", "Setup guide"], ["reseller", "Reseller"], ["blog", "Blog"], ["about", "About us"]],
    legal: [["terms", "Terms of service"], ["refunds", "Refund policy"], ["privacy", "Privacy policy"], ["copyright", "Copyright policy"], ["contact", "Contact"]],
  },
} as const;

export function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="band-navy on-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Link href={path(lang, "home")} aria-label="IPTV Polonia"><Logo onDark /></Link>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{t.blurb}</p>
        </div>
        <nav aria-label={t.service}>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.service}</h2>
          <ul className="space-y-2 text-sm text-white/75">
            {t.links.map(([key, label]) => (<li key={key}><Link href={path(lang, key as RouteKey)} className="hover:text-white">{label}</Link></li>))}
            <li><Link href={sectionHref(lang, "trial")} className="hover:text-white">{t.trial}</Link></li>
          </ul>
        </nav>
        <nav aria-label={t.info}>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.info}</h2>
          <ul className="space-y-2 text-sm text-white/75">
            {t.legal.map(([key, label]) => (<li key={key}><Link href={path(lang, key as RouteKey)} className="hover:text-white">{label}</Link></li>))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.contact}</h2>
          <ul className="space-y-2 text-sm text-white/75">
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li>WhatsApp: {SITE.phoneDisplay}</li>
            <li>{t.support}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/65">© {new Date().getFullYear()} {SITE.name}. {t.rights}</div>
    </footer>
  );
}
