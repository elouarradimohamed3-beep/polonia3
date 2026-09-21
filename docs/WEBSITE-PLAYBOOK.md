# Website Playbook: everything we built and how to repeat it

This file documents the whole project (a Polish IPTV subscription website, Next.js) so the same result can be reproduced on other websites quickly. It is written for two readers: you, and any Claude session you start on a new site (paste the file or the section you need).

> Reference project: `iptvpolski` folder, deployed at `https://www.iptvpolonia.pl`, repo `github.com/elouarradimohamed3-beep/polonia1`.

---

## 0. Read this first: legal and risk checklist (do before reusing)

The technical template is reusable. The following items are **not solved** in the reference site and must be handled for every new site:

- **Content rights.** Only sell or show content you are licensed to. The reference site's hero and showcase images contain other companies' artwork (TV posters, a broadcast logo, third-party app branding, device brand logos). Replace them with original mock-ups or licensed images before launch. Keep licence proof for every stock image; credit free-licence authors (for example Freepik) where required.
- **Claims.** Do not publish claims you cannot prove ("40 000 premium channels for 15 EUR", "we bypass ISP blocks"). They attract copyright notices, payment-provider bans (PayPal) and ad rejections.
- **Privacy policy page is missing.** The terms reference one. Collecting emails (trial form) requires a real privacy policy and cookie consent under EU/GDPR law. The trial form only carries a short inline notice.
- **Company identity.** Add business name, address, tax number, contact hours. The terms page still has a `[miasto, Polska]` placeholder.
- **One refund promise.** Plans say "7-day refund", the FAQ says "full refund", the policy says "no refund after activation". Make them consistent.
- **Copyright/takedown policy.** Add a page with a contact for rights holders and a notice-handling process. Note: this playbook does not cover hiding a domain from takedown notices. Redirect-only main domains and rotating subdomains do not shield a site, because notices reach the host, registrar, Cloudflare and Google at domain level.
- **Prices for 4 and 5 devices were extrapolated**, not supplied by the owner. Always confirm real prices.
- **Machine-written articles** need a human review before publishing (facts, menu names, numbers).

---

## 1. Stack and tooling

| Item | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, tokens in `@theme inline`) |
| Icons | `lucide-react` |
| Blog | `gray-matter` (front matter) + `marked` (Markdown to HTML) |
| Font | Inter via `next/font/google` (`latin`, `latin-ext` for Polish letters) |
| Hosting | Vercel (auto-deploys from GitHub `main`), DNS through Cloudflare |
| Quality gates | `npm run lint`, `npx tsc --noEmit`, `npm run build`, Lighthouse, headless Chrome |

**Important:** Next 16 has breaking changes. The scaffold creates `AGENTS.md`; read `node_modules/next/dist/docs/` before writing code. Notable points used here: `params` is a Promise (`await params`), `PageProps<'/blog/[slug]'>` and `LayoutProps<'/'>` are global typed helpers, `generateStaticParams` + `dynamicParams = false` for the blog.

Scaffold command:

```bash
npx create-next-app@latest mysite --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm --yes
cd mysite && npm i lucide-react gray-matter marked
```

---

## 2. Project structure

```
app/
  layout.tsx            fonts, viewport, global metadata, header/footer, WhatsApp float, Organization+WebSite JSON-LD
  page.tsx              home page (assembles sections)
  sprzedawca-iptv/      reseller page          przewodnik-instalacji/  installation guide (HowTo JSON-LD)
  skontaktuj-sie-z-nami/ contact               o-nas/                  about
  regulamin-iptv/       terms                  zasady-zwrotow-i-anulowania/ refunds
  blog/                 index, [slug]/ article, [slug]/opengraph-image, feed.xml/route.ts
  api/trial/route.ts    free-trial lead endpoint
  llms.txt/route.ts     generated llms.txt     sitemap.ts, robots.ts, manifest.ts
  icon.tsx, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx, not-found.tsx, globals.css
components/
  header, footer, logo, whatsapp-float, breadcrumbs, json-ld, night (glass helpers), ui, legal
  hero, hero-media, intro-section, showcase, pricing, pricing-plans, trial-section, trial-form,
  plan-comparison, vs-cable, how-to-start, why-us, testimonials, feature-tabs, latest-posts, faq,
  sticky-cta, post-card
lib/
  site.ts       ALL business content: brand, contact, nav, prices, FAQ, guide steps, copy blocks
  pricing.ts    price helpers (per-device tiers, per-month, savings, cheapest plan)
  seo.ts        pageMetadata(), JSON-LD builders (Organization, WebSite, WebPage, Product, Breadcrumb)
  blog.ts       Markdown loader
  reviews.ts    real testimonials/rating (empty until real data exists)
content/blog/*.md   articles
public/images/      images, logo-mark.svg
```

