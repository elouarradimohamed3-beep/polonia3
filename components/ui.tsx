import type { ReactNode } from "react";

export const card = "card";
export const cardHover = "card-hover";

type Tone = "paper" | "white" | "muted" | "dark";
const TONES: Record<Tone, string> = { paper: "bg-background", white: "bg-white", muted: "bg-white/60", dark: "band-dark on-dark" };

export function Section({ children, id, tone = "paper", className = "" }: { children: ReactNode; id?: string; tone?: Tone; className?: string }) {
  return (
    <section id={id} className={`relative ${TONES[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub, align = "center", as: Tag = "h2", onDark = false }: { eyebrow: string; title: ReactNode; sub?: ReactNode; align?: "center" | "left"; as?: "h1" | "h2"; onDark?: boolean }) {
  const center = align === "center";
  return (
    <div className={`mb-12 md:mb-14 ${center ? "text-center" : ""}`}>
      <p className={`eyebrow ${center ? "eyebrow-center" : ""}`}>{eyebrow}</p>
      <Tag className={`font-display mt-4 text-3xl font-bold leading-tight md:text-[2.65rem] ${onDark ? "text-white" : "text-header"}`}>{title}</Tag>
      {sub && <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${onDark ? "text-white/80" : "text-ink-soft"} ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
