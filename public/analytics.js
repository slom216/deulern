/* GA4, gated on consent.
   Nothing is loaded from Google and no cookie is set until the visitor accepts.
   The choice is stored in localStorage and can be changed again from the footer link. */
(() => {
  const GA_ID = 'G-XZ0B7G1Z7B';
  const KEY = 'deulernConsent';
  const de = document.documentElement.lang === 'de';

  const t = de ? {
    text: 'Wir nutzen Google Analytics, um zu sehen, wie viele Menschen die Seite finden. Ohne deine Zustimmung wird nichts geladen und kein Cookie gesetzt.',
    yes: 'Einverstanden', no: 'Ablehnen', link: 'Cookies', label: 'Cookie-Hinweis',
  } : {
    text: 'We use Google Analytics to see how many people find the site. Nothing is loaded and no cookie is set unless you accept.',
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

  function decide(ok) {
    try { localStorage[KEY] = ok ? 'yes' : 'no'; } catch {}
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
      `<button class="btn btn--secondary" data-consent="no">${t.no}</button>` +
      `<button class="btn btn--primary" data-consent="yes">${t.yes}</button></div>`;
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
    a.addEventListener('click', e => {
      e.preventDefault();
      try { delete localStorage[KEY]; } catch {}
      banner();
    });
    span.appendChild(a);
    meta.appendChild(span);
  }

  const style = document.createElement('style');
  style.textContent = `
.consent{position:fixed;left:var(--s-sm);right:var(--s-sm);bottom:var(--s-sm);z-index:99;
  max-width:640px;margin-inline:auto;padding:var(--s-sm) var(--s-md);
  display:flex;flex-wrap:wrap;gap:var(--s-sm);align-items:center;justify-content:space-between;
  background:var(--paper);border:1px solid var(--rule-strong);border-radius:var(--r-md);
  box-shadow:0 8px 32px #0003;color:var(--ink)}
.consent p{margin:0;flex:1 1 240px;font-size:.875rem;line-height:1.5}
.consent__btns{display:flex;gap:var(--s-xs)}
.consent .btn{padding:8px 16px;font-size:.875rem}
.consent .btn::after{content:none}`;
  document.head.appendChild(style);

  const choice = (() => { try { return localStorage[KEY]; } catch { return undefined; } })();
  if (choice === 'yes') loadGA();
  else if (choice !== 'no') banner();
  footerLink();
})();
