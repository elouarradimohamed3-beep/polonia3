import { useId } from "react";

/** IPTV Polonia mark: a "P" built from a stem and a play triangle. */
export function LogoMark({ size = 40, className = "", onDark = false }: { size?: number; className?: string; onDark?: boolean }) {
  const clip = useId();
  const stem = onDark ? "#ffffff" : "#0d1f3c";
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <rect x="0" y="0" width="48" height="48" rx="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="48" height="48" fill={onDark ? "#15305a" : "#faf7f2"} />
        <rect x="0" y="0" width="48" height="48" fill="none" stroke={onDark ? "#ffffff33" : "#e4ddd0"} strokeWidth="2" rx="12" />
      </g>
      <rect x="12" y="9" width="8" height="30" rx="2.5" fill={stem} />
      <path d="M23 11 L38 22 L23 33 Z" fill="#c8102e" stroke="#c8102e" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Mark plus wordmark. Text is real text so it always matches the site fonts. */
export function Logo({ size = 40, onDark = false, className = "" }: { size?: number; onDark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} onDark={onDark} />
      <span className="flex flex-col leading-none">
        <span className={`text-[0.66rem] font-extrabold tracking-[0.42em] ${onDark ? "text-accent" : "text-brand"}`}>IPTV</span>{" "}
        <span className={`font-display mt-1 text-[1.5rem] font-bold ${onDark ? "text-white" : "text-header"}`}>Polonia</span>
      </span>
    </span>
  );
}
