import { journey, techCurrent, techLearning } from "../data/content";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="sobre-title" className="font-display text-[2.5rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            Sobre
          </h2>
          <div className="mt-10 max-w-[60ch] space-y-6 text-[1.2rem] leading-[1.7]">
            <p>
              Sou João Ricardo, responsável pela VeyzaTech. Antes de programar, trabalhei na área eletroeletrônica, com
              diagnóstico técnico, manutenção e reparo. Foi ali que aprendi a não chutar soluções: primeiro entender o
              sistema, depois isolar o problema, testar e só então entregar.
            </p>
            <p>
              Levo esse método para o desenvolvimento de software. Estou em transição de carreira e curso Software
              Development pela BYU-Pathway Worldwide. Minha experiência profissional em programação ainda está sendo
              construída, e por isso trabalho com escopo claro, comunicação frequente e prévias para você validar cada
              etapa.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
          <h3 className="font-display text-xl font-semibold">Trajetória</h3>
          <ol className="relative mt-8 space-y-10 border-l-2 border-sage pl-8">
            {journey.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  className={`absolute -left-[2.55rem] top-1.5 h-4 w-4 rounded-full border-2 border-cream ${i === journey.length - 1 ? "bg-amber" : "bg-forest"}`}
                  aria-hidden="true"
                />
                <h4 className="text-xl font-bold tracking-[-0.01em]">{step.title}</h4>
                <p className="mt-2 leading-relaxed text-ink/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section id="tecnologias" className="container-site mt-24 lg:mt-32" aria-labelledby="tech-title">
        <div className="rounded-[1.5rem] bg-forest p-8 text-cream sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="tech-title" className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                Tecnologias
              </h2>
              <p className="mt-4 text-cream/75">
                Separo o que já uso em projetos do que estou estudando, para você saber com o que pode contar hoje.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <TechList title="Uso em projetos" items={techCurrent} accent="bg-amber" />
              <TechList title="Estudando agora" items={techLearning} accent="bg-sage/60" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function TechList({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div>
      <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-cream">
        <span className={`h-3 w-3 rounded-sm ${accent}`} aria-hidden="true" />
        {title}
      </h3>
      <ul className="mt-5 divide-y divide-cream/15 border-y border-cream/15 font-display text-[1.05rem]">
        {items.map((t) => (
          <li key={t} className="py-2.5 text-cream/90">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
