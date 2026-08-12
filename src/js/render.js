import { services } from "../data/services.js";
import { projects, demonstrations } from "../data/projects.js";
import { problems, methodSteps, howItWorks, differentials, faqItems, techStack } from "../data/content.js";

/**
 * Todo o conteúdo repetitivo (cards de serviço, cases de portfólio,
 * demonstrações, passos de processo, diferenciais, FAQ e badges de
 * tecnologia) é montado aqui a partir de src/data/*.js, em vez de
 * duplicado no HTML. Isso mantém index.html curto e torna trivial
 * adicionar um novo projeto ou serviço sem tocar em marcação.
 */
export function renderContent() {
  renderProblems();
  renderMethod();
  renderServices();
  renderPortfolio();
  renderDemonstrations();
  renderHowItWorks();
  renderDifferentials();
  renderTechStack();
  renderFaq();
}

function renderProblems() {
  const el = document.getElementById("problem-grid");
  if (!el) return;

  el.innerHTML = problems
    .map(
      (item, i) => `
      <article class="problem-card">
        <div>
          <p class="card-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
          <h3>${item.title}</h3>
        </div>
        <p>${item.text}</p>
      </article>`
    )
    .join("");
}

function renderMethod() {
  const el = document.getElementById("method-steps");
  if (!el) return;

  el.innerHTML = methodSteps
    .map(
      (step, i) => `
      <li class="process-step">
        <span class="step-dot" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </div>
      </li>`
    )
    .join("");
}

function renderServices() {
  const el = document.getElementById("services-grid");
  if (!el) return;

  el.innerHTML = services
    .map(
      (service) => `
      <article class="service-card" id="${service.id}">
        <p class="tag">${service.tag}</p>
        <h3>${service.title}</h3>
        <p class="desc">${service.problem}</p>
        <ul class="deliverables">
          ${service.deliverables.map((d) => `<li>${d}</li>`).join("")}
        </ul>
        <a class="btn btn-outline" href="#lead" data-track="hero_cta_click" data-track-source="service-${service.id}">${service.ctaLabel}</a>
      </article>`
    )
    .join("");
}

function renderPortfolio() {
  const el = document.getElementById("portfolio-cases");
  if (!el) return;

  el.innerHTML = projects.map((p) => caseTemplate(p)).join("");
}

function caseTemplate(project) {
  return `
    <article class="case">
      <div class="case-visual">
        <div class="mock" role="img" aria-label="Prévia ilustrativa do site ${project.title}">
          ${mockSvg()}
        </div>
      </div>
      <div class="case-body">
        <p class="tag">${project.segment}</p>
        <h3>${project.title}</h3>
        <div class="case-row"><div class="k">Desafio</div><div>${project.challenge}</div></div>
        <div class="case-row"><div class="k">Solução</div><div>${project.solution}</div></div>
        <div class="case-row"><div class="k">Resultado</div><div>${project.result}</div></div>
        <div class="case-tech">${project.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>`;
}

function mockSvg() {
  return `
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="340" height="220" fill="#0b0f14"/>
      <rect width="340" height="34" fill="#141b24"/>
      <circle cx="20" cy="17" r="4" fill="#6ff5de"/>
      <rect x="40" y="12" width="90" height="10" fill="#6ff5de" opacity=".7"/>
      <rect x="24" y="56" width="160" height="14" fill="#e8ecf1" opacity=".85"/>
      <rect x="24" y="78" width="205" height="8" fill="#8b96a3" opacity=".6"/>
      <rect x="24" y="100" width="110" height="30" rx="2" fill="#00e5c5"/>
      <rect x="24" y="150" width="90" height="50" fill="#1a222c"/>
      <rect x="124" y="150" width="90" height="50" fill="#1a222c"/>
      <rect x="224" y="150" width="90" height="50" fill="#1a222c"/>
    </svg>`;
}

function renderDemonstrations() {
  const el = document.getElementById("demo-grid");
  if (!el) return;

  el.innerHTML = demonstrations
    .map(
      (demo) => `
      <article class="demo-card">
        <div class="demo-thumb">
          <span class="demo-badge">Demonstração</span>
        </div>
        <div class="demo-info">
          <h3>${demo.title}</h3>
          <p class="goal">Objetivo: ${demo.goal}</p>
          <a class="btn btn-outline" href="#lead">Ver demonstração</a>
        </div>
      </article>`
    )
    .join("");
}

function renderHowItWorks() {
  const el = document.getElementById("how-grid");
  if (!el) return;

  el.innerHTML = howItWorks
    .map(
      (step, i) => `
      <li class="how-card">
        <p class="step-index" aria-hidden="true">${i + 1}</p>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </li>`
    )
    .join("");
}

function renderDifferentials() {
  const el = document.getElementById("diff-grid");
  if (!el) return;

  el.innerHTML = differentials
    .map(
      (item) => `
      <article class="diff-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>`
    )
    .join("");
}

function renderTechStack() {
  const el = document.getElementById("stack-list");
  if (!el) return;

  el.innerHTML = techStack.map((tech) => `<li><span>${tech}</span></li>`).join("");
}

function renderFaq() {
  const el = document.getElementById("faq-list");
  if (!el) return;

  el.innerHTML = faqItems
    .map((item, i) => {
      const id = `faq-${i}`;
      return `
        <div class="faq-item">
          <h3>
            <button class="faq-question" id="${id}-question" aria-expanded="false" aria-controls="${id}-answer">
              ${item.q}
              <span class="plus" aria-hidden="true">+</span>
            </button>
          </h3>
          <div class="faq-answer" id="${id}-answer" role="region" aria-labelledby="${id}-question">
            <p>${item.a}</p>
          </div>
        </div>`;
    })
    .join("");
}
