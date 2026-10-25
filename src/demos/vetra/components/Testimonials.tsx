import { testimonials } from "../data/content";
import { Frame } from "./Frame";

/** Cards laterais giram em perspectiva no desktop, como um arco. */
const arc = ["lg:[transform:perspective(1200px)_rotateY(22deg)_scale(.92)] lg:origin-right", "", "lg:[transform:perspective(1200px)_rotateY(-22deg)_scale(.92)] lg:origin-left"];

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="py-12 sm:py-28">
      <div className="wrap">
        <Frame className="px-3 py-10 sm:px-10 sm:py-20">
          <div className="text-center">
            <h2 id="depoimentos-title" className="text-xl font-semibold sm:text-2xl">
              <span className="mark">Depoimentos</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-sm text-ash">Exemplos fictícios, criados para esta demonstração. Não são relatos de alunos reais.</p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-[1040px] gap-3 lg:grid-cols-3 lg:gap-2">
            {testimonials.map((t, i) => (
              <li key={i} className={`flex flex-col items-center rounded-[2rem] bg-smoke px-7 py-9 text-center ${arc[i]}`}>
                <blockquote className="text-[0.95rem] leading-relaxed">“{t.quote}”</blockquote>
                <span className="mt-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-signal pt-3 text-4xl leading-none font-bold text-fog" aria-hidden="true">
                  ”
                </span>
                <p className="mt-3 font-semibold">{t.name}</p>
                <p className="text-xs text-ash">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Frame>
      </div>
    </section>
  );
}
