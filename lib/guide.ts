import type { Lang } from "@/lib/i18n";

export type GuideSection = { id: string; title: string; steps: string[]; note?: string; link?: { label: string; href: string } };

export const GUIDE_TEXT: Record<Lang, { title: string; description: string; h1: string; intro: string; eyebrow: string; crumb: string; stepWord: string; note: string; ctaTitle: string; ctaText: string; help: string; helpMsg: string; trial: string }> = {
  en: {
    title: "IPTV setup guide for every device",
    description: "How to set up IPTV Poland on Smart TV, Fire TV Stick, Android, iPhone and iPad, MAG, Windows and Enigma 2. Step-by-step instructions.",
    h1: "How to set up IPTV Poland on your device",
    intro: "Choose your device and follow the steps. The idea is the same everywhere: install an app, enter your login details and switch on the television. Setup help is free and support is available 24/7.",
    eyebrow: "Setup guide", crumb: "Setup guide", stepWord: "Step", note: "Note",
    ctaTitle: "Cannot manage the setup?", ctaText: "Message us and we will walk you through it.", help: "Message us on WhatsApp", helpMsg: "Hello! I need help setting up IPTV Poland.", trial: "Get a free trial",
  },
  pl: {
    title: "Instrukcja instalacji IPTV na każdym urządzeniu",
    description: "Jak zainstalować IPTV Poland na Smart TV, Fire TV Stick, Androidzie, iPhone i iPad, MAG, Windows i Enigma 2. Instrukcje krok po kroku.",
    h1: "Jak skonfigurować IPTV Poland na swoim urządzeniu",
    intro: "Wybierz swoje urządzenie i postępuj zgodnie z instrukcją. Wszędzie zasada jest ta sama: zainstaluj aplikację, wpisz dane logowania i włącz telewizję. Instalacja jest bezpłatna, a wsparcie działa 24/7.",
    eyebrow: "Instalacja", crumb: "Instalacja", stepWord: "Krok", note: "Uwaga",
    ctaTitle: "Nie możesz sobie poradzić z konfiguracją?", ctaText: "Napisz do nas, a przeprowadzimy Cię przez cały proces.", help: "Napisz na WhatsApp", helpMsg: "Cześć! Potrzebuję pomocy z instalacją IPTV Poland.", trial: "Odbierz darmowy test",
  },
};

export const GUIDE: Record<Lang, GuideSection[]> = {
  en: [
    { id: "smart-tv", title: "Smart TV (Samsung / LG / Android TV)", steps: ["Open your TV's app store.", "Search for the IPTV player app we recommend and install it.", "Open the app and choose to log in with your provider details.", "Enter the username, password and server address from your e-mail.", "Wait for the list to load, then choose a channel."] },
    { id: "fire-tv", title: "Amazon Fire TV Stick", steps: ["Install the Downloader app from the Amazon Appstore.", "Go to Settings, My Fire TV, Developer options and allow installing unknown apps for Downloader.", "Open Downloader and enter the app address or code we send you.", "Install the app, open it and log in with your details.", "Turn off the unknown-apps setting again for safety."], note: "Only install apps from addresses you trust." },
    { id: "android", title: "Android phone or tablet", steps: ["Open Google Play and search for the recommended IPTV player app.", "Install and open it.", "Choose to log in with your provider details.", "Enter the username, password and server address.", "Open the channel list and start watching."] },
    { id: "ios", title: "iPhone and iPad", steps: ["Open the App Store and search for the recommended IPTV player app.", "Install and open it.", "Add a new user or playlist with your provider details.", "Wait for the list to load.", "Tap a channel to start."] },
    { id: "mag", title: "MAG box", steps: ["Open Settings and press the SETUP/SET button.", "Choose System Settings, then Servers.", "Choose Servers again.", "Choose Portals.", "Enter the portal name in “Portal 1 Name” and the URL in “Portal 1 URL”.", "Choose OK to save.", "Choose EXIT.", "Restart the device and confirm with OK."], note: "Include the MAC address from the device sticker with your order so we can activate the service remotely." },
    { id: "computer", title: "Windows and Mac", steps: ["Download the IPTV player app we recommend from its official website.", "Install it and open it.", "Add a new user with your provider details.", "Wait for the list to load and choose a channel."] },
  ],
  pl: [
    { id: "smart-tv", title: "Smart TV (Samsung / LG / Android TV)", steps: ["Otwórz sklep z aplikacjami w telewizorze.", "Wyszukaj polecaną przez nas aplikację IPTV i zainstaluj ją.", "Otwórz aplikację i wybierz logowanie danymi dostawcy.", "Wpisz nazwę użytkownika, hasło i adres serwera z wiadomości e-mail.", "Poczekaj na wczytanie listy i wybierz kanał."] },
    { id: "fire-tv", title: "Amazon Fire TV Stick", steps: ["Zainstaluj aplikację Downloader z Amazon Appstore.", "Wejdź w Ustawienia, Moje Fire TV, Opcje programisty i zezwól Downloaderowi na instalację nieznanych aplikacji.", "Otwórz Downloader i wpisz adres lub kod aplikacji, który od nas otrzymasz.", "Zainstaluj aplikację, otwórz ją i zaloguj się.", "Dla bezpieczeństwa wyłącz ponownie zgodę na nieznane aplikacje."], note: "Instaluj aplikacje tylko z adresów, którym ufasz." },
    { id: "android", title: "Telefon lub tablet z Androidem", steps: ["Otwórz Sklep Google Play i wyszukaj polecaną aplikację IPTV.", "Zainstaluj ją i otwórz.", "Wybierz logowanie danymi dostawcy.", "Wpisz nazwę użytkownika, hasło i adres serwera.", "Otwórz listę kanałów i zacznij oglądać."] },
    { id: "ios", title: "iPhone i iPad", steps: ["Otwórz App Store i wyszukaj polecaną aplikację IPTV.", "Zainstaluj ją i otwórz.", "Dodaj nowego użytkownika lub playlistę z danymi dostawcy.", "Poczekaj na wczytanie listy.", "Dotknij kanału, aby zacząć."] },
    { id: "mag", title: "Dekoder MAG", steps: ["Wejdź w Settings i naciśnij przycisk SETUP/SET.", "Wybierz System Settings, a następnie Servers.", "Kliknij ponownie Servers.", "Wybierz opcję Portals.", "Wpisz nazwę portalu w polu „Portal 1 Name” oraz adres URL w polu „Portal 1 URL”.", "Kliknij OK, aby zapisać.", "Kliknij EXIT.", "Uruchom ponownie urządzenie i potwierdź przyciskiem OK."], note: "Do zamówienia dołącz adres MAC z naklejki na urządzeniu, abyśmy mogli aktywować usługę zdalnie." },
    { id: "computer", title: "Windows i Mac", steps: ["Pobierz polecaną przez nas aplikację IPTV z jej oficjalnej strony.", "Zainstaluj ją i otwórz.", "Dodaj nowego użytkownika z danymi dostawcy.", "Poczekaj na wczytanie listy i wybierz kanał."] },
  ],
};
