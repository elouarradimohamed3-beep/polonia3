import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import type { Lang } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ lang, trail }: { lang: Lang; trail: { name: string; path: string }[] }) {
  const full = [{ name: lang === "pl" ? "Strona główna" : "Home", path: path(lang, "home") }, ...trail];
  return (
    <>
      <nav aria-label={lang === "pl" ? "Ścieżka nawigacji" : "Breadcrumb"} className="border-b border-border bg-white/70">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-2.5 text-sm">
          {full.map((item, i) => { const last = i === full.length - 1; return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? <span aria-current="page" className="font-semibold text-header">{item.name}</span> : (<><Link href={item.path} className="text-brand hover:underline">{item.name}</Link><span aria-hidden="true" className="text-ink-soft/50">/</span></>)}
            </li>
          ); })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(full)} />
    </>
  );
}
