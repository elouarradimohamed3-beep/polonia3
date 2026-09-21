import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { NightHeading, NightSection } from "@/components/night";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/blog";
import { abs, pageMetadata, webPageLd } from "@/lib/seo";

const TITLE = "Blog i poradniki IPTV";
const DESCRIPTION =
  "Poradniki IPTV krok po kroku: instalacja na Fire TV Stick i Smart TV, jaka prędkość internetu jest potrzebna oraz co zrobić, gdy obraz się zacina.";

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/blog" }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="night on-dark flex-1">
      <Breadcrumbs dark trail={[{ name: "Blog", path: "/blog" }]} />
      <JsonLd
        data={[
          webPageLd({ path: "/blog", name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
          {
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: abs(`/blog/${p.slug}`),
              name: p.title,
            })),
          },
        ]}
      />
      <NightSection>
        <NightHeading as="h1" eyebrow="Blog" title="Poradniki i wskazówki IPTV" sub={DESCRIPTION} />
        {posts.length === 0 ? (
          <p className="text-center text-slate-400">Pierwsze artykuły pojawią się wkrótce.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} as="h2" />
            ))}
          </div>
        )}
      </NightSection>
    </div>
  );
}
