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
    liveUrl: null,
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
    liveUrl: null,
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
    id: "ellus-academia",
    name: "Ellus Academia",
    status: "em-desenvolvimento",
    // Deixe `visible: false` se o site ainda não estiver pronto para ser mostrado.
    visible: true,
    category: "Site institucional",
    summary: "Site para uma academia, atualmente em desenvolvimento.",
    highlights: ["Em desenvolvimento"],
    technologies: ["React"],
    liveUrl: null,
    preview: "academia",
  },
];

export const visibleProjects = projects.filter((p) => p.visible);
