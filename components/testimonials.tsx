import { Quote, Star } from "lucide-react";
import { Section, SectionHeading, card } from "@/components/ui";
import type { Lang } from "@/lib/i18n";
import { REVIEW_BADGE, TESTIMONIALS } from "@/lib/reviews";

const copy = { en: { eyebrow: "Reviews", title: "What customers say", reviews: "reviews on" }, pl: { eyebrow: "Opinie", title: "Co mówią klienci", reviews: "opinii w" } } as const;

/** Renders only when lib/reviews.ts contains real data. */
export function Testimonials({ lang }: { lang: Lang }) {
  if (TESTIMONIALS.length === 0 && !REVIEW_BADGE) return null;
  const t = copy[lang];
  return (
    <Section tone="white">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      {REVIEW_BADGE && (<div className="-mt-6 mb-12 flex justify-center"><a href={REVIEW_BADGE.url} target="_blank" rel="noopener noreferrer" className={`${card} inline-flex items-center gap-3 px-5 py-3`}><span className="flex gap-0.5 text-brand" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={18} fill="currentColor" />))}</span><span className="text-header"><strong>{REVIEW_BADGE.rating.toFixed(1)}</strong> / 5 · {REVIEW_BADGE.count} {t.reviews} {REVIEW_BADGE.platform}</span></a></div>)}
      {TESTIMONIALS.length > 0 && (<div className="grid gap-4 md:grid-cols-3">{TESTIMONIALS.map((r) => (<figure key={r.name + r.place} className={`${card} p-6`}><Quote size={22} className="text-brand" aria-hidden="true" /><blockquote className="mt-3 leading-relaxed text-header">{r.quote[lang]}</blockquote><figcaption className="mt-4 text-sm"><strong className="text-header">{r.name}</strong><span className="block text-ink-soft">{r.place} · {r.plan}</span></figcaption></figure>))}</div>)}
    </Section>
  );
}
