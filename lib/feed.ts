import { getAllPosts } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import { blogPath, path } from "@/lib/routes";
import { SITE } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function rssResponse(lang: Lang) {
  const items = getAllPosts(lang)
    .map((p) => {
      const url = `${SITE.url}${blogPath(lang, p.slug)}`;
      return `<item>\n<title>${esc(p.title)}</title>\n<link>${url}</link>\n<guid isPermaLink="true">${url}</guid>\n<pubDate>${new Date(p.date).toUTCString()}</pubDate>\n<description>${esc(p.description)}</description>\n</item>`;
    })
    .join("\n");
  const self = `${SITE.url}${path(lang, "blog")}/feed.xml`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n<title>${esc(SITE.name)} – Blog (${lang.toUpperCase()})</title>\n<link>${SITE.url}${path(lang, "blog")}</link>\n<description>${lang === "pl" ? "Poradniki IPTV krok po kroku." : "IPTV guides and answers."}</description>\n<language>${lang}</language>\n<atom:link href="${self}" rel="self" type="application/rss+xml" />\n${items}\n</channel>\n</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
