import { useId } from "react";

/**
 * Original, animated hero art: a round collage of four scenes (football under floodlights,
 * a living-room TV, the Baltic coast, cinema popcorn) around an "IPTV Polonia" badge.
 * Pure SVG + CSS animation, no images. Motion is switched off for visitors who prefer reduced motion.
 */
// Fluffy popcorn: each piece is a small cluster of circles. Positions are deterministic (no hydration mismatch).
const POP = Array.from({ length: 30 }, (_, i) => ({
  x: 384 + ((i * 47) % 132),
  y: 392 + ((i * 29) % 62),
  r: 10 + ((i * 5) % 6),
  d: (i % 8) * 0.4,
}));

const STRIPES = Array.from({ length: 7 }, (_, i) => {
  const top = (n: number) => 350 + n * 20;
  const bot = (n: number) => 372 + n * 14.29;
  return `${top(i)},452 ${top(i + 1)},452 ${bot(i + 1)},532 ${bot(i)},532`;
});

const HOUSES = [
  { x: 358, w: 24, h: 52, c: "#e9a58f", r: "#8d3b32" },
  { x: 384, w: 20, h: 44, c: "#f1d28a", r: "#9a5b2b" },
  { x: 406, w: 26, h: 58, c: "#8fc1c9", r: "#33606b" },
  { x: 434, w: 22, h: 46, c: "#e7b6c7", r: "#8a3f5e" },
  { x: 458, w: 26, h: 54, c: "#f0c48d", r: "#8d4a26" },
  { x: 486, w: 22, h: 42, c: "#a9c9a0", r: "#3f6b45" },
  { x: 510, w: 26, h: 56, c: "#e9a58f", r: "#8d3b32" },
];

