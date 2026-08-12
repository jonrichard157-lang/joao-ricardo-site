import { buildWhatsappLink } from "../config.js";
import { trackEvent } from "./analytics.js";

/**
 * Preenche todo elemento com [data-wa] com o link correto do WhatsApp,
 * usando a mensagem em [data-wa-message] quando presente. Isso evita
 * que o número apareça mais de uma vez no HTML ou em outros módulos.
 */
export function initWhatsapp() {
  const links = document.querySelectorAll("[data-wa]");

  links.forEach((link) => {
    const message = link.getAttribute("data-wa-message") || undefined;
    link.setAttribute("href", buildWhatsappLink(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");

    link.addEventListener("click", () => {
      trackEvent("whatsapp_click", { source: link.getAttribute("data-wa-source") || "unknown" });
    });
  });
}
