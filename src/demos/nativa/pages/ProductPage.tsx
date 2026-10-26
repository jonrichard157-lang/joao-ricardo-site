import { useState } from "react";
import { categories, products } from "../data/catalog";
import { Photo } from "../components/Photo";
import { Price } from "../components/Price";
import { describe, ProductTile } from "../components/ProductTile";
import { QuantityStepper } from "../components/QuantityStepper";
import { useCart } from "../lib/cart";
import { findProduct } from "../lib/catalog";
import { href } from "../lib/router";
import { NotFound } from "./NotFound";

export function ProductPage({ slug }: { slug: string }) {
  const product = findProduct(slug);
  const { add, lines } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState<number | null>(null);

  if (!product) return <NotFound title="Produto não encontrado" text="Este produto não existe ou saiu do catálogo." />;

  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);
  const inCart = lines.find((l) => l.productId === product.id)?.quantity ?? 0;

  return (
    <div className="wrap pt-6 lg:pt-10">
      <nav aria-label="Você está em" className="text-sm text-stone">
        <ol className="flex flex-wrap gap-2">
          <li>
            <a href={href("/loja")} className="link">
              Loja
            </a>
            <span aria-hidden="true"> / </span>
          </li>
          <li>
            <a href={href(`/loja?categoria=${category.id}`)} className="link">
              {category.name}
            </a>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="aspect-[4/5] overflow-hidden lg:col-span-7">
          <Photo name={product.image} alt={product.alt} sizes="(min-width: 1024px) 56vw, 100vw" priority />
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <p className="text-sm text-stone">
            {describe(category.name, product.material)}
          </p>
          <h1 tabIndex={-1} className="mt-2 text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] focus:outline-none">
            {product.name}
          </h1>
          <Price cents={product.price} className="mt-4 block text-2xl" />
          <p className="mt-6 max-w-[52ch] text-[1.05rem]">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-end gap-3">
            <div>
              <span className="mb-1.5 block text-sm font-semibold">
                Quantidade
              </span>
              <QuantityStepper value={quantity} onChange={setQuantity} label="Quantidade" />
            </div>
            <button
              type="button"
              className="btn-dark flex-1 sm:flex-none sm:px-10"
              onClick={() => {
                add(product.id, quantity);
                setAdded(quantity);
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div aria-live="polite" className="min-h-[3.5rem]">
            {added !== null && (
              <p className="mt-4 bg-moss-soft px-4 py-3 text-[0.95rem]" data-testid="added-message">
                {added} {added === 1 ? "unidade adicionada" : "unidades adicionadas"} ao carrinho ({inCart} no total).{" "}
                <a href={href("/carrinho")} className="font-semibold underline underline-offset-4">
                  Ver carrinho
                </a>
              </p>
            )}
          </div>

          <dl className="mt-6 divide-y divide-line border-y border-line text-[0.95rem]">
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
              <dt className="text-stone">Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
              <dt className="text-stone">Medidas</dt>
              <dd>{product.dimensions}</dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
              <dt className="text-stone">Cuidados</dt>
              <dd>{product.care}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-stone">Produto fictício. Imagem ilustrativa gerada por IA.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-20 border-t border-line pt-12 lg:mt-28">
          <h2 id="relacionados" className="text-4xl">
            Também em {category.name.toLowerCase()}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {related.map((p) => (
              <ProductTile key={p.id} product={p} sizes="(min-width: 1024px) 24vw, 50vw" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
