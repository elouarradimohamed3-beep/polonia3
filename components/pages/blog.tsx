import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ListOrdered } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { Section, SectionHeading, card } from "@/components/ui";
import { formatDate, getAllPosts, getPost, getTranslation } from "@/lib/blog";
import { other, type Lang } from "@/lib/i18n";
import { blogPath, path, ROUTES, sectionHref } from "@/lib/routes";
import { ORG_ID, WEBSITE_ID, abs, pageMetadata, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const copy = {
  en: {
    title: "IPTV Polonia blog: guides for Poles abroad",
    description: "IPTV guides for Poles abroad: Polish TV in the UK and Germany, Fire TV Stick setup, the internet speed you need and how to fix buffering.",
    eyebrow: "Blog",
    h1: "IPTV guides for Polonia",
    empty: "The first articles are coming soon.",
    crumb: "Blog",
    toc: "Table of contents",
    related: "Keep reading",
    minRead: "min read",
    updated: "Updated",
    ctaTitle: "Want to see IPTV in practice?",
    ctaText: "Request a free trial or pick a plan that fits your household. We answer in English and Polish.",
    trial: "Free trial",
    plans: "See plans",
    inOther: "Read this article in Polish",
  },
  pl: {
    title: "Blog IPTV Polonia: poradniki dla Polonii",
    description: "Poradniki IPTV dla Polonii: polska telewizja w Wielkiej Brytanii i Niemczech, instalacja na Fire TV Stick, prędkość internetu i rozwiązywanie problemów z buforowaniem.",
    eyebrow: "Blog",
    h1: "Poradniki IPTV dla Polonii",
    empty: "Pierwsze artykuły pojawią się wkrótce.",
    crumb: "Blog",
    toc: "Spis treści",
    related: "Czytaj także",
    minRead: "min czytania",
    updated: "Aktualizacja",
    ctaTitle: "Chcesz zobaczyć IPTV w praktyce?",
    ctaText: "Poproś o darmowy test albo wybierz plan dopasowany do Twojego domu. Odpowiadamy po polsku i angielsku.",
    trial: "Darmowy test",
    plans: "Zobacz plany",
    inOther: "Przeczytaj ten artykuł po angielsku",
  },
} as const;

export const blogIndexMetadata = (lang: Lang): Metadata => {
  const base = pageMetadata({ lang, title: copy[lang].title, description: copy[lang].description, paths: { ...ROUTES.blog } });
  return { ...base, alternates: { ...base.alternates, types: { "application/rss+xml": `${path(lang, "blog")}/feed.xml` } } };
};

export function BlogIndexPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const posts = getAllPosts(lang);
  const p = path(lang, "blog");
  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: p }]} />
      <JsonLd
        data={[
          webPageLd({ lang, path: p, name: t.title, description: t.description, type: "CollectionPage" }),
          { "@type": "ItemList", itemListElement: posts.map((x, i) => ({ "@type": "ListItem", position: i + 1, url: abs(blogPath(lang, x.slug)), name: x.title })) },
        ]}
      />
      <Section>
        <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.h1} sub={t.description} />
        {posts.length === 0 ? (
          <p className="text-center text-ink-soft">{t.empty}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((x) => (
              <PostCard key={x.slug} post={x} as="h2" />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export function blogStaticParams(lang: Lang) {
  return getAllPosts(lang).map((p) => ({ slug: p.slug }));
}

export function postMetadata(lang: Lang, slug: string): Metadata {
  const post = getPost(lang, slug);
  if (!post) return {};
  const tr = getTranslation(post);
  const paths: Partial<Record<Lang, string>> = { [lang]: blogPath(lang, slug) };
  if (tr) paths[other(lang)] = blogPath(tr.lang, tr.slug);
  const base = pageMetadata({ lang, title: post.title, description: post.description, paths, image: `/og/blog/${lang}/${slug}`, type: "article" });
  return {
    ...base,
    keywords: post.tags,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: [SITE.name], tags: post.tags },
  };
}

export function BlogPostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = copy[lang];
  const post = getPost(lang, slug);
  if (!post) notFound();
  const tr = getTranslation(post);
  const related = getAllPosts(lang).filter((x) => x.slug !== slug).slice(0, 2);
  const url = abs(blogPath(lang, slug));

  return (
    <>
      <Breadcrumbs lang={lang} trail={[{ name: t.crumb, path: path(lang, "blog") }, { name: post.title, path: blogPath(lang, slug) }]} />
      <JsonLd
        data={{
          "@type": "Article",
          "@id": `${url}#article`,
          headline: post.title,
          description: post.description,
          inLanguage: lang,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
          image: [abs(`/og/blog/${lang}/${slug}`)],
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
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full border bg-muted px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand">{tag}</li>
              ))}
            </ul>
          )}
          <h1 className="font-display text-3xl font-bold leading-tight text-header md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink-soft lg:justify-start">
            <span>{SITE.name}</span>
            <time dateTime={post.date}>{formatDate(lang, post.date)}</time>
            {post.updated && post.updated !== post.date && (
              <span>{t.updated}: <time dateTime={post.updated}>{formatDate(lang, post.updated)}</time></span>
            )}
            <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {post.readingMinutes} {t.minRead}</span>
            {tr && (
              <Link href={blogPath(tr.lang, tr.slug)} hrefLang={tr.lang} lang={tr.lang} className="font-bold text-brand underline underline-offset-2">{t.inOther}</Link>
            )}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="mx-auto w-full max-w-3xl lg:mx-0">
            <div className="prose-light" dangerouslySetInnerHTML={{ __html: post.html }} />
            <aside className={`${card} mt-14 p-8 text-center md:p-10`}>
              <h2 className="text-2xl font-extrabold text-header">{t.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t.ctaText}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href={sectionHref(lang, "trial")} className="btn btn-navy">{t.trial}</Link>
                <Link href={sectionHref(lang, "plans")} className="btn btn-ghost">{t.plans}</Link>
              </div>
            </aside>
          </article>
          {post.toc.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label={t.toc} className={`${card} sticky top-24 p-5`}>
                <p className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-brand"><ListOrdered size={14} aria-hidden="true" /> {t.toc}</p>
                <ol className="space-y-2 text-sm">
                  {post.toc.map((item) => (
                    <li key={item.id}><a href={`#${item.id}`} className="text-ink-soft transition-colors hover:text-header">{item.text}</a></li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-6 text-2xl font-extrabold text-header">{t.related}</h2>
            <div className="grid gap-5 md:grid-cols-2">{related.map((x) => (<PostCard key={x.slug} post={x} />))}</div>
          </section>
        )}
      </div>
    </>
  );
}