Rule that made reuse easy: **all copy, prices and contact details live in `lib/site.ts`**; components only render data.

---

## 3. Build order (what we did, in sequence)

1. **Analyse the old WordPress site.** `curl` was blocked by the sandbox for HTML, so pages were read with the web-fetch tool (text, links, image URLs). Images downloaded with `curl -A "Mozilla/5.0"` (worked). Some asset URLs from the summary were wrong (404); replace missing images with inline icons.
2. **Scaffold Next.js** and copy images into `public/images/` with clean names.
3. **Move content into `lib/site.ts`**, fix errors from the original (Dutch and Greek leftovers, "6 miesiące" to "6 miesięcy", nonsensical "12 ECTS", duplicated list item, placeholder text such as "This is text element").
4. **Build pages:** home, reseller, installation guide, contact, about, terms, refunds. Old WooCommerce URLs (`/shop`, `/cart`, `/checkout`, `/my-account`) get permanent redirects in `next.config.ts`.
5. **SEO / AI-search layer** (section 6).
6. **Re-theme the colours** to a professional navy / blue / gold palette (section 4).
7. **Redesign the home page** into a dark, cinematic style (section 5).
8. **Pricing by number of devices** (1 to 5) with tabs (section 7).
9. **Conversion features** on the home page (section 8).
10. **New logo, favicon, share images** (section 9).
11. **Domain change** to the new domain, generated `llms.txt`, `www` canonical fix (section 11).
12. **GitHub + Vercel + Search Console** (section 12).
13. **Blog** (section 10).
14. **Copyright audit** of images (section 0).

At every step: `npm run lint`, `npx tsc --noEmit`, `npm run build`, then check in a real browser.

---

## 4. Design system

Tokens in `app/globals.css`:

```css
:root {
  --background:#ffffff; --foreground:#0f172a; --muted:#f3f6fb; --border:#dde4ee;
  --brand:#1d4ed8; --brand-dark:#1e40af; --accent:#d9ac4f; --accent-dark:#c4973a; --header:#0a1628;
}
```

- **Dark "night" theme** (home + blog): `.night` bg `#050a14`, text `#cbd5e1`. Helpers: `.text-gradient` (white to blue-grey), `.text-gold-gradient`, `.grid-lines`, `.eyebrow` (small gold label with lines), `.hero-gradient`, `.btn` + `.btn-primary|accent|outline`, `.btn-glow`, `.btn-blue-glow`, `.prose-night` (article typography).
- **Glass cards:** `components/night.tsx` exports `glass` (`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm`), `glassHover`, `NightSection`, `NightHeading` (accepts `as="h1"`).
- **Rules learned:** never use `text-slate-500` on dark (fails contrast; use `slate-400` minimum). Gold text on dark is fine. Blue `#1d4ed8` text on dark is not; use `blue-300`.
- **To restyle a new site:** change the 9 tokens, the hero gradient, the logo component and the OG/icon colours. Everything else follows.

---

## 5. Home page anatomy (order matters for conversion)

1. **Hero:** badge, H1 with gradient, price line, primary CTA ("subscribe") + secondary CTA ("free trial"), trust line (activation, refund, support), image or click-to-play video, device strip, stats bar.
2. **Intro (answer-first):** a bento grid with the plain definition and key facts (price, quality, content, activation, devices, payments, support). This block is written for Google snippets and AI answers.
3. **Showcase ("what you get"):** six category tiles plus a preview image.
4. **Pricing:** "which plan?" helper, device-count tabs, six plan cards, per-day price, trust row, "included in every plan" panel, multi-device note.
5. **Free-trial section** with the lead form.
6. **Price matrix:** plans against 1 to 5 devices, per-month cost under each price.
7. **Vs cable/satellite table** (generic wording, hedged: "zwykle", "często").
8. **How to start:** 4 steps.
9. **Why us:** bento grid + closing CTA banner.
10. **Testimonials:** real-data-ready (see `lib/reviews.ts`), screenshots as backup.
11. **Feature tabs:** five long sections merged into one tabbed block (all text stays in the DOM for SEO).
12. **Latest blog posts.**
13. **FAQ** (accordion, FAQPage JSON-LD) + closing WhatsApp prompt.
14. **Mobile sticky order bar** (shows after hero, hides near pricing/trial/footer).

