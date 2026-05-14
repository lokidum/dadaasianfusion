(function () {
  const cfg = window.DADA_CONFIG;
  if (!cfg) return;

  // ---------- Broken-image fallback: swap to an olive SVG block with the alt text ----------
  // This makes the site look intentional even before real photography is wired in.
  function svgPlaceholder(text, opts) {
    const o = opts || {};
    const bg = o.bg || "#4d4232";
    const fg = o.fg || "#ebe9e6";
    const accent = o.accent || "#b85c3a";
    const w = o.w || 800;
    const h = o.h || 1000;
    const label = (text || "Dada").trim().replace(/[<>&]/g, "");
    const lines = label.split(/\s+/).reduce((rows, word) => {
      const last = rows[rows.length - 1];
      if (last && (last + " " + word).length <= 16) rows[rows.length - 1] = last + " " + word;
      else rows.push(word);
      return rows;
    }, []).slice(0, 3);
    const lineHeight = 48;
    const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2 + 16;
    const tspans = lines.map((l, i) => `<tspan x="50%" dy="${i === 0 ? 0 : lineHeight}">${l}</tspan>`).join("");
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <rect width="100%" height="100%" fill="${bg}"/>
  <circle cx="${w * 0.82}" cy="${h * 0.18}" r="${w * 0.18}" fill="${accent}" opacity="0.18"/>
  <circle cx="${w * 0.12}" cy="${h * 0.86}" r="${w * 0.22}" fill="${accent}" opacity="0.12"/>
  <line x1="${w * 0.5 - 60}" y1="${startY - 56}" x2="${w * 0.5 + 60}" y2="${startY - 56}" stroke="${fg}" stroke-width="1" opacity="0.6"/>
  <text x="50%" y="${startY}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="500" font-size="44" fill="${fg}" letter-spacing="-0.01em">${tspans}</text>
  <text x="50%" y="${startY + lines.length * lineHeight + 38}" text-anchor="middle" font-family="PT Sans, sans-serif" font-size="11" letter-spacing="0.3em" fill="${fg}" opacity="0.6">DADA · CANBERRA</text>
</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function attachFallback(img) {
    if (img.__dadaFallback) return;
    img.__dadaFallback = true;
    const handle = function () {
      img.removeEventListener("error", handle);
      const alt = img.getAttribute("alt") || img.getAttribute("data-asset-role") || "dada";
      img.src = svgPlaceholder(alt);
      img.style.objectFit = "cover";
    };
    img.addEventListener("error", handle);
    // Trigger now for already-failed images
    if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) handle();
  }

  function scanImages(root) {
    (root || document).querySelectorAll("img").forEach(attachFallback);
  }
  scanImages(document);
  // Re-scan after dynamic renders (menu, products, testimonials)
  window.DADA_scanImages = scanImages;
  const mo = new MutationObserver((muts) => {
    muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType === 1) scanImages(n);
    }));
  });
  mo.observe(document.body, { childList: true, subtree: true });

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
