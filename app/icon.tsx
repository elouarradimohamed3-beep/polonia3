import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <svg width="64" height="64" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#faf7f2" />
            <rect x="12" y="9" width="8" height="30" rx="2.5" fill="#0d1f3c" />
            <path d="M23 11 L38 22 L23 33 Z" fill="#c8102e" stroke="#c8102e" strokeWidth="3" strokeLinejoin="round" />
          </svg>
      </div>
    ),
    size,
  );
}
