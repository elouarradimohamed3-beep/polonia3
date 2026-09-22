import { useId } from "react";

/**
 * Original animated hero art: a broadcast tower sending signal to a wall of channel tiles.
 * Pure SVG + CSS animation, no images. Motion respects prefers-reduced-motion.
 */
const TILES = [
  { x: 40, y: 70, w: 74, h: 54, c: "#0f766e" },
  { x: 122, y: 40, w: 60, h: 44, c: "#f5a623" },
  { x: 40, y: 132, w: 60, h: 60, c: "#14958a" },
  { x: 108, y: 92, w: 74, h: 46, c: "#0b5c56" },
  { x: 108, y: 146, w: 58, h: 46, c: "#d98c0e" },
  { x: 400, y: 56, w: 66, h: 50, c: "#14958a" },
  { x: 474, y: 40, w: 60, h: 44, c: "#0f766e" },
  { x: 400, y: 114, w: 60, h: 60, c: "#f5a623" },
  { x: 468, y: 92, w: 74, h: 46, c: "#0b5c56" },
  { x: 468, y: 146, w: 58, h: 46, c: "#14958a" },
];

export function HeroBroadcast({ label }: { label: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `${n}-${uid}`;

  return (
    <svg viewBox="0 0 600 420" role="img" aria-label={label} className="broadcast mx-auto block h-auto w-full max-w-[36rem]">
      <defs>
        <radialGradient id={id("ring")}><stop offset="0" stopColor="#f5a623" stopOpacity="0.5" /><stop offset="1" stopColor="#f5a623" stopOpacity="0" /></radialGradient>
        <linearGradient id={id("tower")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e7f5f2" /><stop offset="1" stopColor="#b7d9d3" /></linearGradient>
      </defs>

      {/* Signal rings */}
      <g className="broadcast-ring" style={{ animationDelay: "0s" }}><circle cx="300" cy="150" r="60" fill="none" stroke="#f5a623" strokeWidth="2" opacity="0.7" /></g>
      <g className="broadcast-ring" style={{ animationDelay: "1.1s" }}><circle cx="300" cy="150" r="60" fill="none" stroke="#f5a623" strokeWidth="2" opacity="0.7" /></g>
      <g className="broadcast-ring" style={{ animationDelay: "2.2s" }}><circle cx="300" cy="150" r="60" fill="none" stroke="#f5a623" strokeWidth="2" opacity="0.7" /></g>

      {/* Tower */}
      <g>
        <path d="M300 60 L330 230 L270 230 Z" fill="none" stroke="url(#tower-fill)" strokeWidth="0" />
        <path d="M300 60 L330 230 M300 60 L270 230 M283 130 L317 130 M277 165 L323 165 M272 198 L328 198" stroke="#0f3730" strokeWidth="3" strokeLinecap="round" />
        <circle cx="300" cy="52" r="7" fill="#f5a623" className="broadcast-blink" />
        <rect x="286" y="230" width="28" height="10" rx="2" fill="#0f3730" />
      </g>

      {/* Connection lines to tiles */}
      {TILES.map((t, i) => (
        <line key={i} x1="300" y1="150" x2={t.x + t.w / 2} y2={t.y + t.h / 2} stroke="#0f766e" strokeOpacity="0.15" strokeDasharray="3 6" />
      ))}

      {/* Channel tiles */}
      {TILES.map((t, i) => (
        <g key={i} className="broadcast-tile" style={{ animationDelay: `${(i % 6) * 0.35}s` }}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="8" fill={t.c} opacity="0.92" />
          <rect x={t.x + 8} y={t.y + t.h - 14} width={t.w * 0.5} height="5" rx="2.5" fill="#fff" opacity="0.55" />
          {i % 3 === 0 && (
            <g transform={`translate(${t.x + t.w / 2} ${t.y + t.h / 2 - 6})`}>
              <circle r="11" fill="#fff" opacity="0.9" />
              <path d="M-3 -5 L6 0 L-3 5 Z" fill={t.c} />
            </g>
          )}
        </g>
      ))}

      {/* Base signal wave */}
      <g className="broadcast-wave">
        <path d="M20 330 Q 90 300 160 330 T 300 330 T 440 330 T 580 330" fill="none" stroke="#0f766e" strokeOpacity="0.25" strokeWidth="4" />
        <path d="M20 360 Q 90 335 160 360 T 300 360 T 440 360 T 580 360" fill="none" stroke="#f5a623" strokeOpacity="0.3" strokeWidth="4" />
      </g>
    </svg>
  );
}
