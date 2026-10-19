(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const L = [
    // [selector, type, stagger step in seconds]
    ['.section-heading h2, .approach-top h2, .rec-head h2, .cert-head h2, .resume-header h2, .contact-content h2, .project-copy h3', 'words', 0],
    ['.section-label, .rec-head .section-kicker, .capability-row, .sheet-head', 'left', .1],
    ['.section-heading-main > p, .about-lead, .about-aside-quote, .project-lede, .project-body, .project-meta, .project-foot, .contact-copy, .contact-pretitle, .contact-config-note, .contact-actions, .contact-footerline, .site-footer, .rec-note, .cert-hint, .resume-summary, .resume-role, .resume-note, .approach-foot, .sheet-foot, .marquee', 'rise', .09],
    ['.method-step, .cert-stats > div, .resume-block', 'rise', .12],
    ['.resume-side > .resume-block-label, .resume-side > p, .resume-side > .resume-stamp', 'rise', .05],
    ['.tag-list span, .resume-actions .button, .contact-actions > *', 'pop', .09],
    ['.resume-sheet', 'unfold', 0],
    ['.project-visual', 'curtain', 0],
    ['.project', 'frame', 0]
  ];
  const targets = new Set(), delays = new Map();
  L.forEach(([sel, type, step]) => document.querySelectorAll(sel).forEach(el => {
    if (el.closest('dialog') || el.closest('.hero')) return;
    el.dataset.a = type; el.classList.remove('reveal'); targets.add(el);
    const sib = [...(el.parentElement ? el.parentElement.children : [])].filter(n => n.dataset.a === type);
    delays.set(el, sib.indexOf(el) * step);
  }));

  // Split headline words so each can rise out of its own mask.
  function split(node, counter) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const w = document.createElement('span'), i = document.createElement('span');
          w.className = 'w'; i.className = 'wi'; i.style.setProperty('--k', counter.k++); i.textContent = part; w.append(i); w.setAttribute('aria-hidden', 'true'); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') split(n, counter);
    });
  }
  const proj = [...document.querySelectorAll('.project')];
  targets.forEach(el => {
    el.style.setProperty('--d', (delays.get(el) + (el.dataset.a === 'words' ? .05 : 0)) + 's');
    if (el.dataset.a === 'words') { el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim()); split(el, { k: 0 }); }
    if (el.dataset.a === 'curtain') {
      const c = document.createElement('span'); c.className = 'curtain'; c.setAttribute('aria-hidden', 'true');
      c.style.setProperty('--o', proj.indexOf(el.closest('.project')) % 2 ? '100%' : '0%'); el.prepend(c);
    }
  });

  const io = new IntersectionObserver((entries, o) => entries.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target; o.unobserve(el); el.classList.add('is-in');
    // After the entrance, hand the element back to its own hover/transition styles.
    if (!['words', 'frame'].includes(el.dataset.a)) setTimeout(() => el.removeAttribute('data-a'), 2600);
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0 });
  targets.forEach(el => io.observe(el));
})();
