import { faq } from "../data/content";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 sm:py-28 lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <h2 id="duvidas-title" className="display text-[clamp(3rem,9vw,6.5rem)] lg:col-span-4">
          Dúvidas frequentes
        </h2>
        <div className="lg:col-span-7 lg:col-start-6">
          {faq.map((item) => (
            <details key={item.question} className="group border-b-2 border-iron/15 first:border-t-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="display shrink-0 text-4xl leading-none text-cobalt transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 text-steel">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
