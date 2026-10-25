import { messages, plans } from "../data/content";
import type { Plan } from "../data/content";
import { WaCta } from "../whatsapp";
import { Label } from "./Frame";

const tones: Record<Plan["tone"], { card: string; muted: string; cta: string; rule: string }> = {
  void: { card: "bg-void text-fog", muted: "text-ash", cta: "border border-fog/70 hover:bg-fog hover:text-void", rule: "border-line" },
  signal: { card: "bg-signal text-fog", muted: "text-fog/80", cta: "bg-fog text-void hover:bg-white", rule: "border-fog/25" },
  smoke: { card: "bg-smoke text-fog", muted: "text-ash", cta: "bg-fog text-void hover:bg-white", rule: "border-line" },
};

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Label id="planos-title">Planos</Label>
          <p className="text-sm text-ash">Valores ilustrativos, sem promoções</p>
        </div>
        <p className="mt-4 max-w-[52ch] text-ash">Três formas de treinar, todas com avaliação inicial.</p>

        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {plans.map((plan) => {
            const t = tones[plan.tone];
            return (
              <li key={plan.id} className={`flex flex-col rounded-3xl p-7 sm:p-9 ${t.card}`}>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] uppercase">{plan.name}</h3>
                <p className={`mt-3 min-h-[3.2em] text-sm ${t.muted}`}>{plan.summary}</p>
                <p className={`mt-8 flex items-baseline gap-2 border-b pb-8 ${t.rule}`}>
                  <span className="text-sm font-semibold">R$</span>
                  <span className="giant text-[5.5rem]">{plan.price}</span>
                  <span className={`text-sm ${t.muted}`}>{plan.period}</span>
                </p>
                <ul className="mt-7 space-y-2.5 text-sm">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <WaCta
                    message={messages.plan(plan.name)}
                    className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors ${t.cta}`}
                  >
                    Quero saber do plano {plan.name}
                  </WaCta>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs text-ash">Valores meramente ilustrativos. Uma academia real definiria preços e condições próprios.</p>
      </div>
    </section>
  );
}
