const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navClose = document.querySelector(".nav-close");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
    navToggle.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });
}

if (navClose && siteNav && navToggle) {
  navClose.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
}

const navLinks = document.querySelectorAll(".site-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const heroButtons = document.querySelectorAll(".hero-chip");
const heroFocus = document.querySelector("#hero-focus");

if (heroButtons.length && heroFocus) {
  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      heroButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const text = button.dataset.text || "";
      heroFocus.textContent = text;
    });
  });
}

const galleryToggle = document.querySelector("#gallery-toggle");
const galleryGrid = document.querySelector("#gallery-grid");

if (galleryToggle && galleryGrid) {
  galleryToggle.addEventListener("click", () => {
    const isCollapsed = galleryGrid.classList.toggle("collapsed");
    galleryToggle.textContent = isCollapsed ? "Show more" : "Show less";
    galleryToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

