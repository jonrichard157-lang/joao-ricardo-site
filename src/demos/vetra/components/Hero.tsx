import { img } from "../config";
import { brand, hero, messages } from "../data/content";
import { WaCta, WaIcon } from "../whatsapp";

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-iron text-paper">
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 639px)" srcSet={img("hero-mobile", 640)} />
        <img
          src={img("hero", 1376)}
          srcSet={`${img("hero", 640)} 640w, ${img("hero", 1376)} 1376w`}
          sizes="100vw"
          width={1376}
          height={768}
          alt="Aluna fazendo levantamento terra com barra olímpica em um salão de concreto iluminado por janelas"
          fetchPriority="high"
          decoding="async"
          className="hero-photo h-full w-full object-cover object-[45%_top] sm:object-[70%_center]"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(22_23_26/0.95)_10%,rgb(22_23_26/0.35)_60%,rgb(22_23_26/0.1))] sm:bg-[linear-gradient(to_right,rgb(22_23_26/0.92)_15%,rgb(22_23_26/0.55)_50%,rgb(22_23_26/0)_80%)]" />

      <div className="wrap flex min-h-[calc(100svh-6.5rem)] flex-col justify-end pt-48 pb-10 sm:min-h-[min(760px,calc(100svh-6.5rem))] sm:justify-center sm:pt-20 sm:pb-20">
        <h1 id="hero-title" className="display max-w-[14ch] text-[clamp(2.9rem,14vw,7.5rem)]">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper/85 sm:text-xl">{hero.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <WaCta
            message={messages.visit}
            className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-cobalt px-8 text-lg font-semibold text-paper transition-colors hover:bg-cobalt-deep"
          >
            <WaIcon /> Agendar visita pelo WhatsApp
          </WaCta>
          <a href="#planos" className="inline-flex min-h-12 items-center justify-center font-semibold underline decoration-paper/40 underline-offset-[6px] hover:decoration-paper">
            Ver planos e valores
          </a>
        </div>
      </div>

      <div className="border-t border-paper/15 bg-iron/60">
        <dl className="wrap grid grid-cols-1 gap-x-10 gap-y-1 py-4 text-sm text-paper/80 sm:grid-cols-3">
          {brand.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-3 sm:block">
              <dt className="inline text-paper/60 sm:mr-2">{h.days}</dt>
              <dd className="inline font-semibold text-paper">{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
