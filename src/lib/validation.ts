export interface QuoteForm {
  name: string;
  contact: string;
  projectType: string;
  goal: string;
  budget: string;
  description: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteForm, string>>;

export const emptyQuote: QuoteForm = {
  name: "",
  contact: "",
  projectType: "",
  goal: "",
  budget: "",
  description: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Aceita e-mail ou telefone brasileiro (10 a 13 dígitos, com ou sem DDI). */
export function isValidContact(value: string): boolean {
  const v = value.trim();
  if (v.includes("@")) return EMAIL.test(v);
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13 && /^[\d\s()+-]+$/.test(v);
}

export function validateQuote(form: QuoteForm): QuoteErrors {
  const errors: QuoteErrors = {};
  if (form.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!form.contact.trim()) errors.contact = "Informe um e-mail ou WhatsApp para retorno.";
  else if (!isValidContact(form.contact))
    errors.contact = "Use um e-mail válido ou um WhatsApp com DDD, por exemplo (11) 91234-5678.";
  if (!form.projectType) errors.projectType = "Escolha o tipo de projeto.";
  if (form.goal.trim().length < 3) errors.goal = "Conte em poucas palavras o objetivo principal.";
  if (form.description.trim().length < 20)
    errors.description = "Descreva a necessidade com pelo menos 20 caracteres.";
  return errors;
}

/** Texto usado para levar o pedido ao WhatsApp ou e-mail. */
export function quoteToText(form: QuoteForm): string {
  return [
    "Olá, João! Quero solicitar um orçamento.",
    "",
    `Nome: ${form.name.trim()}`,
    `Contato: ${form.contact.trim()}`,
    `Tipo de projeto: ${form.projectType}`,
    `Objetivo principal: ${form.goal.trim()}`,
    form.budget ? `Faixa de investimento: ${form.budget}` : null,
    "",
    form.description.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
}