---

## 6. SEO and AI-search (GEO) layer

- `pageMetadata({ title, description, path, absolute?, defaultImage? })` in `lib/seo.ts` sets title, description, canonical, Open Graph, Twitter. Titles under about 60 characters, descriptions 130 to 160.
- **JSON-LD:** Organization (logo, contact point), WebSite, WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList on inner pages, **Product + AggregateOffer** listing every published price, FAQPage (home), HowTo (guide, one per device), Service (reseller), Article (blog). **No AggregateRating** unless there are real, visible reviews.
- `robots.ts` allows Googlebot, Bingbot and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, CCBot and others).
- `sitemap.ts` uses fixed `lastModified` dates (not `new Date()`), includes blog posts.
- `llms.txt` is **generated** from the same data as the site (domain, prices, pages, posts) so it never goes stale.
- One H1 per page, heading order without skips, breadcrumbs, skip link, alt text, `lang="pl"`.
- Hidden tab/accordion content stays in the HTML.
- Security headers in `next.config.ts` (`nosniff`, `SAMEORIGIN`, referrer policy, permissions policy), `poweredByHeader: false`.
- Google FAQ rich results are limited to few site types now; the FAQ markup mainly helps AI answers.

**Canonical rule (a real bug we hit):** the canonical/sitemap/OG URLs must equal the host the site actually serves. Vercel served `www` and redirected the apex, but the code said non-`www`, so every canonical pointed at a redirect. Fix: default `SITE.url` to the served host, or set `NEXT_PUBLIC_SITE_URL`.

Scores reached in Lighthouse (production build): SEO 100, best practices 100, accessibility 100, performance 91 to 96.

---

## 7. Pricing model (device tiers)

In `lib/site.ts`:

```ts
CONNECTION_OPTIONS = [1,2,3,4,5]
PLAN_DEFS = [{id:"1-dzien",months:null}, {id:"1-miesiac",months:1}, {id:"3-miesiace",months:3},
             {id:"6-miesiecy",months:6}, {id:"1-rok",months:12}, {id:"2-lata",months:24}]
PRICES[connections][planId] = number | null   // null = "price on request" + WhatsApp CTA
```

- `lib/pricing.ts`: `getPlans`, `planMeta` (per-month, saving vs monthly), `cheapestPerMonthId` (used for the factual "lowest price per month" badge, never an invented "most popular"), `planDays` (per-day price), `ALL_PRICES` (feeds JSON-LD).
- UI: `pricing-plans.tsx` is a client component with an accessible tablist (arrow keys, Home/End) and all five panels rendered, hidden with the `hidden` attribute.
- The "which plan?" helper switches the tab and marks a plan "Polecany dla Ciebie".
- For a new site change only `PLAN_DEFS` and `PRICES`; cards, matrix, JSON-LD and `llms.txt` update together.
- Tiers 4 and 5 in the reference were derived from tiers 1 to 3 (average step per extra device; "2 lata" scaled from "1 rok"), then checked: price per device falls as devices increase, and longer plans cost less per month. Re-derive with real numbers when available.

---

## 8. Conversion features

