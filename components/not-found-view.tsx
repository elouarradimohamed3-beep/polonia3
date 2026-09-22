import Link from "next/link";
import { Section } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { path, type RouteKey } from "@/lib/routes";

const copy = {
  en: { title: "Page not found", text: "The page you are looking for does not exist or has moved. Try one of these links.", links: [["home", "Home"], ["guide", "Setup guide"], ["blog", "Blog"], ["contact", "Contact"]] },
  pl: { title: "Nie znaleziono strony", text: "Strona, której szukasz, nie istnieje lub została przeniesiona. Skorzystaj z tych linków.", links: [["home", "Start"], ["guide", "Instalacja"], ["blog", "Blog"], ["contact", "Kontakt"]] },
} as const;

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-bold text-brand">404</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-header">{t.title}</h1>
        <p className="mt-3 text-ink-soft">{t.text}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">{t.links.map(([key, label]) => (<li key={key}><Link href={path(lang, key as RouteKey)} className="btn btn-primary">{label}</Link></li>))}</ul>
      </div>
    </Section>
  );
}
