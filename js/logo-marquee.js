/**
 * Logo marquee pause control.
 * The animation itself is pure CSS (see _marquee.css). This script only
 * wires up an explicit, keyboard-operable pause/play toggle — required
 * because the logos aren't focusable elements, so hover/focus-within
 * alone wouldn't let a keyboard-only user invoke the pause (WCAG 2.2.2).
 */
(function () {
  const section = document.querySelector('.logo-marquee');
  if (!section) return;

  const toggle = section.querySelector('.logo-marquee__toggle');
  const label = toggle.querySelector('.logo-marquee__toggle-label');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setPaused(paused) {
    section.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Play animation' : 'Pause animation';
  }

  toggle.addEventListener('click', () => {
    setPaused(!section.classList.contains('is-paused'));
  });

  // Respect the OS-level reduced-motion preference from the start —
  // CSS already removes the animation in that case, this just keeps the
  // button's state/label consistent with what's actually happening.
  if (prefersReducedMotion) setPaused(true);
})();
