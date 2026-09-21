import type { Lang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const copy = {
  pl: { label: "Napisz do nas na WhatsApp", msg: "Cześć! Mam pytanie o IPTV Polonia." },
  en: { label: "Chat with us on WhatsApp", msg: "Hello! I have a question about IPTV Polonia." },
} as const;

export function WhatsAppFloat({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <a href={whatsappLink(t.msg)} target="_blank" rel="noopener noreferrer" aria-label={t.label} className="wa-float fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-transform hover:scale-110">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
    </a>
  );
}
