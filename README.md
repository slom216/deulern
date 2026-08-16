# DeuLern landing page

Static landing page for the three free German-learning apps. Plain HTML + CSS —
no build step, no dependencies. The only JavaScript is the ~10 inline lines in each
page's `<head>` that remember the light/dark choice.

```
public/               everything that gets deployed
  index.html          English  → https://deulern.com/
  de/index.html       German   → https://deulern.com/de/
  404.html            English 404
  de/404.html         German 404 — Workers Assets serves the *nearest* 404.html
  styles.css          all design.md tokens live in the :root block at the top
  fonts/              self-hosted Manrope (variable, latin subset)
  favicon.svg         the source mark
  favicon.ico         16/32/48 raster fallback — crawlers only ever probe this path
  apple-touch-icon.png  180×180
  _headers            cache + security headers, incl. HSTS (Workers Assets honours this file)
design.md             the design system this is built to
check.mjs             SEO / link self-check
wrangler.toml         assets-only Worker — no script, public/ is served directly
```

## Edit

Content is duplicated across the two HTML files by design — edit both when you change copy.
The `<head>` block and the inline theme script are duplicated across all four HTML files
(both landing pages and both 404s) — keep them identical.
Retheming is the `:root` block in `styles.css` and nothing else — every colour is a
`light-dark(light, dark)` pair, and the toggle only flips `data-theme` on `<html>`.

The language switcher is a plain link: `.lang--en` on the English page, `.lang--de` on the
German one. That class decides which side is highlighted and which flag shows. No JS.

## Check

```sh
node check.mjs                  # canonical, hreflang, JSON-LD, anchors, sitemap, assets
npx wrangler dev                # local preview at http://localhost:8787
```

Run `check.mjs` after any content edit — it catches the SEO breakage that is otherwise invisible.

## Deploy

```sh
npx wrangler deploy
```

Custom domain `deulern.com` is set on the Worker in the Cloudflare dashboard. In Workers Builds
the build command stays empty, deploy command is `npx wrangler deploy` — there is nothing to build.

## Cloudflare dashboard — not in this repo

Four things cannot live in an assets-only Worker (`_redirects` does not support domain-level
redirects, and DNS is not a file here). Set them once in the dashboard; they are written down
here so they survive the next time the domain is touched.

**1. Force HTTPS** — SSL/TLS → Edge Certificates → **Always Use HTTPS: on**.
Leave the dashboard **HSTS toggle off** — `public/_headers` already sends
`Strict-Transport-Security`, and enabling both ships the header twice.

**2. www must resolve** — DNS → Records: a **proxied** (orange cloud) `CNAME www → deulern.com`.
A redirect rule cannot catch a hostname that does not resolve.

**3. www → apex, 301** — Rules → Redirect Rules → Create rule:

```
If    hostname equals www.deulern.com
Then  Dynamic redirect
      Expression: concat("https://deulern.com", http.request.uri)
      Status: 301
      [x] Preserve query string
```

**4. Email spoofing (SPF + DMARC)** — DNS → Records, TXT. Order matters:

- Setting up **Email Routing** for `hallo@deulern.com` first? Cloudflare writes its own SPF
  (`v=spf1 include:_spf.mx.cloudflare.net ~all`) plus MX records — **keep those**, do not
  replace them with the strict record below or forwarding breaks.
- Not routing any mail on the domain? TXT on `deulern.com`: `v=spf1 -all`
- Either way, TXT on `_dmarc`: `v=DMARC1; p=reject; rua=mailto:hallo@deulern.com`
- And TXT on `*._domainkey`: `v=DKIM1; p=` (null DKIM — nothing signs as this domain)

Verify after deploy:

```sh
curl -sI http://deulern.com/ | head -2         # 301 → https://
curl -sI https://www.deulern.com/ | head -2    # 301 → apex
curl -sI https://deulern.com/ | grep -i strict-transport
dig +short TXT deulern.com _dmarc.deulern.com
```

## Known gaps

- **Render-blocking CSS**: `styles.css` is one 13.5 KB same-origin file, cached, with the font
  preloaded and `font-display: swap`. Audits flag any stylesheet in `<head>`; inlining it would
  duplicate it into four pages and kill cross-page caching. Left alone on purpose.

## TODO

- `og.png` (1200×630) for social sharing — the tags are in both pages, commented out. Until it
  exists, `twitter:card=summary_large_image` renders without an image.
