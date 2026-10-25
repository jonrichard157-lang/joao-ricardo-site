import { testimonials } from "../data/content";

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="bg-paper py-20 sm:py-28 lg:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="depoimentos-title" className="display text-[clamp(3rem,9vw,6.5rem)]">
            Depoimentos
          </h2>
          <p className="inline-flex items-center gap-2 rounded-full bg-iron px-4 py-2 text-sm font-semibold text-paper">
            <span className="h-2 w-2 rounded-full bg-cobalt-soft" aria-hidden="true" />
            Exemplos fictícios, criados para esta demonstração
          </p>
        </div>
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {testimonials.map((t, i) => (
            <li key={i} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
              <figure className="border-t-4 border-cobalt pt-6">
                <blockquote className="text-xl leading-snug font-medium sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="block text-steel">{t.detail}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
