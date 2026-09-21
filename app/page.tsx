import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { FeatureTabs } from "@/components/feature-tabs";
import { Hero } from "@/components/hero";
import { HowToStart } from "@/components/how-to-start";
import { IntroSection } from "@/components/intro-section";
import { LatestPosts } from "@/components/latest-posts";
import { JsonLd } from "@/components/json-ld";
import { PlanComparison } from "@/components/plan-comparison";
import { Pricing } from "@/components/pricing";
import { Showcase } from "@/components/showcase";
import { StickyCta } from "@/components/sticky-cta";
import { Testimonials } from "@/components/testimonials";
import { TrialSection } from "@/components/trial-section";
import { VsCable } from "@/components/vs-cable";
import { WhyUs } from "@/components/why-us";
import { pageMetadata, productLd, webPageLd } from "@/lib/seo";

const HOME_TITLE = "IPTV Polska – polska telewizja IPTV od 15 € / miesiąc";
const HOME_DESCRIPTION =
  "IPTV Polska: ponad 40 000 kanałów na żywo, filmy i seriale VOD w 4K/FHD/HD. Plany od 3 € za dzień, darmowy test, aktywacja po płatności, EPG i wsparcie 24/7. Sprawdź cennik.";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <div className="night on-dark">
      <JsonLd
        data={[
          webPageLd({
            path: "/",
            name: HOME_TITLE,
            description: HOME_DESCRIPTION,
            image: "/images/hero.webp",
          }),
          productLd,
        ]}
      />
      <Hero />
      <IntroSection />
      <Showcase />
      <Pricing />
      <TrialSection />
      <PlanComparison />
      <VsCable />
      <HowToStart />
      <WhyUs />
      <Testimonials />
      <FeatureTabs />
      <LatestPosts />
      <Faq />
      <StickyCta />
    </div>
  );
}
