// script.js - unified site script (welcome once, menu toggle, whatsapp effect)

// Show welcome modal only once (localStorage)
document.addEventListener('DOMContentLoaded', () => {
  // show welcome modal if not seen before
  try {
    if (!localStorage.getItem('msc_welcome_seen')) {
      showWelcome();
      localStorage.setItem('msc_welcome_seen', '1');
    }
  } catch (e) {
    // fallback to sessionStorage if localStorage blocked
    if (!sessionStorage.getItem('msc_welcome_seen')) {
      showWelcome();
      sessionStorage.setItem('msc_welcome_seen', '1');
    }
  }

  // Menu toggles (multiple pages each have a menu button id)
  const menuButtons = document.querySelectorAll('[id^="menu-btn"]');
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // find corresponding nav id nearby (same index)
      // fallback: toggle the first .main-nav
      const nav = btn.nextElementSibling && btn.nextElementSibling.classList.contains('main-nav')
                  ? btn.nextElementSibling
                  : document.querySelector('.main-nav');
      if (nav) nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    });
  });

  // WhatsApp float glow effect (toggle class)
  const w = document.querySelector('.whatsapp-float img');
  if (w) {
    // add glow class to parent so both img and shadow animate
    const parent = w.closest('.whatsapp-float');
    parent.classList.add('whatsapp-glow');
    // small hover scale
    parent.addEventListener('mouseenter', () => parent.style.transform = 'translateY(-4px) scale(1.02)');
    parent.addEventListener('mouseleave', () => parent.style.transform = '');
  }

  // Ensure brand link works from any folder: if absolute root path not match, fallback to relative index
  // (No change necessary if you host at /MAA-SAI-CLASSES-TUTION/)
});

// Create and show welcome modal
function showWelcome() {
  const modal = document.createElement('div');
  modal.className = 'welcome-modal';
  modal.innerHTML = `
    <div class="welcome-card" role="dialog" aria-modal="true" aria-label="Welcome">
      <h3>Welcome to Maa Sai Classes 🎓</h3>
      <p>Best Coaching Institute for Class 1 to 12 — Where Learning Meets Success.</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button id="btn-continue" class="btn-continue" style="background: #ffd000; border: none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;">Continue</button>
        <a href="/MAA-SAI-CLASSES-TUTION/courses.html" class="btn-continue" style="background:#1f2a2d; color:#fff; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:700;">Visit Courses</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const btn = document.getElementById('btn-continue');
  btn && btn.addEventListener('click', () => modal.remove());

  // allow Escape to close
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', esc);
    }
  });
}
