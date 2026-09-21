export const SITE = {
  name: "IPTV Polska",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iptvpolonia.pl",
  email: "goldengateiptv@gmail.com",
  whatsappNumber: "212707711512",
  phoneDisplay: "+212 707 711 512",
} as const;

/** Bare hostname, e.g. "iptvpolonia.pl". */
export const SITE_HOST = new URL(SITE.url).hostname;

export function whatsappLink(text?: string) {
  const params = new URLSearchParams({ phone: SITE.whatsappNumber });
  if (text) params.set("text", text);
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

export const WHATSAPP_TRIAL = whatsappLink("want buy 1 Day");
export const WHATSAPP_SUPPORT = whatsappLink(
  "Cześć! Potrzebuję pomocy z usługą IPTV Polska.",
);
export const WHATSAPP_RESELLER = whatsappLink(
  "Cześć! Chcę dowiedzieć się więcej o programie resellerskim IPTV.",
);

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Sprzedawca IPTV", href: "/sprzedawca-iptv" },
  { label: "Przewodnik instalacji", href: "/przewodnik-instalacji" },
  { label: "Blog", href: "/blog" },
  { label: "Skontaktuj się z nami", href: "/skontaktuj-sie-z-nami" },
] as const;

export const FOOTER_LINKS = [
  { label: "Blog i poradniki", href: "/blog" },
  { label: "Warunki korzystania", href: "/regulamin-iptv" },
  { label: "Zasady zwrotów i anulowania", href: "/zasady-zwrotow-i-anulowania" },
  { label: "O nas", href: "/o-nas" },
  { label: "Skontaktuj się z nami", href: "/skontaktuj-sie-z-nami" },
] as const;

export const PLAN_FEATURES = [
  "Oglądaj na dowolnym urządzeniu",
  "Technologia Anti-Freeze™ 9.8",
  "+ 130 tys. filmów i seriali (VOD)",
  "+ 40000 kanałów Premium na żywo",
  "Jakość 4K / HD / FHD / UHD",
  "Bezpłatne i automatyczne aktualizacje",
  "DOSTĘPNY EPG",
  "ZWROT W CIĄGU 7 DNI",
  "BEZPŁATNE WSPARCIE 24/7",
  "Ochrona prywatności i wbudowana sieć VPN",
];

/** Number of simultaneous devices a subscription can be used on. */
export const CONNECTION_OPTIONS = [1, 2, 3, 4, 5] as const;
export type Connections = (typeof CONNECTION_OPTIONS)[number];

export function deviceLabel(n: number) {
  if (n === 1) return "1 urządzenie";
  if (n >= 2 && n <= 4) return `${n} urządzenia`;
  return `${n} urządzeń`;
}

export const PLAN_DEFS = [
  { id: "1-dzien", name: "1 Dzień", months: null },
  { id: "1-miesiac", name: "1 miesiąc", months: 1 },
  { id: "3-miesiace", name: "3 miesiące", months: 3 },
  { id: "6-miesiecy", name: "6 miesięcy", months: 6 },
  { id: "1-rok", name: "1 rok", months: 12 },
  { id: "2-lata", name: "2 lata", months: 24 },
] as const;
export type PlanId = (typeof PLAN_DEFS)[number]["id"];

/**
 * Price in EUR by number of devices and plan.
 * Tiers 1-3 are the original WordPress prices. Tiers 4-5 were extrapolated from
 * them (each extra device adds the average step seen between 1 and 3 devices;
 * "2 lata" is scaled from "1 rok" like the 3-device tier) - adjust freely.
 * `null` = price not published: the site shows "price on request" and sends
 * the customer to WhatsApp.
 */
export const PRICES: Record<Connections, Record<PlanId, number | null>> = {
  1: { "1-dzien": 3, "1-miesiac": 15, "3-miesiace": 32, "6-miesiecy": 42, "1-rok": 62, "2-lata": 110 },
  2: { "1-dzien": 6, "1-miesiac": 24, "3-miesiace": 47, "6-miesiecy": 67, "1-rok": 94, "2-lata": 199 },
  3: { "1-dzien": 9, "1-miesiac": 35, "3-miesiace": 80, "6-miesiecy": 99, "1-rok": 150, "2-lata": 297 },
  4: { "1-dzien": 12, "1-miesiac": 45, "3-miesiace": 104, "6-miesiecy": 128, "1-rok": 194, "2-lata": 384 },
  5: { "1-dzien": 15, "1-miesiac": 55, "3-miesiace": 128, "6-miesiecy": 156, "1-rok": 238, "2-lata": 471 },
};

