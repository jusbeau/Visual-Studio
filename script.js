// ════════════════════════════════════════════════════════════
//  Link in Bio — interactions
// ════════════════════════════════════════════════════════════

// ── 1. Smooth mouse spotlight ────────────────────────────────
const spotlight = document.getElementById('spotlight');

let spotX   = window.innerWidth  / 2;
let spotY   = window.innerHeight / 2;
let targetX = spotX;
let targetY = spotY;

document.addEventListener('mousemove', e => {
  targetX = e.clientX;
  targetY = e.clientY;
});

// Lerp loop — spotlight lags behind cursor slightly for a
// natural, liquid feel. Factor 0.07 = slow & smooth.
(function tick() {
  spotX += (targetX - spotX) * 0.07;
  spotY += (targetY - spotY) * 0.07;
  spotlight.style.transform =
    `translate(${spotX}px, ${spotY}px) translate(-50%, -50%)`;
  requestAnimationFrame(tick);
})();

// ── 2. Hover sound effect ────────────────────────────────────
const hoverSound = new Audio('Sound/Bubble_Sound.mp3');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
  });
});

// ── 4. Per-card cursor tracking (gradient border follows mouse) ─
const cards = document.querySelectorAll('.link-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  });

  // Reset position to centre on leave so next hover starts clean
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  });
});

// ── 5. Click tracking ────────────────────────────────────────
cards.forEach(card => {
  card.addEventListener('click', () => {
    const platform = card.dataset.platform;
    console.log(`[Link in Bio] Clicked: ${platform}`);
    // Swap in your analytics call when ready, e.g.:
    // gtag('event', 'link_click', { platform });
  });
});

// ── 6. Reduced-motion safety net ─────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.profile, .link-card').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity   = '1';
  });
  document.querySelectorAll('.orb').forEach(orb => {
    orb.style.animation = 'none';
  });
}
