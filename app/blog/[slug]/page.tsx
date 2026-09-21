import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ListOrdered } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { glass } from "@/components/night";
import { PostCard } from "@/components/post-card";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { ORG_ID, WEBSITE_ID, abs, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    defaultImage: false,
  });
  return {
    ...base,
    keywords: post.tags,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);
  const url = abs(`/blog/${slug}`);

  return (
    <div className="night on-dark flex-1">
      <Breadcrumbs
        dark
        trail={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@type": "Article",
          "@id": `${url}#article`,
          headline: post.title,
          description: post.description,
          inLanguage: "pl-PL",
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
          image: [`${url}/opengraph-image`],
          keywords: post.tags.join(", "),
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          isPartOf: { "@id": WEBSITE_ID },
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <header className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-4xl lg:text-left">
          {post.tags.length > 0 && (
            <ul className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
          <h1 className="text-gradient text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{post.description}</p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-400 lg:justify-start">
            <span>{SITE.name}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date && (
              <span>
                Aktualizacja: <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={14} aria-hidden="true" /> {post.readingMinutes} min czytania
            </span>
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="mx-auto w-full max-w-3xl lg:mx-0">
            <div className="prose-night" dangerouslySetInnerHTML={{ __html: post.html }} />

            <aside className={`${glass} mt-14 p-8 text-center md:p-10`}>
              <h2 className="text-2xl font-extrabold text-white">Chcesz sprawdzić IPTV w praktyce?</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">
                Poproś o darmowy test albo wybierz plan dopasowany do liczby urządzeń. Wsparcie odpowiada 24/7.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/#trial" className="btn btn-accent btn-glow">
                  Darmowy test
                </Link>
                <Link href="/#pricing" className="btn btn-outline">
                  Zobacz cennik
                </Link>
              </div>
            </aside>
          </article>

          {post.toc.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label="Spis treści" className={`${glass} sticky top-24 p-5`}>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  <ListOrdered size={14} aria-hidden="true" /> Spis treści
                </p>
                <ol className="space-y-2 text-sm">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-slate-400 transition-colors hover:text-white">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl font-extrabold text-white">
              Czytaj także
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
