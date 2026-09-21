import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const Mark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect width="48" height="48" rx="12" fill="#faf7f2" />
    <rect x="12" y="9" width="8" height="30" rx="2.5" fill="#0d1f3c" />
    <path d="M23 11 L38 22 L23 33 Z" fill="#c8102e" stroke="#c8102e" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

/** Branded 1200x630 share image. */
export function renderOg({ title, kicker, footer }: { title: string; kicker: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0d1f3c 0%, #15305a 60%, #3b1730 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", marginRight: 20 }}>
            <Mark size={76} />
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 800 }}>
            IPTV <span style={{ color: "#ff8a9a", marginLeft: 12 }}>Polonia</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#ff8a9a", marginBottom: 18 }}>{kicker}</div>
          <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 72, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#c9b9bd" }}>{footer}</div>
      </div>
    ),
    OG_SIZE,
  );
}
