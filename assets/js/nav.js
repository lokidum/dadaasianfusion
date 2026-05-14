(function () {
  const header = document.querySelector(".site-header");
  const sentinel = document.querySelector(".nav-sentinel");
  const toggle = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("mobile-menu");
  const closeBtn = drawer ? drawer.querySelector(".mobile-menu__close") : null;
  const backdrop = drawer ? drawer.querySelector(".mobile-menu__backdrop") : null;
  if (!header) return;

  // --- Sticky background swap via top sentinel ---
  if (sentinel && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) header.classList.remove("is-scrolled");
        else header.classList.add("is-scrolled");
      });
    }, { threshold: 0 });
    obs.observe(sentinel);
  } else {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  // --- Mobile drawer ---
  let lastFocus = null;
  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    const firstLink = drawer.querySelector("a, button");
    if (firstLink) setTimeout(() => firstLink.focus(), 200);
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (toggle) toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) closeDrawer();
  });
  if (drawer) {
    drawer.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => setTimeout(closeDrawer, 200));
    });
    drawer.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !drawer.classList.contains("is-open")) return;
      const focusables = drawer.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }

  // --- Scrollspy: active section highlight ---
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const idMap = new Map();
  navLinks.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    if (id) idMap.set(id, a);
  });
  if (idMap.size && "IntersectionObserver" in window) {
    const spyObs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = visible[0].target.id;
      idMap.forEach((link, key) => link.classList.toggle("is-active", key === id));
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] });
    idMap.forEach((_, id) => {
      const sec = document.getElementById(id);
      if (sec) spyObs.observe(sec);
    });
  }
})();
