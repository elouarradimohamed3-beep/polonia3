import type { Metadata } from "next";
import { Closing } from "@/components/closing";
import { Countries } from "@/components/countries";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Intro } from "@/components/intro";
import { JsonLd } from "@/components/json-ld";
import { LatestPosts } from "@/components/latest-posts";
import { PlanMatrix } from "@/components/plan-matrix";
import { Pricing } from "@/components/pricing";
import { StickyCta } from "@/components/sticky-cta";
import { Testimonials } from "@/components/testimonials";
import { TrialSection } from "@/components/trial-section";
import { VsCable } from "@/components/vs-cable";
import { WhyUs } from "@/components/why-us";
import type { Lang } from "@/lib/i18n";
import { path, ROUTES } from "@/lib/routes";
import { pageMetadata, productLd, webPageLd } from "@/lib/seo";

const meta = {
  pl: {
    title: "IPTV Polonia – polska telewizja za granicą przez internet",
    description: "IPTV Polonia to polska telewizja dla Polonii na Smart TV, telefonie i komputerze. Plany od 3 €, darmowy test i wsparcie 24/7. Sprawdź ofertę.",
  },
  en: {
    title: "IPTV Polonia – Polish TV Abroad, Live & On-Demand",
    description: "IPTV Polonia brings Polish television and on-demand programmes to Poles abroad on any screen. Plans from €3, free trial, 24/7 support. See plans.",
  },
} as const;

export const homeMetadata = (lang: Lang): Metadata =>
  pageMetadata({ lang, ...meta[lang], paths: { ...ROUTES.home }, absolute: true });

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={[webPageLd({ lang, path: path(lang, "home"), name: meta[lang].title, description: meta[lang].description }), productLd(lang)]} />
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Countries lang={lang} />
      <HowItWorks lang={lang} />
      <Pricing lang={lang} />
      <TrialSection lang={lang} />
      <PlanMatrix lang={lang} />
      <VsCable lang={lang} />
      <WhyUs lang={lang} />
      <Testimonials lang={lang} />
      <LatestPosts lang={lang} />
      <Faq lang={lang} />
      <Closing lang={lang} />
      <StickyCta lang={lang} />
    </>
  );
}
