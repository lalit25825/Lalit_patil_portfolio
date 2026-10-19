(function () {
  // Pause looping animations in sections that are off-screen.
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-off', !e.isIntersecting)), { rootMargin: '120px 0px' });
  document.querySelectorAll('section, .marquee').forEach(el => io.observe(el));

  // Achievements: draw the rule, then lift the numerals into place.
  const rec = document.querySelector('.recognition'); if (!rec) return;
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { o.disconnect(); rec.classList.add('in'); } }, { threshold: .3 }).observe(rec);
})();
