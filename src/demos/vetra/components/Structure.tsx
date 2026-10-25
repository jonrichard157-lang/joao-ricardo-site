import { areas, equipment } from "../data/content";
import { Label } from "./Frame";
import { Photo } from "./Photo";

export function Structure() {
  return (
    <section id="estrutura" aria-labelledby="estrutura-title" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Label id="estrutura-title">Estrutura</Label>
          <a href="#planos" className="pill min-h-10">
            Ver planos
          </a>
        </div>
        <p className="mt-4 max-w-[52ch] text-ash">Áreas separadas para força, funcional e cardio, para você treinar sem disputar espaço.</p>

        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-4">
          {areas.map((a) => (
            <li key={a.id}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-smoke sm:rounded-3xl lg:aspect-square">
                  <Photo name={a.image} width={a.width} height={a.height} alt={a.alt} sizes="(min-width: 1024px) 24vw, 48vw" />
                  <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-fog px-2.5 py-0.5 text-xs font-semibold text-void sm:bottom-4 sm:left-4 sm:px-3 sm:py-1 sm:text-sm">
                    {a.name}
                  </figcaption>
                </div>
                <p className="mt-3 px-1 text-xs leading-relaxed text-ash sm:text-sm">{a.text}</p>
              </figure>
            </li>
          ))}
        </ul>

        <h3 className="sr-only">Equipamentos</h3>
        <ul className="mt-10 flex flex-wrap gap-2 text-sm">
          {equipment.map((e) => (
            <li key={e} className="rounded-full border border-line px-3.5 py-1.5 text-fog/85">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
