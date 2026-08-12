/**
 * Controla o menu mobile: abre/fecha por clique e por teclado (Enter,
 * Espaço, Escape), fecha ao navegar para uma âncora e mantém o estado
 * de aria-expanded sincronizado para leitores de tela.
 */
export function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha o menu ao escolher um link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha com Escape, de qualquer lugar da página
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Fecha ao redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}
