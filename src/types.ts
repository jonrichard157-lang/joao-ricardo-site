/** Situação de um projeto do portfólio. */
export type ProjectStatus = "real" | "conceitual" | "em-desenvolvimento";

/** Disponibilidade de uma demonstração ao vivo. */
export type DemoAvailability = "disponivel" | "em-construcao" | "em-breve";

/**
 * Estilo da prévia ilustrativa desenhada em código, usada enquanto não
 * houver captura de tela real (`image`).
 */
export type PreviewVariant = "eletrica" | "clinica" | "leads" | "academia" | "barbearia" | "catalogo";

export interface ImageAsset {
  /** Caminho a partir de /public, ex.: "/projects/esl-eletrica.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  /** false esconde o projeto do site sem apagar os dados. */
  visible: boolean;
  category: string;
  summary: string;
  /** Somente o que realmente foi entregue. */
  highlights: string[];
  technologies: string[];
  /** Link público. null = não exibe botão de visita. */
  liveUrl: string | null;
  image?: ImageAsset;
  preview: PreviewVariant;
}

export interface Demo {
  id: string;
  title: string;
  category: string;
  description: string;
  availability: DemoAvailability;
  /** Só é usado quando availability === "disponivel". */
  url: string | null;
  image?: ImageAsset;
  preview: PreviewVariant;
}

export interface Service {
  id: string;
  title: string;
  problem: string;
  audience: string;
  includes: string[];
  ctaLabel: string;
  /** Valor pré-selecionado em "Tipo de projeto" no formulário. */
  projectType: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
