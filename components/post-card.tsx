import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { glass, glassHover } from "@/components/night";
import { formatDate, type PostMeta } from "@/lib/blog";

export function PostCard({ post, as: Heading = "h3" }: { post: PostMeta; as?: "h2" | "h3" }) {
  return (
    <article className={`${glass} ${glassHover} group relative flex flex-col p-7`}>
      {post.tags[0] && (
        <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
          {post.tags[0]}
        </span>
      )}
      <Heading className="mt-4 text-xl font-bold leading-snug text-white">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.description}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden="true" /> {post.readingMinutes} min
          </span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-accent">
          Czytaj <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
