import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Search engines and AI answer engines are explicitly welcome.
const BOTS = ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended", "CCBot", "cohere-ai", "Meta-ExternalAgent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }, ...BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
