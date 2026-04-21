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

const galleryToggle = document.querySelector("#gallery-toggle");
const galleryGrid = document.querySelector("#gallery-grid");

if (galleryToggle && galleryGrid) {
  galleryToggle.addEventListener("click", () => {
    const isCollapsed = galleryGrid.classList.toggle("collapsed");
    galleryToggle.textContent = isCollapsed ? "Show more" : "Show less";
    galleryToggle.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

const emailPopup = document.querySelector("#email-popup");
const emailForm = document.querySelector("#email-popup-form");

if (emailPopup) {
  const POPUP_KEY = "angel_popup_dismissed";
  const wasDismissed = localStorage.getItem(POPUP_KEY);

  const openPopup = () => {
    emailPopup.classList.add("open");
    emailPopup.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  };

  const closePopup = () => {
    emailPopup.classList.remove("open");
    emailPopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
    localStorage.setItem(POPUP_KEY, "1");
  };

  if (!wasDismissed) {
    setTimeout(openPopup, 8000);
  }

  emailPopup.querySelector(".email-popup-close")?.addEventListener("click", closePopup);
  emailPopup.querySelector(".email-popup-backdrop")?.addEventListener("click", closePopup);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && emailPopup.classList.contains("open")) {
      closePopup();
    }
  });

  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const card = emailPopup.querySelector(".email-popup-card");
      if (card) {
        card.innerHTML =
          '<p class="email-popup-success">You\'re in! Check your inbox for your 10% welcome code.</p>';
        setTimeout(closePopup, 3000);
      }
    });
  }
}

