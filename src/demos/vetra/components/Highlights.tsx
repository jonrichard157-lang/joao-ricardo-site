import { highlights } from "../data/content";

const tones = ["bg-fog text-void", "bg-void text-fog ring-1 ring-line", "bg-signal text-fog", "bg-smoke text-fog"];

/** Faixa de pílulas em movimento (estática com movimento reduzido). */
export function Highlights() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-2 pr-2" aria-hidden={hidden || undefined}>
      {highlights.map((h, i) => (
        <li key={h} className={`flex h-11 items-center rounded-full px-5 text-sm font-semibold whitespace-nowrap sm:h-12 sm:px-6 sm:text-base ${tones[i % tones.length]}`}>
          {h}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="O que a academia oferece" className="marquee overflow-hidden py-3 motion-reduce:overflow-x-auto">
      <div className="marquee-track flex w-max">
        {row(false)}
        <div className="motion-reduce:hidden">{row(true)}</div>
      </div>
    </section>
  );
}
