/**
 * Número do WhatsApp da academia (DDI + DDD + número, só dígitos).
 * Vazio = modo demonstração: os botões mostram a mensagem que seria
 * enviada, sem abrir conversa com um número inexistente.
 */
const raw = (import.meta.env.VITE_VETRA_WHATSAPP ?? "").replace(/\D/g, "");

export const vetraWhatsapp = raw.length >= 12 ? raw : "";

/** Caminho das imagens, compatível com a Vercel (raiz) e o GitHub Pages (subpasta). */
export const img = (name: string, width: number) =>
  `${import.meta.env.BASE_URL}demos/vetra-academia/img/${name}-${width}.webp`;

export const portfolioUrl = import.meta.env.BASE_URL;
