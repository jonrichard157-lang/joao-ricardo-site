/**
 * Configuração central do site.
 * Nenhum outro arquivo deve conter número de WhatsApp, e-mail ou links
 * "hardcoded" — sempre importe daqui. Isso evita números espalhados
 * pelo projeto e facilita trocar o contato em produção.
 */
export const config = {
  name: "João Ricardo",
  role: "Desenvolvedor de sites e landing pages",

  // TODO: substituir pelo número real antes de publicar (formato: DDI+DDD+número, só dígitos)
  whatsappNumber: "5500000000000",

  email: "contato@joaoricardo.dev", // TODO: substituir pelo e-mail real

  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },

  domain: "https://joaoricardo.dev", // TODO: substituir pelo domínio real

  // Endpoint de formulário (Web3Forms, Formspree, webhook próprio etc.)
  // Deixe null enquanto não houver um backend configurado — o formulário
  // funciona normalmente em modo "somente WhatsApp" nesse caso.
  formEndpoint: null,
};

/**
 * Monta uma URL do wa.me com número e mensagem centralizados.
 * @param {string} message - texto pré-preenchido da conversa
 */
export function buildWhatsappLink(message = "Olá João, quero falar sobre meu projeto") {
  const text = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${text}`;
}
