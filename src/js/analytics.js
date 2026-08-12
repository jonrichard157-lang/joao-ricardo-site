/**
 * Camada de eventos desacoplada de qualquer ferramenta específica.
 * Hoje só registra no console (modo debug). Quando houver uma conta de
 * Google Analytics, Plausible ou similar, basta implementar o envio
 * real dentro de trackEvent — nenhum outro arquivo precisa mudar.
 *
 * Eventos previstos: hero_cta_click, portfolio_view, whatsapp_click,
 * form_start, form_submit.
 */
const DEBUG = import.meta.env.DEV;

export function trackEvent(name, data = {}) {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${name}`, data);
  }

  // TODO: conectar a um provedor real, por exemplo:
  // window.plausible?.(name, { props: data });
  // window.gtag?.("event", name, data);
}
