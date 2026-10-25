import { benefits, brand, statement } from "../data/content";
import { Frame, Label } from "./Frame";

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="py-16 sm:py-24">
      <div className="wrap">
        <Frame className="px-5 py-16 sm:px-10 sm:py-24">
          <p className="mx-auto max-w-[34ch] text-center text-xl leading-snug font-medium tracking-[-0.03em] sm:text-3xl lg:text-[2.4rem]">
            {statement}
          </p>
          <div className="mt-20 flex flex-wrap items-end justify-between gap-3 sm:mt-28">
            <Label id="beneficios-title">Benefícios</Label>
            <p className="text-sm text-ash">
              {brand.hours[0].days}, {brand.hours[0].time}
            </p>
          </div>
        </Frame>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="relative flex flex-col rounded-3xl bg-void p-6 sm:min-h-64 sm:p-7">
              <span className="absolute top-5 right-6 flex gap-1" aria-hidden="true">
                {Array.from({ length: i + 1 }, (_, d) => (
                  <span key={d} className="h-1 w-1 rounded-full bg-signal" />
                ))}
              </span>
              <p className="giant text-[3.5rem] sm:text-[4rem]" aria-hidden="true">
                {b.stat}
              </p>
              <h3 className="mt-auto pt-6 font-semibold sm:pt-10">{b.title}</h3>
              <p className="mt-2 text-sm text-ash">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
