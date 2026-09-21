import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const alt = "IPTV Polska – poradnik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Poradnik IPTV";

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
          background: "linear-gradient(135deg, #07101f 0%, #0a1c3a 55%, #0f2a55 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="72" height="72" viewBox="0 0 52 52" style={{ marginRight: 20 }}>
            <defs>
              <linearGradient id="g" x1="2" y1="10" x2="42" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <rect x="2" y="10" width="40" height="40" rx="12" fill="url(#g)" />
            <path d="M17 21 L32 30 L17 39 Z" fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="40" cy="12" r="2.6" fill="#d9ac4f" />
            <path d="M40 6.4 A5.6 5.6 0 0 1 45.6 12" fill="none" stroke="#d9ac4f" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M40 2 A10 10 0 0 1 50 12" fill="none" stroke="#d9ac4f" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 800, letterSpacing: 1 }}>
            IPTV <span style={{ color: "#d9ac4f", marginLeft: 12 }}>POLSKA</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 68, fontWeight: 800, lineHeight: 1.12 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#b8c7e0" }}>Poradnik · Blog IPTV Polska</div>
      </div>
    ),
    size,
  );
}
