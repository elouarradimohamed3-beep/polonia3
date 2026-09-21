import type { Lang } from "@/lib/i18n";

export type GuideSection = {
  id: string;
  title: string;
  groups?: { heading: string; steps: string[] }[];
  steps?: string[];
  note?: string;
  link?: { label: string; href: string };
};

export const GUIDE_TEXT: Record<Lang, { title: string; description: string; h1: string; intro: string; eyebrow: string; crumb: string; stepWord: string; note: string; ctaTitle: string; ctaText: string; help: string; helpMsg: string; trial: string }> = {
  pl: {
    title: "Instrukcja instalacji IPTV na każdym urządzeniu",
    description: "Jak zainstalować IPTV na Smart TV, Fire TV Stick, Androidzie, iPhone i iPad, MAG, Windows i Enigma 2. Instrukcje krok po kroku po polsku.",
    h1: "Jak skonfigurować IPTV na swoim urządzeniu",
    intro: "Wybierz swoje urządzenie i postępuj zgodnie z instrukcją. Wszędzie zasada jest ta sama: zainstaluj aplikację, wpisz dane logowania i włącz telewizję. Instalacja jest bezpłatna, a wsparcie działa 24/7.",
    eyebrow: "Instalacja", crumb: "Instalacja", stepWord: "Krok", note: "Uwaga",
    ctaTitle: "Nie możesz sobie poradzić z konfiguracją?", ctaText: "Napisz do nas po polsku lub angielsku, a przeprowadzimy Cię przez cały proces.", help: "Napisz na WhatsApp", helpMsg: "Cześć! Potrzebuję pomocy z instalacją IPTV Polonia.", trial: "Odbierz darmowy test",
  },
  en: {
    title: "IPTV setup guide for every device",
    description: "How to set up IPTV on Smart TV, Fire TV Stick, Android, iPhone and iPad, MAG, Windows and Enigma 2. Step-by-step instructions in English.",
    h1: "How to set up IPTV on your device",
    intro: "Choose your device and follow the steps. The idea is the same everywhere: install an app, enter your login details and switch on the television. Setup help is free and support is available 24/7.",
    eyebrow: "Setup guide", crumb: "Setup guide", stepWord: "Step", note: "Note",
    ctaTitle: "Cannot manage the setup?", ctaText: "Message us in Polish or English and we will walk you through it.", help: "Message us on WhatsApp", helpMsg: "Hello! I need help setting up IPTV Polonia.", trial: "Get a free trial",
  },
};

