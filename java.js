function goHome() {
  window.location.href = "index.html";
}

// ✅ Welcome popup only once
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("visited")) {
    const welcome = document.createElement("div");
    welcome.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.6);display:flex;justify-content:center;
      align-items:center;z-index:1000;">
        <div style="background:white;padding:20px 40px;border-radius:10px;text-align:center;">
          <h2>🎓 Welcome to Maa Sai Classes!</h2>
          <button id="continueBtn" style="margin-top:15px;padding:8px 20px;background:#ffcc00;border:none;border-radius:5px;cursor:pointer;">Continue</button>
        </div>
      </div>`;
    document.body.appendChild(welcome);
    document.getElementById("continueBtn").onclick = () => {
      welcome.remove();
      localStorage.setItem("visited", "true");
    };
  }

  // ✅ WhatsApp pulse effect
  const whatsappIcon = document.getElementById("whatsapp-icon");
  if (whatsappIcon) {
    setInterval(() => {
      whatsappIcon.classList.toggle("pulse");
    }, 800);
  }

  // ✅ WhatsApp form handler
  const form = document.getElementById("whatsapp-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;
      const text = `Hello, I am ${name} (${phone}). ${message}`;
      window.open(`https://wa.me/919624626862?text=${encodeURIComponent(text)}`, "_blank");
    });
  }
});
