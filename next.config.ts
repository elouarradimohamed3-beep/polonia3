import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Two root layouts (one per language) need a global 404 page.
  experimental: { globalNotFound: true },
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 60 * 60 * 24 * 30 },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Old WordPress / WooCommerce addresses keep working (and keep their SEO value).
  async redirects() {
    return [
      { source: "/shop", destination: "/#plans", permanent: true },
      { source: "/cart", destination: "/#plans", permanent: true },
      { source: "/checkout", destination: "/#plans", permanent: true },
      { source: "/my-account", destination: "/skontaktuj-sie-z-nami", permanent: true },
      { source: "/refund_returns", destination: "/zasady-zwrotow-i-anulowania", permanent: true },
      { source: "/refund-and-returns-policy", destination: "/zasady-zwrotow-i-anulowania", permanent: true },
    ];
  },
};

export default nextConfig;
