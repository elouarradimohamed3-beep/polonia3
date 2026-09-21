import Link from "next/link";
import { NightHeading, NightSection } from "@/components/night";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/blog";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <NightSection>
      <NightHeading eyebrow="Poradniki" title="Z naszego bloga" sub="Instrukcje krok po kroku i rozwiązania najczęstszych problemów." />
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/blog" className="btn btn-outline">
          Wszystkie artykuły
        </Link>
      </div>
    </NightSection>
  );
}
