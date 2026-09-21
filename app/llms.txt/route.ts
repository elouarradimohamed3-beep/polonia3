import { getAllPosts } from "@/lib/blog";
import { eur } from "@/lib/pricing";
import { CONNECTION_OPTIONS, PLAN_DEFS, PRICES, RESELLER_PACKAGES, SITE } from "@/lib/site";

// Generated from the same data as the website, so the domain and prices never go stale.
export const dynamic = "force-static";

export function GET() {
  const priceLines = CONNECTION_OPTIONS.flatMap((c) => {
    const parts = PLAN_DEFS.flatMap((p) => {
      const price = PRICES[c][p.id];
      return price == null ? [] : [`${p.name.toLowerCase()} ${eur(price)}`];
    });
    return parts.length ? [`- Ceny dla ${c === 1 ? "1 urządzenia" : `${c} urządzeń`}: ${parts.join(", ")}.`] : [];
  });
  const reseller = RESELLER_PACKAGES.map((p) => `${p.credits} kredytów (${eur(p.price)})`).join(", ");
  const u = SITE.url;
  const blog = getAllPosts()
    .map((p) => `- [${p.title}](${u}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.name} (${new URL(u).hostname}) to polskojęzyczny dostawca abonamentów IPTV, czyli telewizji dostarczanej przez internet. Oferta obejmuje kanały na żywo, filmy i seriale VOD, jakość 4K/FHD/HD, przewodnik EPG i wsparcie 24/7. Subskrypcje zaczynają się od 15 € miesięcznie.

## Kluczowe fakty

${priceLines.join("\n")}
- Aktywacja: dane logowania przychodzą e-mailem, zwykle w ciągu 5 minut do 6 godzin od płatności.
- Płatności: PayPal oraz karty Visa/Mastercard przez bramkę PayPal. Zamówienia można też złożyć przez WhatsApp.
- Urządzenia: Smart TV (Samsung, LG, Android TV), Fire TV Stick, Android, iOS, MAG, Windows, Enigma 2.
- Darmowy test: 24 do 48 godzin, formularz na stronie głównej.
- Wsparcie: 24/7 przez WhatsApp (${SITE.phoneDisplay}) i e-mail (${SITE.email}).
- Program resellerski: pakiety ${reseller}.

## Strony

- [Strona główna: oferta, cennik i FAQ](${u}/): plany abonamentowe, funkcje, najczęstsze pytania.
- [Sprzedawca IPTV](${u}/sprzedawca-iptv): program resellerski z własnym panelem.
- [Przewodnik instalacji](${u}/przewodnik-instalacji): konfiguracja IPTV krok po kroku na każdym urządzeniu.
- [Skontaktuj się z nami](${u}/skontaktuj-sie-z-nami): wsparcie techniczne 24/7.
- [O nas](${u}/o-nas): informacje o dostawcy.
- [Blog i poradniki](${u}/blog): artykuły o konfiguracji i rozwiązywaniu problemów.

## Poradniki

${blog}

## Informacje prawne

- [Regulamin](${u}/regulamin-iptv)
- [Zasady zwrotów i anulowania](${u}/zasady-zwrotow-i-anulowania)
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
