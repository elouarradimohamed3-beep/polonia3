import type { MetadataRoute } from "next";
import { getAllPosts, getTranslation } from "@/lib/blog";
import { blogPath, ROUTES, type RouteKey } from "@/lib/routes";
import { LAST_MODIFIED, abs } from "@/lib/seo";

const PRIORITY: Record<RouteKey, number> = { home: 1, guide: 0.8, blog: 0.8, reseller: 0.7, contact: 0.7, about: 0.5, terms: 0.3, refunds: 0.3, privacy: 0.3, copyright: 0.4 };

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = (Object.keys(ROUTES) as RouteKey[]).flatMap((key) =>
    (["pl", "en"] as const).map((lang) => ({
      url: abs(ROUTES[key][lang]),
      lastModified: LAST_MODIFIED,
      changeFrequency: key === "home" || key === "blog" ? ("weekly" as const) : ("monthly" as const),
      priority: PRIORITY[key],
      alternates: { languages: { pl: abs(ROUTES[key].pl), en: abs(ROUTES[key].en), "x-default": abs(ROUTES[key].pl) } },
    })),
  );

  const posts: MetadataRoute.Sitemap = (["pl", "en"] as const).flatMap((lang) =>
    getAllPosts(lang).map((p) => {
      const tr = getTranslation(p);
      const en = lang === "en" ? p : tr;
      const pl = lang === "pl" ? p : tr;
      return {
        url: abs(blogPath(lang, p.slug)),
        lastModified: p.updated ?? p.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        ...(en && pl ? { alternates: { languages: { pl: abs(blogPath("pl", pl.slug)), en: abs(blogPath("en", en.slug)), "x-default": abs(blogPath("pl", pl.slug)) } } } : {}),
      };
    }),
  );

  return [...pages, ...posts];
}