export const GUIDE: Record<Lang, GuideSection[]> = {
  pl: [
    { id: "smart-tv", title: "Smart TV (Samsung / LG / Android TV)", groups: [
      { heading: "Samsung Smart TV", steps: ["Naciśnij przycisk Smart Hub na pilocie.", "Wyszukaj aplikację IPTV SMARTERS PRO i zainstaluj ją.", "Zaloguj się, podając nazwę użytkownika, hasło i adres URL portalu."] },
      { heading: "LG Smart TV", steps: ["Naciśnij przycisk Home i wejdź do LG Content Store.", "Wyszukaj aplikację IPTV SMARTERS PRO i zainstaluj ją.", "Zaloguj się, używając danych otrzymanych z subskrypcją."] },
    ] },
    { id: "fire-tv", title: "Fire TV Stick", steps: ["Otwórz aplikację Downloader.", "Wpisz kod: 78522.", "Po zakończeniu pobierania zainstaluj IPTV SMARTERS PRO.", "Otwórz aplikację i zaloguj się danymi Xtream Codes.", "Ciesz się oglądaniem."] },
    { id: "android", title: "Android (XCIPTV PLAYER)", steps: ["Otwórz Sklep Google Play.", "Wyszukaj XCIPTV Player.", "Wybierz opcję Zainstaluj.", "Uruchom odtwarzacz.", "Wpisz dane logowania i kliknij Login.", "Gotowe."] },
    { id: "ios", title: "Apple / iOS (Smarters Player Lite)", steps: ["Pobierz Smarters Player Lite z App Store.", "Otwórz aplikację i wpisz dane logowania.", "Kliknij „ADD USER”.", "Odczekaj kilka sekund.", "Kliknij ikonę „Live TV”.", "Wybierz grupę kanałów.", "Kliknij nazwę kanału, a następnie dotknij dwukrotnie, aby włączyć pełny ekran."], link: { label: "Smarters Player Lite w App Store", href: "https://apps.apple.com/in/app/smarters-player-lite/id1628995509" } },
    { id: "mag", title: "MAG BOX", steps: ["Wejdź w Settings i naciśnij przycisk SETUP/SET.", "Wybierz System Settings, a następnie Servers.", "Kliknij ponownie Servers.", "Wybierz opcję Portals.", "Wpisz nazwę portalu w polu „Portal 1 Name” oraz adres URL w polu „Portal 1 URL”.", "Kliknij OK, aby zapisać.", "Kliknij EXIT.", "Uruchom ponownie urządzenie i potwierdź przyciskiem OK."], note: "Do zamówienia dołącz adres MAC z naklejki na urządzeniu, abyśmy mogli aktywować usługę zdalnie." },
    { id: "windows", title: "Windows (IPTV Smarters Pro)", steps: ["Wyszukaj „IPTV Smarters Pro”.", "Wejdź na stronę https://www.iptvsmarters.com.", "Wybierz Downloads z menu.", "Pobierz najnowszą wersję.", "Uruchom pobrany plik wykonywalny.", "Wybierz „Tak”, gdy pojawi się pytanie o zgodę.", "Odczekaj 1-2 minuty na zakończenie instalacji.", "Uruchom IPTV Smarters i kliknij „Add New User”.", "Zaloguj się przez Xtream Codes API."] },
    { id: "enigma2", title: "ENIGMA 2 / Linux (IPTV.SH)", steps: ["Sprawdź adres IP urządzenia w Settings > Configuration.", "Pobierz PuTTY na komputer z Windows.", "Uruchom PuTTY.", "Wpisz adres IP urządzenia.", "Ustaw port 23.", "Kliknij Open.", "Zaloguj się domyślną nazwą użytkownika i hasłem: root.", "Skopiuj i wklej linię poleceń otrzymaną razem z subskrypcją.", "Kliknij prawym przyciskiem myszy i naciśnij ENTER.", "Wpisz „reboot”, aby ponownie uruchomić urządzenie."] },
  ],
  en: [
    { id: "smart-tv", title: "Smart TV (Samsung / LG / Android TV)", groups: [
      { heading: "Samsung Smart TV", steps: ["Press the Smart Hub button on the remote.", "Search for the IPTV SMARTERS PRO app and install it.", "Log in with your username, password and portal URL."] },
      { heading: "LG Smart TV", steps: ["Press the Home button and open the LG Content Store.", "Search for the IPTV SMARTERS PRO app and install it.", "Log in with the details you received with your subscription."] },
    ] },
    { id: "fire-tv", title: "Fire TV Stick", steps: ["Open the Downloader app.", "Enter the code: 78522.", "When the download finishes, install IPTV SMARTERS PRO.", "Open the app and log in with your Xtream Codes details.", "Enjoy watching."] },
    { id: "android", title: "Android (XCIPTV PLAYER)", steps: ["Open Google Play.", "Search for XCIPTV Player.", "Choose Install.", "Start the player.", "Enter your login details and tap Login.", "Done."] },
    { id: "ios", title: "Apple / iOS (Smarters Player Lite)", steps: ["Download Smarters Player Lite from the App Store.", "Open the app and enter your login details.", "Tap “ADD USER”.", "Wait a few seconds.", "Tap the “Live TV” icon.", "Choose a channel group.", "Tap a channel name, then double-tap for full screen."], link: { label: "Smarters Player Lite in the App Store", href: "https://apps.apple.com/in/app/smarters-player-lite/id1628995509" } },
    { id: "mag", title: "MAG BOX", steps: ["Open Settings and press the SETUP/SET button.", "Choose System Settings, then Servers.", "Choose Servers again.", "Choose Portals.", "Enter the portal name in “Portal 1 Name” and the URL in “Portal 1 URL”.", "Choose OK to save.", "Choose EXIT.", "Restart the device and confirm with OK."], note: "Include the MAC address from the sticker on the device with your order so we can activate the service remotely." },
    { id: "windows", title: "Windows (IPTV Smarters Pro)", steps: ["Search for “IPTV Smarters Pro”.", "Go to https://www.iptvsmarters.com.", "Choose Downloads from the menu.", "Download the latest version.", "Run the downloaded file.", "Choose “Yes” when asked for permission.", "Wait 1-2 minutes for the installation to finish.", "Start IPTV Smarters and click “Add New User”.", "Log in with Xtream Codes API."] },
    { id: "enigma2", title: "ENIGMA 2 / Linux (IPTV.SH)", steps: ["Check the device IP address in Settings > Configuration.", "Download PuTTY on a Windows computer.", "Start PuTTY.", "Enter the device IP address.", "Set the port to 23.", "Click Open.", "Log in with the default username and password: root.", "Copy and paste the command line you received with your subscription.", "Right-click and press ENTER.", "Type “reboot” to restart the device."] },
  ],
};
