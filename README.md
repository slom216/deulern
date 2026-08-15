# DeuLern landing page

Static landing page for the three free German-learning apps. Plain HTML + CSS —
no build step, no dependencies. The only JavaScript is the ~10 inline lines in each
page's `<head>` that remember the light/dark choice.

```
public/            everything that gets deployed
  index.html       English  → https://deulern.com/
  de/index.html    German   → https://deulern.com/de/
  styles.css       all design.md tokens live in the :root block at the top
  fonts/           self-hosted Manrope (variable, latin subset)
  _headers         Cloudflare Pages cache + security headers
design.md          the design system this is built to
check.mjs          SEO / link self-check
```

## Edit

Content is duplicated across the two HTML files by design — edit both when you change copy.
Retheming is the `:root` block in `styles.css` and nothing else — every colour is a
`light-dark(light, dark)` pair, and the toggle only flips `data-theme` on `<html>`.

The language switcher is a plain link: `.lang--en` on the English page, `.lang--de` on the
German one. That class decides which side is highlighted and which flag shows. No JS.

## Check

```sh
node check.mjs                  # canonical, hreflang, JSON-LD, anchors, sitemap, assets
npx wrangler pages dev public   # local preview at http://localhost:8788
```

Run `check.mjs` after any content edit — it catches the SEO breakage that is otherwise invisible.

## Deploy

```sh
npx wrangler pages deploy public
```

Custom domain `deulern.com` is set on the Pages project in the Cloudflare dashboard.

## TODO

- `og.png` (1200×630) for social sharing — the tags are in both pages, commented out.
