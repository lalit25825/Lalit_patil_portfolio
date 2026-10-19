(function () {
  // Reading-time chips set expectations and lower the perceived effort of each section.
  [['#work', 'work'], ['#approach', 'approach'], ['#about', 'about']].forEach(([sel]) => {
    const sec = document.querySelector(sel), lab = sec && sec.querySelector('.section-label'); if (!lab) return;
    const words = (sec.innerText || sec.textContent).trim().split(/\s+/).length, chip = document.createElement('span');
    chip.className = 'read-time'; chip.textContent = Math.max(15, Math.round(words / 3.3 / 5) * 5) + ' SEC READ'; lab.append(chip);
  });
  const al = document.querySelector('.approach-top .section-label');
  if (al) { const d = document.createElement('span'); d.className = 'think-dots'; d.setAttribute('aria-hidden', 'true'); d.innerHTML = '<i></i><i></i><i></i>'; al.append(d); }

  // Opening trailer: four beats, the name, then the screen parts like curtains.
  const html = document.documentElement, el = document.getElementById('intro'); if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.remove(); html.classList.remove('is-intro'); return; }
  const wordEl = document.getElementById('intro-word'), sub = document.getElementById('intro-sub'), pct = document.getElementById('intro-pct'), bar = el.querySelector('.intro-line');
  const show = (t, c) => { wordEl.innerHTML = `<span class="iw ${c || ''}"><span>${t}</span></span>`; };
  const T = 3300, t0 = performance.now(); let out = false; const timers = [];
  [['Think.', 300], ['Model.', 820], ['Build.', 1340], ['Ship.', 1860]].forEach(([w, t]) => timers.push(setTimeout(() => show(w), t)));
  timers.push(setTimeout(() => { show('Lalit <em>Patil.</em>', 'name'); sub.classList.add('on'); }, 2420), setTimeout(finish, T));
  (function tick(now) { if (out) return; const k = Math.min((now - t0) / T, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; pct.textContent = String(Math.round(e * 100)).padStart(3, '0'); bar.style.setProperty('--ip', e.toFixed(3)); if (k < 1) requestAnimationFrame(tick); })(t0);
  function finish() { if (out) return; out = true; timers.forEach(clearTimeout); pct.textContent = '100'; bar.style.setProperty('--ip', 1); el.classList.add('intro-out'); setTimeout(() => html.classList.remove('is-intro'), 650); setTimeout(() => el.remove(), 1500); }
  document.getElementById('intro-skip').addEventListener('click', e => { e.stopPropagation(); finish(); }); el.addEventListener('click', finish);
  addEventListener('keydown', e => { if (e.key === 'Escape') finish(); });
})();
