import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#08211d" }}><svg width="132" height="132" viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="13" fill="#14958a" /><path d="M24 40 V22" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" /><path d="M18 22 L24 12 L30 22 Z" fill="#fff" /><path d="M14 17 A16 16 0 0 1 34 17" fill="none" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" /></svg></div>),
    size,
  );
}
