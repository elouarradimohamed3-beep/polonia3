import Link from "next/link";
import { Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { blogPath, path } from "@/lib/routes";
import { whatsappLink } from "@/lib/site";

type Item = { q: string; a: string; link?: { label: string; href: string } };

const copy: Record<Lang, { eyebrow: string; title: string; more: string; ask: string; msg: string; items: Item[] }> = {
  pl: {
    eyebrow: "FAQ", title: "IPTV Polonia: najczęstsze pytania", more: "Nie znalazłeś odpowiedzi? Napisz do nas, odpowiadamy po polsku i angielsku.", ask: "Napisz na WhatsApp", msg: "Cześć! Mam pytanie o IPTV Polonia.",
    items: [
      { q: "Czym jest IPTV Polonia?", a: "IPTV Polonia to polska telewizja przez internet. Zamiast anteny czy kabla program dociera do Ciebie przez łącze internetowe i oglądasz go w aplikacji na Smart TV, telefonie, tablecie lub komputerze. Usługa bywa też wyszukiwana jako IPTV Polska.", link: { label: "Przewodnik: polska telewizja za granicą", href: blogPath("pl", "iptv-polonia-polska-telewizja-za-granica") } },
      { q: "Dla kogo jest IPTV Polonia?", a: "Dla Polonii, czyli Polaków mieszkających za granicą, oraz dla mieszkańców Polski, którzy szukają nowoczesnej alternatywy dla kablówki. Wystarczy zgodne urządzenie i dobry internet." },
      { q: "Co jest potrzebne, żeby zacząć?", a: "Zgodne urządzenie, stabilny internet i abonament. Po zamówieniu dostajesz dane logowania e-mailem i instalujesz aplikację według naszej instrukcji." },
      { q: "Na jakich urządzeniach mogę oglądać?", a: "Na telewizorach Smart TV (Samsung, LG i Android TV), Fire TV Stick, telefonach i tabletach z Androidem, iPhone i iPad, dekoderach MAG, komputerach z Windows i Mac oraz odbiornikach Enigma 2.", link: { label: "Instrukcja instalacji", href: path("pl", "guide") } },
      { q: "Ile urządzeń może działać jednocześnie?", a: "To zależy od planu. Plany obejmują od 1 do 5 urządzeń jednocześnie. Przy większej liczbie napisz do nas, a przygotujemy ofertę." },
      { q: "Jak zamówić i zapłacić?", a: "Wybierz plan i złóż zamówienie przez WhatsApp albo zapłać przez PayPal. Akceptujemy PayPal oraz karty Visa i Mastercard przez PayPal." },
      { q: "Kiedy dostanę dane logowania?", a: "Zamówienia przetwarzamy ręcznie ze względów bezpieczeństwa. Dane wysyłamy e-mailem zwykle w ciągu 5 minut do 6 godzin od płatności. Jeśli nic nie dotrze, sprawdź folder ze spamem lub napisz do nas." },
      { q: "Czy mogę wypróbować przed zakupem?", a: "Tak. Poproś o darmowy test przez formularz na stronie głównej i sprawdź usługę na własnym urządzeniu." },
      { q: "Jakiego internetu potrzebuję?", a: "Orientacyjnie około 8 do 10 Mb/s na urządzenie dla HD i około 25 Mb/s dla 4K, tam gdzie jest dostępne. W poradniku znajdziesz dokładniejsze liczby i prosty sposób na sprawdzenie łącza.", link: { label: "Jaka prędkość internetu do IPTV", href: blogPath("pl", "jaka-predkosc-internetu-do-iptv") } },
      { q: "Czy IPTV jest legalne?", a: "IPTV to legalna technologia. Liczy się to, czy usługa ma prawa do oferowanych kanałów i programów. Na stronie o prawach autorskich opisujemy, jak właściciele praw mogą się z nami skontaktować.", link: { label: "Prawa autorskie", href: path("pl", "copyright") } },
      { q: "Jak działa zwrot pieniędzy?", a: "Zwrot jest możliwy przed aktywacją oraz w ciągu 7 dni, jeśli usługa nie działa na Twoim urządzeniu, a wsparcie nie potrafi tego naprawić. Szczegóły znajdziesz w zasadach zwrotów.", link: { label: "Zasady zwrotów", href: path("pl", "refunds") } },
      { q: "Czy mogę zostać resellerem?", a: "Tak. Mamy program resellerski z własnym panelem i pakietami kredytów. Napisz do nas na WhatsApp lub zobacz stronę programu.", link: { label: "Program resellerski", href: path("pl", "reseller") } },
    ],
  },
  en: {
    eyebrow: "FAQ", title: "IPTV Polonia: frequently asked questions", more: "Did not find your answer? Message us, we reply in Polish and English.", ask: "Message us on WhatsApp", msg: "Hello! I have a question about IPTV Polonia.",
    items: [
      { q: "What is IPTV Polonia?", a: "IPTV Polonia is Polish television over the internet. Instead of an aerial or a cable, the programme reaches you through your internet connection and you watch it in an app on a smart TV, phone, tablet or computer. It is also often searched for as IPTV Polska.", link: { label: "Guide: Polish TV abroad", href: blogPath("en", "iptv-polonia-polish-tv-abroad") } },
      { q: "Who is IPTV Polonia for?", a: "For Polonia, meaning Poles living abroad, and for people in Poland who want a modern alternative to cable. You only need a compatible device and a good internet connection." },
      { q: "What do I need to get started?", a: "A compatible device, a stable internet connection and a subscription. After your order you receive login details by e-mail and install an app with our guide." },
      { q: "Which devices can I use?", a: "Smart TVs (Samsung, LG and Android TV), Fire TV Stick, Android phones and tablets, iPhone and iPad, MAG boxes, Windows and Mac computers and Enigma 2 receivers.", link: { label: "Setup guide", href: path("en", "guide") } },
      { q: "How many devices can watch at the same time?", a: "It depends on your plan. Plans cover 1 to 5 devices at the same time. For more, message us and we will prepare an offer." },
      { q: "How do I order and pay?", a: "Choose a plan and order by WhatsApp, or pay with PayPal. We accept PayPal, plus Visa and Mastercard through PayPal." },
      { q: "When do I get my login details?", a: "We process orders manually for security. We send the details by e-mail, usually within 5 minutes to 6 hours after payment. If nothing arrives, check your spam folder or message us." },
      { q: "Can I try before I buy?", a: "Yes. Request a free trial with the form on the home page and check the service on your own device." },
      { q: "What internet speed do I need?", a: "As a rule of thumb, about 8 to 10 Mb/s per device for HD and about 25 Mb/s for 4K where available. Our guide has the details and a simple way to test your connection.", link: { label: "Internet speed for IPTV", href: blogPath("en", "internet-speed-for-iptv") } },
      { q: "Is IPTV legal?", a: "IPTV is a legal technology. What matters is whether a service holds the rights to the channels and programmes it offers. Our copyright page explains how rights holders can contact us.", link: { label: "Copyright policy", href: path("en", "copyright") } },
      { q: "How does the refund work?", a: "A refund is possible before activation and within 7 days if the service does not work on your device and support cannot fix it. See the refund policy for details.", link: { label: "Refund policy", href: path("en", "refunds") } },
      { q: "Can I become a reseller?", a: "Yes. We have a reseller program with your own panel and credit packages. Message us on WhatsApp or see the program page.", link: { label: "Reseller program", href: path("en", "reseller") } },
    ],
  },
};

export function Faq({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const jsonLd = { "@type": "FAQPage", inLanguage: lang, mainEntity: t.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
  return (
    <Section id="faq" tone="white">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="mx-auto max-w-3xl space-y-3">
        {t.items.map((item) => (
          <details key={item.q} className={`${card} group open:border-brand/40`}>
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-header">
              <span>{item.q}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-brand"><Plus size={18} className="faq-icon transition-transform" aria-hidden="true" /></span>
            </summary>
            <div className="px-5 pb-5 leading-relaxed text-ink-soft">
              <p>{item.a}</p>
              {item.link && (<p className="mt-3"><Link href={item.link.href} className="font-bold text-brand underline underline-offset-2">{item.link.label}</Link></p>)}
            </div>
          </details>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-ink-soft">{t.more}</p>
        <a href={whatsappLink(t.msg)} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-5">{t.ask}</a>
      </div>
      <JsonLd data={jsonLd} />
    </Section>
  );
}
