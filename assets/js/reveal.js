(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in-view"));
    return;
  }

  const STAGGER_STEP = 80;
  const STAGGER_CAP = 8;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-in-view");
      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });

  // Single elements
  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

  // Stagger groups — when parent enters, stagger children
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const parent = entry.target;
      const children = parent.querySelectorAll(":scope > [data-reveal-child]");
      children.forEach((child, i) => {
        const delay = Math.min(i, STAGGER_CAP - 1) * STAGGER_STEP;
        child.style.transitionDelay = `${delay}ms`;
        child.classList.add("is-in-view");
      });
      staggerObserver.unobserve(parent);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll("[data-reveal-stagger]").forEach((p) => staggerObserver.observe(p));

  // Re-observe newly inserted elements (e.g. menu items rendered after first paint)
  window.DADA_revealNew = function (root) {
    (root || document).querySelectorAll("[data-reveal]:not(.is-in-view)").forEach((el) => observer.observe(el));
  };
})();
