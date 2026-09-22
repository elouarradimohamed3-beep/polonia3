import type { Lang } from "@/lib/i18n";

export type LegalDoc = { title: string; description: string; updated: string; intro: string; sections: { h: string; p?: string[]; ul?: string[] }[] };
export type LegalKey = "terms" | "refunds" | "privacy" | "copyright";

/** DRAFTS. Reasonable starting points, not legal advice. Have a lawyer review them and set COMPANY in lib/site.ts before launch. */
export const LEGAL: Record<LegalKey, Record<Lang, LegalDoc>> = {
  terms: {
    en: { title: "IPTV Poland terms of service", description: "The terms for using the IPTV Poland website and service: orders, free trial, acceptable use, availability and liability.", updated: "2026-09-22",
      intro: "These terms govern your use of this website and the IPTV Poland service. By placing an order or using the service you accept them.",
      sections: [
        { h: "1. Definitions", ul: ["Service: access to internet television (IPTV) through compatible apps and devices.", "Customer: a person who orders or tests the service.", "Plan: the chosen period and number of devices that may be used."] },
        { h: "2. Orders and payment", p: ["You order by WhatsApp or e-mail, or by paying with PayPal (including Visa or Mastercard through PayPal). Prices are in euros. We process orders manually and send login details by e-mail, usually within 5 minutes to 6 hours after payment."] },
        { h: "3. Free trial", p: ["On request we provide a free trial so you can check the service on your own device. We may limit trials to prevent misuse."] },
        { h: "4. Account and login details", p: ["Your login details are for you. A plan allows a set number of devices at the same time. Using it beyond the limit may lead to suspension."] },
        { h: "5. Acceptable use", ul: ["Use the service lawfully and for personal viewing.", "Do not redistribute, publicly perform or record content for distribution.", "Do not disrupt the service or try to bypass its protections."] },
        { h: "6. Availability", p: ["We work to keep the service running but cannot guarantee it will never fail. It also depends on your connection, your devices and third parties. Available content depends on your plan and region and may change."] },
        { h: "7. Liability", p: ["To the extent permitted by law we are not liable for indirect or consequential losses. These terms do not limit any rights consumers have under mandatory law."] },
        { h: "8. Refunds", p: ["Refunds are described in the separate refund policy."] },
        { h: "9. Copyright", p: ["We respect intellectual property. We handle notices from rights holders under our copyright policy."] },
        { h: "10. Changes and governing law", p: ["We may change these terms; the date at the top shows the latest version."] },
      ] },
    pl: { title: "Regulamin usługi IPTV Poland", description: "Zasady korzystania ze strony i usługi IPTV Poland: zamówienia, darmowy test, dozwolone użycie, dostępność i odpowiedzialność.", updated: "2026-09-22",
      intro: "Regulamin określa zasady korzystania z tej strony i z usługi IPTV Poland. Składając zamówienie lub korzystając z usługi, akceptujesz jego postanowienia.",
      sections: [
        { h: "1. Definicje", ul: ["Usługa: dostęp do telewizji internetowej (IPTV) przez zgodne aplikacje i urządzenia.", "Klient: osoba, która zamawia lub testuje usługę.", "Plan: wybrany okres i liczba urządzeń, na które przysługuje dostęp."] },
        { h: "2. Zamówienia i płatności", p: ["Zamówienie składasz przez WhatsApp lub e-mail albo płacąc przez PayPal. Ceny podajemy w euro. Dane logowania wysyłamy e-mailem, zwykle w ciągu 5 minut do 6 godzin od płatności."] },
        { h: "3. Darmowy test", p: ["Na prośbę udostępniamy darmowy test, aby sprawdzić działanie usługi na Twoim urządzeniu."] },
        { h: "4. Dane logowania", p: ["Dane logowania są przeznaczone dla Ciebie. Plan pozwala na oglądanie na określonej liczbie urządzeń jednocześnie."] },
        { h: "5. Dozwolone korzystanie", ul: ["Korzystaj z usługi zgodnie z prawem i do użytku osobistego.", "Nie rozpowszechniaj ani nie nagrywaj treści w celu dystrybucji.", "Nie zakłócaj działania usługi."] },
        { h: "6. Dostępność usługi", p: ["Dbamy o ciągłość usługi, lecz nie gwarantujemy jej bezawaryjnego działania. Zakres treści zależy od planu i regionu."] },
        { h: "7. Odpowiedzialność", p: ["W zakresie dozwolonym prawem nie odpowiadamy za szkody pośrednie ani następcze."] },
        { h: "8. Zwroty", p: ["Zasady zwrotów opisuje odrębna polityka zwrotów i anulowania."] },
        { h: "9. Prawa autorskie", p: ["Zgłoszenia właścicieli praw przyjmujemy zgodnie z polityką praw autorskich."] },
        { h: "10. Zmiany", p: ["Możemy zmieniać regulamin. Data na górze wskazuje aktualną wersję."] },
      ] },
  },
  refunds: {
    en: { title: "Refund and cancellation policy", description: "When you can get a refund from IPTV Poland: before activation, within 7 days of activation and how to request one.", updated: "2026-09-22",
      intro: "We want you to be sure the service works on your device. That is why we offer a free trial and a 7-day refund.",
      sections: [
        { h: "1. Before activation", p: ["If we have not yet sent your login details, or you have not used them, you can cancel and receive a full refund."] },
        { h: "2. Refund within 7 days", p: ["If within 7 days of activation the service does not work on your device and our support cannot fix it, we refund the price of your plan."] },
        { h: "3. After 7 days", p: ["After that, refunds apply only where the law requires them."] },
        { h: "4. Right of withdrawal", p: ["Consumers in the EU normally have 14 days to withdraw from a distance contract. For digital services this right ends once the service has started at your express request and you have acknowledged that you lose it."] },
        { h: "5. How to request a refund", ul: ["Write to us by e-mail or WhatsApp with your order details.", "We reply promptly and tell you what we can do.", "Approved refunds go back to the original payment method, normally within 14 days."] },
      ] },
    pl: { title: "Zwroty i anulowanie", description: "Kiedy przysługuje zwrot pieniędzy w IPTV Poland: przed aktywacją, w ciągu 7 dni od aktywacji i jak złożyć wniosek.", updated: "2026-09-22",
      intro: "Chcemy, żebyś miał pewność, że usługa działa na Twoim urządzeniu. Dlatego oferujemy darmowy test i zwrot w ciągu 7 dni.",
      sections: [
        { h: "1. Przed aktywacją", p: ["Jeśli nie wysłaliśmy jeszcze danych logowania lub z nich nie korzystałeś, możesz zrezygnować i otrzymać pełny zwrot."] },
        { h: "2. Zwrot w ciągu 7 dni", p: ["Jeśli w ciągu 7 dni od aktywacji usługa nie działa na Twoim urządzeniu, a nasze wsparcie nie potrafi tego naprawić, zwrócimy zapłaconą cenę planu."] },
        { h: "3. Po 7 dniach", p: ["Po tym czasie zwroty przysługują tylko w przypadkach wymaganych prawem."] },
        { h: "4. Prawo odstąpienia", p: ["Konsumenci w UE zwykle mają 14 dni na odstąpienie od umowy zawartej na odległość. W przypadku usług cyfrowych prawo to wygasa, gdy usługa została rozpoczęta na Twoje wyraźne żądanie."] },
        { h: "5. Jak poprosić o zwrot", ul: ["Napisz do nas e-mailem lub przez WhatsApp, podając dane zamówienia.", "Odpowiadamy niezwłocznie.", "Zaakceptowane zwroty wracają na pierwotną metodę płatności, zwykle w ciągu 14 dni."] },
      ] },
  },
  privacy: {
    en: { title: "Privacy policy", description: "How IPTV Poland collects and uses personal data: what we collect, why, who receives it, how long we keep it and your rights.", updated: "2026-09-22",
      intro: "We collect as little data as we can.",
      sections: [
        { h: "1. Controller", p: ["The data controller is IPTV Poland. Contact details are at the end of this page."] },
        { h: "2. What we collect", ul: ["E-mail address and device type when you request a free trial.", "Order details and message content when you order or write to us.", "Technical data your browser sends to the hosting provider."] },
        { h: "3. Purposes and legal bases", ul: ["Arranging your trial: your consent.", "Processing orders: performing a contract.", "Website security: our legitimate interest.", "Legal obligations, for example accounting."] },
        { h: "4. Recipients", p: ["We use providers that process data on our behalf: website hosting, e-mail delivery, messaging and payment providers. Some are outside the EU and rely on approved safeguards."] },
        { h: "5. Retention", p: ["We keep data only as long as needed for the purpose it was collected for."] },
        { h: "6. Your rights", ul: ["Access, correct or delete your data.", "Restrict processing or object.", "Data portability.", "Withdraw consent at any time.", "Complain to your data protection authority."] },
        { h: "7. Cookies", p: ["We do not use advertising cookies. The website stores one small preference in your browser."] },
      ] },
    pl: { title: "Polityka prywatności", description: "Jak IPTV Poland zbiera i wykorzystuje dane osobowe: co zbieramy, po co, kto je otrzymuje, jak długo je przechowujemy i jakie masz prawa.", updated: "2026-09-22",
      intro: "Zbieramy jak najmniej danych.",
      sections: [
        { h: "1. Administrator", p: ["Administratorem danych jest IPTV Poland. Dane kontaktowe podajemy na końcu strony."] },
        { h: "2. Co zbieramy", ul: ["Adres e-mail i typ urządzenia, gdy prosisz o darmowy test.", "Dane zamówienia i wiadomości.", "Dane techniczne wysyłane przez przeglądarkę do dostawcy hostingu."] },
        { h: "3. Cele i podstawy", ul: ["Przygotowanie testu: Twoja zgoda.", "Realizacja zamówień: wykonanie umowy.", "Bezpieczeństwo strony: nasz prawnie uzasadniony interes.", "Obowiązki prawne."] },
        { h: "4. Odbiorcy danych", p: ["Korzystamy z dostawców przetwarzających dane w naszym imieniu: hosting, e-mail, komunikatory i operatorzy płatności. Część działa poza UE."] },
        { h: "5. Czas przechowywania", p: ["Dane przechowujemy tak długo, jak potrzeba do celu, w którym je zebraliśmy."] },
        { h: "6. Twoje prawa", ul: ["Dostęp, poprawianie i usunięcie danych.", "Ograniczenie przetwarzania i sprzeciw.", "Przenoszenie danych.", "Wycofanie zgody.", "Skarga do organu ochrony danych."] },
        { h: "7. Pliki cookie", p: ["Nie używamy reklamowych plików cookie."] },
      ] },
  },
  copyright: {
    en: { title: "Copyright and takedown policy", description: "How rights holders can report content to IPTV Poland, what a notice should contain and how we handle notices and counter-notices.", updated: "2026-09-22",
      intro: "We respect intellectual property rights. If you believe content available through our service infringes your rights, please write to us.",
      sections: [
        { h: "1. Sending a notice", p: ["Send a message to the e-mail address below containing:"], ul: ["Your name, company and contact details.", "A description of the work you say is infringed.", "Information that lets us find the material.", "A statement of good faith that the use is not authorised.", "A statement that the notice is accurate and you are authorised to act.", "Your signature."] },
        { h: "2. What we do", p: ["We review notices promptly. Where a notice is valid we remove or disable access to the material."] },
        { h: "3. Counter-notice", p: ["If material was removed by mistake, write to us with details and we will review it."] },
        { h: "4. Repeat infringement", p: ["We may suspend or terminate accounts that repeatedly infringe the rights of others."] },
        { h: "5. Accuracy", p: ["Please send only accurate notices. Knowingly false claims can have legal consequences."] },
      ] },
    pl: { title: "Prawa autorskie i zgłaszanie naruszeń", description: "Jak właściciele praw mogą zgłaszać treści do IPTV Poland, co powinno zawierać zgłoszenie i jak rozpatrujemy zgłoszenia.", updated: "2026-09-22",
      intro: "Szanujemy prawa własności intelektualnej. Jeśli uważasz, że treści dostępne w naszej usłudze naruszają Twoje prawa, napisz do nas.",
      sections: [
        { h: "1. Zgłoszenie", p: ["Wyślij wiadomość na adres e-mail poniżej, zawierającą:"], ul: ["Imię i nazwisko, firmę i dane kontaktowe.", "Opis utworu, którego prawa naruszono.", "Informacje pozwalające znaleźć materiał.", "Oświadczenie w dobrej wierze o braku zgody.", "Oświadczenie o prawdziwości zgłoszenia i upoważnieniu.", "Podpis."] },
        { h: "2. Nasze działania", p: ["Zgłoszenia rozpatrujemy niezwłocznie. Gdy zgłoszenie jest zasadne, usuwamy materiał lub blokujemy do niego dostęp."] },
        { h: "3. Sprzeciw", p: ["Jeśli materiał usunięto przez pomyłkę, napisz do nas, a rozpatrzymy sprawę."] },
        { h: "4. Powtarzające się naruszenia", p: ["Możemy zawiesić lub zamknąć konta, które wielokrotnie naruszają prawa innych osób."] },
        { h: "5. Rzetelność", p: ["Prosimy o wysyłanie wyłącznie prawdziwych zgłoszeń."] },
      ] },
  },
};
