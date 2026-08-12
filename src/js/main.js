import "../css/main.css";

import { renderContent } from "./render.js";
import { initNavigation } from "./navigation.js";
import { initFaq } from "./faq.js";
import { initReveal } from "./reveal.js";
import { initForm } from "./form.js";
import { initWhatsapp } from "./whatsapp.js";
import { trackEvent } from "./analytics.js";

function setCurrentYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initCtaTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent(el.getAttribute("data-track"), {
        source: el.getAttribute("data-track-source") || undefined,
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Conteúdo data-driven precisa existir no DOM antes de qualquer
  //    módulo que dependa dele (FAQ, WhatsApp nos cards de serviço).
  renderContent();

  // 2. Interações
  initNavigation();
  initFaq();
  initReveal();
  initForm();
  initWhatsapp();
  initCtaTracking();
  setCurrentYear();
});
