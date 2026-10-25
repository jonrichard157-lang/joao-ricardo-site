import type { FaqItem, Step } from "../types";

export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#demonstracoes", label: "Demonstrações" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export const processSteps: Step[] = [
  {
    title: "Conversa inicial",
    text: "Você conta o que precisa e para quem. Eu faço perguntas até entender o problema que o site ou sistema deve resolver.",
  },
  {
    title: "Escopo, prazo e orçamento",
    text: "Envio uma proposta por escrito com o que será entregue, em quanto tempo e por qual valor. Nada começa sem o seu aceite.",
  },
  {
    title: "Desenvolvimento com prévias",
    text: "Você acompanha versões de prévia em um link próprio e aprova cada etapa antes de seguirmos.",
  },
  {
    title: "Testes, publicação e orientações",
    text: "Testo em celular e computador, publico no seu domínio e explico como usar e atualizar o que foi entregue.",
  },
];

/** Linha do tempo da seção Sobre. */
export const journey: Step[] = [
  {
    title: "Eletroeletrônica",
    text: "Trabalho com diagnóstico técnico, manutenção e reparo de equipamentos, onde aprendi a investigar a causa de um problema antes de trocar peças.",
  },
  {
    title: "Transição para software",
    text: "O mesmo raciocínio de diagnóstico me levou à programação: entender o sistema, isolar a falha, testar a solução.",
  },
  {
    title: "BYU-Pathway Worldwide",
    text: "Atualmente curso Software Development pela BYU-Pathway Worldwide.",
  },
  {
    title: "VeyzaTech",
    text: "Atendo pequenos negócios e profissionais com sites e sistemas web, assumindo projetos que consigo entregar bem.",
  },
];

/**
 * Tecnologias. Mantenha a separação honesta: "uso" só para o que já
 * aplico em projetos; o restante fica em "estudo".
 * TODO(João): revisar as duas listas.
 */
export const techCurrent = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Vite", "Git e GitHub", "Vercel"];
export const techLearning = ["Node.js", "Bancos de dados SQL", "Testes automatizados", "Next.js"];

export const faqItems: FaqItem[] = [
  {
    question: "Quanto custa um site ou sistema?",
    answer:
      "Depende do escopo: número de páginas, funcionalidades, integrações e quem fornece textos e imagens. Depois da conversa inicial envio um orçamento fechado, por escrito, sem cobranças surpresa.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "O prazo é definido junto com o escopo e consta na proposta. Projetos menores, como uma landing page, costumam ser mais rápidos que sistemas com login e banco de dados. O envio de textos e imagens por parte do cliente também influencia.",
  },
  {
    question: "Preciso ter um domínio?",
    answer:
      "Não precisa ter antes de começar. Posso orientar na escolha e no registro do domínio (por exemplo, no Registro.br). O domínio fica registrado no seu nome.",
  },
  {
    question: "Como funciona a hospedagem?",
    answer:
      "Para sites, costumo usar plataformas como a Vercel, que têm planos gratuitos adequados a muitos projetos pequenos. Sistemas com banco de dados podem ter custos mensais de servidor, que são explicados na proposta.",
  },
  {
    question: "Vocês oferecem manutenção depois da entrega?",
    answer:
      "Sim. Ajustes combinados no escopo estão incluídos. Depois da entrega, alterações e evoluções podem ser feitas sob demanda ou em um acompanhamento mensal, conforme sua necessidade.",
  },
  {
    question: "Posso pedir alterações durante o projeto?",
    answer:
      "Sim. As prévias existem para isso. A proposta define quantas rodadas de revisão estão incluídas; mudanças que alteram o escopo são conversadas e orçadas antes.",
  },
  {
    question: "Quem publica o site?",
    answer:
      "Eu cuido da publicação, da configuração do domínio e dos testes finais. Você recebe os acessos e as orientações para que o projeto continue sendo seu.",
  },
  {
    question: "Como faço para contratar?",
    answer:
      "Envie o formulário desta página ou chame no WhatsApp. Conversamos sobre a necessidade, envio a proposta e, com o seu aceite, combinamos o início e a forma de pagamento.",
  },
];
