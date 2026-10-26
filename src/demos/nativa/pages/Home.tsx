import { categories, products } from "../data/catalog";
import { Photo } from "../components/Photo";
import { Price } from "../components/Price";
import { ProductTile } from "../components/ProductTile";
import { findProduct } from "../lib/catalog";
import { href } from "../lib/router";

export function Home() {
  const hero = findProduct("vaso-duna")!;
  const story = findProduct("canecas-barro")!;
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      <section aria-labelledby="home-title" className="wrap grid gap-8 pt-8 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-12 lg:pb-28">
        <div className="flex flex-col justify-end lg:col-span-5 lg:pb-6">
          <h1 id="home-title" tabIndex={-1} className="text-[clamp(2.9rem,7.5vw,5.75rem)] leading-[0.95] focus:outline-none">
            Objetos para uma casa que respira
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg text-stone">
            Cerâmica, linho, madeira e fibras naturais em peças feitas para o uso diário e para durar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={href("/loja")} className="btn-dark">
              Ver a coleção
            </a>
            <a href={href("/loja?categoria=ceramica")} className="btn-line">
              Cerâmica
            </a>
          </div>
        </div>
        <figure className="lg:col-span-7">
          <a href={href(`/produto/${hero.slug}`)} className="block">
            <div className="aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
              <Photo name={hero.image} alt={hero.alt} sizes="(min-width: 1024px) 58vw, 100vw" priority className="object-[center_60%]" />
            </div>
            <figcaption className="mt-3 flex justify-between text-sm">
              <span>{hero.name}</span>
              <Price cents={hero.price} />
            </figcaption>
          </a>
        </figure>
      </section>

      <section aria-labelledby="categorias-title" className="border-y border-line py-16 lg:py-20">
        <div className="wrap">
          <h2 id="categorias-title" className="text-4xl sm:text-5xl">
            Por categoria
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {categories.map((c) => {
              const cover = findProduct(c.cover)!;
              return (
                <li key={c.id}>
                  <a href={href(`/loja?categoria=${c.id}`)} className="group block">
                    <div className="aspect-[4/5] overflow-hidden">
                      <Photo name={cover.image} alt="" sizes="(min-width: 1024px) 24vw, 50vw" className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
                    </div>
                    <h3 className="mt-3 text-2xl group-hover:underline group-hover:underline-offset-4">{c.name}</h3>
                    <p className="mt-1 hidden text-sm text-stone sm:block">{c.description}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="novidades-title" className="wrap py-16 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 id="novidades-title" className="text-4xl sm:text-5xl">
            Chegaram agora
          </h2>
          <a href={href("/loja")} className="link shrink-0 text-[0.95rem]">
            Ver tudo
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {newArrivals.map((p) => (
            <ProductTile key={p.id} product={p} sizes="(min-width: 1024px) 24vw, 50vw" />
          ))}
        </div>
      </section>

      <section aria-labelledby="historia-title" className="on-dark bg-ink text-paper">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="aspect-[4/5] overflow-hidden lg:col-span-5">
            <Photo name={story.image} alt={story.alt} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="historia-title" className="text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
              Feito devagar, para ser usado todos os dias
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-paper/75">
              Na Nativa Casa, cada peça carrega as marcas do material: o salpicado do grés, a trama irregular do linho, os
              veios da madeira. Nenhuma é igual à outra, e é isso que a torna sua.
            </p>
            <a href={href(`/produto/${story.slug}`)} className="btn mt-8 border border-paper text-paper hover:bg-paper hover:text-ink">
              Conhecer as canecas Barro
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Informações da loja" className="wrap grid gap-8 pt-16 sm:grid-cols-3">
        {[
          ["Frete", "Calculado no checkout a partir do CEP. Nesta demonstração, não há cobrança."],
          ["Trocas", "Em uma loja real, a política de trocas e devoluções ficaria descrita aqui."],
          ["Atendimento", "Canal de contato da loja, como WhatsApp ou e-mail, seria informado aqui."],
        ].map(([title, text]) => (
          <div key={title} className="border-t border-ink pt-4">
            <h3 className="text-2xl">{title}</h3>
            <p className="mt-2 text-sm text-stone">{text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
