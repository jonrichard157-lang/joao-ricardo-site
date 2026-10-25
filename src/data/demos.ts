import type { Demo } from "../types";

/**
 * Demonstrações conceituais: projetos independentes, sem cliente real,
 * que mostram como um tipo de site ou sistema pode funcionar.
 *
 * O botão "Experimentar" só aparece quando `availability` é
 * "disponivel" E existe `url`. Nos outros casos o card mostra o estado
 * real da demo, sem link.
 */
export const demos: Demo[] = [
  {
    id: "demo-eletricista",
    title: "Prestador de serviços elétricos",
    category: "Landing page",
    description:
      "Página única focada em pedidos de orçamento: serviços, área de atendimento e contato pelo WhatsApp em destaque.",
    availability: "em-construcao",
    url: null,
    preview: "eletrica",
  },
  {
    id: "demo-barbearia",
    title: "Barbearia",
    category: "Site com agendamento",
    description:
      "Site com serviços, valores e um fluxo de agendamento simulado para mostrar como o cliente escolheria dia e horário.",
    availability: "em-breve",
    url: null,
    preview: "barbearia",
  },
  {
    id: "demo-catalogo",
    title: "Catálogo de produtos",
    category: "Catálogo digital",
    description:
      "Catálogo com busca e filtros por categoria, em que o pedido é finalizado por mensagem no WhatsApp.",
    availability: "em-breve",
    url: null,
    preview: "catalogo",
  },
];

