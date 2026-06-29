/**
 * "What Makes This Exhibition a Must-Visit" slider.
 * Native CSS scroll-snap for the actual movement (see _exhibition.css).
 * This script wires the prev/next arrows and keeps dots in sync with the
 * card currently in view, at every breakpoint (no desktop grid fallback
 * for this section — it's a slider throughout, per the guidelines).
 */
(function () {
  const list = document.getElementById('exhibition-list');
  if (!list) return;

  const items = Array.from(list.children);
  const dots = Array.from(document.querySelectorAll('.exhibition-slider__dot'));
  const prevBtn = document.querySelector('.exhibition-slider__arrow--prev');
  const nextBtn = document.querySelector('.exhibition-slider__arrow--next');

  function setActive(index) {
    dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === index)));
  }

  function scrollToIndex(index) {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    items[clamped].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }

  function currentIndex() {
    const selectedDot = dots.findIndex((dot) => dot.getAttribute('aria-selected') === 'true');
    return selectedDot === -1 ? 0 : selectedDot;
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToIndex(i)));
  prevBtn.addEventListener('click', () => scrollToIndex(currentIndex() - 1));
  nextBtn.addEventListener('click', () => scrollToIndex(currentIndex() + 1));

  const observer = new IntersectionObserver(
    (entries) => {
      const mostVisible = entries.reduce((best, entry) =>
        entry.intersectionRatio > (best ? best.intersectionRatio : 0) ? entry : best, null);
      if (mostVisible && mostVisible.intersectionRatio > 0.5) {
        setActive(items.indexOf(mostVisible.target));
      }
    },
    { root: list, threshold: [0.5, 0.75, 1] }
  );

  items.forEach((item) => observer.observe(item));
})();
