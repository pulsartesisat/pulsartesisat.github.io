document.addEventListener("DOMContentLoaded", () => {
  // 1. SSS Akordeon: Bir soru açıldığında diğerini otomatik kapatır
  const faqItems = document.querySelectorAll("details");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.open) {
            otherItem.removeAttribute("open");
          }
        });
      }
    });
  });

  // 2. Masaüstü ve mobil kullanıcılar için tek tıkla numara kopyalama
  const copyBtn = document.getElementById("copyPhoneBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const phoneNumber = "0554 122 38 38";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "Kopyalandı ✓";
          copyBtn.style.background = "#0099a8";
          copyBtn.style.color = "#ffffff";
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = "";
            copyBtn.style.color = "";
          }, 2000);
        });
      }
    });
  }

  // 3. Footer yıl bilgisini otomatik güncel tutma
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});