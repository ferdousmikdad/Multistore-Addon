/* ============================================================
   MULTISTORE FOR FLEXSTOCK — Main JS
   ------------------------------------------------------------
   Sections (in order):
     1. Countdown Timer
     2. Mobile Nav Toggle
     3. Sticky Nav Shadow
     4. Scroll Reveal  (IntersectionObserver)
     5. How It Works   (tab auto-switcher)
     6. Pick Your Store Setup  (scroll-driven panel animation)
     7. Stacking Feature Cards (parallax scale on scroll)
     8. Smooth Anchor Scroll
   ============================================================ */

'use strict';

/* ── 1. Countdown Timer ──────────────────────────────────── */
(function initCountdown() {
  const STORAGE_KEY    = 'flexstock_launch_deadline';
  const DEADLINE_MS    = 7 * 24 * 60 * 60 * 1000; // 7 days

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, Date.now() + DEADLINE_MS);
  }

  const deadline = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  const els = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
      return;
    }
    if (els.days)    els.days.textContent    = pad(Math.floor(diff / 86400000));
    if (els.hours)   els.hours.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    if (els.minutes) els.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (els.seconds) els.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();


/* ── 2. Mobile Nav Toggle ────────────────────────────────── */
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu-mobile');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
})();


/* ── 3. Sticky Nav Shadow ────────────────────────────────── */
(function initNavShadow() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-md', window.scrollY > 8);
  }, { passive: true });
})();


/* ── 4. Scroll Reveal (IntersectionObserver) ─────────────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('opacity-0', 'translate-y-4');
      entry.target.classList.add('opacity-100', 'translate-y-0');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  targets.forEach(el => io.observe(el));
})();


/* ── 5. How It Works — tab auto-switcher ─────────────────── */
(function initHowItWorks() {
  const tabs   = document.querySelectorAll('.hiw-tab');
  const panels = document.querySelectorAll('.hiw-panel');
  if (!tabs.length || !panels.length) return;

  const TAB_DURATION_MS = 5000;
  let current   = 0;
  let autoTimer = null;

  function activate(idx) {
    idx     = ((idx % tabs.length) + tabs.length) % tabs.length;
    current = idx;

    tabs.forEach((tab, i) => {
      const active = i === idx;
      tab.classList.toggle('hiw-tab--active', active);

      const bar = tab.querySelector('.hiw-tab-bar');
      if (!bar) return;
      bar.style.animation = 'none';
      bar.offsetWidth; // force reflow to restart animation
      bar.style.animation = active
        ? `hiw-fill ${TAB_DURATION_MS / 1000}s linear forwards`
        : 'none';
      if (!active) bar.style.width = '0%';
    });

    panels.forEach((panel, i) => panel.classList.toggle('hiw-panel--active', i === idx));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      clearInterval(autoTimer);
      activate(i);
      autoTimer = setInterval(() => activate(current + 1), TAB_DURATION_MS);
    });
  });

  activate(0);
  autoTimer = setInterval(() => activate(current + 1), TAB_DURATION_MS);
})();


