const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

function closeMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const sections = document.querySelectorAll("main section[id]");
if (sections.length && navLinks.length) {
  const sectionLinks = new Map(
    Array.from(navLinks).map((link) => [link.getAttribute("href").slice(1), link])
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = sectionLinks.get(entry.target.id);
        if (!link) return;
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}
