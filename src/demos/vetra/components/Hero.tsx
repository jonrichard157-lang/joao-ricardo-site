import type { CSSProperties } from "react";
import { img } from "../config";
import { brand, hero, messages } from "../data/content";
import { WaCta, WaIcon } from "../whatsapp";

/** Cartas do leque: posição final (em % da caixa), giro e camada. A do meio fica na frente. */
const fan = [
  { name: "funcional", w: 896, left: 0, top: 20, r: -14, z: 10 },
  { name: "estrutura", w: 1264, left: 14, top: 7, r: -7, z: 20 },
  { name: "hero-mobile", w: 640, left: 29, top: 0, r: 0, z: 40 },
  { name: "cardio", w: 1264, left: 44, top: 7, r: 7, z: 20 },
  { name: "acompanhamento", w: 896, left: 58, top: 20, r: 14, z: 10 },
];
const CARD = 42; // largura de cada carta, em % da caixa

function PhotoFan({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[10/8] ${className}`} role="img" aria-label="Fotos da academia: funcional, salão de musculação, levantamento terra, cardio e acompanhamento de um professor">
      {fan.map((c, i) => (
        <div
          key={c.name}
          aria-hidden="true"
          className="fan-card absolute aspect-[4/5] overflow-hidden rounded-2xl bg-smoke ring-4 ring-ink sm:rounded-3xl"
          style={
            {
              width: `${CARD}%`,
              left: `${c.left}%`,
              top: `${c.top}%`,
              zIndex: c.z,
              "--r": `${c.r}deg`,
              "--dx": `${((fan[2].left - c.left) / CARD) * 100}%`,
              "--delay": `${Math.abs(i - 2) * 90}ms`,
            } as CSSProperties
          }
        >
          <img
            src={img(c.name, c.w)}
            srcSet={c.name === "hero-mobile" ? undefined : `${img(c.name, 640)} 640w, ${img(c.name, c.w)} ${c.w}w`}
            sizes="(min-width: 1024px) 15vw, 38vw"
            alt=""
            width={c.w}
            height={Math.round(c.w * 1.25)}
            fetchPriority={c.name === "hero-mobile" ? "high" : undefined}
            decoding="async"
            className="h-full w-full object-cover object-[50%_30%]"
          />
        </div>
      ))}
    </div>
  );
}

function ChatCta({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative inline-block">
      <span aria-hidden="true" className="absolute -top-5 -left-3 z-10 rounded-lg rounded-bl-none bg-signal px-2 py-1 text-[0.7rem] leading-tight font-semibold text-fog">
        Olá!
      </span>
      <WaCta
        message={messages.visit}
        className="group inline-flex min-h-14 items-center gap-3 rounded-2xl bg-void py-2 pr-5 pl-2 text-left ring-1 ring-line transition-colors hover:ring-fog"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal text-fog" aria-hidden="true">
          <WaIcon className="h-6 w-6" />
        </span>
        <span className="text-sm leading-tight">
          Agende uma visita
          <br />
          <span className="text-ash group-hover:text-fog">pelo WhatsApp</span>
        </span>
      </WaCta>
      </div>
    </div>
  );
}

const giant = "giant select-none text-[clamp(4.25rem,21vw,12rem)] lg:text-[min(12rem,13.5vw)]";

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="overflow-hidden pt-4 pb-10 lg:pt-6 lg:pb-14">
      <div className="wrap">
        <div className="relative pt-4 lg:h-[min(820px,calc(100svh-8.5rem))] lg:min-h-[660px] lg:pt-6">
          <span aria-hidden="true" className="absolute top-0 left-0 h-3 w-3 rounded-tl-[3px] border-t border-l border-fog/45" />
          <span aria-hidden="true" className="absolute top-0 right-0 h-3 w-3 rounded-tr-[3px] border-t border-r border-fog/45" />

          <div className="flex items-start justify-between gap-4">
            <p aria-hidden="true" className={`${giant} relative z-0 pl-1`}>
              Vetra
            </p>
            <dl className="hidden shrink-0 pt-3 text-right text-sm leading-relaxed sm:block lg:text-base">
              <dt className="sr-only">Localização</dt>
              <dd className="flex items-center justify-end gap-2">
                {brand.city}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
                </svg>
              </dd>
              <dt className="sr-only">Horário nos dias úteis</dt>
              <dd className="text-ash">{brand.hours[0].days}, {brand.hours[0].time}</dd>
            </dl>
          </div>

          <PhotoFan className="relative z-10 mx-auto -mt-2 w-[min(84%,380px)] sm:w-[min(62%,420px)] lg:absolute lg:top-[9%] lg:left-1/2 lg:mt-0 lg:w-[min(33vw,480px)] lg:-translate-x-[46%]" />

          <p aria-hidden="true" className={`${giant} relative z-20 -mt-6 text-right lg:absolute lg:right-0 lg:bottom-6 lg:mt-0`}>
            Academia
          </p>

          <ChatCta className="relative z-30 mt-8 flex justify-center lg:absolute lg:top-[38%] lg:right-0 lg:mt-0" />

          <div className="relative z-30 mt-10 max-w-[30rem] lg:absolute lg:bottom-[24%] lg:left-0 lg:mt-0 lg:w-[31%] lg:max-w-none">
            <h1 id="hero-title" className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-4xl lg:text-[2.1rem]">
              {hero.title}
            </h1>
            <p className="mt-4 text-[0.95rem] text-ash">{hero.text}</p>
            <a href="#planos" className="pill mt-6 min-h-11 px-5">
              Ver planos e valores
            </a>
          </div>

          <span aria-hidden="true" className="absolute bottom-0 left-0 hidden h-3 w-3 rounded-bl-[3px] border-b border-l border-fog/45 lg:block" />
        </div>
      </div>
    </section>
  );
}
