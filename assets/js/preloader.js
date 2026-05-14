(function () {
  const MIN_DISPLAY_MS = 900;
  const MAX_DISPLAY_MS = 4000;
  const FADE_MS = 500;
  const t0 = performance.now();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function dismiss() {
    const el = document.getElementById("preloader");
    if (!el) return;
    if (reduced) {
      el.remove();
      document.body.classList.add("is-loaded");
      return;
    }
    el.classList.add("is-leaving");
    const cleanup = () => {
      el.removeEventListener("transitionend", cleanup);
      if (el.parentNode) el.parentNode.removeChild(el);
      document.body.classList.add("is-loaded");
    };
    el.addEventListener("transitionend", cleanup);
    setTimeout(cleanup, FADE_MS + 250);
  }

  function trigger() {
    const elapsed = performance.now() - t0;
    const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(dismiss, delay);
  }

  if (document.readyState === "complete") trigger();
  else window.addEventListener("load", trigger, { once: true });

  setTimeout(dismiss, MAX_DISPLAY_MS);
})();
