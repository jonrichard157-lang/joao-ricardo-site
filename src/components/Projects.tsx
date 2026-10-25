import { visibleProjects } from "../data/projects";
import type { Project } from "../types";
import { BrowserFrame } from "./BrowserFrame";
import { ButtonLink } from "./Button";
import { ExternalIcon } from "./icons";
import { ProjectPreview } from "./ProjectPreview";
import { SectionHeader } from "./SectionHeader";
import { StatusBadge } from "./StatusBadge";

function addressFor(p: Project) {
  const label = p.liveUrl?.startsWith("http") ? new URL(p.liveUrl).host : p.name;
  return p.image ? label : `${label}, representação ilustrativa`;
}

function ProjectInfo({ project, large }: { project: Project; large: boolean }) {
  const headingId = `p-${project.id}`;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="font-display text-sm text-muted">{project.category}</span>
      </div>
      <h3 id={headingId} className={`mt-5 font-bold tracking-[-0.03em] ${large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{project.name}</h3>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-ink/85">{project.summary}</p>
      <ul className="mt-6 space-y-2 text-[1.02rem]">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-rust" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-display text-sm text-muted">
        <span className="sr-only">Tecnologias: </span>
        {project.technologies.join(", ")}
      </p>
      <div className="mt-7">
        {project.liveUrl ? (
          <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="outline" aria-label={`Visitar o site ${project.name} (abre em nova aba)`}>
            Visitar site <ExternalIcon />
          </ButtonLink>
        ) : (
          <p className="font-display text-[0.95rem] text-muted">
            {project.status === "em-desenvolvimento" ? "Link público disponível quando o projeto for publicado." : "Link público em breve."}
          </p>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [first, second, ...rest] = visibleProjects;
  const featured = [first, second].filter(Boolean);

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section border-t border-ink/10">
      <div className="container-site">
        <SectionHeader id="projetos-title" title="Projetos">
          <p>
            Trabalhos entregues e projetos em andamento. Cada um está marcado como real, conceitual ou em desenvolvimento,
            para você saber exatamente o que está vendo.
          </p>
        </SectionHeader>

        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
          {featured.map((project, i) => (
            <article key={project.id} aria-labelledby={`p-${project.id}`} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={`min-w-0 lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <div className={`rounded-[1.25rem] p-4 sm:p-8 ${i % 2 ? "bg-sand" : "bg-sage/50"}`}>
                  <BrowserFrame address={addressFor(project)}>
                    <ProjectPreview variant={project.preview} image={project.image} />
                  </BrowserFrame>
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
                <ProjectInfo project={project} large />
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-24 border-t border-ink/10 pt-16 lg:mt-32">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">Outros projetos</h3>
            <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-10">
              {rest.map((project) => (
                <article key={project.id} aria-labelledby={`p-${project.id}`} className="flex min-w-0 flex-col gap-8">
                  <BrowserFrame address={addressFor(project)}>
                    <ProjectPreview variant={project.preview} image={project.image} />
                  </BrowserFrame>
                  <ProjectInfo project={project} large={false} />
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
