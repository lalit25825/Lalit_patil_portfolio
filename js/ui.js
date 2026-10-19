(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Highlight the nav link for the section in view.
  const links = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(a => { const t = document.querySelector(a.getAttribute('href')); if (t) io.observe(t); });
  }

  if (reduce || !window.matchMedia('(pointer: fine)').matches) return;

  // Soft light that trails the pointer.
  const glow = document.createElement('div'); glow.className = 'cursor-glow'; glow.setAttribute('aria-hidden', 'true');
  document.body.append(glow);
  let gx = 0, gy = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; glow.classList.add('on'); if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  document.addEventListener('pointerleave', () => glow.classList.remove('on'));
  let raf = 0; function tick() { gx += (tx - gx) * .2; gy += (ty - gy) * .2; glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`; raf = (Math.abs(tx - gx) + Math.abs(ty - gy) > .4) ? requestAnimationFrame(tick) : 0; }

  // Gentle magnetic pull on primary buttons.
  document.querySelectorAll('.button, .nav-contact').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * .18}px ${(e.clientY - r.top - r.height / 2) * .28}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });
})();
