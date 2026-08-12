/**
 * Acordeão de FAQ. Cada pergunta é um <button> real (foco e ativação
 * por teclado funcionam nativamente) com aria-expanded sincronizado
 * e aria-controls apontando para a resposta. Apenas um item fica
 * aberto por vez, o que reduz a rolagem em telas pequenas.
 */
export function initFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}
