(() => {
  "use strict";

  const root = document.documentElement;

  function onMediaChange(query, listener) {
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", listener);
    } else if (typeof query.addListener === "function") {
      query.addListener(listener);
    }
  }

  // The navigation remains visible in the HTML until its controls are ready.
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (menuToggle && navigation) {
    const header = menuToggle.closest("header") || menuToggle.parentElement;
    const desktop = window.matchMedia("(min-width: 800px)");
    const menuIsOpen = () => menuToggle.getAttribute("aria-expanded") === "true";

    function closeMenu(restoreFocus = false) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      if (restoreFocus) menuToggle.focus();
    }

    menuToggle.addEventListener("click", () => {
      const opening = !menuIsOpen();
      menuToggle.setAttribute("aria-expanded", String(opening));
      navigation.classList.toggle("is-open", opening);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuIsOpen()) {
        event.preventDefault();
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (menuIsOpen() && header && !header.contains(event.target)) closeMenu();
    });

    if (header) {
      header.addEventListener("focusout", () => {
        // Let the browser move focus before checking whether it left the header.
        queueMicrotask(() => {
          if (menuIsOpen() && !header.contains(document.activeElement)) closeMenu();
        });
      });
    }

    onMediaChange(desktop, (event) => {
      if (event.matches) closeMenu();
    });
    closeMenu();
  }

  root.classList.add("js");

  const comparisonRange = document.querySelector("#comparison-range");
  const comparisonStage = document.querySelector("#comparison-stage");
  const comparisonValue = document.querySelector("#comparison-value");

  if (comparisonRange instanceof HTMLInputElement && comparisonStage) {
    const updateComparison = () => {
      const value = Number(comparisonRange.value);
      const split = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 50;
      comparisonStage.style.setProperty("--split", `${split}%`);
      if (comparisonValue) comparisonValue.textContent = `${split}%`;
    };
    comparisonRange.addEventListener("input", updateComparison);
    updateComparison();
  }

  const galleryContent = {
    exterior: {
      subject: "Exterior comparison",
      description: "Reserved for approved exterior before-and-after photographs; no results shown.",
    },
    interior: {
      subject: "Interior comparison",
      description: "Reserved for approved interior before-and-after photographs; no results shown.",
    },
    finish: {
      subject: "Paint finish comparison",
      description: "Reserved for approved paint finish before-and-after photographs; no results shown.",
    },
  };
  const galleryTabs = Array.from(document.querySelectorAll("[data-gallery-tab]"))
    .filter((tab) => Object.hasOwn(galleryContent, tab.dataset.galleryTab));
  const galleryPanel = document.querySelector("#gallery-panel");
  const gallerySubject = document.querySelector("#gallery-subject");
  const galleryDescription = document.querySelector("#gallery-description");

  function activateGalleryTab(tab, moveFocus = false) {
    const content = galleryContent[tab.dataset.galleryTab];
    for (const item of galleryTabs) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    }
    if (!tab.id) tab.id = `gallery-tab-${tab.dataset.galleryTab}`;
    if (galleryPanel) galleryPanel.setAttribute("aria-labelledby", tab.id);
    if (gallerySubject) gallerySubject.textContent = content.subject;
    if (galleryDescription) galleryDescription.textContent = content.description;
    if (moveFocus) tab.focus();
  }

  for (const tab of galleryTabs) {
    tab.addEventListener("click", () => activateGalleryTab(tab));
    tab.addEventListener("keydown", (event) => {
      const index = galleryTabs.indexOf(tab);
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % galleryTabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + galleryTabs.length) % galleryTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = galleryTabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateGalleryTab(galleryTabs[nextIndex], true);
    });
  }
  if (galleryTabs.length) {
    activateGalleryTab(galleryTabs.find((tab) => tab.getAttribute("aria-selected") === "true") || galleryTabs[0]);
  }

  const contactForm = document.querySelector("#contact-form");
  const serviceSelect = document.querySelector("#service");
  const formStatus = document.querySelector("#form-status");
  const draftPanel = document.querySelector("#draft-panel");
  const draftPreview = document.querySelector("#draft-preview");
  const emailDraft = document.querySelector("#email-draft");
  const copyDraft = document.querySelector("#copy-draft");

  function setFormStatus(message) {
    if (formStatus) formStatus.textContent = message;
  }

  function clearDraft() {
    if (draftPanel) draftPanel.hidden = true;
    if (emailDraft) emailDraft.removeAttribute("href");
    if (draftPreview instanceof HTMLTextAreaElement) draftPreview.value = "";
    setFormStatus("");
  }

  for (const link of document.querySelectorAll(".service-link[data-service]")) {
    link.addEventListener("click", (event) => {
      if (!(serviceSelect instanceof HTMLSelectElement)) return;
      const service = link.dataset.service;
      if (!Array.from(serviceSelect.options).some((option) => option.value === service)) return;
      serviceSelect.value = service;
      clearDraft();
      if (event.detail === 0) {
        requestAnimationFrame(() => serviceSelect.focus({ preventScroll: true }));
      }
    });
  }

  if (contactForm instanceof HTMLFormElement && draftPanel &&
      draftPreview instanceof HTMLTextAreaElement && emailDraft instanceof HTMLAnchorElement) {
    const requiredFields = ["name", "email", "message"]
      .map((name) => contactForm.elements.namedItem(name))
      .filter((field) => field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement);

    contactForm.addEventListener("input", (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        event.target.setCustomValidity("");
      }
      clearDraft();
    });
    contactForm.addEventListener("change", clearDraft);

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      for (const field of requiredFields) {
        field.value = field.value.trim();
        field.setCustomValidity(field.value ? "" : "Please complete this field.");
      }
      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);
      const readField = (name) => String(data.get(name) || "").trim();
      const selectedService = serviceSelect instanceof HTMLSelectElement && serviceSelect.value
        ? serviceSelect.options[serviceSelect.selectedIndex].textContent.trim()
        : "Not specified";
      const vehicle = readField("vehicle");
      const body = [
        "Hello Sector 9 Detailing,",
        "",
        `Name: ${readField("name")}`,
        `Email: ${readField("email")}`,
        `Vehicle: ${vehicle || "Not specified"}`,
        `Enquiry topic: ${selectedService}`,
        "",
        readField("message"),
      ].join("\n");
      const subject = `Sector 9 Detailing enquiry${vehicle ? ` - ${vehicle}` : ""}`;

      emailDraft.href = `mailto:enquiry@sector9detailing.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      draftPreview.value = body;
      draftPanel.hidden = false;
      setFormStatus("Your email draft is ready to review below. Open it in your email app when you are ready. Nothing has been sent.");
    });

    if (copyDraft instanceof HTMLButtonElement) {
      copyDraft.addEventListener("click", async () => {
        if (draftPanel.hidden || !draftPreview.value) return;
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
          draftPreview.focus();
          draftPreview.select();
          setFormStatus("Automatic copying is unavailable. The draft is selected so you can copy it manually.");
          return;
        }
        copyDraft.disabled = true;
        try {
          await navigator.clipboard.writeText(draftPreview.value);
          setFormStatus("Draft copied to your clipboard. Nothing has been sent.");
        } catch {
          draftPreview.focus();
          draftPreview.select();
          setFormStatus("The draft could not be copied automatically. It is selected so you can copy it manually.");
        } finally {
          copyDraft.disabled = false;
        }
      });
    }

    // Keep the HTML form disabled until the local draft handler is installed.
    contactForm.noValidate = true;
    const formFields = contactForm.querySelector("#form-fields");
    const formSubmit = contactForm.querySelector("#form-submit");
    if (formFields instanceof HTMLFieldSetElement) formFields.disabled = false;
    if (formSubmit instanceof HTMLButtonElement) formSubmit.disabled = false;
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  let revealObserver;

  function configureMotion() {
    if (revealObserver) revealObserver.disconnect();
    root.classList.remove("motion-ready");
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;

    try {
      revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
      for (const element of revealElements) {
        if (!element.classList.contains("is-visible")) revealObserver.observe(element);
      }
      root.classList.add("motion-ready");
    } catch {
      // Content remains visible if the browser cannot initialise the observer.
      if (revealObserver) revealObserver.disconnect();
      root.classList.remove("motion-ready");
    }
  }

  onMediaChange(motionPreference, configureMotion);
  configureMotion();
})();
