import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { LangSuggest } from "@/components/lang-suggest";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { buildAltMap } from "@/lib/blog";
import { locales, type Lang } from "@/lib/i18n";
import { path } from "@/lib/routes";
import { organizationLd, websiteLd } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin", "latin-ext"], weight: ["600", "700"], style: ["normal"], display: "swap" });
const skip = { pl: "Przejdź do treści", en: "Skip to content" } as const;

/** Shared body of both root layouts: `<html lang>` differs per language. */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const altMap = buildAltMap();
  return (
    <html lang={locales[lang].html} className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-white">{skip[lang]}</a>
        {lang === "pl" && <LangSuggest href={path("en", "home")} />}
        <Header lang={lang} altMap={altMap} />
        <div className="flag-rule" aria-hidden="true" />
        <main id="main" className="flex flex-1 flex-col">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
        <JsonLd data={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
