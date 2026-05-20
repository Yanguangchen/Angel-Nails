const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navClose = document.querySelector(".nav-close");

const setMobileNavOpen = (open) => {
  if (!siteNav || !navToggle) return;
  siteNav.classList.toggle("open", open);
  navToggle.classList.toggle("active", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
};

if (siteNav) {
  siteNav.addEventListener("click", (event) => {
    if (event.target === siteNav) {
      setMobileNavOpen(false);
    }
  });
}

if (navToggle && siteNav) {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("click", () => {
    setMobileNavOpen(!siteNav.classList.contains("open"));
  });
}

if (navClose && siteNav && navToggle) {
  navClose.addEventListener("click", () => {
    setMobileNavOpen(false);
  });
}

const navLinks = document.querySelectorAll(".site-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMobileNavOpen(false);
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

const modal = document.querySelector("#gallery-modal");
const modalImage = document.querySelector("#modal-image");
const galleryItems = document.querySelectorAll(".gallery-item");
const modalClose = modal?.querySelector(".modal-close");

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("nav-open");
};

if (modal && modalImage) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-full") || "";
      if (!src) return;
      modalImage.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close) {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (modal?.classList?.contains("open")) {
    closeModal();
    return;
  }
  if (siteNav?.classList.contains("open")) {
    setMobileNavOpen(false);
  }
});

const galleryToggle = document.querySelector("#gallery-toggle");
const galleryGrid = document.querySelector("#gallery-grid");

if (galleryToggle && galleryGrid) {
  galleryToggle.addEventListener("click", () => {
    const isCollapsed = galleryGrid.classList.toggle("collapsed");
    galleryToggle.textContent = isCollapsed ? "Show more" : "Show less";
    galleryToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}
