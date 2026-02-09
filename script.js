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

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

const cnyModal = document.querySelector("#cny-modal");
const cnyClose = cnyModal?.querySelector(".modal-close");

const closeCnyModal = () => {
  if (!cnyModal) return;
  cnyModal.classList.remove("open");
  cnyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("nav-open");
};

const shouldShowCnyModal = () => {
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), 11, 18, 23, 59, 59);
  return now <= cutoff;
};

if (cnyModal && shouldShowCnyModal()) {
  cnyModal.classList.add("open");
  cnyModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("nav-open");

  cnyClose?.addEventListener("click", closeCnyModal);
  cnyModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close) {
      closeCnyModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCnyModal();
    }
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

