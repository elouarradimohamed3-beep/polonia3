import Link from "next/link";
import { Logo } from "@/components/logo";
import type { Lang } from "@/lib/i18n";
import { path, sectionHref, type RouteKey } from "@/lib/routes";
import { SITE } from "@/lib/site";

const copy = {
  en: { blurb: "Live television and on-demand programmes over the internet, with support in English and Polish.", service: "Explore", info: "Information", contact: "Contact", support: "24/7 support", rights: "All rights reserved.", trial: "Free trial", links: [["home", "Home"], ["channels", "Channels"], ["guide", "Setup guide"], ["blog", "Blog"], ["about", "About us"]], legal: [["terms", "Terms of service"], ["refunds", "Refund policy"], ["privacy", "Privacy policy"], ["copyright", "Copyright policy"], ["contact", "Contact"]] },
  pl: { blurb: "Telewizja na żywo i programy na żądanie przez internet, z obsługą po angielsku i polsku.", service: "Nawigacja", info: "Informacje", contact: "Kontakt", support: "Wsparcie 24/7", rights: "Wszelkie prawa zastrzeżone.", trial: "Darmowy test", links: [["home", "Start"], ["channels", "Kanały"], ["guide", "Instalacja"], ["blog", "Blog"], ["about", "O nas"]], legal: [["terms", "Regulamin"], ["refunds", "Zwroty i anulowanie"], ["privacy", "Polityka prywatności"], ["copyright", "Prawa autorskie"], ["contact", "Kontakt"]] },
} as const;

export function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="band-dark on-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div><Link href={path(lang, "home")} aria-label="IPTV Poland"><Logo onDark /></Link><p className="mt-4 text-sm leading-relaxed text-white/75">{t.blurb}</p></div>
        <nav aria-label={t.service}><h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.service}</h2><ul className="space-y-2 text-sm text-white/75">{t.links.map(([key, label]) => (<li key={key}><Link href={path(lang, key as RouteKey)} className="hover:text-white">{label}</Link></li>))}<li><Link href={sectionHref(lang, "trial")} className="hover:text-white">{t.trial}</Link></li></ul></nav>
        <nav aria-label={t.info}><h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.info}</h2><ul className="space-y-2 text-sm text-white/75">{t.legal.map(([key, label]) => (<li key={key}><Link href={path(lang, key as RouteKey)} className="hover:text-white">{label}</Link></li>))}</ul></nav>
        <div><h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">{t.contact}</h2><ul className="space-y-2 text-sm text-white/75"><li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li><li>WhatsApp: {SITE.phoneDisplay}</li><li>{t.support}</li></ul></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/65">© {new Date().getFullYear()} {SITE.name}. {t.rights}</div>
    </footer>
  );
}
