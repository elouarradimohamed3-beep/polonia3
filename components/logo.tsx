import { useId } from "react";

/** IPTV Poland mark: a rounded tile with a signal tower broadcasting three amber waves. */
export function LogoMark({ size = 40, className = "", onDark = false }: { size?: number; className?: string; onDark?: boolean }) {
  const g = useId();
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#14958a" />
          <stop offset="1" stopColor="#0b5c56" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill={onDark ? "#0f3730" : `url(#${g})`} />
      <path d="M24 40 V22" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M18 22 L24 12 L30 22 Z" fill="#fff" />
      <path d="M14 17 A16 16 0 0 1 34 17" fill="none" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 21 A22 22 0 0 1 39 21" fill="none" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** Mark plus wordmark. Real text, so it always matches the site font. */
export function Logo({ size = 40, onDark = false, className = "" }: { size?: number; onDark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} onDark={onDark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-bold ${onDark ? "text-white" : "text-header"}`}>IPTV</span>{" "}
        <span className={`mt-0.5 text-[0.64rem] font-extrabold tracking-[0.38em] ${onDark ? "text-accent" : "text-brand"}`}>POLAND</span>
      </span>
    </span>
  );
}
