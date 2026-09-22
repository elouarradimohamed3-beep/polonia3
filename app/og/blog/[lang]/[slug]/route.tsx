import { getAllPosts, getPost } from "@/lib/blog";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return (["en", "pl"] as const).flatMap((lang) => getAllPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function GET(_req: Request, ctx: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await ctx.params;
  const l = lang === "pl" ? "pl" : "en";
  const post = getPost(l, slug);
  return renderOg({ kicker: l === "pl" ? "Poradnik IPTV" : "IPTV guide", title: post?.title ?? "IPTV Poland", footer: l === "pl" ? "Blog IPTV Poland" : "IPTV Poland blog" });
}
