import { visibleProjects } from "../data/projects";
import { ButtonLink } from "./Button";
import { BrowserFrame } from "./BrowserFrame";
import { ProjectPreview } from "./ProjectPreview";

/** Posições da colagem: o primeiro projeto fica maior, os outros sobrepostos. */
const layout = [
  { className: "left-0 top-[8%] w-[78%] z-10", tilt: "-1.5deg", delay: "80ms", size: "md" as const },
  { className: "right-0 top-0 w-[52%] z-0", tilt: "2deg", delay: "220ms", size: "sm" as const },
  { className: "right-[4%] bottom-0 w-[58%] z-20", tilt: "1deg", delay: "360ms", size: "sm" as const },
];

export function Hero() {
  const showcase = visibleProjects.slice(0, 3);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7">
          <p className="mb-6 font-display text-base font-medium text-rust">
            Estúdio independente de desenvolvimento web, por João Ricardo
          </p>
          <h1
            id="hero-title"
            className="font-display text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.25rem]"
          >
            O que o seu negócio precisa, construído para funcionar na web.
          </h1>
          <p className="lede mt-8">
            Desenvolvo sites institucionais, landing pages, catálogos, dashboards e sistemas web para pequenos negócios,
            profissionais autônomos e empresas. Atendimento remoto em todo o Brasil, com escopo, prazo e orçamento
            combinados antes de começar.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projetos" variant="primary">
              Explorar projetos
            </ButtonLink>
            <ButtonLink href="#contato" variant="outline">
              Solicitar orçamento
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] lg:col-span-5 lg:mt-4 lg:max-w-none" aria-label="Projetos desenvolvidos pela VeyzaTech" role="img">
          <div className="absolute -inset-x-6 top-[18%] bottom-[10%] -z-10 rounded-[2rem] bg-sage/45" aria-hidden="true" />
          {showcase.map((project, i) => (
            <div
              key={project.id}
              className={`hero-frame absolute ${layout[i].className}`}
              style={{ "--tilt": layout[i].tilt, "--delay": layout[i].delay } as React.CSSProperties}
            >
              <BrowserFrame address={project.name} size={layout[i].size}>
                <ProjectPreview variant={project.preview} image={project.image} eager />
              </BrowserFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
