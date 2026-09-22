/** Real customer proof only. Empty until genuine, permitted content exists. Never invent reviews. */
export type Testimonial = { name: string; place: string; plan: string; quote: Record<"en" | "pl", string> };
export const TESTIMONIALS: Testimonial[] = [];
export const REVIEW_BADGE: { platform: string; rating: number; count: number; url: string } | null = null;
