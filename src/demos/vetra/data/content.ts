/**
 * Conteúdo da landing page demonstrativa da Vetra Academia.
 * Vetra Academia é uma marca fictícia: endereço, horários, planos,
 * valores e depoimentos são exemplos para demonstração.
 */

export const brand = {
  name: "Vetra Academia",
  address: "Av. Exemplo, 1000, Centro",
  city: "Sua cidade, UF",
  hours: [
    { days: "Segunda a sexta", time: "5h às 23h" },
    { days: "Sábado", time: "8h às 18h" },
    { days: "Domingo e feriados", time: "8h às 13h" },
  ],
};

export const nav = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

/** Mensagens pré-preenchidas do WhatsApp, uma por intenção. */
export const messages = {
  visit: "Olá! Vi o site da Vetra Academia e quero agendar uma visita para conhecer a estrutura.",
  coach: "Olá! Quero entender como funciona a avaliação inicial e o acompanhamento dos professores.",
  plan: (plan: string) => `Olá! Quero saber mais sobre o plano ${plan} da Vetra Academia.`,
};

export const hero = {
  title: "Treino sério, acompanhado de perto.",
  text: "Musculação, funcional e cardio com professores no salão e uma avaliação inicial para montar o seu treino. Venha conhecer a estrutura antes de decidir.",
};

/** Faixa de "pílulas" abaixo do hero: o que a academia oferece. */
export const highlights = [
  "Musculação",
  "Funcional",
  "Cardio",
  "Avaliação inicial",
  "Professores no salão",
  "Reavaliação periódica",
  "Seg a sex, 5h às 23h",
];

export const statement =
  "Treinar bem é treinar com orientação. Aqui o treino começa por uma avaliação, segue com professores no salão e muda conforme você evolui.";

/** Cada benefício traz um fato curto da própria academia (não são métricas de resultado). */
export const benefits = [
  {
    stat: "1º dia",
    title: "Um treino que começa por você",
    text: "Avaliação inicial com um professor para entender histórico, limitações e objetivo antes da primeira série.",
  },
  {
    stat: "8 sem.",
    title: "Um treino que evolui",
    text: "Reavaliação a cada 8 semanas nos planos Evolução e Completo, com ajuste do treino.",
  },
  {
    stat: "4",
    title: "Espaço para treinar sem fila",
    text: "Áreas separadas para peso livre, máquinas, cardio e funcional, com equipamentos em quantidade.",
  },
  {
    stat: "5h",
    title: "Horário que cabe na rotina",
    text: "Abertura às 5h e fechamento às 23h nos dias úteis, para treinar antes ou depois do trabalho.",
  },
];

