# IPTV Polska (Next.js)

Next.js (App Router, Tailwind v4) website for www.iptvpolonia.pl.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Where things live
- `lib/site.ts`  contact details, plans, prices, FAQ, installation guide (edit content here)
- `app/`         pages (home, sprzedawca-iptv, przewodnik-instalacji, skontaktuj-sie-z-nami, o-nas, regulamin-iptv, zasady-zwrotow-i-anulowania)
- `public/images` images downloaded from the old WordPress uploads
- `next.config.ts` 308 redirects for old WooCommerce URLs (/shop, /cart, /checkout, /my-account)

## Environment
`NEXT_PUBLIC_SITE_URL` (default `https://www.iptvpolonia.pl`, the address your host serves) is used for canonical URLs, sitemap and robots.

## Orders
WooCommerce checkout is not migrated. "Zamów teraz" buttons open WhatsApp with the chosen plan prefilled.

## SEO / AI search
- Per-page `<title>`, description, canonical, Open Graph and Twitter cards via `pageMetadata()` in `lib/seo.ts`.
- JSON-LD: Organization, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList, Product + AggregateOffer (prices), FAQPage, Service (reseller), HowTo (installation guide).
- `app/robots.ts` explicitly allows Googlebot, Bingbot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, ...). `public/llms.txt` summarises the site for LLMs.
- `app/sitemap.ts` uses the fixed `LAST_MODIFIED` date in `lib/seo.ts`. Update it only when content really changes.
- Set `NEXT_PUBLIC_SITE_URL` and (optional) `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the host's environment.
- Keep prices in `lib/site.ts` only; the pricing cards, comparison table, JSON-LD and `public/llms.txt` must match (llms.txt is manual).

## Home page conversion features
- **Free-trial form** (`components/trial-form.tsx`, `app/api/trial/route.ts`). Set ONE of `TRIAL_WEBHOOK_URL` or `RESEND_API_KEY` + `TRIAL_TO_EMAIL` to receive leads. With neither set, visitors are sent to WhatsApp with their details prefilled, so nothing is lost.
- **Hero demo video**: set `NEXT_PUBLIC_DEMO_VIDEO_ID` to a YouTube id. It loads only after the visitor clicks play.
- **Real reviews**: fill `TESTIMONIALS` and `REVIEW_BADGE` in `lib/reviews.ts`. Blocks appear only when they contain data. Never add invented reviews.
- **Prices**: all in `lib/site.ts` (`PRICES`). Tiers 4 and 5 devices are extrapolated, adjust as needed.

## Blog: how to add an article
1. Create a file in `content/blog/`, for example `content/blog/moj-artykul.md`. The file name becomes the URL: `/blog/moj-artykul` (lowercase letters, digits and hyphens only).
2. Start the file with this header, then write the article in Markdown. Do not add a `#` title, it is generated from `title`. Use `##` for sections and `###` for sub-sections.

       ---
       title: "Tytuł artykułu"
       description: "Opis do Google, około 150 znaków."
       date: "2026-09-21"
       updated: "2026-10-05"   # optional, only when you really update it
       tags: ["poradnik", "fire tv"]
       ---

3. `git add -A`, `git commit`, `git push`. Vercel publishes it in about a minute.
4. Files whose name starts with `_` are drafts and are not published. A `date` in the future hides the article until that day.

Each article gets its own page, social image, Article and breadcrumb data, sitemap entry, RSS item (`/blog/feed.xml`), `llms.txt` line, a table of contents and a call-to-action box. Links to other pages are written as `[text](/przewodnik-instalacji)`. Do not use other companies' logos or screenshots.
