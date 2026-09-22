import { getAllPosts } from "@/lib/blog";
import { eur, LOWEST_MONTHLY, LOWEST_PRICE } from "@/lib/pricing";
import { blogPath, ROUTES } from "@/lib/routes";
import { CONNECTION_OPTIONS, PLAN_DEFS, PLAN_NAMES, PRICES, SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const u = SITE.url;
  const priceLines = CONNECTION_OPTIONS.flatMap((c) => {
    const parts = PLAN_DEFS.flatMap((p) => { const price = PRICES[c][p.id]; return price == null ? [] : [`${PLAN_NAMES.en[p.id]} ${eur("en", price)}`]; });
    return parts.length ? [`- Prices for ${c} ${c === 1 ? "device" : "devices"}: ${parts.join(", ")}.`] : [];
  });
  const posts = (["en", "pl"] as const).flatMap((lang) => getAllPosts(lang).map((p) => `- [${p.title}](${u}${blogPath(lang, p.slug)}) (${lang.toUpperCase()}): ${p.description}`));
  const body = `# ${SITE.name}

> ${SITE.name} (${new URL(u).hostname}) is an internet TV (IPTV) service delivering Polish-language live channels and on-demand programmes. Plans run from a 1-day plan (${eur("en", LOWEST_PRICE)}) to 2 years, for 1 to 5 devices, from ${eur("en", LOWEST_MONTHLY)} a month. A free trial is available and support is offered 24/7 in English and Polish. The website is available in English (default) and Polish.

## Key facts

${priceLines.join("\n")}
- Devices: Smart TV (Samsung, LG, Android TV), Fire TV Stick, Android, iPhone and iPad, MAG, Windows, Mac, Enigma 2.
- Payment: PayPal, plus Visa and Mastercard through PayPal; orders can also be placed by WhatsApp (${SITE.phoneDisplay}) or e-mail (${SITE.email}).
- Login details are usually sent within 5 minutes to 6 hours after payment.
- Refund: available before activation and within 7 days if the service does not work on your device and support cannot fix it.
- Channel availability depends on plan and region. Rights holders: see the copyright policy.

## Pages (English, default)

- [Home: IPTV Poland](${u}/)
- [Setup guide](${u}${ROUTES.guide.en}), [Channels](${u}${ROUTES.channels.en}), [Blog](${u}${ROUTES.blog.en}), [About](${u}${ROUTES.about.en}), [Contact](${u}${ROUTES.contact.en})
- [Terms](${u}${ROUTES.terms.en}), [Refund policy](${u}${ROUTES.refunds.en}), [Privacy policy](${u}${ROUTES.privacy.en}), [Copyright policy](${u}${ROUTES.copyright.en})

## Pages (Polish)

- [Strona główna](${u}${ROUTES.home.pl}), [Instalacja](${u}${ROUTES.guide.pl}), [Kanały](${u}${ROUTES.channels.pl}), [Blog](${u}${ROUTES.blog.pl}), [O nas](${u}${ROUTES.about.pl}), [Kontakt](${u}${ROUTES.contact.pl})
- [Regulamin](${u}${ROUTES.terms.pl}), [Zwroty](${u}${ROUTES.refunds.pl}), [Polityka prywatności](${u}${ROUTES.privacy.pl}), [Prawa autorskie](${u}${ROUTES.copyright.pl})

## Articles

${posts.join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
