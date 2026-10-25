import { config, hasWhatsapp } from "../config";

export const DEFAULT_WA_MESSAGE = "Olá, João! Vim pelo site da VeyzaTech e quero conversar sobre um projeto.";

/** Link do WhatsApp, ou null se o número não estiver configurado. */
export function whatsappUrl(message = DEFAULT_WA_MESSAGE): string | null {
  if (!hasWhatsapp) return null;
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string | null {
  if (!config.email) return null;
  return `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
