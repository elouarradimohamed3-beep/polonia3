# IPTV Poland

Bilingual (English + Polish) Next.js 16 website, entirely separate from any other IPTV project in this
workspace: own brand ("IPTV Poland"), own design (deep teal + amber, Space Grotesk display type), own
copy, own original SVG artwork (a broadcast-tower hero, no third-party images). English is the default
language and lives at the root; Polish lives under `/pl`. Main keyword: **"iptv poland"**.

Same subscription offer and prices as the operator's existing service (confirmed by the user); everything
else — brand, text, layout, illustrations — is original to this project.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## How the two languages work
- Two root layouts: `app/(en)/layout.tsx` (`<html lang="en">`) and `app/(pl)/layout.tsx` (`<html lang="pl">`), sharing `components/root-shell.tsx`.
- Every page exists in both languages with its own address (`lib/routes.ts`): `/setup-guide` and `/pl/instalacja`, `/channels` and `/pl/kanaly`, and so on.
- Each component keeps English and Polish copy together (`const copy = { en: ..., pl: ... }`). Plans, prices and contact details are in `lib/site.ts`.
- SEO/GEO: canonical + `hreflang` (en, pl, x-default = English) on every page, language alternates in the sitemap, `inLanguage` in structured data (Organization, WebSite, Product with all prices, FAQPage, HowTo, Article, Breadcrumb), a generated `llms.txt`, robots rules for search and AI crawlers, one RSS feed per language, per-article share images.
- The language switcher links to the matching page (also for translated articles). Visitors with a Polish browser see a floating suggestion, never a redirect.

## Add an article
1. Create `content/blog/en/my-article.md` and/or `content/blog/pl/moj-artykul.md` (file name = URL).
2. Front matter: `title`, `description`, `date` (required); `updated`, `tags`, `translationKey` (optional).
3. Give the English and Polish version the same `translationKey` so they link to each other.
4. `git add -A && git commit && git push` publishes it. Files starting with `_` are drafts; a future date hides the article.

## Environment variables
See `.env.example`. Most important: `NEXT_PUBLIC_SITE_URL` must equal the host the hosting actually serves (apex or www), otherwise canonical links point at a redirect.
Trial form delivery: set `TRIAL_WEBHOOK_URL` or `RESEND_API_KEY` + `TRIAL_TO_EMAIL`. With none set, visitors are sent to WhatsApp with their details prefilled.

## Before going live
- **Domain:** set `NEXT_PUBLIC_SITE_URL` to the real domain this site will run on.
- **Prices** in `lib/site.ts`: tiers for 4 and 5 devices are extrapolated from the 1–3 device prices. Confirm every price.
- **Legal pages** (`lib/legal.ts`) are drafts, not legal advice. Have a lawyer review them and set the company details (`NEXT_PUBLIC_COMPANY_*`). The refund policy (7 days) is a draft rule.
- **Reviews:** `lib/reviews.ts` is empty on purpose. Add real reviews only.
- **Content rights:** claim only what you can prove. The channels page deliberately avoids fixed channel counts and names.
- **Do not deploy this alongside another site selling the same service with the same content** — see the workspace's playbook notes on duplicate-site risk.
- Add Google Search Console (Domain property), submit `sitemap.xml`, and test the trial form with a real e-mail.
