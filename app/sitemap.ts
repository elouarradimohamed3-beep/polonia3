import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { LAST_MODIFIED } from "@/lib/seo";
import { SITE } from "@/lib/site";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/sprzedawca-iptv", priority: 0.8, changeFrequency: "monthly" },
  { path: "/przewodnik-instalacji", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/skontaktuj-sie-z-nami", priority: 0.7, changeFrequency: "yearly" },
  { path: "/o-nas", priority: 0.5, changeFrequency: "yearly" },
  { path: "/regulamin-iptv", priority: 0.3, changeFrequency: "yearly" },
  { path: "/zasady-zwrotow-i-anulowania", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0]?.updated ?? posts[0]?.date;

  const pages = ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: path === "/blog" && newest ? newest : LAST_MODIFIED,
    changeFrequency,
    priority,
  }));

  const articles = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
