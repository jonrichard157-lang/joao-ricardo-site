import { processSteps } from "../data/content";
import { SectionHeader } from "./SectionHeader";

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="processo-title" className="section bg-sand/60">
      <div className="container-site">
        <SectionHeader id="processo-title" title="Como funciona">
          <p>Um processo curto e transparente. Você sabe o que vai receber, quando e por quanto antes de qualquer pagamento.</p>
        </SectionHeader>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-6">
              <span className="block font-display text-6xl font-extrabold leading-none tracking-[-0.05em] text-rust" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em]">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
