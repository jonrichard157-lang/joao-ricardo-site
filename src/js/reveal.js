/**
 * Revela elementos com a classe .reveal conforme entram na viewport.
 * Respeita prefers-reduced-motion mostrando tudo de imediato, sem
 * depender apenas do CSS (evita flash de conteúdo invisível para quem
 * usa essa preferência).
 */
export function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}
