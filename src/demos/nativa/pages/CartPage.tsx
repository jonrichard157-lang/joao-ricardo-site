import { EmptyState } from "../components/EmptyState";
import { Photo } from "../components/Photo";
import { Price } from "../components/Price";
import { QuantityStepper } from "../components/QuantityStepper";
import { useCart } from "../lib/cart";
import { productById } from "../lib/catalog";
import { href } from "../lib/router";

export function CartPage() {
  const { lines, subtotal, count, setQuantity, remove } = useCart();

  return (
    <div className="wrap pt-8 lg:pt-12">
      <h1 tabIndex={-1} className="text-[clamp(2.6rem,6vw,4.5rem)] leading-none focus:outline-none">
        Carrinho
      </h1>

      {lines.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Seu carrinho está vazio"
            action={
              <a href={href("/loja")} className="btn-dark">
                Explorar a loja
              </a>
            }
          >
            Os produtos que você adicionar aparecem aqui.
          </EmptyState>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <ul className="border-t border-line lg:col-span-8" aria-label="Itens no carrinho">
            {lines.map((line) => {
              const p = productById(line.productId)!;
              return (
                <li key={line.productId} className="grid grid-cols-[88px_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[120px_1fr] sm:gap-6" data-testid="cart-line">
                  <a href={href(`/produto/${p.slug}`)} className="block aspect-[4/5] overflow-hidden" tabIndex={-1} aria-hidden="true">
                    <Photo name={p.image} alt="" sizes="120px" />
                  </a>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div>
                      <h2 className="text-2xl leading-tight">
                        <a href={href(`/produto/${p.slug}`)} className="hover:underline hover:underline-offset-4">
                          {p.name}
                        </a>
                      </h2>
                      <p className="mt-1 text-sm text-stone">
                        <Price cents={p.price} /> cada
                      </p>
                      <button type="button" className="link mt-3 min-h-9 text-sm" onClick={() => remove(p.id)}>
                        Remover <span className="sr-only">{p.name}</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-start">
                      <QuantityStepper size="sm" value={line.quantity} onChange={(n) => setQuantity(p.id, n)} label={`Quantidade de ${p.name}`} />
                      <Price cents={p.price * line.quantity} className="text-lg font-semibold" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside aria-labelledby="resumo" className="h-fit bg-paper p-6 lg:col-span-4 lg:sticky lg:top-24">
            <h2 id="resumo" className="text-3xl">
              Resumo
            </h2>
            <dl className="mt-6 space-y-3 text-[0.95rem]">
              <div className="flex justify-between">
                <dt>
                  Subtotal ({count} {count === 1 ? "item" : "itens"})
                </dt>
                <dd>
                  <Price cents={subtotal} className="font-semibold" />
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-stone">
                <dt>Frete</dt>
                <dd className="text-right">Calculado no checkout</dd>
              </div>
            </dl>
            <a href={href("/checkout")} className="btn-dark mt-8 w-full">
              Continuar para o checkout
            </a>
            <a href={href("/loja")} className="link mt-4 block text-center text-sm">
              Continuar comprando
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
