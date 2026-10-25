import { demos } from "../data/demos";
import { BrowserFrame } from "./BrowserFrame";
import { ButtonLink } from "./Button";
import { ExternalIcon } from "./icons";
import { ProjectPreview } from "./ProjectPreview";
import { SectionHeader } from "./SectionHeader";
import { StatusBadge } from "./StatusBadge";

export function Demos() {
  return (
    <section id="demonstracoes" aria-labelledby="demos-title" className="section">
      <div className="container-site">
        <SectionHeader id="demos-title" title="Demonstrações">
          <p>
            Projetos conceituais e independentes, criados para mostrar na prática como um tipo de site ou sistema
            funciona. Não representam clientes reais. Quando uma demo estiver no ar, o botão para experimentar aparece aqui.
          </p>
        </SectionHeader>

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {demos.map((demo, i) => {
            const live = demo.availability === "disponivel" && demo.url;
            return (
              <li key={demo.id} className={`flex min-w-0 flex-col ${i === 1 ? "lg:mt-16" : ""}`}>
                <BrowserFrame address={demo.image ? demo.title : `${demo.title}, prévia ilustrativa`} size="sm">
                  <ProjectPreview variant={demo.preview} image={demo.image} />
                </BrowserFrame>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <StatusBadge status={demo.availability} />
                  <span className="font-display text-sm text-muted">{demo.category}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{demo.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/80">{demo.description}</p>
                <div className="mt-auto pt-6">
                  {live ? (
                    <ButtonLink href={demo.url!} variant="primary" aria-label={`Experimentar a demonstração ${demo.title} (abre em nova aba)`}>
                      Experimentar <ExternalIcon />
                    </ButtonLink>
                  ) : (
                    <p className="font-display text-[0.95rem] text-muted">
                      {demo.availability === "em-construcao" ? "Em construção, ainda sem link público." : "Ainda não publicada."}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
