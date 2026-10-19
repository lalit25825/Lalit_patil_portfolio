(() => {
  'use strict';

  // Contact links (taken from your résumé). Edit here to change what the Contact section shows.
  const SITE = {
    email: 'lalitpatil25825@gmail.com',
    github: 'https://github.com/lalit25825',
    linkedin: 'https://www.linkedin.com/in/lalit-patil-66675735a/'
  };

  document.documentElement.classList.add('js-ready');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.getElementById('page-progress-bar');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const dialog = document.getElementById('project-dialog');
  const closeDialog = document.getElementById('dialog-close');
  const nextDialog = document.getElementById('dialog-next');
  const lastFocused = { element: null };

  const projects = {
    agritwin: {
      kicker: 'CASE FILE / 001 · AGRICULTURAL SYSTEMS',
      overline: 'CONCEPT / SYSTEM ARCHITECTURE',
      title: 'AgriTwin',
      summary: 'A national-scale multi-agent digital-twin concept for more climate-resilient agricultural supply-chain decisions.',
      problem: 'Agricultural supply chains involve coupled decisions around harvest timing, cold storage, routes, market conditions and climate risk. Optimizing one piece in isolation can push cost or waste into another part of the system.',
      approach: 'Explore a cooperating set of agents for harvesting, cold-chain allocation, logistics, market intelligence, climate risk and equity. The concept treats decisions as connected constraints, not independent features.',
      status: 'Research and architecture concept in development. The contribution represented here is the problem framing and multi-agent system direction; a complete deployed system and its target outcomes are not claimed.',
      stack: 'Proposed direction: Python / PyTorch, graph modelling, event-driven data flows, analytical dashboards, containers and orchestration. These are planned or explored components, not a claim that the full stack is deployed.',
      honesty: 'Status note: this is a concept and system-design effort. Performance targets in early planning are goals to evaluate, not measured results.'
    },
    krishiment: {
      kicker: 'CASE FILE / 002 · RURAL DIGITAL SERVICES',
      overline: 'PRODUCT CONCEPT / COORDINATION',
      title: 'Krishiment',
      summary: 'A farmer-first digital platform concept for coordinating agricultural labour needs and local worker availability.',
      problem: 'Finding the right people for time-sensitive agricultural work can be fragmented. The product question is how to make tasks, location, availability and trust easier to coordinate without making the workflow harder for the people using it.',
      approach: 'Frame two clear sides of the marketplace: farmers posting work and workers finding relevant opportunities. Location and availability are core parts of the matching idea, with usability and access treated as product requirements.',
      status: 'Product concept and planned platform direction. This page visualizes the intended matching model; it does not claim a live marketplace, active user base or completed production deployment.',
      stack: 'Proposed architecture explored: React Native / React, Django, a relational or document database, Socket.IO, maps integration and cloud hosting. Validate the final stack against the implementation before launch.',
      honesty: 'Status note: the visual is an explanatory system model, not a screenshot of a shipped application.'
    },
    isl: {
      kicker: 'CASE FILE / 003 · COMPUTER VISION',
      overline: 'TEAM PROJECT / SEPT 2025',
      title: 'Indian Sign Language Detector',
      summary: 'A real-time gesture recognition system that uses computer vision and machine learning to detect Indian Sign Language signs from a camera feed.',
      problem: 'Sign language is a full language, yet most software cannot read it. Recognising gestures live means handling changing hands, lighting and backgrounds frame after frame.',
      approach: 'Python and OpenCV handle image processing and hand-gesture recognition, with machine learning turning what the camera sees into an ISL sign.',
      status: 'Team project, September 2025. Role: team member, contributing to the real-time ISL gesture recognition system.',
      stack: 'Python, OpenCV, machine learning, computer vision.',
      honesty: 'Status note: details come from the résumé. No accuracy figures or dataset are stated, so none are claimed here. The artwork is an editorial illustration, not a screenshot.'
    },
    'crop-model': {
      kicker: 'CASE FILE / 004 · APPLIED MACHINE LEARNING',
      overline: 'MODEL EXPERIMENT / REGRESSION',
      title: 'Weather to value',
      summary: 'A small crop-price prediction experiment using rainfall as an input to a linear-regression model.',
      problem: 'Agricultural prices depend on many factors. Testing a simple predictor is useful for learning how to formulate features, fit a baseline model and interrogate what the model cannot explain.',
      approach: 'Use rainfall as a candidate input, establish a linear-regression baseline and treat the result as a starting point for data exploration. A stronger version would compare other variables, test on held-out data and report errors clearly.',
      status: 'Experiment / prototype. No accuracy, forecasting gain or real-world price impact is claimed because the underlying dataset, validation procedure and results were not available here.',
      stack: 'Python, data analysis and a linear-regression baseline.',
      honesty: 'Status note: the chart is schematic and illustrates the modelling idea only. It is not actual training data or a result plot.'
    }
  };
  const projectOrder = Object.keys(projects);
  let currentProjectIndex = 0;

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
  }

  let scrollScheduled = false;
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      scrollScheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Reveal content only when it enters the reading area; keep it visible without JS or with reduced motion.
  const revealTargets = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach((el, index) => {
      // Tiny variation is tied to composition, not a global animation preset.
      if (el.classList.contains('project')) el.style.setProperty('--reveal-order', index % 3);
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Mobile menu uses one consistent state and closes on navigation, Escape, or an outside click.
  function setMenu(open) {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  }
  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
  });

  function renderProject(projectKey) {
    const item = projects[projectKey];
    if (!item || !dialog) return;
    currentProjectIndex = projectOrder.indexOf(projectKey);
    document.getElementById('dialog-kicker').textContent = item.kicker;
    document.getElementById('dialog-overline').textContent = item.overline;
    document.getElementById('dialog-title').textContent = item.title;
    document.getElementById('dialog-summary').textContent = item.summary;
    document.getElementById('dialog-problem').textContent = item.problem;
    document.getElementById('dialog-approach').textContent = item.approach;
    document.getElementById('dialog-status').textContent = item.status;
    document.getElementById('dialog-stack').textContent = item.stack;
    document.getElementById('dialog-honesty').textContent = item.honesty;
    nextDialog.innerHTML = currentProjectIndex === projectOrder.length - 1 ? 'Back to first <span>↻</span>' : 'Next project <span>→</span>';
  }

  document.querySelectorAll('[data-open-project]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-open-project');
      renderProject(key);
      lastFocused.element = button;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('dialog-open');
      closeDialog.focus();
    });
  });
  function dismissDialog() {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
    lastFocused.element?.focus();
  }
  closeDialog?.addEventListener('click', dismissDialog);
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dismissDialog();
  });
  dialog?.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    lastFocused.element?.focus();
  });
  nextDialog?.addEventListener('click', () => {
    const nextIndex = (currentProjectIndex + 1) % projectOrder.length;
    renderProject(projectOrder[nextIndex]);
    document.querySelector('.dialog-content')?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // Gently respond to a pointer on the hero artwork. The transform is deliberately restrained.
  const artStage = document.getElementById('art-stage');
  const systemDiagram = document.getElementById('system-diagram');
  if (artStage && systemDiagram && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let pointerFrame = null;
    artStage.addEventListener('pointermove', event => {
      const box = artStage.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        systemDiagram.style.transform = `translate(${x * 5}px, ${y * 5}px) rotate(${x * .55}deg)`;
      });
    });
    artStage.addEventListener('pointerleave', () => {
      systemDiagram.style.transform = 'translate(0, 0) rotate(0deg)';
    });
  }

  // All direct-contact routes depend on verified details supplied by the owner.
  const contactActions = document.getElementById('contact-actions');
  const configNote = document.getElementById('contact-config-note');
  const configuredLinks = [
    { label: 'Email me', href: SITE.email ? `mailto:${SITE.email}` : '', suffix: '↗' },
    { label: 'GitHub', href: SITE.github, suffix: '↗' },
    { label: 'LinkedIn', href: SITE.linkedin, suffix: '↗' }
  ].filter(link => /^https:\/\//.test(link.href) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link.href));
  if (contactActions && configuredLinks.length) {
    configuredLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.append(document.createTextNode(link.label));
      const icon = document.createElement('span'); icon.setAttribute('aria-hidden', 'true'); icon.textContent = link.suffix;
      anchor.append(icon);
      if (link.href.startsWith('https://')) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
      contactActions.append(anchor);
    });
    if (configNote) configNote.hidden = true;
  }

  document.getElementById('print-resume')?.addEventListener('click', () => window.print());
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Ensure that in-page navigation remains available if script runs after a hash is present.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 40);
  }
})();