- **Free-trial form** (`trial-form.tsx`, `app/api/trial/route.ts`): email + device + consent checkbox with inline GDPR notice, hidden honeypot field, validation, in-memory rate limit (5 per 10 min per IP). Delivery, first configured wins: `TRIAL_WEBHOOK_URL` (Zapier/Make/n8n/Sheets/Slack) or `RESEND_API_KEY` + `TRIAL_TO_EMAIL` (+ optional `TRIAL_FROM_EMAIL`). If neither is set, the API answers `delivered:false` and the form shows a WhatsApp button with details prefilled. Delivery failure returns 502 and shows the same fallback. Nothing is lost silently. **Test it once with your own email after deploying.**
- **Hero video:** set `NEXT_PUBLIC_DEMO_VIDEO_ID` (YouTube id). Loads only after click (`youtube-nocookie`). Unset = static image.
- **Sticky mobile bar** (`sticky-cta.tsx`): IntersectionObserver hides it near `#pricing`, `#trial`, `footer`; the WhatsApp float moves up via a CSS `:has()` rule.
- **Social proof:** `lib/reviews.ts` (`TESTIMONIALS`, `REVIEW_BADGE`) renders only when filled with real data.
- **Orders:** the WooCommerce checkout was not migrated. "Order" buttons open WhatsApp with the plan, device count and price prefilled (`whatsappLink()` in `lib/site.ts`). A real PayPal/card checkout is the biggest remaining sales lever.

---

## 9. Logo, icons, share images

- `components/logo.tsx`: `LogoMark` (SVG: blue rounded play tile, gold broadcast arcs, `useId` for the gradient id) + `Logo` (mark + text "IPTV" white over spaced gold "POLSKA", real text so it matches the font). Put `{" "}` between the two text spans so the accessible name has a space.
- `public/images/logo-mark.svg` for structured data. `app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx` draw the same mark with `next/og` (`ImageResponse`).
- Per-article share image: `app/blog/[slug]/opengraph-image.tsx` (title on gradient); needs `generateStaticParams` in the image file to be prerendered.
- If a route sets its own `openGraph`, it replaces the parent's file-based image, so pass `defaultImage:false` and rely on the route's own image file (that is what `pageMetadata` supports).

---

## 10. Blog (file-based)

- One Markdown file per article in `content/blog/`; the file name is the URL (`a-z0-9-` only).
- Front matter: `title`, `description`, `date` (required), `updated`, `tags` (optional). Files starting with `_` are drafts; a future `date` hides the post.
- `lib/blog.ts`: reads at build time, computes reading time, adds ids to `h2/h3`, builds a table of contents, opens external links with `rel="noopener noreferrer"`.
- Pages: `/blog` (list, CollectionPage + ItemList), `/blog/[slug]` (Article + Breadcrumb JSON-LD, TOC sidebar, CTA box, related posts), `/blog/feed.xml` (RSS), entries in `sitemap.ts` and `llms.txt`, latest posts on the home page.
- Publishing: `git add -A && git commit && git push` and Vercel deploys in about a minute.
- Content rules: original text, facts you can prove, own screenshots only, internal links (`[text](/przewodnik-instalacji)`), the article must not start with `#` (the title is the H1).
- First articles: Fire TV Stick setup, internet speed needed, fixing buffering (about 550 to 640 words each; aim for 800+ for competitive topics).

---

## 11. Domain and deployment

- Domain is one setting: `SITE.url` in `lib/site.ts` (default) or `NEXT_PUBLIC_SITE_URL` on the host. `SITE_HOST` is derived for text such as the terms page.
- Deploy: push to GitHub `main`; Vercel builds. Set the environment variables on Vercel (section 13).
- If Cloudflare sits in front of Vercel, keep rules simple (Always HTTPS, sensible caching) so updates appear quickly.
- If an old site is being replaced, keep permanent redirects (`next.config.ts` `redirects()`), and use Search Console "Change of address" for domain-level moves.

---

## 12. Search Console and launch checklist

