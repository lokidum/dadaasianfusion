(function () {
  const cfg = window.DADA_CONFIG;
  if (!cfg) return;

  const tablist = document.getElementById("menu-tablist");
  const panel = document.getElementById("menu-panel");
  const asideImg = document.getElementById("menu-aside-img");
  const asideCap = document.getElementById("menu-aside-caption");
  if (!tablist || !panel) return;

  let activeCat = cfg.MENU_CATEGORIES[0].id;

  function renderTabs() {
    tablist.innerHTML = "";
    cfg.MENU_CATEGORIES.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(c.id === activeCat));
      btn.setAttribute("aria-controls", "menu-panel");
      btn.id = `tab-${c.id}`;
      btn.dataset.cat = c.id;
      btn.tabIndex = c.id === activeCat ? 0 : -1;
      btn.textContent = c.label;
      btn.addEventListener("click", () => setActive(c.id, true));
      btn.addEventListener("keydown", onTabKeydown);
      tablist.appendChild(btn);
    });
  }

  function onTabKeydown(e) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const tabs = Array.from(tablist.querySelectorAll(".menu-tab"));
    const i = tabs.indexOf(e.currentTarget);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    tabs[next].focus();
    setActive(tabs[next].dataset.cat, true);
  }

  function tagLabel(t) {
    const map = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-Free", DF: "Dairy-Free", S: "Signature" };
    return map[t] || t;
  }

  function renderPanel() {
    const items = cfg.MENU_DATA.filter((i) => i.category === activeCat);
    panel.innerHTML = "";
    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.setAttribute("data-reveal", "up");
      const isSig = item.tags.includes("S");
      article.innerHTML = `
        <div>
          <div class="menu-item__head">
            <h3 class="menu-item__name">${item.name}${isSig ? '<span class="menu-item__signature" aria-label="Signature dish"></span>' : ''}</h3>
          </div>
          <p class="menu-item__desc">${item.desc}</p>
          ${item.tags.length ? `<div class="menu-tags">${item.tags.map((t) => `<span class="menu-tag" title="${tagLabel(t)}">${t}</span>`).join("")}</div>` : ""}
        </div>
        <div class="menu-item__price">$${item.price}</div>
      `;
      panel.appendChild(article);
    });
    if (window.DADA_revealNew) window.DADA_revealNew(panel);
  }

  function renderAside() {
    if (!asideImg || !asideCap) return;
    const editorial = cfg.CATEGORY_IMAGES[activeCat];
    if (!editorial) return;
    asideImg.style.opacity = "0";
    setTimeout(() => {
      asideImg.src = editorial.src;
      asideImg.style.opacity = "1";
      asideCap.textContent = editorial.caption;
    }, 200);
  }

  function setActive(id, scroll) {
    if (id === activeCat) return;
    activeCat = id;
    tablist.querySelectorAll(".menu-tab").forEach((t) => {
      const on = t.dataset.cat === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    renderPanel();
    renderAside();
  }

  renderTabs();
  renderPanel();
  renderAside();
})();