/* ── 6. Pick Your Store Setup — scroll-driven animation ──── */
(function initPickSetup() {

  // ── DOM refs ──
  const track = document.getElementById('hiw-track');
  const img   = document.getElementById('hiw-img');
  const cols  = document.getElementById('hiw-cols');
  const infoA = document.getElementById('hiw-info-a');
  const infoB = document.getElementById('hiw-info-b');
  const lblA  = document.getElementById('hiw-lbl-a');
  const lblB  = document.getElementById('hiw-lbl-b');
  if (!track || !img) return;

  // ── Constants ──
  const BRAND_COLOR    = '#7334C1';
  const INK_COLOR      = '#1a1a2e';
  const IMG_FINAL_W    = 530;
  const IMG_FINAL_H    = 375;
  const IMG_START_H    = 790;
  const PANEL_EXIT_Y   = -400;  // px — how far Panel A travels up before disappearing
  const PANEL_START_B  = 1100;  // px — Panel B initial off-screen position
  const COL_FADE_START = 0.55;  // phase1 progress at which columns start fading in
  const COL_FADE_RANGE = 0.30;

  // ── Helpers ──
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t)    { return a + (b - a) * t; }
  function ease(t)           { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

  // ── Active option state ──
  let activeOpt = 0;

  const btnA = document.getElementById('hiw-opt-a');
  const btnB = document.getElementById('hiw-opt-b');

  function applyToggle(idx) {
    activeOpt = idx;

    // Label colour + weight
    lblA.style.color      = idx === 0 ? BRAND_COLOR : INK_COLOR;
    lblA.style.fontWeight = idx === 0 ? '600' : '400';
    lblB.style.color      = idx === 1 ? BRAND_COLOR : INK_COLOR;
    lblB.style.fontWeight = idx === 1 ? '600' : '400';

    // Active button pill background
    if (btnA && btnB) {
      btnA.style.background  = idx === 0 ? '#fff' : 'transparent';
      btnA.style.boxShadow   = idx === 0 ? '0 1px 3px rgba(0,0,0,0.07)' : 'none';
      btnB.style.background  = idx === 1 ? '#fff' : 'transparent';
      btnB.style.boxShadow   = idx === 1 ? '0 1px 3px rgba(0,0,0,0.07)' : 'none';
    }
  }

  // ── Click handler (bound via data attribute, no inline onclick) ──
  document.querySelectorAll('[data-hiw-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.hiwOption, 10);
      applyToggle(idx);

      const TRANSITION = 'opacity 0.4s ease, transform 0.4s ease';
      if (infoA) infoA.style.transition = TRANSITION;
      if (infoB) infoB.style.transition = TRANSITION;

      if (idx === 0) {
        if (infoA) { infoA.style.opacity = '1';    infoA.style.transform = 'translateY(0px)'; }
        if (infoB) { infoB.style.opacity = '0.25'; infoB.style.transform = `translateY(${PANEL_START_B}px)`; }
      } else {
        if (infoA) { infoA.style.opacity = '0'; infoA.style.transform = `translateY(${PANEL_EXIT_Y}px)`; }
        if (infoB) { infoB.style.opacity = '1'; infoB.style.transform = 'translateY(0px)'; }
      }

      // Remove transition after animation completes so scroll stays snappy
      setTimeout(() => {
        if (infoA) infoA.style.transition = '';
        if (infoB) infoB.style.transition = '';
      }, 420);
    });
  });

  applyToggle(0);

  // ── Initial panel positions (before scroll) ──
  window.addEventListener('load', () => {
    if (infoA) infoA.style.transform = 'translateY(0px)';
    if (infoB) infoB.style.transform = `translateY(${PANEL_START_B}px)`;
  });

  // ── Scroll handler ──
  function onScroll() {
    const vh       = window.innerHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const total    = track.offsetHeight - vh;
    const p        = clamp((window.scrollY - trackTop) / total, 0, 1);

    // Phase 1 (p 0→0.5): image shrinks right
    const phase1   = ease(clamp(p / 0.5, 0, 1));
    const stageW   = img.parentElement.offsetWidth;
    const finalLeft = stageW - IMG_FINAL_W;
    const heightPx = lerp(IMG_START_H, IMG_FINAL_H, phase1);

    img.style.left   = lerp(0, finalLeft, phase1) + 'px';
    img.style.top    = ((IMG_START_H - heightPx) / 2) + 'px';
    img.style.width  = lerp(stageW, IMG_FINAL_W, phase1) + 'px';
    img.style.height = heightPx + 'px';

    if (cols) {
      cols.style.opacity = clamp((phase1 - COL_FADE_START) / COL_FADE_RANGE, 0, 1);
    }

    // Phase 2 (p 0.5→1.0): Panel B rises, Panel A exits upward
    const phase2 = ease(clamp((p - 0.5) / 0.5, 0, 1));

    if (infoA) {
      infoA.style.opacity   = clamp((1 - phase2) / 0.45, 0, 1); // holds full opacity until ~55%
      infoA.style.transform = `translateY(${lerp(0, PANEL_EXIT_Y, phase2)}px)`;
    }
    if (infoB) {
      infoB.style.opacity   = lerp(0.25, 1, phase2);
      infoB.style.transform = `translateY(${lerp(PANEL_START_B, 0, phase2)}px)`;
    }

    // Sync toggle label to scroll position
    const newOpt = phase2 >= 0.5 ? 1 : 0;
    if (newOpt !== activeOpt) applyToggle(newOpt);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();


/* ── 7. Stacking Feature Cards — parallax scale on scroll ── */
(function initStackCards() {
  const cards = Array.from(document.querySelectorAll('.stack-card'));
  if (!cards.length) return;

  const STICKY_BASE = 100;  // matches first card's CSS top value
  const STICKY_STEP = 16;   // offset increment per card (matches card top stagger)
  const SCALE_MAX   = 1;
  const SCALE_MIN   = 0.92;
  const OPACITY_MIN = 0.65;
  const SCROLL_RANGE = 280; // px of "passed" distance over which scale animates

  function onScroll() {
    cards.forEach((card, i) => {
      const rect      = card.getBoundingClientRect();
      const stickyTop = STICKY_BASE + i * STICKY_STEP;
      const passed    = stickyTop - rect.top; // positive once card is pinned

      if (passed <= 0) {
        card.style.transform = `scale(${SCALE_MAX})`;
        card.style.opacity   = '1';
      } else {
        const progress       = Math.min(passed / SCROLL_RANGE, 1);
        card.style.transform = `scale(${SCALE_MAX - (SCALE_MAX - SCALE_MIN) * progress})`;
        card.style.opacity   = String(1 - (1 - OPACITY_MIN) * progress);
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();


/* ── 8. Smooth Anchor Scroll ─────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