1. Deploy, then open `/robots.txt`, `/sitemap.xml`, `/llms.txt`.
2. Search Console: add a **Domain** property (`example.com`, covers all subdomains), verify by DNS TXT record (or URL-prefix + `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta tag).
3. Sitemaps: submit `sitemap.xml` (for a Domain property type the full URL).
4. URL Inspection: request indexing for the home page and main pages.
5. Bing Webmaster Tools: import from Search Console.
6. Choose one address (`www` or apex) and redirect the other at the host.
7. Test the trial form with a real email; check "Pages" report after a few days.
8. Add Google Analytics 4 and track WhatsApp/order clicks (not done yet).
9. Expect days to weeks for indexing on a new domain; rankings need content, links and reviews.

---

## 14. Per-site customisation checklist

- [ ] `lib/site.ts`: `SITE` (name, url, email, whatsapp, phone), `NAV`, `FOOTER_LINKS`, `PLAN_FEATURES`, `PLAN_DEFS`, `PRICES`, `WHY_US`, `INFRASTRUCTURE`, `FAQ`, `GUIDE`, `RESELLER_*`, `WHATSAPP_*` messages
- [ ] Colours: tokens in `globals.css`, `hero-gradient`, `.night`, icon/OG colours, `viewport.themeColor`, `manifest.ts`
- [ ] Logo: `components/logo.tsx`, `public/images/logo-mark.svg`, `icon.tsx`, `apple-icon.tsx`, OG images
- [ ] Images in `public/images/` (originals or licensed only), alt texts
- [ ] Copy in components with hard-coded text: hero, intro cards, showcase tiles, trial section, vs-cable rows, how-to steps, feature tabs, testimonials
- [ ] Legal pages: terms, refunds, **add privacy policy and copyright/takedown page**
- [ ] Metadata: home title/description, per-page titles/descriptions
- [ ] Language: change `lang`, `pl_PL`, currency formatting (`Intl` locale), Polish grammar helpers (`deviceLabel`)
- [ ] `lib/reviews.ts` only with real data
- [ ] Blog: replace articles, keep the workflow
- [ ] Env vars set on the host; trial form tested
- [ ] Search Console, Bing, analytics
- [ ] Legal checklist in section 0

---

## 13. Environment variables

```
NEXT_PUBLIC_SITE_URL=https://www.example.com          # canonical host
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=                 # optional, Search Console meta tag token
NEXT_PUBLIC_DEMO_VIDEO_ID=                            # optional, YouTube id
TRIAL_WEBHOOK_URL=                                    # set ONE delivery method
RESEND_API_KEY=
TRIAL_TO_EMAIL=
TRIAL_FROM_EMAIL=
```

`.env*` is git-ignored; only `.env.example` is committed.

---

## 15. Lessons and pitfalls (save yourself time)

- **Canonical vs served host** (section 6). Always check `curl -I` for http, https, apex, www.
- **Stale `next/image` cache** after replacing a file locally: delete `.next/cache/images`. (A recoloured logo kept showing the old purple one in a production run.)
- **Accessibility traps we hit:** `<dl>` may only contain `dt/dd` groups (icons inside broke it, use `ul`); do not skip heading levels (blog cards were `h3` under an `h1`); `aria-label` must contain the visible text; dark-theme grey text needs at least `slate-400`.
- **Client tabs:** render every panel and use `hidden`, not conditional rendering, so search engines see the text.
- **Metadata merging:** page-level `openGraph` replaces the parent's file-based image.
- **macOS shell:** `sed -i ''` needs the empty string; zsh errors on unquoted `--include=*.ts`; no `timeout` command; background servers need `run_in_background`.
- **Testing without Playwright:** drive headless Chrome over the DevTools protocol (Node has a global `WebSocket`): click tabs, fill forms, emulate mobile, screenshot. Lighthouse via `npx lighthouse` with `CHROME_PATH`.
- **Rate limits and honeypots** are best-effort in memory (per server instance); use a real limiter if traffic grows.
- **Do not fabricate** ratings, review counts, testimonials or "most popular" labels.
- **GitHub from the terminal:** `brew install gh`, then `gh auth login --web` (device code flow), `gh auth setup-git`, push. Make sure you log in as the account that owns the repo; saved credentials for another account cause "Authentication failed". Repos are public unless you change visibility.
- **Pushing to `main` publishes.** Review generated content (articles, legal text) before pushing.

---

## 16. Prompt to start the next site with Claude

Paste this into a new session, adjusting the brackets:

```
Build a website like the reference project described in WEBSITE-PLAYBOOK.md.

Business: [what is sold], market: [country/language], domain: [example.com] (served host: [www or apex]).
Brand: [name], colours: [palette], logo: [describe or provide].
Plans and prices: [table by plan and device count].
Contact: [email], [WhatsApp number]. Payments: [methods].
Pages: home, [reseller], installation/help guide, contact, about, terms, refunds, privacy policy, copyright/takedown policy, blog.

Follow the playbook: content in lib/site.ts, dark home page with the listed sections, SEO/GEO layer, generated llms.txt,
trial form with webhook or Resend delivery, blog from Markdown, Lighthouse 100 on SEO/accessibility/best practices.
Use only original or licensed images and claims I can prove. Run lint, tsc, build and a browser test after each step,
commit locally, and do not push until I say so.
```
