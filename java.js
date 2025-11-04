// Unified site JS: welcome (only once), nav toggle, whatsapp pulse
document.addEventListener("DOMContentLoaded", () => {
  // 1) Welcome modal shown only once per browser using localStorage
  try {
    const seen = localStorage.getItem("msc_seen_welcome");
    if (!seen) {
      showWelcomeModal();
      try { localStorage.setItem("msc_seen_welcome", "1"); } catch (e) { /* ignore storage errors */ }
    }
  } catch (err) {
    // if localStorage blocked, fallback: show once per session
    if (!sessionStorage.getItem("msc_seen_welcome_session")) {
      showWelcomeModal();
      sessionStorage.setItem("msc_seen_welcome_session", "1");
    }
  }

  // 2) WhatsApp pulse effect (keeps previous look)
  const whatsappIcons = document.querySelectorAll("#whatsapp-icon");
  whatsappIcons.forEach(icon => {
    // toggle pulse every 900ms
    setInterval(() => icon.classList.toggle("pulse"), 900);
  });

  // 3) Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("show");
    });
  }

  // Prevent accidental pinch-zoom triggered by double-tap zoom on older devices:
  // (do not disable user zoom; we just prevent double-tap zoom by preventing default double-tap timing)
  let lastTouch = 0;
  document.addEventListener('touchstart', function (e) {
    const now = Date.now();
    if (now - lastTouch <= 300) {
      e.preventDefault(); // prevents double-tap zoom on some mobile browsers
    }
    lastTouch = now;
  }, { passive: false });

});

/* Helper: create and show a simple welcome modal */
function showWelcomeModal() {
  const modal = document.createElement("div");
  modal.className = "welcome-modal";
  modal.innerHTML = `
    <div class="welcome-card" role="dialog" aria-modal="true" aria-label="Welcome to Maa Sai Classes">
      <h3>Welcome to Maa Sai Classes 🎓</h3>
      <p>Best Coaching Institute for Class 1 to 12 — Where Learning Meets Success.</p>
      <button id="close-welcome" class="btn">Continue</button>
    </div>
  `;
  document.body.appendChild(modal);

  const close = document.getElementById("close-welcome");
  close.addEventListener("click", () => {
    modal.remove();
  });

  // allow escape key to close
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") {
      modal.remove();
      document.removeEventListener("keydown", onKey);
    }
  });
}
