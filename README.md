# IPTV Polonia (www.iptvpolonia.pl)

Bilingual (Polish + English) Next.js 16 website. Main keyword: **"iptv polonia"** (also found as "iptv polska").
Polish is the default language and lives at the root, so existing addresses keep working; English lives under `/en`.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## How the two languages work
- Two root layouts: `app/(pl)/layout.tsx` (`<html lang="pl">`) and `app/(en)/layout.tsx` (`<html lang="en">`), sharing `components/root-shell.tsx`.
- Every page exists in both languages with its own address (`lib/routes.ts`): `/przewodnik-instalacji` and `/en/setup-guide`, and so on.
- Each component keeps its Polish and English copy together (`const copy = { pl: ..., en: ... }`). Plans, prices and contact details are in `lib/site.ts`.
- SEO/GEO: canonical + `hreflang` (pl, en, x-default = Polish) on every page, language alternates in the sitemap, `inLanguage` in structured data (Organization, WebSite, Product with all prices, FAQPage, HowTo, Service, Article, Breadcrumb), a generated `llms.txt`, robots rules for search and AI crawlers, one RSS feed per language, per-article share images.
- The language switcher links to the matching page (also for translated articles). Visitors with an English browser see a floating suggestion, never a redirect.

## Design
Light editorial theme: ivory paper, ink navy, Polish red, serif headlines (Fraunces) with Inter body text. Tokens and component classes are in `app/globals.css`. All illustrations are original SVG; no third-party images or logos.

## Add an article
1. Create `content/blog/pl/moj-artykul.md` and/or `content/blog/en/my-article.md` (file name = URL).
2. Front matter: `title`, `description`, `date` (required); `updated`, `tags`, `translationKey` (optional).
3. Give the Polish and English version the same `translationKey` so they link to each other.
4. `git add -A && git commit && git push` publishes it. Files starting with `_` are drafts; a future date hides the article.

## Environment variables
See `.env.example`. Most important: `NEXT_PUBLIC_SITE_URL` must equal the host the hosting actually serves (here `https://www.iptvpolonia.pl`).
Trial form delivery: set `TRIAL_WEBHOOK_URL` or `RESEND_API_KEY` + `TRIAL_TO_EMAIL`. With none set, visitors are sent to WhatsApp with their details prefilled.

## Before going live
- **Prices** in `lib/site.ts`: tiers for 4 and 5 devices are extrapolated. Confirm every price.
- **Legal pages** (`lib/legal.ts`) are drafts, not legal advice. Have a lawyer review them and set the company details (`NEXT_PUBLIC_COMPANY_*`). The refund policy (7 days) is a draft rule: decide the real one.
- **Reviews:** `lib/reviews.ts` is empty on purpose. Add real reviews only.
- **Content rights:** claim only what you can prove. The redesigned copy avoids channel counts and catalogue sizes on purpose.
- Add Google Search Console (Domain property), submit `sitemap.xml`, and test the trial form with a real e-mail.
