/* GA4, gated on consent. Served from deulern.com and loaded by every DeuLern app
   (verben., wortschatz., grammatik., lese.), so the subapps run this exact file.
   Nothing is loaded from Google until the visitor accepts. The choice lives in a
   first-party cookie on .deulern.com, so one answer covers every subdomain, and can be
   changed again from the footer link or any [data-consent-open] element. */
(() => {
  // off on localhost and previews: keeps dev traffic out of GA and the banner out of e2e tests
  if (!/(^|\.)deulern\.com$/.test(location.hostname)) return;
  const GA_ID = 'G-XZ0B7G1Z7B';
  const KEY = 'deulernConsent';
  const de = document.documentElement.lang === 'de';

  const t = de ? {
    text: 'Wir nutzen Google Analytics, um zu sehen, wie viele Menschen die Seite finden. Ohne deine Zustimmung wird nichts von Google geladen.',
    yes: 'Einverstanden', no: 'Ablehnen', link: 'Cookies', label: 'Cookie-Hinweis',
  } : {
    text: 'We use Google Analytics to see how many people find the site. Nothing is loaded from Google unless you accept.',
    yes: 'Accept', no: 'Decline', link: 'Cookies', label: 'Cookie notice',
  };

  let loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function save(v) {
    document.cookie = `${KEY}=${v}; domain=deulern.com; path=/; max-age=${v ? 31536000 : 0}; SameSite=Lax; Secure`;
    try { delete localStorage[KEY]; } catch {} // pre-cookie choices lived here
  }

  function decide(ok) {
    save(ok ? 'yes' : 'no');
    document.querySelector('.consent')?.remove();
    if (ok) loadGA();
  }

  function banner() {
    if (document.querySelector('.consent')) return;
    const el = document.createElement('div');
    el.className = 'consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', t.label);
    el.innerHTML =
      `<p>${t.text}</p><div class="consent__btns">` +
      `<button class="consent__btn" data-consent="no">${t.no}</button>` +
      `<button class="consent__btn consent__btn--yes" data-consent="yes">${t.yes}</button></div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-consent]');
      if (b) decide(b.dataset.consent === 'yes');
    });
    document.body.appendChild(el);
  }

  /* Withdrawing consent has to be as easy as giving it, so the footer gets its own link. */
  function footerLink() {
    const meta = document.querySelector('.footer__meta');
    if (!meta) return;
    const span = document.createElement('span');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = t.link;
    a.dataset.consentOpen = '';
    span.appendChild(a);
    meta.appendChild(span);
  }

  /* Delegated, so links the React apps render (and re-render) work without wiring. */
  document.addEventListener('click', e => {
    if (!e.target.closest?.('[data-consent-open]')) return;
    e.preventDefault();
    save('');
    banner();
  });

  /* Self-contained: the apps share the palette but not token names. A constructed sheet,
     not a <style> tag, because the subapps' CSP has style-src 'self'. */
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
.consent{position:fixed;left:14px;right:14px;bottom:14px;z-index:1000;
  max-width:640px;margin-inline:auto;padding:14px 28px;box-sizing:border-box;
  display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;
  background:light-dark(#e6ddcc,#1c1a17);color:light-dark(#141414,#efe6d6);
  border:1px solid light-dark(#14141499,#efe6d699);border-radius:3px;
  box-shadow:0 8px 32px #0003;font:inherit}
.consent p{margin:0;flex:1 1 240px;font-size:.875rem;line-height:1.5}
.consent__btns{display:flex;gap:6px}
.consent__btn{min-height:40px;padding:8px 16px;border:2px solid currentColor;border-radius:3px;
  background:transparent;color:inherit;font:inherit;font-size:.875rem;font-weight:700;cursor:pointer}
.consent__btn:hover{background:light-dark(#141414,#efe6d6);color:light-dark(#e6ddcc,#1c1a17)}
.consent__btn--yes,.consent__btn--yes:hover{background:#c63f1e;border-color:#c63f1e;color:#fbf5ea}
.consent__btn--yes:hover{background:color-mix(in srgb,#c63f1e 80%,#141414)}
.consent__btn:focus-visible{outline:2px solid light-dark(#2f5f8f,#8fb3dc);outline-offset:2px}`);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

  let choice = document.cookie.match(new RegExp(`(?:^|; )${KEY}=(yes|no)`))?.[1];
  if (!choice) {
    try { choice = localStorage[KEY]; } catch {}
    if (choice === 'yes' || choice === 'no') save(choice);
  }
  if (choice === 'yes') loadGA();
  else if (choice !== 'no') banner();
  footerLink();
})();
