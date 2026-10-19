(function () {
  const deck = document.getElementById('cert-deck'); if (!deck) return;
  const cards = [...deck.querySelectorAll('.cert')], dlg = document.getElementById('cert-dialog');
  const activate = c => cards.forEach(x => x.classList.toggle('is-active', x === c));
  let idx = 0, wasActive = false, ptype = 'mouse';

  // Deal the cards onto the table when the section scrolls in.
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { deck.classList.add('dealt'); setTimeout(() => deck.classList.add('settled'), 1700); o.disconnect(); } }, { threshold: .25 }).observe(deck);

  cards.forEach((c, i) => {
    c.addEventListener('pointerdown', e => { ptype = e.pointerType; wasActive = c.classList.contains('is-active'); });
    c.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') activate(c); });
    c.addEventListener('focus', () => activate(c));
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%'); c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%'); });
    c.addEventListener('click', () => { if (ptype === 'touch' && !wasActive) { activate(c); return; } open(i); });
  });

  function open(i) {
    idx = (i + cards.length) % cards.length; const c = cards[idx], d = c.dataset;
    dlg.querySelector('.cd-img img').src = c.querySelector('img').src; dlg.querySelector('.cd-img img').alt = d.title + ' certificate';
    dlg.querySelector('.cd-kind').textContent = d.kind; dlg.querySelector('h3').textContent = d.title;
    dlg.querySelector('.cd-issuer').innerHTML = d.issuer; dlg.querySelector('.cd-date').textContent = 'Issued ' + d.date;
    dlg.querySelector('ul').innerHTML = d.tasks.split('|').map(t => '<li></li>').join(''); dlg.querySelectorAll('li').forEach((li, k) => li.textContent = d.tasks.split('|')[k]);
    dlg.querySelector('.cd-id').textContent = d.id ? 'Certificate ID · ' + d.id : '';
    const a = dlg.querySelector('.cd-save'); a.href = c.querySelector('img').src; a.download = d.title.replace(/[^a-z0-9]+/gi, '_') + '_Certificate.jpg';
    if (!dlg.open) dlg.showModal(); activate(c);
  }
  dlg.querySelector('.cd-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelectorAll('.cd-nav button').forEach(b => b.addEventListener('click', () => open(idx + +b.dataset.dir)));
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight') open(idx + 1); if (e.key === 'ArrowLeft') open(idx - 1); });

  // Count-up for the stats.
  document.querySelectorAll('.cert-stats b').forEach(el => {
    const n = +el.dataset.count; el.textContent = '0';
    new IntersectionObserver((e, o) => { if (!e[0].isIntersecting) return; o.disconnect(); const t0 = performance.now(); (function f(t) { const k = Math.min((t - t0) / 1100, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0); }).observe(el);
  });
})();