export interface Area {
  id: string;
  name: string;
  text: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const areas: Area[] = [
  {
    id: "peso-livre",
    name: "Peso livre e racks",
    text: "Racks completos, bancos ajustáveis e halteres em série para treinos de força.",
    image: "estrutura",
    alt: "Salão de musculação com racks de agachamento, bancos e fileiras de halteres sob luz natural",
    width: 1264,
    height: 848,
  },
  {
    id: "funcional",
    name: "Funcional",
    text: "Pista de grama sintética, kettlebells e estrutura para aulas em grupo.",
    image: "funcional",
    alt: "Três alunos fazendo balanço com kettlebell em uma pista de grama sintética",
    width: 896,
    height: 1200,
  },
  {
    id: "cardio",
    name: "Cardio",
    text: "Bicicletas, esteiras e remos em frente às janelas, com ventilação natural.",
    image: "cardio",
    alt: "Aluno pedalando em uma bicicleta de ar na área de cardio, com outras bicicletas ao lado",
    width: 1264,
    height: 848,
  },
  {
    id: "forca",
    name: "Plataformas de força",
    text: "Plataformas de levantamento e barras olímpicas para treinos de força com segurança.",
    image: "pegada",
    alt: "Mãos com magnésio segurando uma barra olímpica, com pó de giz no ar",
    width: 928,
    height: 1152,
  },
];

export const equipment = [
  "Racks e plataformas de levantamento",
  "Halteres de 1 a 50 kg",
  "Máquinas guiadas e polias",
  "Bicicletas de ar, esteiras e remos",
  "Pista de funcional com kettlebells",
  "Vestiários com armários",
];

export interface Plan {
  id: string;
  name: string;
  summary: string;
  /** Valor ilustrativo, sem descontos ou promoções. */
  price: string;
  period: string;
  includes: string[];
  tone: "void" | "signal" | "smoke";
}

export const plans: Plan[] = [
  {
    id: "base",
    name: "Base",
    summary: "Para quem quer treinar musculação e cardio no próprio ritmo.",
    price: "129",
    period: "por mês",
    includes: ["Musculação e cardio", "Avaliação inicial", "Treino montado por um professor", "Acesso em todos os horários"],
    tone: "void",
  },
  {
    id: "evolucao",
    name: "Evolução",
    summary: "Para quem quer variar o treino e ter revisões frequentes.",
    price: "169",
    period: "por mês",
    includes: ["Tudo do plano Base", "Aulas de funcional em grupo", "Reavaliação a cada 8 semanas", "Ajuste do treino a cada reavaliação"],
    tone: "signal",
  },
  {
    id: "completo",
    name: "Completo",
    summary: "Para quem quer acompanhamento próximo e um plano individual.",
    price: "249",
    period: "por mês",
    includes: ["Tudo do plano Evolução", "Uma sessão individual por mês com professor", "Plano de treino individualizado", "Acompanhamento pelo aplicativo de treino"],
    tone: "smoke",
  },
];

export const differentials = [
  { title: "Avaliação antes do treino", text: "Ninguém começa com uma ficha genérica. O treino parte do seu histórico e objetivo." },
  { title: "Professores no salão", text: "A equipe acompanha a execução durante o treino, não só na hora de entregar a ficha." },
  { title: "Reavaliações periódicas", text: "O treino muda conforme você evolui, com revisões combinadas desde o início." },
  { title: "Sem taxa escondida", text: "Os valores são apresentados antes da matrícula, por escrito." },
];

export const testimonials = [
  {
    quote: "Eu tinha receio de voltar a treinar por causa do joelho. A avaliação inicial mudou isso: o treino foi montado pensando na minha limitação.",
    name: "Aluna fictícia",
    detail: "Exemplo de depoimento, plano Evolução",
  },
  {
    quote: "O que me fez ficar foi ter sempre um professor por perto quando eu tinha dúvida em algum exercício.",
    name: "Aluno fictício",
    detail: "Exemplo de depoimento, plano Base",
  },
  {
    quote: "Treino às 5h30 antes do trabalho e a academia já está organizada e com equipe no salão.",
    name: "Aluna fictícia",
    detail: "Exemplo de depoimento, plano Completo",
  },
];

export const faq = [
  {
    question: "Posso conhecer a academia antes de me matricular?",
    answer: "Sim. Agende uma visita pelo WhatsApp e um professor mostra a estrutura, explica os planos e tira suas dúvidas.",
  },
  {
    question: "Preciso de experiência para começar?",
    answer: "Não. A avaliação inicial serve justamente para montar um treino adequado ao seu momento, seja você iniciante ou não.",
  },
  {
    question: "Como funciona a avaliação inicial?",
    answer: "É uma conversa com um professor sobre histórico, rotina e objetivo, seguida de testes simples de mobilidade e força. A partir dela o treino é montado.",
  },
  {
    question: "Os planos têm fidelidade?",
    answer: "Nesta demonstração os planos são mensais. As condições de cada plano são apresentadas por escrito antes da matrícula.",
  },
  {
    question: "Preciso de atestado médico?",
    answer: "Recomendamos uma avaliação médica antes de iniciar atividade física, principalmente se você tiver alguma condição de saúde.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "As formas de pagamento são informadas no atendimento pelo WhatsApp ou na recepção.",
  },
];

export const goals = ["Começar a treinar", "Ganhar força e massa muscular", "Emagrecer com saúde", "Condicionamento físico", "Voltar a treinar após uma pausa", "Outro"];
export const periods = ["Manhã", "Tarde", "Noite", "Fim de semana"];
