
// =============================
// PORTFOLIO JAVASCRIPT
// Md Azad Rahman
// =============================

// Elements
const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const navLinks = document.querySelectorAll(".nav-link");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// =============================
// CURRENT YEAR
// =============================

document.getElementById("year").textContent =
  new Date().getFullYear();

// =============================
// SCROLL PROGRESS BAR
// =============================

function updateScrollUI() {
  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight -
      window.innerHeight
  );

  const scrollPercent =
    (window.scrollY / maxScroll) * 100;

  progress.style.width =
    `${Math.min(100, scrollPercent)}%`;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 12
  );
}

window.addEventListener(
  "scroll",
  updateScrollUI,
  { passive: true }
);

updateScrollUI();

// =============================
// MOBILE MENU
// =============================

function closeMenu() {
  mobileMenu.hidden = true;

  menuButton.classList.remove("open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open menu"
  );

  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = !mobileMenu.hidden;

  if (isOpen) {
    closeMenu();
  } else {
    mobileMenu.hidden = false;

    menuButton.classList.add("open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close menu"
    );

    document.body.classList.add("menu-open");
  }
});

// Close menu after clicking any link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close on Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Close when switching to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

// =============================
// ACTIVE NAVIGATION
// =============================

const sections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries.filter(
        (entry) => entry.isIntersecting
      );

      if (!visibleSections.length) return;

      visibleSections.sort(
        (a, b) =>
          b.intersectionRatio - a.intersectionRatio
      );

      const activeSection =
        visibleSections[0].target.id;

      navLinks.forEach((link) => {
        const linkSection =
          link.getAttribute("href");

        link.classList.toggle(
          "active",
          linkSection === `#${activeSection}`
        );
      });
    },
    {
      rootMargin: "-25% 0px -50% 0px",
      threshold: [0, 0.2, 0.5],
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// =============================
// GSAP ANIMATIONS
// =============================

if (!reduceMotion && window.gsap) {
  const gsap = window.gsap;

  // Hero Text Entrance
  gsap.from(".hero-intro", {
    y: 32,
    opacity: 0,
    duration: 0.95,
    stagger: 0.13,
    ease: "power3.out",
    delay: 0.1,
    clearProps: "all",
  });

  // Hero Visual Entrance
  gsap.from(".hero-stage", {
    y: 45,
    scale: 0.94,
    opacity: 0,
    duration: 1.3,
    ease: "power3.out",
    delay: 0.35,
    clearProps: "all",
  });

  // Scroll Reveal Animations
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach(
      (element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },

          opacity: 0,
          y: 38,
          duration: 0.82,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    );
  }
}

// =============================
// HERO MOUSE PARALLAX
// =============================

const stage = document.getElementById("heroStage");

const hasMouse = window.matchMedia(
  "(pointer: fine)"
).matches;

if (stage && !reduceMotion && hasMouse) {
  const orbit = stage.querySelector(
    ".orbit-outer"
  );

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width -
        0.5) * 12;

    const y =
      ((event.clientY - rect.top) /
        rect.height -
        0.5) * 12;

    if (orbit) {
      orbit.style.transform =
        `translate(${x}px, ${y}px)`;
    }
  });

  stage.addEventListener("pointerleave", () => {
    if (orbit) {
      orbit.style.transform =
        "translate(0px, 0px)";
    }
  });
}
