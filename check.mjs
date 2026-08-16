#!/usr/bin/env node
// SEO self-check. The stuff that breaks silently and costs rankings: run `node check.mjs`.
// ponytail: regex over raw HTML, no parser dep — fine for two hand-written files.
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const BASE = 'https://deulern.com';
const APPS = ['grammatik', 'wortschatz', 'verben'].map(s => `https://${s}.deulern.com`);
const PAGES = [
  { file: 'public/index.html', lang: 'en', url: `${BASE}/` },
  { file: 'public/de/index.html', lang: 'de', url: `${BASE}/de/` },
];

const all = m => s => [...s.matchAll(m)].map(x => x[1]);
const attrs = tag => all(new RegExp(`<${tag}[^>]*?(?:href|content)="([^"]+)"`, 'gi'));

for (const { file, lang, url } of PAGES) {
  const html = readFileSync(file, 'utf8');
  const where = `${file}:`;

  assert.match(html, new RegExp(`<html lang="${lang}"`), `${where} <html lang="${lang}"> missing`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${where} needs exactly one <h1>`);

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title && title.length <= 70, `${where} title missing or >70 chars (${title?.length})`);

  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(desc && desc.length >= 70 && desc.length <= 175,
    `${where} meta description missing or outside 70-175 chars (${desc?.length})`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, url, `${where} canonical should be ${url}`);

  // hreflang must be reciprocal and absolute: both pages advertise both languages + x-default
  const hreflangs = Object.fromEntries(
    [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map(m => [m[1], m[2]])
  );
  assert.deepEqual(hreflangs, { en: `${BASE}/`, de: `${BASE}/de/`, 'x-default': `${BASE}/` },
    `${where} hreflang set is not the reciprocal en/de/x-default trio`);

  for (const app of APPS) assert.ok(html.includes(app), `${where} missing link to ${app}`);

  assert.ok(html.includes(`<meta property="og:url" content="${url}">`), `${where} og:url wrong`);

  const ld = all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)(html);
  assert.equal(ld.length, 3, `${where} expected 3 JSON-LD blocks, found ${ld.length}`);
  const types = ld.map(b => JSON.parse(b)['@type']); // throws on invalid JSON
  assert.deepEqual(types, ['WebSite', 'ItemList', 'FAQPage'], `${where} JSON-LD types wrong`);

  // every FAQ answer in the structured data must exist as visible text
  const faq = JSON.parse(ld[2]).mainEntity;
  for (const q of faq) {
    assert.ok(html.includes(`<summary>${q.name}</summary>`),
      `${where} FAQ question not visible on page: ${q.name}`);
    assert.ok(html.includes(q.acceptedAnswer.text),
      `${where} FAQ answer not visible on page: ${q.name}`);
  }

  // raster icon fallbacks: crawlers and older browsers only ever probe /favicon.ico
  assert.ok(html.includes('href="/favicon.ico"'), `${where} /favicon.ico not referenced`);
  assert.ok(html.includes('href="/apple-touch-icon.png"'), `${where} apple-touch-icon not referenced`);

  // trust signals — a reachable human is the one the audit actually scores
  assert.ok(html.includes('mailto:hallo@deulern.com'), `${where} contact address missing`);

  // sharing: plain links, so the only way they break is by disappearing
  const shares = attrs('a')(html).filter(h => /x\.com\/intent|facebook\.com\/sharer|wa\.me|reddit\.com\/submit|^mailto:\?/.test(h));
  assert.ok(shares.length >= 3, `${where} expected 3+ share links, found ${shares.length}`);

  // the theme toggle is inert without both halves — markup and the listener that reads it
  assert.ok(/<button class="theme-toggle"[^>]*aria-label="[^"]+"/.test(html),
    `${where} theme toggle button missing or unlabelled`);
  assert.ok(html.includes("e.target.closest('.theme-toggle')"), `${where} theme script missing`);

  // internal anchors must resolve
  for (const href of attrs('a')(html).filter(h => h.startsWith('#'))) {
    assert.ok(html.includes(`id="${href.slice(1)}"`), `${where} dead anchor ${href}`);
  }
}

// sitemap URLs must map to files that actually ship
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const locs = all(/<loc>([^<]+)<\/loc>/g)(sitemap);
assert.deepEqual(locs, PAGES.map(p => p.url), 'sitemap <loc> set does not match the pages');
for (const loc of locs) {
  const f = 'public' + new URL(loc).pathname + 'index.html';
  assert.ok(existsSync(f.replace('//', '/')), `sitemap lists ${loc} but ${f} does not exist`);
}
assert.ok(readFileSync('public/robots.txt', 'utf8').includes(`${BASE}/sitemap.xml`),
  'robots.txt does not point at the sitemap');

// referenced assets exist
for (const f of ['public/styles.css', 'public/favicon.svg', 'public/favicon.ico',
                 'public/apple-touch-icon.png', 'public/fonts/manrope-var-latin.woff2']) {
  assert.ok(existsSync(f), `missing asset ${f}`);
}

// custom 404s — one per language, since Workers Assets serves the nearest 404.html.
// Deliberately absent from sitemap.xml, so they are checked here instead of in PAGES.
for (const f of ['public/404.html', 'public/de/404.html']) {
  assert.ok(existsSync(f), `missing ${f}`);
  const html = readFileSync(f, 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${f}: needs exactly one <h1>`);
  assert.match(html, /<meta name="robots" content="noindex/, `${f}: must be noindex`);
  assert.ok(html.includes('href="/styles.css"'), `${f}: not styled`);
}
assert.match(readFileSync('wrangler.toml', 'utf8'), /not_found_handling\s*=\s*"404-page"/,
  'wrangler.toml does not wire up the custom 404 pages');

// HSTS is set here rather than in the Cloudflare dashboard — set it in both and it ships twice
assert.match(readFileSync('public/_headers', 'utf8'), /Strict-Transport-Security: max-age=\d+/,
  '_headers is missing the HSTS header');

console.log('ok — SEO, hreflang, JSON-LD, anchors, icons, sharing, 404s and headers all check out');
