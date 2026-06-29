/**
 * "Choose the School" mobile slider.
 * The slide mechanics are native CSS scroll-snap (see _school-grid.css) —
 * this script only keeps the pagination dots in sync with whichever card
 * is actually in view, and lets dots/keyboard drive the scroll position.
 * At the desktop breakpoint the scroll/snap CSS is removed by media query,
 * so this code simply has nothing to do there (dots are display:none).
 */
(function () {
  const list = document.getElementById('school-grid-list');
  if (!list) return;

  const items = Array.from(list.children);
  const dots = Array.from(document.querySelectorAll('.school-grid__dot'));

  function setActive(index) {
    dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === index)));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      items[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
  });

  // Track which card is most visible and reflect that in the dots.
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
