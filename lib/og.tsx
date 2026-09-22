import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const Mark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="2" y="2" width="44" height="44" rx="13" fill="#14958a" />
    <path d="M24 40 V22" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M18 22 L24 12 L30 22 Z" fill="#fff" />
    <path d="M14 17 A16 16 0 0 1 34 17" fill="none" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

export function renderOg({ title, kicker, footer }: { title: string; kicker: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #08211d 0%, #0f3730 55%, #0b5c56 100%)", color: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", marginRight: 20 }}><Mark size={76} /></div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 700 }}>IPTV <span style={{ color: "#f5a623", marginLeft: 12 }}>POLAND</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#f5a623", marginBottom: 18 }}>{kicker}</div>
          <div style={{ display: "flex", fontSize: title.length > 60 ? 56 : 70, fontWeight: 700, lineHeight: 1.12 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#bcd6d1" }}>{footer}</div>
      </div>
    ),
    OG_SIZE,
  );
}
