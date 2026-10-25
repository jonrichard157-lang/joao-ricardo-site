import { benefits } from "../data/content";
import { Photo } from "./Photo";

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="py-20 sm:py-28 lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="beneficios-title" className="display text-[clamp(3rem,9vw,6.5rem)]">
            Você não treina sozinho
          </h2>
          <div className="mt-10 hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
            <Photo name="pegada" width={928} height={1152} sizes="(min-width: 1024px) 40vw, 100vw" alt="Mãos com magnésio segurando uma barra olímpica, com pó de giz no ar" />
          </div>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1 lg:self-end">
          {benefits.map((b) => (
            <li key={b.title} className="border-t-4 border-iron py-7 lg:py-9">
              <h3 className="wide text-xl font-bold tracking-[-0.01em] sm:text-2xl">{b.title}</h3>
              <p className="mt-3 max-w-[48ch] text-steel">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
