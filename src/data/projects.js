/**
 * Projetos reais (isDemo: false) e demonstrações (isDemo: true).
 * Nenhum número ou depoimento é inventado — quando não há dado real
 * disponível, o campo "result" usa linguagem qualitativa.
 */
export const projects = [
  {
    id: "dra-caroline",
    isDemo: false,
    segment: "Odontologia",
    title: "Dra. Caroline",
    challenge:
      "Presença digital que transmitisse confiança e profissionalismo para novos pacientes.",
    solution:
      "Site com apresentação profissional, serviços, localização e depoimentos.",
    result:
      "Pacientes encontram informações do consultório e falam diretamente pelo WhatsApp, em qualquer dispositivo.",
    technologies: ["React", "TypeScript", "WhatsApp API"],
  },
  {
    id: "esl-eletrica",
    isDemo: false,
    segment: "Elétrica",
    title: "ESL Elétrica",
    challenge:
      "Empresa sem site próprio, dependente apenas de indicação boca a boca.",
    solution: "Apresentação da empresa, serviços e canal de contato direto.",
    result:
      "Presença profissional que reforça a credibilidade da empresa em orçamentos e propostas.",
    technologies: ["React", "Vite", "WhatsApp API"],
  },
];

export const demonstrations = [
  {
    id: "demo-eletricista",
    title: "Eletricista / Manutenção",
    goal: "Gerar pedidos de orçamento pelo WhatsApp.",
  },
  {
    id: "demo-clinica",
    title: "Clínica / Dentista",
    goal: "Gerar agendamentos.",
  },
  {
    id: "demo-barbearia",
    title: "Barbearia",
    goal: "Gerar agendamentos e contatos.",
  },
];
