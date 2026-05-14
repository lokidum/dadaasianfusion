(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const targets = document.querySelectorAll("[data-parallax]");
  if (!targets.length) return;

  let ticking = false;

  function update() {
    const sy = window.scrollY || window.pageYOffset;
    targets.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.3;
      const max = (el.offsetHeight || 0) * 0.6;
      const offset = Math.max(-max, Math.min(max, sy * speed));
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
