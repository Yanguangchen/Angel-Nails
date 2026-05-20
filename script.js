const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

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

const navLinks = document.querySelectorAll(".site-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMobileNavOpen(false);
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const initShimmerText = () => {
  const targets = document.querySelectorAll(".text-shimmer-loop");
  targets.forEach((el) => {
    if (el.dataset.shimmerInit === "true") return;
    const original = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!original) return;
    el.setAttribute("aria-label", original);
    el.textContent = "";
    const chars = Array.from(original);
    chars.forEach((ch, idx) => {
      const span = document.createElement("span");
      span.className = "shimmer-char";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", String(idx));
      if (ch === " ") {
        span.classList.add("shimmer-space");
        span.textContent = "\u00A0";
      } else {
        span.textContent = ch;
      }
      el.appendChild(span);
    });
    el.dataset.shimmerInit = "true";
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShimmerText);
} else {
  initShimmerText();
}

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

const initFaqAccordion = () => {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  items.forEach((item) => {
    const summary = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-answer");
    if (!summary || !panel) return;

    if (item.hasAttribute("open")) {
      panel.style.height = "auto";
      panel.style.opacity = "1";
    } else {
      panel.style.height = "0px";
      panel.style.opacity = "0";
    }

    let animating = false;

    const open = () => {
      if (animating) return;
      animating = true;
      item.setAttribute("open", "");
      panel.style.opacity = "1";
      const target = panel.scrollHeight;
      if (prefersReducedMotion) {
        panel.style.height = "auto";
        animating = false;
        return;
      }
      panel.style.height = "0px";
      requestAnimationFrame(() => {
        panel.style.height = target + "px";
      });
      const onEnd = (event) => {
        if (event.propertyName !== "height") return;
        panel.style.height = "auto";
        panel.removeEventListener("transitionend", onEnd);
        animating = false;
      };
      panel.addEventListener("transitionend", onEnd);
    };

    const close = () => {
      if (animating) return;
      animating = true;
      if (prefersReducedMotion) {
        item.removeAttribute("open");
        panel.style.height = "0px";
        panel.style.opacity = "0";
        animating = false;
        return;
      }
      const current = panel.scrollHeight;
      panel.style.height = current + "px";
      panel.offsetHeight;
      requestAnimationFrame(() => {
        panel.style.height = "0px";
        panel.style.opacity = "0";
      });
      const onEnd = (event) => {
        if (event.propertyName !== "height") return;
        item.removeAttribute("open");
        panel.removeEventListener("transitionend", onEnd);
        animating = false;
      };
      panel.addEventListener("transitionend", onEnd);
    };

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (item.hasAttribute("open")) {
        close();
      } else {
        open();
      }
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFaqAccordion);
} else {
  initFaqAccordion();
}
