// ==============================================================================
// Mariam Ahmed Atia - Editorial Chic Profile & Portfolio Scripts
// Student ID: 225102659 | Faculty of Computers & Information
// Features: Night Mode, Color Themes, Sparkles, Form Validation & Gallery
// ==============================================================================

document.addEventListener("DOMContentLoaded", function () {
  var root = document.documentElement;

  // ---------- 1. Dynamic Year in Footer ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- 2. Floating Ambient Sparkles Generator ----------
  var sparklesContainer = document.getElementById("sparkles");
  if (sparklesContainer) {
    var sparkleSymbols = ["✦", "✧", "⋆", "•", "✿"];
    var count = window.innerWidth < 600 ? 14 : 26;

    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.className = "sparkle-dot";
      s.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
      s.style.left = Math.random() * 98 + "vw";
      s.style.top = Math.random() * 95 + "vh";
      s.style.fontSize = (0.7 + Math.random() * 0.9) + "rem";
      s.style.animationDuration = (5 + Math.random() * 7) + "s";
      s.style.animationDelay = (Math.random() * 5) + "s";
      sparklesContainer.appendChild(s);
    }
  }

  // ---------- 3. Night Mode (Dark Mode) ----------
  var nightToggle = document.getElementById("nightToggle");
  var modeIcon = nightToggle ? nightToggle.querySelector(".mode-icon") : null;

  function setNightMode(isDark, persist) {
    if (isDark) {
      root.setAttribute("data-mode", "dark");
      if (modeIcon) modeIcon.textContent = "☀️";
      if (nightToggle) {
        nightToggle.setAttribute("aria-label", "Switch to light mode");
        nightToggle.title = "Light mode";
      }
    } else {
      root.removeAttribute("data-mode");
      if (modeIcon) modeIcon.textContent = "🌙";
      if (nightToggle) {
        nightToggle.setAttribute("aria-label", "Switch to night mode");
        nightToggle.title = "Night mode";
      }
    }

    if (persist) {
      try {
        localStorage.setItem("mariam_night_mode", isDark ? "dark" : "light");
      } catch (e) {}
    }
  }

  var savedMode = null;
  try {
    savedMode = localStorage.getItem("mariam_night_mode");
  } catch (e) {}

  if (savedMode === "dark") {
    setNightMode(true, false);
  } else if (savedMode === "light") {
    setNightMode(false, false);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setNightMode(true, false);
  }

  if (nightToggle) {
    nightToggle.addEventListener("click", function () {
      var isCurrentlyDark = root.getAttribute("data-mode") === "dark";
      setNightMode(!isCurrentlyDark, true);
    });
  }

  // ---------- 4. Color Palette Themes (Blush, Lavender, Sage) ----------
  var swatches = document.querySelectorAll(".sw");

  function setColorTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    swatches.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.theme === theme ? "true" : "false");
    });
    if (persist) {
      try {
        localStorage.setItem("mariam_color_theme", theme);
      } catch (e) {}
    }
  }

  var savedColor = null;
  try {
    savedColor = localStorage.getItem("mariam_color_theme");
  } catch (e) {}

  if (savedColor && ["blush", "lavender", "sage"].includes(savedColor)) {
    setColorTheme(savedColor, false);
  }

  swatches.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setColorTheme(btn.dataset.theme, true);
    });
  });

  // ---------- 5. Student ID Copy to Clipboard ----------
  var copyIdBtn = document.getElementById("copyIdBtn");
  var copyTooltip = document.getElementById("copyTooltip");
  var idWrapper = document.getElementById("idWrapper");

  function copyStudentId() {
    var studentIdText = "225102659";
    navigator.clipboard.writeText(studentIdText).then(function () {
      if (copyTooltip) {
        copyTooltip.classList.add("active");
        setTimeout(function () {
          copyTooltip.classList.remove("active");
        }, 2200);
      }
    }).catch(function () {
      alert("Student ID: " + studentIdText);
    });
  }

  if (copyIdBtn) {
    copyIdBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      copyStudentId();
    });
  }
  if (idWrapper) {
    idWrapper.addEventListener("click", copyStudentId);
  }

  // ---------- 6. Skills Dataset & Animated Ribbons ----------
  var skills = [
    { name: "HTML5 & Semantic Structure", level: 90, tag: "Frontend" },
    { name: "CSS3 (Flexbox & Grid Layouts)", level: 85, tag: "Frontend" },
    { name: "JavaScript (Vanilla ES6+)", level: 82, tag: "Frontend" },
    { name: "Responsive & Mobile Design", level: 88, tag: "Web Design" },
    { name: "C++ & Object-Oriented (OOP)", level: 85, tag: "Core CS" },
    { name: "Data Structures & Algorithms", level: 80, tag: "Core CS" },
    { name: "Problem Solving & Logic", level: 82, tag: "Core CS" },
    { name: "Git & GitHub Version Control", level: 75, tag: "Tools" }
  ];

  var ribbonsContainer = document.getElementById("ribbons");
  if (ribbonsContainer) {
    skills.forEach(function (s) {
      var item = document.createElement("div");
      item.className = "skill-ribbon";
      item.style.setProperty("--level", s.level + "%");

      item.innerHTML = 
        '<div class="ribbon-top">' +
          '<span class="ribbon-name">' + s.name + '</span>' +
          '<span class="ribbon-pct">' + s.level + '%</span>' +
        '</div>' +
        '<div class="ribbon-bar">' +
          '<div class="ribbon-fill"></div>' +
        '</div>' +
        '<span class="ribbon-tag">' + s.tag + '</span>';

      ribbonsContainer.appendChild(item);
    });

    // Animate skill bars on scroll into view
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll(".skill-ribbon").forEach(function (r) {
            r.classList.add("animated");
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(ribbonsContainer);
  }

  // ---------- 7. Featured Projects Dataset & Gallery ----------
  var projects = [
    {
      title: "Personal Profile & Portfolio",
      badge: "Task 1 · FT-WEB-101",
      desc: "My official personal portfolio website built with pure semantic HTML5, modern CSS3 styling with multi-theme support, and vanilla JavaScript DOM interactions.",
      tags: ["HTML5", "CSS3 Themes", "Vanilla JS", "Responsive"]
    },
    {
      title: "Student Academic & GPA Manager",
      badge: "University Project",
      desc: "A software application developed to calculate cumulative semester GPA, track credit hours, and maintain student academic records with efficient algorithms.",
      tags: ["C++", "OOP", "Data Structures", "Algorithms"]
    },
    {
      title: "Sorting Algorithm Visualizer",
      badge: "Interactive Tool",
      desc: "Visual interactive demonstration tool highlighting the mechanics of classic sorting algorithms (Bubble Sort, Merge Sort) step-by-step in the browser.",
      tags: ["JavaScript", "DOM Animation", "Algorithms", "CSS"]
    },
    {
      title: "Modern E-Commerce Storefront",
      badge: "Frontend Prototype",
      desc: "A responsive online shopping concept with dynamic product filtering, cart calculations, and local storage data persistence.",
      tags: ["HTML5", "CSS Grid", "LocalStorage", "UI/UX"]
    }
  ];

  var gallery = document.getElementById("gallery");
  if (gallery) {
    projects.forEach(function (p) {
      var card = document.createElement("article");
      card.className = "project-card";

      var tagsHtml = p.tags.map(function (t) {
        return "<span>" + t + "</span>";
      }).join(" ");

      card.innerHTML = 
        '<span class="project-badge">' + p.badge + '</span>' +
        '<h3>' + p.title + '</h3>' +
        '<p class="project-desc">' + p.desc + '</p>' +
        '<div class="project-tags">' + tagsHtml + '</div>';

      gallery.appendChild(card);
    });

    // Gallery Left / Right navigation buttons
    var btnLeft = document.getElementById("left");
    var btnRight = document.getElementById("right");

    if (btnLeft && btnRight) {
      btnLeft.addEventListener("click", function () {
        gallery.scrollBy({ left: -340, behavior: "smooth" });
      });
      btnRight.addEventListener("click", function () {
        gallery.scrollBy({ left: 340, behavior: "smooth" });
      });
    }
  }

  // ---------- 8. Contact Form Validation ----------
  var contactForm = document.getElementById("contactForm");
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var msgInput = document.getElementById("message");
  var charCount = document.getElementById("charCount");
  var formMsg = document.getElementById("formMsg");

  if (msgInput && charCount) {
    msgInput.addEventListener("input", function () {
      var len = msgInput.value.length;
      charCount.textContent = len + " / 400";
      if (len >= 400) {
        charCount.style.color = "var(--rose)";
      } else {
        charCount.style.color = "var(--muted)";
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameVal = nameInput.value.trim();
      var emailVal = emailInput.value.trim();
      var msgVal = msgInput.value.trim();
      var isValid = true;

      function checkField(cond, inputEl, errId, errText) {
        var errEl = document.getElementById(errId);
        if (!cond) {
          inputEl.style.borderColor = "#e11d48";
          if (errEl) errEl.textContent = errText;
          isValid = false;
        } else {
          inputEl.style.borderColor = "";
          if (errEl) errEl.textContent = "";
        }
      }

      checkField(nameVal.length >= 2, nameInput, "nameErr", "Please enter your name (at least 2 characters) / الرجاء كتابة الاسم");
      checkField(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal), emailInput, "emailErr", "Please enter a valid email address / برجاء إدخال بريد إلكتروني صحيح");
      checkField(msgVal.length >= 8, msgInput, "msgErr", "Message should be at least 8 characters / الرسالة يجب أن تكون 8 أحرف على الأقل");

      if (isValid) {
        formMsg.className = "success";
        formMsg.innerHTML = "<strong>Thank you so much, " + nameVal + "! ♡</strong><br>Your note has been received. Have a wonderful day!";
        contactForm.reset();
        if (charCount) charCount.textContent = "0 / 400";

        setTimeout(function () {
          formMsg.style.display = "none";
        }, 6000);
      }
    });
  }

  // ---------- 9. Back to Top Button & Scroll Spy ----------
  var backToTopBtn = document.getElementById("backToTop");
  var navLinks = document.querySelectorAll("nav a");
  var sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY;

    // Show / Hide Back to Top button
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Highlight active nav link
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      var height = sec.offsetHeight;
      var id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