export const RESELLER_FEATURES = [
  "Kredyty nigdy nie wygasają",
  "Zdobądź własny panel resellerski",
  "1 kredyt za 1 miesiąc",
  "12 kredytów na 1 rok",
  "Przewodnik telewizyjny (EPG)",
  "WSPARCIE 24/7",
];

export const RESELLER_PACKAGES = [
  { credits: 120, price: 290 },
  { credits: 240, price: 560 },
  { credits: 360, price: 840 },
] as const;

export const WHY_US = [
  {
    title: "Natychmiastowa aktywacja",
    text: "Po dokonaniu płatności Twoja usługa IPTV będzie w pełni aktywna i gotowa do użycia.",
  },
  {
    title: "Działa na wszystkich urządzeniach",
    text: "Twoje ulubione programy i kanały na każdym urządzeniu, z każdego miejsca.",
  },
  {
    title: "Oglądaj telewizję na żywo bez żadnego wysiłku!",
    text: "Ponad 12 000 kanałów telewizyjnych na żywo i ponad 80 000 filmów i programów telewizyjnych (VOD).",
  },
  {
    title: "Najbardziej stabilny serwer",
    text: "Mamy ponad 100 doskonałych i stabilnych serwerów. Nie musisz martwić się o stabilność serwera.",
  },
  {
    title: "Bezpłatna instalacja",
    text: "Oferujemy bezpłatny, kompletny przewodnik instalacji od początku do końca.",
  },
  {
    title: "Super jakość",
    text: "Kanały są dostępne w jakości HD i 4K. Większość kanałów działa bez opóźnień i buforowania. Aktualizujemy nowe treści niemal codziennie.",
  },
];

export const INFRASTRUCTURE = [
  {
    title: "Czym są serwery headendowe?",
    text: "Najlepsza polska telewizja IPTV zaczyna się od serwerów czołowych, które odbierają telewizję na żywo i treści VOD za pośrednictwem satelity lub kabla. Sygnały te są następnie konwertowane na pakiety IP do streamingu cyfrowego.",
  },
  {
    title: "Wyjaśnienie protokołów przesyłania strumieniowego",
    text: "Treści są przesyłane strumieniowo za pomocą protokołów takich jak HLS i RTMP, co zapewnia płynne odtwarzanie. Niezawodny dostawca Best IPTV Polska dba o to, aby protokoły te były zawsze aktualne.",
  },
  {
    title: "Rola sieci dostarczania treści (CDN)",
    text: "Sieci CDN pomagają ograniczyć buforowanie, dostarczając treści z najbliższego serwera. Dobra stacja Best IPTV Polska korzysta z globalnych sieci CDN, aby zagwarantować szybkie i wysokiej jakości transmisje strumieniowe.",
  },
  {
    title: "Zgodność urządzeń i oprogramowanie pośredniczące",
    text: "Oprogramowanie pośredniczące łączy usługę ze smart TV, urządzeniami z Androidem i telefonami. Niezawodna usługa Best IPTV Polska oferuje pełną kompatybilność ze wszystkimi popularnymi urządzeniami.",
  },
];

