"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { other, type Lang } from "@/lib/i18n";
import { path, sectionHref, type RouteKey } from "@/lib/routes";

const copy = {
  pl: { menuOpen: "Otwórz menu", menuClose: "Zamknij menu", main: "Menu główne", mobile: "Menu mobilne", home: "IPTV Polonia, strona główna", trial: "Darmowy test", switch: "English", switchLabel: "English, browse in English" },
  en: { menuOpen: "Open menu", menuClose: "Close menu", main: "Main menu", mobile: "Mobile menu", home: "IPTV Polonia home", trial: "Free trial", switch: "Polski", switchLabel: "Polski, przeglądaj po polsku" },
} as const;

const NAV: Record<Lang, { key: RouteKey; label: string }[]> = {
  pl: [
    { key: "home", label: "Start" },
    { key: "guide", label: "Instalacja" },
    { key: "reseller", label: "Sprzedawca IPTV" },
    { key: "blog", label: "Blog" },
    { key: "contact", label: "Kontakt" },
  ],
  en: [
    { key: "home", label: "Home" },
    { key: "guide", label: "Setup guide" },
    { key: "reseller", label: "Reseller" },
    { key: "blog", label: "Blog" },
    { key: "contact", label: "Contact" },
  ],
};

export function Header({ lang, altMap }: { lang: Lang; altMap: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[lang];
  const altLang = other(lang);
  const altHref = altMap[pathname] ?? path(altLang, "home");
  const isActive = (href: string) => (href === "/" || href === "/en" ? pathname === href : pathname.startsWith(href));

  const LangLink = (
    <Link
      href={altHref}
      hrefLang={altLang}
      lang={altLang}
      aria-label={t.switchLabel}
      className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-bold text-header transition-colors hover:border-header"
    >
      {t.switch}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={path(lang, "home")} aria-label={t.home} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label={t.main} className="hidden items-center gap-7 lg:flex">
          {NAV[lang].map((item) => {
            const href = path(lang, item.key);
            const active = isActive(href);
            return (
              <Link key={item.key} href={href} aria-current={active ? "page" : undefined} className={`text-sm font-semibold transition-colors hover:text-brand ${active ? "text-brand" : "text-header"}`}>
                {item.label}
              </Link>
            );
          })}
          {LangLink}
          <Link href={sectionHref(lang, "trial")} className="btn btn-primary !py-2.5">{t.trial}</Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {LangLink}
          <button type="button" className="rounded-md p-2 text-header" aria-label={open ? t.menuClose : t.menuOpen} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={t.mobile} className="border-t border-border px-4 pb-4 lg:hidden">
          <ul className="flex flex-col">
            {NAV[lang].map((item) => (
              <li key={item.key}>
                <Link href={path(lang, item.key)} onClick={() => setOpen(false)} className="block py-3 text-base font-semibold text-header">{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link href={sectionHref(lang, "trial")} onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">{t.trial}</Link>
        </nav>
      )}
    </header>
  );
}
