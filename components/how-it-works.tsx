import { Section, SectionHeading } from "@/components/ui";
import type { Lang } from "@/lib/i18n";

const copy = { en: { eyebrow: "How it works", title: "From order to your first channel in four steps", steps: [["Choose a plan", "Pick the period and how many devices should work at the same time."], ["Order", "Pay with PayPal or a card, or message us on WhatsApp."], ["Get your details", "After the payment is verified you receive an e-mail with your login details."], ["Install and watch", "Follow the guide for your device and switch on the television."]] }, pl: { eyebrow: "Jak to działa", title: "Od zamówienia do pierwszego kanału w czterech krokach", steps: [["Wybierz plan", "Wskaż okres i liczbę urządzeń, które mają działać jednocześnie."], ["Zamów", "Zapłać przez PayPal lub kartą albo napisz do nas na WhatsApp."], ["Odbierz dane", "Po weryfikacji płatności dostaniesz e-mail z danymi logowania."], ["Zainstaluj i oglądaj", "Skorzystaj z instrukcji dla swojego urządzenia i włącz telewizję."]] } } as const;

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Section tone="white">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <ol className="grid gap-x-8 gap-y-10 md:grid-cols-4">
        {t.steps.map(([title, text], i) => (
          <li key={title} className="relative border-t-2 border-header pt-5">
            <span aria-hidden="true" data-n={String(i + 1).padStart(2, "0")} className="numeral" />
            <h3 className="font-display mt-3 text-xl font-bold text-header">{title}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
