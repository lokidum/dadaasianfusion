(function () {
  const cfg = window.DADA_CONFIG;
  if (!cfg) return;
  const STORAGE_KEY = "dada.cart.v1";
  const TAX_RATE = 0.10; // 10% GST (AU)

  const products = new Map(cfg.PRODUCT_DATA.map((p) => [p.id, p]));

  // ---------- state ----------
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Map();
      const parsed = JSON.parse(raw);
      const map = new Map();
      (parsed.items || []).forEach((it) => {
        if (products.has(it.id) && it.qty > 0) map.set(it.id, { qty: it.qty });
      });
      return map;
    } catch (e) { return new Map(); }
  }
  function save() {
    try {
      const items = Array.from(state.entries()).map(([id, v]) => ({ id, qty: v.qty }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, updatedAt: Date.now() }));
    } catch (e) {}
  }

  let state = load();
  const subscribers = new Set();
  function notify() { subscribers.forEach((fn) => fn(state)); }

  const cart = {
    add(id) {
      const p = products.get(id);
      if (!p || !p.inStock) return;
      const cur = state.get(id) || { qty: 0 };
      state.set(id, { qty: cur.qty + 1 });
      save(); notify(); pulseBadge();
    },
    remove(id) { state.delete(id); save(); notify(); },
    setQty(id, n) {
      n = parseInt(n, 10);
      if (!products.has(id)) return;
      if (!n || n < 1) { state.delete(id); }
      else state.set(id, { qty: Math.min(99, n) });
      save(); notify();
    },
    clear() { state = new Map(); save(); notify(); },
    subscribe(fn) { subscribers.add(fn); fn(state); return () => subscribers.delete(fn); },
    totalQty() { let n = 0; state.forEach((v) => n += v.qty); return n; },
    subtotal() { let s = 0; state.forEach((v, id) => s += (products.get(id).price * v.qty)); return s; }
  };
  window.DADA_CART = cart;

  // ---------- product grid wiring ----------
  function renderProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = "";
    cfg.PRODUCT_DATA.forEach((p) => {
      const article = document.createElement("article");
      article.className = "product";
      article.setAttribute("data-reveal", "up");
      article.setAttribute("data-asset-role", `product-${p.id}`);
      article.innerHTML = `
        <div class="product__media media-zoom">
          <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
        </div>
        <div class="product__body">
          <h3 class="product__name">${p.name}</h3>
          ${p.tags.length ? `<div class="menu-tags">${p.tags.map((t) => `<span class="menu-tag${t === "S" ? " menu-tag--sig" : ""}">${t}</span>`).join("")}</div>` : ""}
          <p class="product__desc">${p.desc}</p>
          <div class="product__row">
            <span class="product__price">$${p.price}</span>
            ${p.inStock
              ? `<button class="btn-pill product__add" data-add="${p.id}" type="button">Add to Cart</button>`
              : `<span class="product__oos">Out of Stock</span>`}
          </div>
        </div>
      `;
      grid.appendChild(article);
    });
    grid.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart.add(btn.getAttribute("data-add"));
        openDrawer();
      });
    });
    if (window.DADA_revealNew) window.DADA_revealNew(grid);
  }

  // ---------- drawer ----------
  const drawer = document.getElementById("cart-drawer");
  const drawerItems = document.getElementById("cart-items");
  const drawerSummary = document.getElementById("cart-summary");
  const cartBtn = document.querySelector(".cart-btn");
  const cartBadge = document.querySelector(".cart-badge");
  const drawerClose = drawer ? drawer.querySelector(".mobile-menu__close") : null;
  const drawerBackdrop = drawer ? drawer.querySelector(".cart-drawer__backdrop") : null;

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (cartBtn) cartBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (cartBtn) cartBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
  if (cartBtn) cartBtn.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) closeDrawer(); else openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) closeDrawer();
  });

  function pulseBadge() {
    if (!cartBadge) return;
    cartBadge.classList.remove("is-pulsing");
    void cartBadge.offsetWidth; // restart animation
    cartBadge.classList.add("is-pulsing");
  }

  // ---------- render drawer contents ----------
  function renderDrawer() {
    if (!drawerItems) return;
    drawerItems.innerHTML = "";
    if (state.size === 0) {
      drawerItems.innerHTML = `<div class="cart-empty">Your cart is empty.<br><br>Add a few house-made provisions.</div>`;
      if (drawerSummary) drawerSummary.style.display = "none";
      return;
    }
    if (drawerSummary) drawerSummary.style.display = "block";
    state.forEach((v, id) => {
      const p = products.get(id);
      if (!p) return;
      const line = document.createElement("div");
      line.className = "cart-line";
      line.innerHTML = `
        <div class="cart-line__thumb"><img src="${p.image}" alt=""></div>
        <div class="cart-line__info">
          <span class="cart-line__name">${p.name}</span>
          <span class="cart-line__price">$${(p.price * v.qty).toFixed(2)}</span>
          <button class="cart-line__remove" data-remove="${id}" type="button">Remove</button>
        </div>
        <div class="cart-line__qty">
          <button type="button" aria-label="Decrease quantity" data-dec="${id}">−</button>
          <span>${v.qty}</span>
          <button type="button" aria-label="Increase quantity" data-inc="${id}">+</button>
        </div>
      `;
      drawerItems.appendChild(line);
    });
    drawerItems.querySelectorAll("[data-inc]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-inc");
        const cur = state.get(id);
        if (cur) cart.setQty(id, cur.qty + 1);
      });
    });
    drawerItems.querySelectorAll("[data-dec]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-dec");
        const cur = state.get(id);
        if (cur) cart.setQty(id, cur.qty - 1);
      });
    });
    drawerItems.querySelectorAll("[data-remove]").forEach((b) => {
      b.addEventListener("click", () => cart.remove(b.getAttribute("data-remove")));
    });

    // totals
    const sub = cart.subtotal();
    const tax = sub * TAX_RATE;
    const total = sub + tax;
    const setText = (sel, val) => { const el = drawerSummary && drawerSummary.querySelector(sel); if (el) el.textContent = `$${val.toFixed(2)}`; };
    setText("[data-sub]", sub);
    setText("[data-tax]", tax);
    setText("[data-total]", total);
  }

  // badge
  function renderBadge() {
    const n = cart.totalQty();
    if (cartBadge) {
      cartBadge.textContent = String(n);
      cartBadge.classList.toggle("is-visible", n > 0);
    }
    if (cartBtn) cartBtn.setAttribute("aria-label", `Open cart, ${n} item${n === 1 ? "" : "s"}`);
  }

  // ---------- checkout stub ----------
  const checkoutBtn = document.getElementById("cart-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (state.size === 0) return;
      const pickup = (document.getElementById("pickup-date") || {}).value || "";
      const notes = (document.getElementById("order-notes") || {}).value || "";
      const payload = {
        items: Array.from(state.entries()).map(([id, v]) => ({ id, qty: v.qty, name: products.get(id).name, price: products.get(id).price })),
        subtotal: cart.subtotal(),
        tax: cart.subtotal() * TAX_RATE,
        total: cart.subtotal() * (1 + TAX_RATE),
        pickup, notes
      };
      // TODO: wire to checkout provider (Square / Stripe / Mr Yum / Bopple)
      if (cfg.CHECKOUT_PROVIDER_URL) {
        // window.location.href = `${cfg.CHECKOUT_PROVIDER_URL}?cart=${encodeURIComponent(JSON.stringify(payload))}`;
        // return;
      }
      console.log("[Dada] Checkout payload (replace with provider call):", payload);
      alert("Thanks! In production this hands off to the checkout provider.\n\nYour order summary is in the console.");
    });
  }

  // pickup-date select populate
  const pickupSel = document.getElementById("pickup-date");
  if (pickupSel) {
    pickupSel.innerHTML = cfg.PICKUP_OPTIONS.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  }

  // ---------- subscribe ----------
  cart.subscribe(() => { renderDrawer(); renderBadge(); });
  renderProducts();
})();
