import { messages, plans } from "../data/content";
import type { Plan } from "../data/content";
import { WaCta } from "../whatsapp";

const tones: Record<Plan["tone"], { card: string; muted: string; cta: string; rule: string }> = {
  chalk: { card: "bg-paper text-iron ring-1 ring-iron/15", muted: "text-steel", cta: "bg-iron text-paper hover:bg-graphite", rule: "border-iron/15" },
  cobalt: { card: "on-dark bg-cobalt text-paper", muted: "text-paper/80", cta: "bg-paper text-cobalt-deep hover:bg-chalk", rule: "border-paper/25" },
  iron: { card: "on-dark bg-iron text-paper", muted: "text-paper/70", cta: "bg-cobalt text-paper hover:bg-cobalt-deep", rule: "border-paper/15" },
};

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="py-20 sm:py-28 lg:py-36">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="planos-title" className="display text-[clamp(3rem,9vw,6.5rem)] lg:col-span-6">
            Planos
          </h2>
          <p className="max-w-[48ch] text-lg text-steel lg:col-span-5 lg:col-start-8">
            Três formas de treinar, todas com avaliação inicial. Valores ilustrativos desta demonstração, sem promoções ou
            condições especiais.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const t = tones[plan.tone];
            return (
              <li key={plan.id} className={`flex flex-col rounded-sm p-7 sm:p-9 ${t.card}`}>
                <h3 className="display text-5xl sm:text-6xl lg:text-[clamp(2.75rem,4.2vw,3.75rem)]">{plan.name}</h3>
                <p className={`mt-4 min-h-[3.2em] ${t.muted}`}>{plan.summary}</p>
                <p className={`mt-8 flex items-baseline gap-2 border-b pb-8 ${t.rule}`}>
                  <span className="text-lg font-semibold">R$</span>
                  <span className="display text-7xl">{plan.price}</span>
                  <span className={t.muted}>{plan.period}</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <WaCta
                    message={messages.plan(plan.name)}
                    className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold transition-colors ${t.cta}`}
                  >
                    Quero saber do plano {plan.name}
                  </WaCta>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-steel">Valores meramente ilustrativos. Uma academia real definiria preços e condições próprios.</p>
      </div>
    </section>
  );
}
