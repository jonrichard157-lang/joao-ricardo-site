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
    id: "demo-vetra-academia",
    title: "Vetra Academia",
    category: "Landing page",
    description:
      "Landing page para uma academia fictícia: planos, estrutura, perguntas frequentes e agendamento de visita pelo WhatsApp com mensagem pronta.",
    availability: "disponivel",
    url: `${import.meta.env.BASE_URL}demos/vetra-academia/`,
    image: {
      src: "/demos/vetra-academia-preview.webp",
      alt: "Topo da landing page da Vetra Academia, com foto de uma aluna levantando uma barra",
      width: 1280,
      height: 800,
    },
    preview: "academia",
  },
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

