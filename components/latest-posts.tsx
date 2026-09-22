import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { Section, SectionHeading } from "@/components/ui";
import { getAllPosts } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import { path } from "@/lib/routes";

const copy = { en: { eyebrow: "Guides", title: "From the IPTV Poland blog", sub: "Step-by-step help and answers to common questions.", all: "All articles" }, pl: { eyebrow: "Poradniki", title: "Z bloga IPTV Poland", sub: "Instrukcje krok po kroku i odpowiedzi na najczęstsze pytania.", all: "Wszystkie artykuły" } } as const;

export function LatestPosts({ lang }: { lang: Lang }) {
  const posts = getAllPosts(lang).slice(0, 3);
  if (posts.length === 0) return null;
  const t = copy[lang];
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="grid gap-5 md:grid-cols-3">{posts.map((p) => (<PostCard key={p.slug} post={p} />))}</div>
      <div className="mt-10 text-center"><Link href={path(lang, "blog")} className="btn btn-ghost">{t.all}</Link></div>
    </Section>
  );
}
