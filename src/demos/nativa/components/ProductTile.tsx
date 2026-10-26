import { categories } from "../data/catalog";
import { href } from "../lib/router";
import type { Product } from "../types";
import { Photo } from "./Photo";
import { Price } from "./Price";

/** "Iluminação, cerâmica" — sem repetir quando categoria e material coincidem. */
export const describe = (category: string | undefined, material: string) =>
  !category || category === material ? material : `${category}, ${material.toLowerCase()}`;

/** Produto na grade: foto grande, nome em serifa e preço. Sem cartão, sem sombra. */
export function ProductTile({ product, sizes, priority }: { product: Product; sizes: string; priority?: boolean }) {
  const category = categories.find((c) => c.id === product.category);
  return (
    <article className="group">
      <a href={href(`/produto/${product.slug}`)} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-[4/5] overflow-hidden bg-line/50">
          <Photo name={product.image} alt={product.alt} sizes={sizes} priority={priority} className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
          {product.isNew && <span className="absolute top-3 left-3 bg-paper px-2.5 py-1 text-xs font-semibold">Novidade</span>}
        </div>
        <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-xl leading-tight">{product.name}</h3>
            <p className="mt-0.5 hidden text-sm text-stone sm:block">{describe(category?.name, product.material)}</p>
          </div>
          <Price cents={product.price} className="shrink-0 font-semibold sm:pt-0.5" />
        </div>
      </a>
    </article>
  );
}
