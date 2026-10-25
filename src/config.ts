/**
 * Configuração central. Os valores vêm de variáveis de ambiente públicas
 * (VITE_*), definidas em .env.local ou no painel da Vercel. Veja .env.example.
 * Nunca coloque chaves secretas aqui: tudo neste arquivo vai para o navegador.
 */
const env = import.meta.env;

const digitsOnly = (value: string | undefined) => (value ?? "").replace(/\D/g, "");

export const config = {
  brand: "VeyzaTech",
  owner: "João Ricardo",
  /** DDI + DDD + número. Vazio = botões de WhatsApp levam ao formulário. */
  whatsappNumber: digitsOnly(env.VITE_WHATSAPP_NUMBER),
  email: (env.VITE_CONTACT_EMAIL ?? "").trim(),
  /** URL que recebe o formulário via POST JSON. Vazio = envio desativado. */
  formEndpoint: (env.VITE_FORM_ENDPOINT ?? "").trim(),
  siteUrl: (env.VITE_SITE_URL ?? "").trim(),
};

export const hasWhatsapp = config.whatsappNumber.length >= 12;
export const hasFormEndpoint = /^https:\/\//.test(config.formEndpoint);
