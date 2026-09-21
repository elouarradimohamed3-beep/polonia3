import { useId } from "react";

/** The IPTV Polska mark: a blue play tile with a gold broadcast signal. */
export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 52 52"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="2" y1="10" x2="42" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <rect x="2" y="10" width="40" height="40" rx="12" fill={`url(#${gradientId})`} />
      <path d="M17 21 L32 30 L17 39 Z" fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="40" cy="12" r="2.6" fill="#d9ac4f" />
      <path d="M40 6.4 A5.6 5.6 0 0 1 45.6 12" fill="none" stroke="#d9ac4f" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M40 2 A10 10 0 0 1 50 12" fill="none" stroke="#d9ac4f" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** Mark plus wordmark. Text uses the site font so it always matches. */
export function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.65rem] font-extrabold tracking-tight text-white">IPTV</span>{" "}
        <span className="mt-1.5 text-[0.68rem] font-bold tracking-[0.46em] text-accent">POLSKA</span>
      </span>
    </span>
  );
}
