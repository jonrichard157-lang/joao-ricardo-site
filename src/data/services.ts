import type { Service } from "../types";

/** Sem preços fixos: o valor depende do escopo de cada projeto. */
export const services: Service[] = [
  {
    id: "site-institucional",
    title: "Sites institucionais",
    problem:
      "Quem procura sua empresa encontra só um perfil em rede social, sem informações claras sobre o que você faz e como contratar.",
    audience: "Empresas, prestadores de serviço e profissionais liberais que precisam de um endereço próprio na internet.",
    includes: ["Páginas de apresentação e serviços", "Contato e localização", "SEO básico", "Publicação"],
    ctaLabel: "Orçar um site institucional",
    projectType: "Site institucional",
  },
  {
    id: "landing-page",
    title: "Landing pages",
    problem:
      "Você tem uma oferta, campanha ou serviço específico, mas nenhum lugar que explique e leve o visitante a pedir contato.",
    audience: "Quem anuncia, lança um serviço ou quer captar contatos de um público específico.",
    includes: ["Página única com foco em uma ação", "Formulário ou WhatsApp", "Estrutura pensada para anúncios"],
    ctaLabel: "Orçar uma landing page",
    projectType: "Landing page",
  },
  {
    id: "ecommerce",
    title: "E-commerce e catálogos",
    problem:
      "Seus produtos vivem em fotos soltas e listas de preço enviadas uma a uma, e cada venda começa do zero.",
    audience: "Lojas e pequenos produtores que querem mostrar produtos de forma organizada, com ou sem pagamento online.",
    includes: ["Catálogo com categorias", "Pedido por WhatsApp ou carrinho", "Fácil de atualizar"],
    ctaLabel: "Orçar um catálogo ou loja",
    projectType: "Catálogo digital ou e-commerce",
  },
  {
    id: "dashboards",
    title: "Dashboards e sistemas",
    problem:
      "Clientes, pedidos ou atendimentos estão espalhados em planilhas e cadernos, e é difícil ter uma visão do todo.",
    audience: "Negócios que precisam organizar uma rotina interna em uma ferramenta própria, acessível pelo navegador.",
    includes: ["Telas de cadastro e consulta", "Painéis com indicadores", "Acesso por login"],
    ctaLabel: "Orçar um sistema",
    projectType: "Dashboard ou sistema de gestão",
  },
  {
    id: "saas-automacoes",
    title: "SaaS e automações",
    problem:
      "Uma tarefa repetitiva toma horas da semana, ou você tem a ideia de um produto digital e precisa tirá-la do papel.",
    audience: "Empreendedores com uma ideia de produto ou equipes com processos manuais. Viabilidade avaliada caso a caso.",
    includes: ["Conversa de viabilidade", "Escopo por etapas", "Primeira versão enxuta"],
    ctaLabel: "Conversar sobre a ideia",
    projectType: "SaaS ou automação",
  },
];

export const projectTypes = [...services.map((s) => s.projectType), "Sistema web personalizado", "Ainda não sei"];
