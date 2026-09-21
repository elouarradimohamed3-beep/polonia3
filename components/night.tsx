import type { ReactNode } from "react";

/** Frosted-glass surface used on the dark home page. */
export const glass = "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm";
export const glassHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.07]";

export function NightSection({
  children,
  id,
  band = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  band?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative ${band ? "border-y border-white/5 bg-white/[0.02]" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">{children}</div>
    </section>
  );
}

export function NightHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  /** Use "h1" on pages where this is the main heading. */
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <p className={`eyebrow ${center ? "eyebrow-center" : ""}`}>{eyebrow}</p>
      <Tag className="text-gradient mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{title}</Tag>
      {sub && <p className={`mt-4 max-w-2xl text-lg text-slate-400 ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
