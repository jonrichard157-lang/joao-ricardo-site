import { config } from "../config.js";
import { trackEvent } from "./analytics.js";

/**
 * Formulário de lead com validação simples no frontend e quatro
 * estados visuais: inicial, preenchendo, erro e sucesso.
 *
 * Não existe backend real neste projeto. Se `config.formEndpoint`
 * estiver definido no futuro (Web3Forms, Formspree, webhook próprio),
 * a função `submitLead` abaixo é o único lugar que precisa mudar —
 * hoje ela só simula o envio e orienta o usuário a usar o WhatsApp.
 */
export function initForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector("button[type='submit']");
  let started = false;

  form.addEventListener(
    "input",
    () => {
      if (!started) {
        started = true;
        trackEvent("form_start");
      }
    },
    { once: false }
  );

  // Marca campos como "tocados" ao sair deles, para só então mostrar erro
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      field.setAttribute("data-touched", "true");
      validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fields = Array.from(form.querySelectorAll("[required]"));
    fields.forEach((field) => field.setAttribute("data-touched", "true"));

    const isValid = fields.every((field) => validateField(field));
    if (!isValid) {
      setStatus(status, "error", "Verifique os campos destacados antes de enviar.");
      return;
    }

    setLoading(submitBtn, true);

    try {
      await submitLead(new FormData(form));
      trackEvent("form_submit");
      setStatus(
        status,
        "success",
        "Recebido! Se preferir uma resposta mais rápida, fale direto pelo WhatsApp acima."
      );
      form.reset();
    } catch (err) {
      setStatus(status, "error", "Não foi possível enviar agora. Tente novamente ou use o WhatsApp.");
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

function validateField(field) {
  const wrapper = field.closest(".field");
  const isValid = field.checkValidity();

  if (!wrapper) return isValid;

  wrapper.classList.toggle("has-error", !isValid && field.getAttribute("data-touched") === "true");
  return isValid;
}

function setStatus(statusEl, state, message) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.setAttribute("data-state", state);
}

function setLoading(button, isLoading) {
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = isLoading ? "Enviando..." : "Enviar projeto";
}

/**
 * Envia o lead. Sem endpoint configurado, apenas resolve após um
 * pequeno delay (simula uma chamada de rede) para que os estados de
 * loading/sucesso do formulário sejam visíveis e testáveis.
 */
async function submitLead(formData) {
  if (!config.formEndpoint) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return;
  }

  const response = await fetch(config.formEndpoint, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Falha ao enviar formulário: ${response.status}`);
  }
}
