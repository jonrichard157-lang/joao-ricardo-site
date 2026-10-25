import { services } from "../data/services";
import { SectionHeader } from "./SectionHeader";

/** Dispara a pré-seleção do tipo de projeto no formulário de orçamento. */
export function selectProjectType(type: string) {
  window.dispatchEvent(new CustomEvent("veyza:project-type", { detail: type }));
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="on-dark section bg-forest text-cream">
      <div className="container-site">
        <SectionHeader id="servicos-title" title="Serviços" tone="dark">
          <p>
            Cada projeto começa pelo problema que precisa ser resolvido. Veja qual formato combina com o seu momento. Se
            não tiver certeza, a conversa inicial serve justamente para isso.
          </p>
        </SectionHeader>

        <ul className="mt-16 border-t border-sage/25 lg:mt-24">
          {services.map((s) => (
            <li key={s.id} className="grid gap-6 border-b border-sage/25 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-cream sm:text-4xl lg:col-span-4">{s.title}</h3>
              <div className="space-y-5 lg:col-span-5">
                <div>
                  <p className="font-display text-sm font-medium text-amber">O problema</p>
                  <p className="mt-1.5 leading-relaxed text-cream/90">{s.problem}</p>
                </div>
                <div>
                  <p className="font-display text-sm font-medium text-amber">Indicado para</p>
                  <p className="mt-1.5 leading-relaxed text-cream/75">{s.audience}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:col-span-3">
                <ul className="space-y-1.5 font-display text-[0.98rem] text-sage">
                  {s.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  onClick={() => selectProjectType(s.projectType)}
                  className="inline-flex w-fit items-center rounded-full border-2 border-cream/70 px-5 py-2.5 font-display text-[0.98rem] font-semibold text-cream transition-colors hover:bg-cream hover:text-forest"
                >
                  {s.ctaLabel}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-[60ch] text-cream/70">
          Também desenvolvo sistemas web personalizados. Projetos de SaaS e automação são avaliados conforme o escopo,
          e só assumo o que consigo entregar com qualidade.
        </p>
      </div>
    </section>
  );
}
