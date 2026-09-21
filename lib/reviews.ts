/**
 * Real customer proof. Leave empty until you have genuine, permitted content;
 * the sections render only when they contain data. Never add invented reviews.
 */
export type Testimonial = {
  name: string; // first name is enough
  place: string; // e.g. "Manchester, UK"
  plan: string; // e.g. "1 year, 3 devices"
  quote: Record<"en" | "pl", string>;
};

export const TESTIMONIALS: Testimonial[] = [];

/** e.g. { platform: "Google", rating: 4.8, count: 127, url: "https://g.page/..." } */
export const REVIEW_BADGE: { platform: string; rating: number; count: number; url: string } | null = null;
