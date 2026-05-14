(function () {
  const cfg = window.DADA_CONFIG;
  const form = document.getElementById("booking-form");
  const timeWrap = document.getElementById("time-pills");
  const success = document.getElementById("booking-success");
  if (!form || !cfg) return;

  // Set min date to today
  const dateInput = form.querySelector("#book-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // Render time pills from config
  if (timeWrap) {
    timeWrap.innerHTML = cfg.TIME_SLOTS.map((t, i) => `
      <span class="time-pill">
        <input type="radio" name="time" id="time-${i}" value="${t}" ${i === 3 ? "checked" : ""} required>
        <label for="time-${i}">${t}</label>
      </span>
    `).join("");
  }

  const validators = {
    name:       (v) => v.trim().length >= 2 || "Please enter your full name.",
    email:      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
    phone:      (v) => (v.replace(/[^\d]/g, "").length >= 8) || "Please enter a valid phone number.",
    partySize:  (v) => !!v || "Please select party size.",
    date:       (v) => !!v && new Date(v) >= new Date(new Date().toDateString()) || "Please choose today or a future date.",
    time:       () => !!form.querySelector("input[name='time']:checked") || "Please select a time slot.",
    consent:    () => form.querySelector("#book-consent").checked || "Please agree to be contacted."
  };

  function showError(fieldName, msg) {
    const field = form.querySelector(`[data-field='${fieldName}']`);
    if (!field) return;
    const errEl = field.querySelector(".field-error");
    field.classList.add("is-invalid");
    if (errEl) errEl.textContent = msg;
  }
  function clearError(fieldName) {
    const field = form.querySelector(`[data-field='${fieldName}']`);
    if (field) field.classList.remove("is-invalid");
  }

  function validateField(name, value) {
    if (!validators[name]) return true;
    const result = validators[name](value || "");
    if (result === true) { clearError(name); return true; }
    showError(name, typeof result === "string" ? result : "Invalid value.");
    return false;
  }

  // Live blur validation
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("blur", () => {
      const name = el.name;
      if (validators[name]) validateField(name, el.value);
    });
    el.addEventListener("input", () => {
      const field = el.closest(".field");
      if (field) field.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name:       form.elements["name"].value,
      email:      form.elements["email"].value,
      phone:      form.elements["phone"].value,
      partySize:  form.elements["partySize"].value,
      date:       form.elements["date"].value,
      time:       (form.querySelector("input[name='time']:checked") || {}).value,
      occasion:   form.elements["occasion"] ? form.elements["occasion"].value : "",
      dietary:    form.elements["dietary"].value,
      notes:      form.elements["notes"].value
    };

    let ok = true;
    ["name","email","phone","partySize","date","time","consent"].forEach((n) => {
      if (!validateField(n, data[n])) ok = false;
    });

    if (!ok) {
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea, .is-invalid");
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }

    // TODO: wire to booking provider (OpenTable / SevenRooms / ResDiary)
    // When BOOKING_PROVIDER_URL is set in config.js, redirect with form data appended.
    // Replace this whole block with the provider's modal SDK or POST endpoint.
    if (cfg.BOOKING_PROVIDER_URL) {
      const params = new URLSearchParams(data).toString();
      window.location.href = `${cfg.BOOKING_PROVIDER_URL}?${params}`;
      return;
    }

    // Mock success state
    form.style.display = "none";
    if (success) {
      success.classList.add("is-active");
      success.querySelector(".booking-success__name").textContent  = data.name;
      success.querySelector(".booking-success__party").textContent = data.partySize;
      success.querySelector(".booking-success__date").textContent  = new Date(data.date).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
      success.querySelector(".booking-success__time").textContent  = data.time;
      success.focus();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    console.log("[Dada] Booking payload (replace with provider call):", data);
  });
})();
