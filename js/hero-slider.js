/**
 * Hero dual-axis slider.
 * Horizontal axis: .hero__track transform translateX between slides.
 * Vertical axis: each slide's .hero__content fades/rises in via the
 * .is-active class (see _hero.css) — toggled here in lockstep with the
 * horizontal move.
 *
 * Features: autoplay, pause on hover/focus, swipe (pointer events),
 * prev/next arrows, dot navigation, manual play/pause toggle, full
 * keyboard support, ARIA carousel pattern, prefers-reduced-motion.
 */
(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const track = document.getElementById('hero-track');
  const slides = Array.from(track.children);
  const dots = Array.from(hero.querySelectorAll('.hero__dot'));
  const prevBtn = hero.querySelector('.hero__arrow--prev');
  const nextBtn = hero.querySelector('.hero__arrow--next');
  const playPauseBtn = hero.querySelector('.hero__play-pause');
  const liveRegion = document.getElementById('hero-live-region');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let autoplayTimer = null;
  let isPlaying = !prefersReducedMotion;
  const AUTOPLAY_MS = 6000;

  function render(announce) {
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === index)));

    if (announce) {
      liveRegion.textContent = `Slide ${index + 1} of ${slides.length}`;
    }
  }

  function goTo(newIndex, announce) {
    index = (newIndex + slides.length) % slides.length;
    render(announce);
  }

  function next(announce) { goTo(index + 1, announce); }
  function prev(announce) { goTo(index - 1, announce); }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(() => next(false), AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function setPlaying(playing) {
    isPlaying = playing;
    playPauseBtn.setAttribute('aria-pressed', String(!playing));
    playPauseBtn.setAttribute('aria-label', playing ? 'Pause automatic slideshow' : 'Play automatic slideshow');
    if (playing) startAutoplay(); else stopAutoplay();
  }

  // --- Controls ---
  prevBtn.addEventListener('click', () => { prev(true); if (isPlaying) startAutoplay(); });
  nextBtn.addEventListener('click', () => { next(true); if (isPlaying) startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i, true); if (isPlaying) startAutoplay(); });
  });

  playPauseBtn.addEventListener('click', () => setPlaying(!isPlaying));

  // --- Keyboard support (arrow keys while the slider region has focus) ---
  hero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { next(true); if (isPlaying) startAutoplay(); }
    if (event.key === 'ArrowLeft') { prev(true); if (isPlaying) startAutoplay(); }
  });

  // --- Pause on hover / keyboard focus (WCAG 2.2.2) ---
  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', () => { if (isPlaying) startAutoplay(); });
  hero.addEventListener('focusin', stopAutoplay);
  hero.addEventListener('focusout', () => { if (isPlaying) startAutoplay(); });

  // Pause when the tab is backgrounded so it doesn't keep cycling unseen
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (isPlaying) startAutoplay();
  });

  // --- Swipe support (pointer events cover touch + mouse drag) ---
  let pointerStartX = null;

  track.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
    stopAutoplay();
  });

  track.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    const SWIPE_THRESHOLD = 40;

    if (delta > SWIPE_THRESHOLD) prev(true);
    else if (delta < -SWIPE_THRESHOLD) next(true);

    pointerStartX = null;
    if (isPlaying) startAutoplay();
  });

  // --- React live if the user changes their OS motion setting mid-session ---
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
    if (event.matches) {
      stopAutoplay();
      setPlaying(false);
    }
  });

  render(false);
  if (isPlaying) startAutoplay();
})();
