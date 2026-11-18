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

  // 4. Mobil Hamburger Menü ve Hizmetler Açılır Menü (Dropdown) Kontrolü
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownBtn = document.querySelector(".dropdown-toggle");

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("active");
      mobileBtn.setAttribute("aria-expanded", isOpen);
      mobileBtn.textContent = isOpen ? "✕" : "☰";
    });
  }

  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      dropdownBtn.setAttribute("aria-expanded", isOpen);
    });
  }
  // 5. Menü içindeki bir linke tıklanınca mobil menüyü otomatik kapat
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        if (mobileBtn) {
          mobileBtn.setAttribute("aria-expanded", "false");
          mobileBtn.textContent = "☰";
        }
        if (dropdown) {
          dropdown.classList.remove("open");
        }
        if (dropdownBtn) {
          dropdownBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // 6. Sayfada menü dışında boş bir yere tıklanınca açık menüleri kapat
  document.addEventListener("click", (e) => {
    if (navLinks && navLinks.classList.contains("active")) {
      if (!navLinks.contains(e.target) && e.target !== mobileBtn) {
        navLinks.classList.remove("active");
        if (mobileBtn) {
          mobileBtn.setAttribute("aria-expanded", "false");
          mobileBtn.textContent = "☰";
        }
      }
    }
    if (dropdown && dropdown.classList.contains("open")) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        if (dropdownBtn) {
          dropdownBtn.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

  // 7. KVKK Çerez Onay Kutusu ve Google Consent Mode Yönetimi
  if (!localStorage.getItem("pulsar_cookie_consent")) {
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Çerez Tercihleri");
    banner.innerHTML = `
      <div class="cookie-text">
        <strong>Çerez Kullanımı:</strong> Sitemizde ziyaretçi trafiğini analiz etmek ve hizmet kalitemizi artırmak amacıyla analitik çerezler kullanılmaktadır.
      </div>
      <div class="cookie-actions">
        <button type="button" class="cookie-btn cookie-btn-reject" id="cookieReject">Reddet</button>
        <button type="button" class="cookie-btn cookie-btn-accept" id="cookieAccept">Kabul Et</button>
      </div>
    `;
    document.body.appendChild(banner);

    const handleChoice = (status) => {
      localStorage.setItem("pulsar_cookie_consent", status);
      if (typeof gtag === "function") {
        gtag("consent", "update", { analytics_storage: status });
      }
      banner.remove();
    };

    document.getElementById("cookieAccept").addEventListener("click", () => handleChoice("granted"));
    document.getElementById("cookieReject").addEventListener("click", () => handleChoice("denied"));
  }
});
