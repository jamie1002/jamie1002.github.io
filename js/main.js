/* ============================================================
   謝承翰 | Jamie — 個人形象網頁主程式
   負責：主題切換、側邊欄捲動監聽（選單高亮）、
         手機版漢堡選單、PDF 匯出觸發
   ============================================================ */

(function () {
  "use strict";

  var htmlEl = document.documentElement;
  var THEME_KEY = "theme";

  /* ---------------------------------------------------------
     一、深色／淺色主題
     --------------------------------------------------------- */

  // 取得初始主題：優先讀 localStorage，沒有則依系統偏好決定
  function getInitialTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function updateThemeToggleUI(theme) {
    var icon = document.getElementById("themeToggleIcon");
    var text = document.getElementById("themeToggleText");
    if (!icon || !text) return;
    if (theme === "dark") {
      icon.textContent = "☀️";
      text.textContent = "淺色模式";
    } else {
      icon.textContent = "🌙";
      text.textContent = "深色模式";
    }
  }

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleUI(theme);
  }

  // 頁面載入時立即套用主題（避免閃爍）
  applyTheme(getInitialTheme());

  var themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var current = htmlEl.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------------------------------------------
     二、側邊欄導覽：平滑捲動 + IntersectionObserver 高亮
     --------------------------------------------------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.dataset.target);
    })
    .filter(Boolean);

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.getElementById(link.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeMobileMenu();
    });
  });

  var brandBtn = document.getElementById("brandBtn");
  if (brandBtn) {
    brandBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMobileMenu();
    });
  }

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.dataset.target === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        root: null,
        // 當區塊進入視窗上方 40% ～ 下方 45% 的範圍時視為「當前區塊」
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------
     三、手機版漢堡選單
     --------------------------------------------------------- */

  var sidebar = document.getElementById("sidebar");
  var hamburgerBtn = document.getElementById("hamburgerBtn");
  var sidebarOverlay = document.getElementById("sidebarOverlay");

  function openMobileMenu() {
    sidebar.classList.add("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    sidebar.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    if (sidebar.classList.contains("is-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeMobileMenu);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  // 螢幕從手機寬度放大回桌面寬度時，確保選單狀態重置
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  /* ---------------------------------------------------------
     四、匯出 PDF 履歷
     --------------------------------------------------------- */

  var exportPdfBtn = document.getElementById("exportPdfBtn");
  var printHint = document.getElementById("printHint");

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener("click", function () {
      closeMobileMenu();

      if (printHint) {
        printHint.classList.add("is-visible");
      }

      // 短暫提示後自動觸發瀏覽器原生列印（由 @media print 控制排版）
      window.setTimeout(function () {
        if (printHint) {
          printHint.classList.remove("is-visible");
        }
        window.print();
      }, 2200);
    });
  }
})();
