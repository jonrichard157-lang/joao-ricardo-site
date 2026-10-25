import { faqItems } from "../data/content";

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="faq-title" className="section border-t border-ink/10">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="font-display text-[2.5rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl">
              Perguntas frequentes
            </h2>
            <p className="mt-6 text-muted">
              Valores e prazos dependem do escopo de cada projeto e são definidos por escrito na proposta.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqItems.map((item) => (
            <details key={item.question} className="group border-b border-ink/15 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="relative h-8 w-8 shrink-0 rounded-full border-2 border-ink/70 transition-colors group-open:bg-ink before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-3 before:-translate-1/2 before:bg-ink group-open:before:bg-cream after:absolute after:top-1/2 after:left-1/2 after:h-3 after:w-0.5 after:-translate-1/2 after:bg-ink group-open:after:hidden"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[62ch] pb-7 leading-relaxed text-ink/85">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
