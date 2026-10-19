(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const $ = (q) => [...document.querySelectorAll(q)], clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const hero = document.querySelector('.hero'), header = document.querySelector('.site-header');
  const projects = $('.project'), ghosts = $('[data-ghost]'), marq = document.querySelector('.marquee-track');
  const pin = document.getElementById('cert-pin'), cards = $('#cert-deck .cert');
  let y = scrollY, last = y, vel = 0, dir = 1, raf = 0, hp = -1, mqOn = false, mx = 0, ct = 0, tgt = 0, cw = 0, mt = -1, stackOn = false;
  const deck = document.getElementById('cert-deck'), trk = document.querySelector('.method-track'), steps = $('.method-step'), dots = $('.method-line span'), loop = document.querySelector('.loop-mark');
  document.documentElement.classList.add('scrub');

  // Words that light up as their paragraph scrolls through the viewport.
  const groups = $('.about-lead, .contact-copy').map(el => {
    const spans = [];
    (function walk(node) { [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) f.append(t); else { const sp = document.createElement('span'); sp.className = 'sw'; sp.textContent = t; spans.push(sp); f.append(sp); } }); n.replaceWith(f); }
      else if (n.nodeType === 1) walk(n); }); })(el);
    return { el, spans, lit: 0 };
  });

  // Project cards only stack when they fit the screen.
  function checkStack() {
    stackOn = innerWidth >= 960 && innerHeight >= 640 && projects.length > 1 && projects.every(p => p.offsetHeight <= innerHeight - 130);
    projects.forEach(p => { p.classList.toggle('stack', stackOn); if (!stackOn) { p.style.transform = ''; p.style.opacity = ''; } });
  }
  function paintDeck() {
    cards.forEach((c, k) => { const d = k - ct, a = Math.abs(d), sp = cw * .62, x = Math.sign(d) * (Math.min(a, 1) * sp * 1.18 + Math.max(a - 1, 0) * sp * .5);
      c.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px),0,${(-a * 90).toFixed(0)}px) rotateY(${clamp(-d * 30, -48, 48).toFixed(1)}deg) scale(${(1 - Math.min(a, 2.2) * .13).toFixed(3)})`;
      c.style.setProperty('--o', (1 - Math.min(a, 3) * .24).toFixed(3)); c.style.setProperty('--f', clamp(1 - a * 1.5).toFixed(3)); c.style.zIndex = Math.round(100 - a * 10); });
  }
  function setMode() {
    const on = innerWidth > 760; document.documentElement.classList.toggle('cf', on);
    if (on && deck) { cw = deck.offsetHeight * 1.414; deck.style.setProperty('--cw', cw + 'px'); paintDeck(); }
    else cards.forEach(c => { c.style.transform = ''; c.style.zIndex = ''; c.style.removeProperty('--o'); c.style.removeProperty('--f'); });
  }
  if (deck) deck.addEventListener('click', e => { if (!document.documentElement.classList.contains('cf')) return; const c = e.target.closest('.cert'); if (!c) return; const k = cards.indexOf(c); if (Math.abs(k - ct) < .5) return;
    e.stopPropagation(); const top = pin.getBoundingClientRect().top + scrollY, span = pin.offsetHeight - pin.firstElementChild.offsetHeight; scrollTo({ top: top - 84 + (k / (cards.length - 1)) * span, behavior: 'smooth' }); }, true);
  checkStack(); setMode(); addEventListener('resize', () => { checkStack(); setMode(); request(); });

  new IntersectionObserver(e => { mqOn = e[0].isIntersecting; request(); }).observe(document.querySelector('.marquee') || document.body);

  function frame() {
    raf = 0; y = scrollY; const dy = y - last; last = y; vel += (dy - vel) * .14; if (Math.abs(dy) > .5) dir = dy > 0 ? 1 : -1;
    const vh = innerHeight, W = innerWidth;

    // hero: drift + fade as you leave
    const p = clamp(y / (hero ? hero.offsetHeight : 1)); if (hero && Math.abs(p - hp) > .002) { hp = p; hero.style.setProperty('--hp', p.toFixed(3)); }

    // header: hide on the way down, show on the way up
    if (header) { const open = header.querySelector('[aria-expanded="true"]'); header.classList.toggle('is-hidden', !open && y > 260 && (dy > 3 || (header.classList.contains('is-hidden') && dy > -3))); }

    // projects: the card underneath shrinks and dims as the next one slides over it
    if (stackOn) projects.forEach((pr, i) => {
      const nx = projects[i + 1]; if (!nx) return;
      const t = clamp(1 - (nx.getBoundingClientRect().top - 92) / (vh * .75));
      pr.style.transform = `scale(${(1 - .07 * t).toFixed(4)})`; pr.style.opacity = (1 - .55 * t).toFixed(3);
    });

    // scrubbed words
    groups.forEach(g => { const r = g.el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
      const n = Math.round(clamp((vh * .9 - r.top) / (vh * .55 + r.height * .3)) * g.spans.length);
      if (n !== g.lit) { for (let i = Math.min(n, g.lit); i < Math.max(n, g.lit); i++) g.spans[i].classList.toggle('on', i < n); g.lit = n; } });

    // ghost headlines slide sideways against the scroll
    ghosts.forEach(el => { const r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const t = clamp((vh - r.top) / (vh + r.height)), d = +el.dataset.ghost, x = d > 0 ? -(1 - t) * W * .9 : -t * W * .9;
      el.style.transform = `translate3d(${x.toFixed(1)}px,-50%,0)`; });

    // certificates: spring-eased coverflow driven by the pinned scroll position
    if (pin && deck && document.documentElement.classList.contains('cf')) {
      const r = pin.getBoundingClientRect(), span = pin.offsetHeight - pin.firstElementChild.offsetHeight;
      tgt = clamp((84 - r.top) / span) * (cards.length - 1); ct += (tgt - ct) * .11; if (Math.abs(tgt - ct) < .0008) ct = tgt; paintDeck();
    }

    // "Think it through": the line fills, steps light up in turn, the loop arrow turns
    if (trk) { const r = trk.getBoundingClientRect(); if (r.bottom > -100 && r.top < vh + 100) { const t = clamp((vh * .78 - r.top) / (r.height * .85 + vh * .12));
      if (Math.abs(t - mt) > .004) { mt = t; trk.style.setProperty('--mp', t.toFixed(3)); steps.forEach((el, i) => el.classList.toggle('lit', t >= i / 3 + .04)); dots.forEach((d, i) => d.classList.toggle('lit', t >= i / 3)); } } }
    if (loop) { const r = loop.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) loop.style.transform = `rotate(${(-(1 - r.top / vh) * 540).toFixed(1)}deg)`; }

    // marquee: speed and skew follow scroll velocity and direction
    if (marq && mqOn) { const half = marq.scrollWidth / 2 || 1; mx = (mx + dir * (.7 + Math.min(Math.abs(vel), 60) * .45)) % half; if (mx < 0) mx += half;
      marq.style.transform = `translate3d(${(-mx).toFixed(1)}px,0,0) skewX(${(-clamp(vel, -40, 40) * .22).toFixed(2)}deg)`; }

    if (mqOn || Math.abs(vel) > .05 || Math.abs(tgt - ct) > .0008) request();
  }
  function request() { if (!raf) raf = requestAnimationFrame(frame); }
  addEventListener('scroll', request, { passive: true }); request();
})();
