// ✅ Page load hone par welcome message
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded successfully!");
  alert("Welcome to Maa Sai Classes! 🎓");

  // ✅ WhatsApp icon pulse effect
  const whatsappIcon = document.getElementById("whatsapp-icon");
  if (whatsappIcon) {
    setInterval(() => {
      whatsappIcon.classList.toggle("pulse");
    }, 800);
  }
});