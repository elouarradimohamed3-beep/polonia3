import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IPTV Poland",
    short_name: "IPTV Poland",
    description: "IPTV Poland: Polish live TV and on-demand programmes over the internet, with support in English and Polish.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5faf9",
    theme_color: "#08211d",
    lang: "en",
  };
}
