import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IPTV Polonia",
    short_name: "IPTV Polonia",
    description: "Polska telewizja przez internet dla Polonii: telewizja na żywo i programy na żądanie na każdym ekranie.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#0d1f3c",
    lang: "pl",
  };
}