export const FAQ = [
  {
    q: "CZYM JEST IPTV?",
    a: "IPTV to skrót od Internet Protocol Television (telewizja internetowa). Działa w ten sposób: zamiast odbierać programy telewizyjne przez kabel lub satelitę, pobiera je z internetu. Ma to swoje zalety. Po pierwsze, możesz oglądać telewizję wszędzie tam, gdzie masz połączenie z internetem. Po drugie, obraz jest często ostrzejszy, ponieważ nie jest zniekształcony jak w przypadku telewizji kablowej czy satelitarnej. Wreszcie, może być tańszy, ponieważ nie ma miesięcznych opłat, jak w przypadku telewizji kablowej czy satelitarnej.",
  },
  {
    q: "JAK OTRZYMAM DANE REJESTRACYJNE?",
    a: "Gdy tylko Twoja płatność zostanie zweryfikowana, najszybciej jak to możliwe, otrzymasz na swój adres e-mail dane logowania.",
  },
  {
    q: "CZY MOGĘ OGLĄDAĆ LOKALNE MECZE SPORTOWE I WIADOMOŚCI Z MOJEGO REGIONU ZA POMOCĄ IPTV?",
    a: "Dzięki naszym subskrypcjom możesz oglądać transmisje sportowe oraz kanały lokalne i wiadomości z Twojego regionu.",
  },
  {
    q: "ILE JEDNOCZESNYCH POŁĄCZEŃ?",
    a: "W przeglądzie cen możesz wybrać pakiet odpowiadający liczbie urządzeń, z których korzystasz w ramach abonamentu IPTV.",
  },
  {
    q: "CZY MOGĘ OTRZYMAĆ ZWROT PIENIĘDZY ZA SUBSKRYPCJĘ?",
    a: "W 100% dajemy gwarancję na nasze produkty, ale rozumiemy, że nasza usługa IPTV może nie działać idealnie u każdego. Dlatego oferujemy pełny zwrot pieniędzy.",
  },
  {
    q: "CZY MOGĘ PRZEDŁUŻYĆ SWÓJ ABONAMENT IPTV?",
    a: "Skontaktujemy się z Tobą drogą e-mailową, aby odnowić Twoją subskrypcję, gdy zbliży się data jej wygaśnięcia.",
  },
  {
    q: "Czy potrzebuję VPN, aby korzystać z IPTV?",
    a: "Nie, nie potrzebujesz VPN-u do oglądania IPTV. Korzystamy z zaawansowanych rozwiązań, aby ominąć blokady dostawców internetowych.",
  },
  {
    q: "METODY PŁATNOŚCI",
    a: "Akceptujemy płatności PayPal, Visa/MasterCard za pośrednictwem PayPal Gateway.",
  },
  {
    q: "JAK DŁUGO TRWA ZMIANA ZAMÓWIENIA?",
    a: "Zazwyczaj przetwarzamy zamówienia ręcznie (ze względów bezpieczeństwa). Dlatego prosimy o cierpliwość po dokonaniu płatności. Szczegóły zamówienia wyślemy na podany adres e-mail w ciągu 5 minut do 6 godzin. Jeśli po 6 godzinach nie otrzymasz zamówienia, skontaktuj się z nami i sprawdź najpierw skrzynkę odbiorczą/spam/pocztę masową.",
  },
  {
    q: "JAK ZAPŁACIĆ KARTĄ VISA/MASTERCARD?",
    a: "Musisz zapłacić kartą Visa/Mastercard za pośrednictwem bramki PayPal: wybierz metodę płatności PayPal. Na następnej stronie wybierz drugą opcję: „Utwórz konto” lub „Zapłać kartą kredytową lub debetową”. Na kolejnej stronie wprowadź dane karty i adres rozliczeniowy, a następnie zapłać.",
  },
  {
    q: "CZY MOGĘ ZOSTAĆ RESELLEREM?",
    a: "Tak, możesz się z nami skontaktować poprzez WhatsApp lub e-mail.",
  },
];

export const TESTIMONIAL_IMAGES = [
  "/images/chat2.webp",
  "/images/chat3.webp",
  "/images/chat4.webp",
  "/images/chat5.webp",
];

export type GuideSection = {
  id: string;
  title: string;
  intro?: string;
  groups?: { heading: string; steps: string[] }[];
  steps?: string[];
  note?: string;
  link?: { label: string; href: string };
};

