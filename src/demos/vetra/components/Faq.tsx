import { faq } from "../data/content";
import { Label } from "./Frame";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-12 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label id="duvidas-title">Dúvidas frequentes</Label>
        </div>
        <div className="lg:col-span-8">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fog/60 text-lg transition-transform group-open:rotate-45 group-open:border-signal-soft group-open:text-signal-soft"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 text-sm text-ash">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
