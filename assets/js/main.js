(function () {
  const cfg = window.DADA_CONFIG;
  if (!cfg) return;

  // ---------- Render testimonials ----------
  const testWrap = document.getElementById("testimonials");
  if (testWrap) {
    testWrap.innerHTML = cfg.TESTIMONIALS.map((t) => `
      <article class="testimonial card-lift" data-reveal-child data-reveal="up">
        <div class="testimonial__stars" aria-label="5 out of 5 stars">
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
          <span class="material-symbols-outlined">star</span>
        </div>
        <p class="testimonial__quote">"${t.quote}"</p>
        <span class="testimonial__author">— ${t.author}</span>
      </article>
    `).join("");
    if (window.DADA_revealNew) window.DADA_revealNew(testWrap);
  }

  // ---------- Newsletter stub ----------
  const newsForm = document.getElementById("newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsForm.querySelector("input[type='email']").value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newsForm.querySelector("input").focus();
        return;
      }
      // TODO: wire to newsletter provider (Mailchimp / Klaviyo / Beehiiv)
      console.log("[Dada] Newsletter signup (replace with provider):", email);
      newsForm.reset();
      const success = document.querySelector(".newsletter__success");
      if (success) {
        success.classList.add("is-active");
        setTimeout(() => success.classList.remove("is-active"), 4000);
      }
    });
  }

  // ---------- Year auto-fill ----------
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // ---------- Anchor click smooth-scroll with reduced motion fallback ----------
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("a[href^='#']:not([href='#'])").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    });
  });

  // ---------- Replace any data-asset-role[from] with config IMAGES on demand ----------
  document.querySelectorAll("img[data-img-key]").forEach((img) => {
    const key = img.getAttribute("data-img-key");
    if (cfg.IMAGES[key]) img.src = cfg.IMAGES[key];
  });
})();
