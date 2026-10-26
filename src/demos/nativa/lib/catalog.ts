import { priceRanges, products } from "../data/catalog";
import type { CatalogQuery, CategoryId, Material, PriceRange, Product, SortOrder } from "../types";

export const emptyQuery: CatalogQuery = { q: "", category: "", materials: [], price: "", sort: "relevancia" };

/** Compara textos ignorando maiúsculas e acentos ("ceramica" encontra "Cerâmica"). */
export const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

export function filterProducts(list: Product[], query: CatalogQuery): Product[] {
  const q = normalize(query.q);
  const range = priceRanges.find((r) => r.id === query.price);
  return list.filter(
    (p) =>
      (!q || normalize(p.name).includes(q)) &&
      (!query.category || p.category === query.category) &&
      (query.materials.length === 0 || query.materials.includes(p.material)) &&
      (!range || (p.price >= range.min && p.price <= range.max)),
  );
}

export function sortProducts(list: Product[], sort: SortOrder): Product[] {
  const copy = [...list];
  switch (sort) {
    case "menor-preco":
      return copy.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return copy.sort((a, b) => b.price - a.price);
    case "nome":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    default:
      // Destaques: novidades primeiro, mantendo a ordem do catálogo.
      return copy.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  }
}

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productById = (id: string) => products.find((p) => p.id === id);

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatPrice = (cents: number) => money.format(cents / 100);

/* Consulta do catálogo <-> parâmetros da URL (#/loja?categoria=...). */
export function queryFromParams(params: URLSearchParams): CatalogQuery {
  const sort = params.get("ordem") as SortOrder | null;
  return {
    q: params.get("busca") ?? "",
    category: (params.get("categoria") as CategoryId | null) ?? "",
    materials: (params.get("material")?.split(",").filter(Boolean) ?? []) as Material[],
    price: (params.get("preco") as PriceRange | null) ?? "",
    sort: sort ?? "relevancia",
  };
}

export function paramsFromQuery(query: CatalogQuery): string {
  const p = new URLSearchParams();
  if (query.q) p.set("busca", query.q);
  if (query.category) p.set("categoria", query.category);
  if (query.materials.length) p.set("material", query.materials.join(","));
  if (query.price) p.set("preco", query.price);
  if (query.sort !== "relevancia") p.set("ordem", query.sort);
  const s = p.toString();
  return s ? `?${s}` : "";
}
