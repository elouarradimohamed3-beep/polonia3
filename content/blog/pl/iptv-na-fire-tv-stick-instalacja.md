---
title: "IPTV na Fire TV Stick: instalacja aplikacji krok po kroku"
description: "Jak zainstalować aplikację IPTV na Fire TV Stick: włączenie instalacji z nieznanych źródeł, aplikacja Downloader, logowanie danymi i rozwiązywanie problemów."
date: "2026-09-21"
translationKey: "firetv"
tags: ["poradnik", "Fire TV Stick"]
---

Fire TV Stick to jedno z najprostszych urządzeń do oglądania telewizji przez internet. Kosztuje niewiele, podłącza się do portu HDMI w telewizorze i działa na Wi-Fi. W tym poradniku pokazujemy, jak zainstalować aplikację IPTV od zera, bez technika i bez komputera. Cały proces zajmuje zwykle około dziesięciu minut.

## Co będzie potrzebne

Zanim zaczniesz, przygotuj cztery rzeczy:

- Fire TV Stick podłączony do telewizora i do internetu.
- Konto Amazon zalogowane na urządzeniu, żeby pobrać aplikację z oficjalnego sklepu.
- Dane logowania do usługi IPTV, które dostajesz e-mailem: nazwę użytkownika, hasło i adres serwera.
- Około 200 MB wolnego miejsca w pamięci urządzenia.

Jeśli nie masz jeszcze danych logowania, możesz poprosić o [darmowy test na stronie głównej](/#trial).

## Krok 1: zainstaluj aplikację Downloader

Większość aplikacji IPTV nie znajduje się w sklepie Amazon, dlatego potrzebujesz narzędzia, które pobiera pliki z adresu internetowego.

1. Na ekranie głównym wybierz ikonę lupy.
2. Wpisz słowo **Downloader**.
3. Wybierz aplikację Downloader i kliknij **Pobierz** lub **Zainstaluj**.

Poczekaj, aż instalacja się skończy, ale jeszcze jej nie otwieraj.

## Krok 2: zezwól na instalację z nieznanych źródeł

Fire TV domyślnie blokuje aplikacje spoza sklepu Amazon. Trzeba to zmienić tylko dla aplikacji Downloader.

1. Wejdź w **Ustawienia**, potem **Moje Fire TV**.
2. Wybierz **Opcje programisty**.
3. Kliknij **Instaluj nieznane aplikacje** i przy aplikacji Downloader ustaw **Włączone**.

Nie widzisz opcji programisty? Wejdź w **Ustawienia**, **Moje Fire TV**, **Informacje** i kliknij siedem razy nazwę urządzenia. Opcje programisty pojawią się w menu. W nowszych wersjach systemu ustawienie znajduje się też pod nazwą **Instaluj nieznane aplikacje** w głównym menu Moje Fire TV.

## Krok 3: pobierz aplikację IPTV

1. Otwórz aplikację Downloader i zezwól jej na dostęp do plików.
2. W polu adresu wpisz kod lub adres aplikacji IPTV, który podaje dostawca usługi. Aktualny kod znajdziesz w naszym [przewodniku instalacji](/przewodnik-instalacji).
3. Kliknij **Przejdź**. Plik pobierze się automatycznie.
4. Gdy pojawi się okno instalacji, wybierz **Zainstaluj**, a po zakończeniu **Gotowe**.

Downloader zapyta, czy usunąć plik instalacyjny. Wybierz **Usuń**, aby odzyskać miejsce w pamięci.

## Krok 4: zaloguj się do usługi

Otwórz zainstalowaną aplikację. Wybierz opcję logowania danymi, zwykle nazwaną **Xtream Codes** albo **Login with Xtream Codes API**, i wpisz:

- **Nazwę:** dowolną, na przykład Salon.
- **Nazwę użytkownika i hasło:** dokładnie tak, jak w wiadomości e-mail.
- **Adres serwera:** cały adres z wiadomości, razem z początkiem `http://` lub `https://`.

Zatwierdź i poczekaj, aż aplikacja wczyta listę kanałów. Za pierwszym razem może to potrwać kilkadziesiąt sekund.

## Krok 5: wyłącz zezwolenie na nieznane źródła

Gdy wszystko działa, wróć do **Opcji programisty** i wyłącz **Instaluj nieznane aplikacje** dla aplikacji Downloader. To dodatkowe zabezpieczenie przed przypadkową instalacją innych plików.

## Najczęstsze problemy

**Nie można zainstalować aplikacji.** Sprawdź wolne miejsce w pamięci. Zwolnij je, odinstalowując nieużywane aplikacje w **Ustawienia**, **Aplikacje**, **Zarządzaj zainstalowanymi aplikacjami**.

**Logowanie nie działa.** Najczęściej winne są literówki. Sprawdź, czy przy kopiowaniu nie dodałeś spacji na początku lub na końcu i czy nazwa użytkownika oraz hasło zgadzają się co do wielkości liter.

**Lista kanałów się nie ładuje.** Sprawdź połączenie z internetem w **Ustawienia**, **Sieć**. Jeśli sygnał Wi-Fi jest słaby, przysuń router albo użyj przejściówki Ethernet.

**Obraz się zacina.** To zwykle kwestia łącza lub sieci Wi-Fi. Zobacz nasz poradnik [IPTV się zacina: 9 sposobów na buforowanie](/blog/iptv-sie-zacina-buforowanie-przyczyny-i-rozwiazania).

## Bezpieczeństwo

Instaluj tylko aplikacje z adresów, które podaje Twój dostawca, i sprawdzaj adres, zanim go zatwierdzisz. Nigdy nie wpisuj danych logowania do usługi IPTV w aplikacjach, o których nic nie wiesz.

## Podsumowanie

Instalacja na Fire TV Stick to pięć kroków: Downloader, zgoda na instalację, pobranie aplikacji, logowanie i wyłączenie zgody. Jeśli utkniesz na którymś etapie, [napisz do naszego wsparcia](/skontaktuj-sie-z-nami). Odpowiadamy 24 godziny na dobę.
