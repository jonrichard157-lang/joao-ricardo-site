import type { Project } from "../types";

/**
 * Portfólio. Regras:
 * - Não inventar funcionalidades, clientes, resultados ou depoimentos.
 * - `status` diz se o projeto é real (entregue), conceitual ou em desenvolvimento.
 * - `liveUrl: null` enquanto não houver um endereço público que funcione.
 * - Para usar uma captura real, salve a imagem em /public/projects e
 *   preencha `image`. Sem ela, o site desenha uma prévia ilustrativa
 *   e avisa o visitante disso.
 */
export const projects: Project[] = [
  {
    id: "esl-eletrica",
    name: "ESL Elétrica",
    status: "real",
    visible: true,
    category: "Site institucional",
    summary:
      "Site para uma empresa de serviços elétricos que dependia apenas de indicações. O site apresenta a empresa, os serviços prestados e um canal direto de contato.",
    highlights: [
      "Apresentação da empresa e dos serviços",
      "Contato direto pelo WhatsApp",
      "Layout responsivo para celular e computador",
    ],
    technologies: ["React", "Vite"],
    liveUrl: "https://esleletrica.com/",
    preview: "eletrica",
  },
  {
    id: "dra-caroline",
    name: "Dra. Caroline",
    status: "real",
    visible: true,
    category: "Site para profissional de saúde",
    summary:
      "Site de apresentação para um consultório odontológico, pensado para transmitir confiança a novos pacientes e facilitar o primeiro contato.",
    highlights: [
      "Apresentação profissional e dos serviços",
      "Localização do consultório",
      "Contato direto pelo WhatsApp",
    ],
    technologies: ["React", "TypeScript"],
    liveUrl: "https://dra-caroline-site-nine.vercel.app/",
    preview: "clinica",
  },
  {
    id: "leadfinder",
    name: "LeadFinder",
    status: "em-desenvolvimento",
    visible: true,
    category: "Sistema web",
    // TODO(João): revisar a descrição para refletir exatamente o escopo atual.
    summary:
      "Ferramenta web em desenvolvimento para organizar a prospecção de contatos comerciais em um só painel.",
    highlights: ["Projeto autoral em desenvolvimento", "Interface em formato de painel"],
    technologies: ["React", "TypeScript"],
    liveUrl: null,
    preview: "leads",
  },
  {
    id: "vetra-academia",
    name: "Vetra Academia",
    status: "conceitual",
    visible: true,
    category: "Landing page",
    summary:
      "Landing page para uma academia fictícia, criada para mostrar como uma página pode levar o visitante a agendar uma visita pelo WhatsApp.",
    highlights: [
      "Planos, estrutura e perguntas frequentes",
      "Botões de WhatsApp com mensagens pré-preenchidas",
      "Formulário de agendamento de visita com validação",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: `${import.meta.env.BASE_URL}demos/vetra-academia/`,
    image: {
      src: "/demos/vetra-academia-preview.webp",
      alt: "Topo da landing page da Vetra Academia, com foto de uma aluna levantando uma barra",
      width: 1280,
      height: 800,
    },
    preview: "academia",
  },
];

export const visibleProjects = projects.filter((p) => p.visible);
