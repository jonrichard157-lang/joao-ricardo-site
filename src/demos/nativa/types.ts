export type CategoryId = "ceramica" | "texteis" | "iluminacao" | "madeira-fibras";

export type Material = "Cerâmica" | "Linho" | "Algodão" | "Fibra natural" | "Madeira" | "Latão";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  /** Produto usado como imagem da categoria. */
  cover: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  material: Material;
  /** Preço em centavos, para evitar erros de arredondamento. */
  price: number;
  description: string;
  dimensions: string;
  care: string;
  /** Nome base da imagem em /public/demos/nativa-casa/img. */
  image: string;
  alt: string;
  isNew?: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export type PriceRange = "ate-150" | "150-300" | "acima-300";
export type SortOrder = "relevancia" | "menor-preco" | "maior-preco" | "nome";

export interface CatalogQuery {
  q: string;
  category: CategoryId | "";
  materials: Material[];
  price: PriceRange | "";
  sort: SortOrder;
}
