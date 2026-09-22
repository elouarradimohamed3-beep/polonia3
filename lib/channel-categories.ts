import type { Lang } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, Clapperboard, Newspaper, Trophy, Tv, Users } from "lucide-react";

export type ChannelCategory = { icon: LucideIcon; title: string; text: string };

/** Category descriptions only, no channel counts or names claimed. Availability depends on plan and region. */
export const CHANNEL_CATEGORIES: Record<Lang, ChannelCategory[]> = {
  en: [
    { icon: Tv, title: "Live Polish television", text: "Live channels you watch as they air, the same as switching on a TV at home." },
    { icon: Clapperboard, title: "On-demand library", text: "Films and series to start whenever suits you, instead of waiting for a broadcast." },
    { icon: Trophy, title: "Sport", text: "Live sport and events where they are part of your plan." },
    { icon: Newspaper, title: "News and regional", text: "News and regional programmes in Polish." },
    { icon: Users, title: "Family and children", text: "Family viewing, with parental controls in supported apps." },
    { icon: CalendarClock, title: "TV guide (EPG)", text: "See what is on now and what is coming up, in supported apps." },
  ],
  pl: [
    { icon: Tv, title: "Polska telewizja na żywo", text: "Kanały na żywo, oglądane w trakcie emisji, tak jak w domu." },
    { icon: Clapperboard, title: "Biblioteka na żądanie", text: "Filmy i seriale do włączenia, kiedy Ci pasuje, bez czekania na emisję." },
    { icon: Trophy, title: "Sport", text: "Sport i wydarzenia na żywo, jeśli są częścią Twojego planu." },
    { icon: Newspaper, title: "Wiadomości i regionalne", text: "Wiadomości i programy regionalne po polsku." },
    { icon: Users, title: "Rodzina i dzieci", text: "Oglądanie w rodzinie, z kontrolą rodzicielską w obsługiwanych aplikacjach." },
    { icon: CalendarClock, title: "Program TV (EPG)", text: "Zobacz, co jest teraz i co będzie dalej, w obsługiwanych aplikacjach." },
  ],
};