export function HeroCollage({ label, badge }: { label: string; badge: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const url = (n: string) => `url(#${id(n)})`;

  return (
    <svg viewBox="0 0 600 600" role="img" aria-label={label} className="collage mx-auto block h-auto w-full max-w-[34rem] drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
      <defs>
        <clipPath id={id("circle")}><circle cx="300" cy="300" r="290" /></clipPath>
        <clipPath id={id("tl")}><rect x="10" y="10" width="288" height="288" /></clipPath>
        <clipPath id={id("tr")}><rect x="302" y="10" width="288" height="288" /></clipPath>
        <clipPath id={id("bl")}><rect x="10" y="302" width="288" height="288" /></clipPath>
        <clipPath id={id("br")}><rect x="302" y="302" width="288" height="288" /></clipPath>
        <linearGradient id={id("dusk")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16244f" /><stop offset="0.55" stopColor="#7a4a78" /><stop offset="1" stopColor="#f3a15f" /></linearGradient>
        <linearGradient id={id("pitch")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e7d3a" /><stop offset="1" stopColor="#34b45a" /></linearGradient>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3e9dc" /><stop offset="1" stopColor="#d8c4aa" /></linearGradient>
        <linearGradient id={id("screen")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6cb4ea" /><stop offset="1" stopColor="#f5dcae" /></linearGradient>
        <linearGradient id={id("sunset")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#47528a" /><stop offset="0.5" stopColor="#d2708a" /><stop offset="1" stopColor="#f7b46b" /></linearGradient>
        <linearGradient id={id("sea")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b7da0" /><stop offset="1" stopColor="#0d3a5c" /></linearGradient>
        <linearGradient id={id("cinema")} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1850" /><stop offset="1" stopColor="#6b34a0" /></linearGradient>
        <radialGradient id={id("glow")}><stop offset="0" stopColor="#fff7c9" stopOpacity="0.95" /><stop offset="1" stopColor="#fff7c9" stopOpacity="0" /></radialGradient>
      </defs>

      <circle cx="300" cy="300" r="296" fill="#fff" />
      <g clipPath={url("circle")}>
        {/* ---------- Top left: football under floodlights ---------- */}
        <g clipPath={url("tl")}>
          <g className="collage-zoom">
            <rect x="10" y="10" width="288" height="288" fill={url("dusk")} />
            <path d="M10 150 L60 118 L250 118 L298 150 L298 298 L10 298 Z" fill="#0f1a33" />
            {Array.from({ length: 26 }, (_, i) => (
              <circle key={i} cx={30 + ((i * 41) % 250)} cy={128 + ((i * 17) % 34)} r="1.8" fill="#ffe9a8" className="collage-twinkle" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
            ))}
            <path d="M20 298 L92 176 L216 176 L288 298 Z" fill={url("pitch")} />
            <path d="M92 176 L216 176 M56 236 L252 236" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
            <rect x="130" y="176" width="48" height="16" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
            {[70, 150, 232].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy="86" r="34" fill={url("glow")} className="collage-twinkle" style={{ animationDelay: `${i * 0.6}s` }} />
                <rect x={x - 12} y="80" width="24" height="12" rx="2" fill="#f8f4d8" />
              </g>
            ))}
            <path d="M10 298 C40 262 60 282 90 262 C120 286 150 258 190 280 C220 262 260 282 298 264 L298 298 Z" fill="#0a1226" />
          </g>
        </g>

        {/* ---------- Top right: living-room TV ---------- */}
        <g clipPath={url("tr")}>
          <g className="collage-zoom" style={{ animationDelay: "1.2s" }}>
            <rect x="302" y="10" width="288" height="288" fill={url("wall")} />
            <rect x="346" y="46" width="204" height="130" rx="8" fill="#161616" />
            <rect x="352" y="52" width="192" height="118" rx="4" fill={url("screen")} />
            <rect x="352" y="140" width="192" height="30" fill="#4d8bb3" />
            {HOUSES.map((h) => (
              <g key={h.x}>
                <rect x={h.x - 2} y={140 - h.h} width={h.w} height={h.h} fill={h.c} />
                <path d={`M${h.x - 4} ${140 - h.h} L${h.x + h.w / 2 - 2} ${140 - h.h - 16} L${h.x + h.w + 2} ${140 - h.h} Z`} fill={h.r} />
              </g>
            ))}
            <g className="collage-pulse"><circle cx="448" cy="98" r="18" fill="#c8102e" fillOpacity="0.9" /><path d="M442 89 L458 98 L442 107 Z" fill="#fff" /></g>
            <rect x="330" y="196" width="240" height="40" rx="4" fill="#b3804f" />
            <rect x="330" y="196" width="240" height="8" rx="4" fill="#c99a68" />
            <rect x="518" y="168" width="10" height="28" fill="#8a5a34" />
            <path d="M523 170 C500 150 496 122 516 108 C520 128 536 132 544 150 C540 160 534 166 523 170 Z" fill="#4c8c5a" />
            <path d="M523 170 C540 150 552 128 546 106 C528 118 520 140 523 170 Z" fill="#5fa46c" />
            <g transform="rotate(-18 500 260)"><rect x="484" y="230" width="24" height="70" rx="7" fill="#1c1c22" /><circle cx="496" cy="246" r="4" fill="#c8102e" /></g>
            <path d="M548 280 C520 300 470 290 470 262 C476 246 500 244 520 254 C540 262 552 268 548 280 Z" fill="#e7b58e" />
          </g>
        </g>

        {/* ---------- Bottom left: Baltic coast ---------- */}
        <g clipPath={url("bl")}>
          <g className="collage-zoom" style={{ animationDelay: "2.4s" }}>
            <rect x="10" y="302" width="288" height="288" fill={url("sunset")} />
            <circle cx="220" cy="420" r="34" fill="#ffd9a0" opacity="0.9" />
            <rect x="10" y="440" width="288" height="150" fill={url("sea")} />
            <g className="collage-wave">
              {[0, 1].map((k) => (
                <path key={k} d={`M${-60 + k * 240} 470 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0`} fill="none" stroke="#b7e2f0" strokeOpacity="0.55" strokeWidth="3" />
              ))}
              {[0, 1].map((k) => (
                <path key={k} d={`M${-30 + k * 240} 510 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0`} fill="none" stroke="#b7e2f0" strokeOpacity="0.4" strokeWidth="3" />
              ))}
              {[0, 1].map((k) => (
                <path key={k} d={`M${-70 + k * 240} 552 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0`} fill="none" stroke="#b7e2f0" strokeOpacity="0.3" strokeWidth="3" />
              ))}
            </g>
            <path d="M10 590 L10 470 C40 440 76 450 100 470 C130 486 150 520 190 560 L230 590 Z" fill="#d9b678" />
            <path d="M10 590 L10 520 C50 500 100 520 140 560 L170 590 Z" fill="#c29a5c" />
            <g>
              <path d="M40 460 L52 340 L76 340 L88 460 Z" fill="#fbfbfb" />
              <path d="M44 430 L84 430 L86 448 L42 448 Z M48 392 L80 392 L81 408 L47 408 Z" fill="#c8102e" />
              <rect x="50" y="322" width="28" height="20" fill="#fff8d6" />
              <path d="M46 322 L64 302 L82 322 Z" fill="#1c2a4a" />
              <g className="collage-sweep"><path d="M64 332 L250 296 L250 366 Z" fill="#fff8d6" opacity="0.5" /></g>
            </g>
          </g>
        </g>

        {/* ---------- Bottom right: cinema popcorn ---------- */}
        <g clipPath={url("br")}>
          <g className="collage-zoom" style={{ animationDelay: "3.6s" }}>
            <rect x="302" y="302" width="288" height="288" fill={url("cinema")} />
            {[[340, 340, 26], [520, 350, 20], [500, 420, 14], [346, 470, 12], [540, 470, 16]].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#c9a7ff" opacity="0.25" className="collage-twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
            {POP.map((k, i) => (
              <g key={i} className="collage-kernel" style={{ animationDelay: `${k.d}s` }}>
                <circle cx={k.x} cy={k.y} r={k.r} fill="#fff4d2" />
                <circle cx={k.x - k.r * 0.7} cy={k.y + k.r * 0.3} r={k.r * 0.7} fill="#fff4d2" />
                <circle cx={k.x + k.r * 0.7} cy={k.y + k.r * 0.2} r={k.r * 0.72} fill="#fffaf0" />
                <circle cx={k.x + k.r * 0.1} cy={k.y - k.r * 0.7} r={k.r * 0.6} fill="#fff4d2" />
                <circle cx={k.x - k.r * 0.2} cy={k.y + k.r * 0.2} r={k.r * 0.32} fill="#f2c25e" />
              </g>
            ))}
            <polygon points="352,452 492,452 472,532 372,532" fill="#fff" />
            {STRIPES.filter((_, i) => i % 2 === 0).map((pts) => (<polygon key={pts} points={pts} fill="#c8102e" />))}
            <rect x="346" y="446" width="152" height="10" rx="3" fill="#fff" />
            <rect x="346" y="446" width="152" height="4" rx="2" fill="#e9e2d4" />
          </g>
        </g>
      </g>

      {/* Dividers */}
      <path d="M300 4 V596 M4 300 H596" stroke="#fff" strokeWidth="6" />
      <circle cx="300" cy="300" r="291" fill="none" stroke="#fff" strokeWidth="6" />

      {/* Centre badge */}
      <circle cx="300" cy="300" r="112" fill="#fff" />
      <circle cx="300" cy="300" r="102" fill="#0d1f3c" />
      <circle cx="300" cy="300" r="90" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="3 8" className="collage-ring" />
      <text x="300" y="304" textAnchor="middle" fontSize="62" fontWeight="800" fill="#fff" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "-2px" }}>IPTV</text>
      <text x="300" y="334" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ff8a9a" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "7px" }}>POLONIA</text>
      <rect x="226" y="350" width="148" height="28" rx="14" fill="#15305a" stroke="#2c4a7d" />
      <text x="300" y="369" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>{badge}</text>
    </svg>
  );
}