export const GUIDE: GuideSection[] = [
  {
    id: "smart-tv",
    title: "1. Smart TV (Samsung / LG / Android TV)",
    groups: [
      {
        heading: "Samsung Smart TV",
        steps: [
          "Naciśnij przycisk Smart Hub na pilocie.",
          "Wyszukaj aplikację IPTV SMARTERS PRO i zainstaluj ją.",
          "Zaloguj się, podając nazwę użytkownika, hasło i adres URL portalu.",
        ],
      },
      {
        heading: "LG Smart TV",
        steps: [
          "Naciśnij przycisk Home i wejdź do LG Content Store.",
          "Wyszukaj aplikację IPTV SMARTERS PRO i zainstaluj ją.",
          "Zaloguj się, używając danych otrzymanych z subskrypcją.",
        ],
      },
    ],
  },
  {
    id: "fire-tv",
    title: "2. Fire TV Stick",
    steps: [
      "Otwórz aplikację Downloader.",
      "Wpisz kod: 78522.",
      "Po zakończeniu pobierania zainstaluj IPTV SMARTERS PRO.",
      "Otwórz aplikację i zaloguj się danymi Xtream Codes.",
      "Ciesz się oglądaniem.",
    ],
  },
  {
    id: "android",
    title: "3. Android (XCIPTV PLAYER)",
    steps: [
      "Otwórz Sklep Google Play.",
      "Wyszukaj XCIPTV Player.",
      "Wybierz opcję Zainstaluj.",
      "Uruchom odtwarzacz.",
      "Wpisz dane logowania i kliknij Login.",
      "Gotowe.",
    ],
  },
  {
    id: "ios",
    title: "4. Apple / iOS (Smarters Player Lite)",
    steps: [
      "Pobierz Smarters Player Lite z App Store.",
      "Otwórz aplikację i wpisz dane logowania.",
      "Kliknij „ADD USER”.",
      "Odczekaj kilka sekund.",
      "Kliknij ikonę „Live TV”.",
      "Wybierz grupę kanałów.",
      "Kliknij nazwę kanału, a następnie dotknij dwukrotnie, aby włączyć pełny ekran.",
    ],
    link: {
      label: "Smarters Player Lite w App Store",
      href: "https://apps.apple.com/in/app/smarters-player-lite/id1628995509",
    },
  },
  {
    id: "mag",
    title: "5. MAG BOX",
    steps: [
      "Wejdź w Settings i naciśnij przycisk SETUP/SET.",
      "Wybierz System Settings, a następnie Servers.",
      "Kliknij ponownie Servers.",
      "Wybierz opcję Portals.",
      "Wpisz nazwę portalu w polu „Portal 1 Name” oraz adres URL w polu „Portal 1 URL”.",
      "Kliknij OK, aby zapisać.",
      "Kliknij EXIT.",
      "Uruchom ponownie urządzenie i potwierdź przyciskiem OK.",
    ],
    note: "Do zamówienia dołącz adres MAC z naklejki na urządzeniu, abyśmy mogli aktywować usługę zdalnie.",
  },
  {
    id: "windows",
    title: "6. Windows (IPTV Smarters Pro)",
    steps: [
      "Wyszukaj „IPTV Smarters Pro”.",
      "Wejdź na stronę https://www.iptvsmarters.com.",
      "Wybierz Downloads z menu.",
      "Pobierz najnowszą wersję.",
      "Uruchom pobrany plik wykonywalny.",
      "Wybierz „Tak”, gdy pojawi się pytanie o zgodę.",
      "Odczekaj 1-2 minuty na zakończenie instalacji.",
      "Uruchom IPTV Smarters i kliknij „Add New User”.",
      "Zaloguj się przez Xtream Codes API.",
    ],
  },
  {
    id: "enigma2",
    title: "7. ENIGMA 2 / Linux (IPTV.SH)",
    steps: [
      "Sprawdź adres IP urządzenia w Settings > Configuration.",
      "Pobierz PuTTY na komputer z Windows.",
      "Uruchom PuTTY.",
      "Wpisz adres IP urządzenia.",
      "Ustaw port 23.",
      "Kliknij Open.",
      "Zaloguj się domyślną nazwą użytkownika i hasłem: root.",
      "Skopiuj i wklej linię poleceń otrzymaną razem z subskrypcją.",
      "Kliknij prawym przyciskiem myszy i naciśnij ENTER.",
      "Wpisz „reboot”, aby ponownie uruchomić urządzenie.",
    ],
  },
];
