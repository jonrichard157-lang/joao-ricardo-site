import { areas, equipment } from "../data/content";
import type { Area } from "../data/content";
import { Photo } from "./Photo";

function AreaFigure({ area, className, sizes, ratio, wide = true }: { area: Area; className: string; sizes: string; ratio: string; wide?: boolean }) {
  return (
    <figure className={className}>
      <div className={`overflow-hidden rounded-sm ${ratio}`}>
        <Photo name={area.image} width={area.width} height={area.height} alt={area.alt} sizes={sizes} />
      </div>
      <figcaption className={`mt-4 grid gap-1 ${wide ? "sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6" : ""}`}>
        <span className="wide text-lg font-bold text-paper">{area.name}</span>
        <span className="text-paper/70">{area.text}</span>
      </figcaption>
    </figure>
  );
}

export function Structure() {
  const [main, functional, cardio] = areas;
  return (
    <section id="estrutura" aria-labelledby="estrutura-title" className="on-dark bg-iron py-20 text-paper sm:py-28 lg:py-36">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="estrutura-title" className="display text-[clamp(3rem,9vw,6.5rem)] lg:col-span-7">
            Estrutura para cada tipo de treino
          </h2>
          <p className="max-w-[44ch] text-lg text-paper/75 lg:col-span-4 lg:col-start-9">
            Áreas separadas para força, funcional e cardio, para você treinar sem disputar espaço.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <AreaFigure area={main} className="lg:col-span-8" ratio="aspect-[3/2]" sizes="(min-width: 1024px) 64vw, 100vw" />
          <AreaFigure area={functional} wide={false} className="lg:col-span-4 lg:row-span-2" ratio="aspect-[4/5] lg:aspect-[3/5]" sizes="(min-width: 1024px) 32vw, 100vw" />
          <div className="lg:col-span-3">
            <h3 className="wide text-lg font-bold">Equipamentos</h3>
            <ul className="mt-4 divide-y divide-paper/15 border-y border-paper/15">
              {equipment.map((e) => (
                <li key={e} className="py-2.5 text-paper/85">
                  {e}
                </li>
              ))}
            </ul>
            <a href="#visita" className="mt-6 inline-flex min-h-11 items-center font-semibold underline decoration-cobalt decoration-2 underline-offset-[6px] hover:text-cobalt-soft">
              Conhecer a estrutura pessoalmente
            </a>
          </div>
          <AreaFigure area={cardio} className="lg:col-span-5" ratio="aspect-[3/2]" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
