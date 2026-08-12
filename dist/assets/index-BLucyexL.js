(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();const d=[{id:"landing-page",tag:"Para gerar contatos",title:"Landing Pages",problem:"Sua campanha, produto ou serviço específico não tem um lugar único para converter interessados em contato.",solution:"Uma página única, direta, construída para apresentar a oferta e levar o visitante a agir.",deliverables:["Design responsivo","CTA estratégico","WhatsApp integrado","Formulário de contato","Seções comerciais","SEO básico","Publicação"],ctaLabel:"Quero uma Landing Page"},{id:"site-institucional",tag:"Para apresentar sua empresa",title:"Sites Institucionais",problem:"Sua empresa não tem um espaço próprio para apresentar serviços, gerar confiança e centralizar contato.",solution:"Um site completo com todas as informações que um cliente em potencial precisa antes de decidir.",deliverables:["Página inicial, serviços e sobre","Galeria e depoimentos","Contato + Google Maps","WhatsApp integrado","SEO básico","Responsividade completa"],ctaLabel:"Quero um site profissional"},{id:"manutencao",tag:"Para manter no ar",title:"Manutenção e evolução",problem:"Seu site já existe, mas está desatualizado ou precisa de pequenos ajustes recorrentes.",solution:"Acompanhamento contínuo para manter o site atualizado, correto e evoluindo junto com o negócio.",deliverables:["Atualização de conteúdo","Alteração de imagens","Pequenos ajustes","Melhorias de layout","Correções","Evolução contínua"],ctaLabel:"Preciso melhorar meu site"}],u=[{id:"dra-caroline",isDemo:!1,segment:"Odontologia",title:"Dra. Caroline",challenge:"Presença digital que transmitisse confiança e profissionalismo para novos pacientes.",solution:"Site com apresentação profissional, serviços, localização e depoimentos.",result:"Pacientes encontram informações do consultório e falam diretamente pelo WhatsApp, em qualquer dispositivo.",technologies:["React","TypeScript","WhatsApp API"]},{id:"esl-eletrica",isDemo:!1,segment:"Elétrica",title:"ESL Elétrica",challenge:"Empresa sem site próprio, dependente apenas de indicação boca a boca.",solution:"Apresentação da empresa, serviços e canal de contato direto.",result:"Presença profissional que reforça a credibilidade da empresa em orçamentos e propostas.",technologies:["React","Vite","WhatsApp API"]}],p=[{id:"demo-eletricista",title:"Eletricista / Manutenção",goal:"Gerar pedidos de orçamento pelo WhatsApp."},{id:"demo-clinica",title:"Clínica / Dentista",goal:"Gerar agendamentos."},{id:"demo-barbearia",title:"Barbearia",goal:"Gerar agendamentos e contatos."}],m=[{title:"Você depende apenas do Instagram",text:"Clientes podem ter dificuldade para encontrar informações importantes sobre seus serviços."},{title:"Seu site não gera contatos",text:"Ter um site não significa automaticamente gerar clientes."},{title:"Seu negócio parece menor do que realmente é",text:"Uma presença digital desatualizada pode prejudicar a percepção de confiança."},{title:"O cliente não sabe o próximo passo",text:"O visitante precisa encontrar rapidamente uma forma de pedir orçamento, agendar ou entrar em contato."}],f=[{title:"Discovery",text:"Entendo o negócio, público, problemas e objetivos."},{title:"Estratégia",text:"Defino como o site deve ajudar o negócio."},{title:"UX/UI",text:"Organizo conteúdo, jornada do usuário e identidade visual."},{title:"Desenvolvimento",text:"Transformo a estratégia em uma experiência digital rápida e responsiva."},{title:"Lançamento",text:"Publico, testo e deixo a solução pronta para os clientes utilizarem."}],g=[{title:"Você me conta sobre seu negócio",text:"Entendo sua empresa, público e objetivo."},{title:"Identificamos o problema",text:"Descobrimos o que está impedindo sua presença digital de gerar melhores resultados."},{title:"Planejamos a solução",text:"Definimos estrutura, conteúdo, design e funcionalidades."},{title:"Desenvolvo",text:"Construo a solução de forma responsiva e otimizada."},{title:"Publicamos",text:"Coloco tudo no ar e faço os testes finais."}],v=[{title:"Pensamento orientado ao negócio",text:"O projeto começa pelo problema, não pela tecnologia."},{title:"Design com propósito",text:"O visual ajuda o usuário a entender e tomar uma decisão."},{title:"Foco em conversão",text:"CTAs, WhatsApp, formulários e estrutura pensados para o próximo passo."},{title:"Comunicação direta",text:"Processo simples e transparente, do início ao fim."},{title:"Desenvolvimento personalizado",text:"Cada projeto é adaptado ao negócio, não um modelo pronto."}],h=[{q:"Quanto custa um site?",a:"Os projetos são personalizados de acordo com o objetivo, estrutura e funcionalidades necessárias. Solicite um orçamento."},{q:"Quanto tempo leva?",a:"Landing pages simples podem ser desenvolvidas em poucos dias, dependendo do escopo e da disponibilidade dos materiais."},{q:"Preciso ter domínio?",a:"Não necessariamente. Posso orientar sobre domínio e hospedagem."},{q:"Vocês fazem manutenção?",a:"Sim."},{q:"Posso integrar WhatsApp?",a:"Sim."},{q:"Posso solicitar alterações?",a:"Sim. O projeto terá um processo definido para revisões antes da publicação."},{q:"Vocês fazem SEO?",a:"O projeto pode incluir configuração e otimização básica para mecanismos de busca."}],b=["HTML","CSS","JavaScript","React","TypeScript","Git","GitHub"];function y(){x(),q(),w(),S(),A(),$(),P(),j(),O()}function x(){const e=document.getElementById("problem-grid");e&&(e.innerHTML=m.map((t,a)=>`
      <article class="problem-card">
        <div>
          <p class="card-index" aria-hidden="true">${String(a+1).padStart(2,"0")}</p>
          <h3>${t.title}</h3>
        </div>
        <p>${t.text}</p>
      </article>`).join(""))}function q(){const e=document.getElementById("method-steps");e&&(e.innerHTML=f.map((t,a)=>`
      <li class="process-step">
        <span class="step-dot" aria-hidden="true">${String(a+1).padStart(2,"0")}</span>
        <div>
          <h3>${t.title}</h3>
          <p>${t.text}</p>
        </div>
      </li>`).join(""))}function w(){const e=document.getElementById("services-grid");e&&(e.innerHTML=d.map(t=>`
      <article class="service-card" id="${t.id}">
        <p class="tag">${t.tag}</p>
        <h3>${t.title}</h3>
        <p class="desc">${t.problem}</p>
        <ul class="deliverables">
          ${t.deliverables.map(a=>`<li>${a}</li>`).join("")}
        </ul>
        <a class="btn btn-outline" href="#lead" data-track="hero_cta_click" data-track-source="service-${t.id}">${t.ctaLabel}</a>
      </article>`).join(""))}function S(){const e=document.getElementById("portfolio-cases");e&&(e.innerHTML=u.map(t=>L(t)).join(""))}function L(e){return`
    <article class="case">
      <div class="case-visual">
        <div class="mock" role="img" aria-label="Prévia ilustrativa do site ${e.title}">
          ${E()}
        </div>
      </div>
      <div class="case-body">
        <p class="tag">${e.segment}</p>
        <h3>${e.title}</h3>
        <div class="case-row"><div class="k">Desafio</div><div>${e.challenge}</div></div>
        <div class="case-row"><div class="k">Solução</div><div>${e.solution}</div></div>
        <div class="case-row"><div class="k">Resultado</div><div>${e.result}</div></div>
        <div class="case-tech">${e.technologies.map(t=>`<span>${t}</span>`).join("")}</div>
      </div>
    </article>`}function E(){return`
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
    </svg>`}function A(){const e=document.getElementById("demo-grid");e&&(e.innerHTML=p.map(t=>`
      <article class="demo-card">
        <div class="demo-thumb">
          <span class="demo-badge">Demonstração</span>
        </div>
        <div class="demo-info">
          <h3>${t.title}</h3>
          <p class="goal">Objetivo: ${t.goal}</p>
          <a class="btn btn-outline" href="#lead">Ver demonstração</a>
        </div>
      </article>`).join(""))}function $(){const e=document.getElementById("how-grid");e&&(e.innerHTML=g.map((t,a)=>`
      <li class="how-card">
        <p class="step-index" aria-hidden="true">${a+1}</p>
        <h3>${t.title}</h3>
        <p>${t.text}</p>
      </li>`).join(""))}function P(){const e=document.getElementById("diff-grid");e&&(e.innerHTML=v.map(t=>`
      <article class="diff-card">
        <h3>${t.title}</h3>
        <p>${t.text}</p>
      </article>`).join(""))}function j(){const e=document.getElementById("stack-list");e&&(e.innerHTML=b.map(t=>`<li><span>${t}</span></li>`).join(""))}function O(){const e=document.getElementById("faq-list");e&&(e.innerHTML=h.map((t,a)=>{const i=`faq-${a}`;return`
        <div class="faq-item">
          <h3>
            <button class="faq-question" id="${i}-question" aria-expanded="false" aria-controls="${i}-answer">
              ${t.q}
              <span class="plus" aria-hidden="true">+</span>
            </button>
          </h3>
          <div class="faq-answer" id="${i}-answer" role="region" aria-labelledby="${i}-question">
            <p>${t.a}</p>
          </div>
        </div>`}).join(""))}function I(){const e=document.querySelector(".menu-toggle"),t=document.querySelector(".nav-links");if(!e||!t)return;const a=()=>{t.classList.remove("is-open"),e.setAttribute("aria-expanded","false")},i=()=>{t.classList.add("is-open"),e.setAttribute("aria-expanded","true")};e.addEventListener("click",()=>{t.classList.contains("is-open")?a():i()}),t.querySelectorAll("a").forEach(o=>{o.addEventListener("click",a)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.classList.contains("is-open")&&(a(),e.focus())}),window.addEventListener("resize",()=>{window.innerWidth>860&&a()})}function k(){const e=document.querySelectorAll(".faq-item");e.forEach(t=>{const a=t.querySelector(".faq-question"),i=t.querySelector(".faq-answer");!a||!i||a.addEventListener("click",()=>{const o=t.classList.contains("is-open");e.forEach(s=>{s.classList.remove("is-open"),s.querySelector(".faq-question")?.setAttribute("aria-expanded","false");const n=s.querySelector(".faq-answer");n&&(n.style.maxHeight=null)}),o||(t.classList.add("is-open"),a.setAttribute("aria-expanded","true"),i.style.maxHeight=`${i.scrollHeight}px`)})})}function D(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.forEach(i=>i.classList.add("is-visible"));return}const a=new IntersectionObserver(i=>{i.forEach(o=>{o.isIntersecting&&(o.target.classList.add("is-visible"),a.unobserve(o.target))})},{threshold:.15});e.forEach(i=>a.observe(i))}const M={whatsappNumber:"5500000000000"};function T(e="Olá João, quero falar sobre meu projeto"){const t=encodeURIComponent(e);return`https://wa.me/${M.whatsappNumber}?text=${t}`}function C(){const e=document.getElementById("lead-form");if(!e)return;const t=e.querySelector(".form-status"),a=e.querySelector("button[type='submit']");e.addEventListener("input",()=>{},{once:!1}),e.querySelectorAll("input, select, textarea").forEach(i=>{i.addEventListener("blur",()=>{i.setAttribute("data-touched","true"),c(i)})}),e.addEventListener("submit",async i=>{i.preventDefault();const o=Array.from(e.querySelectorAll("[required]"));if(o.forEach(n=>n.setAttribute("data-touched","true")),!o.every(n=>c(n))){r(t,"error","Verifique os campos destacados antes de enviar.");return}l(a,!0);try{await z(new FormData(e)),r(t,"success","Recebido! Se preferir uma resposta mais rápida, fale direto pelo WhatsApp acima."),e.reset()}catch{r(t,"error","Não foi possível enviar agora. Tente novamente ou use o WhatsApp.")}finally{l(a,!1)}})}function c(e){const t=e.closest(".field"),a=e.checkValidity();return t&&t.classList.toggle("has-error",!a&&e.getAttribute("data-touched")==="true"),a}function r(e,t,a){e&&(e.textContent=a,e.setAttribute("data-state",t))}function l(e,t){e&&(e.disabled=t,e.textContent=t?"Enviando...":"Enviar projeto")}async function z(e){{await new Promise(t=>setTimeout(t,500));return}}function H(){document.querySelectorAll("[data-wa]").forEach(t=>{const a=t.getAttribute("data-wa-message")||void 0;t.setAttribute("href",T(a)),t.setAttribute("target","_blank"),t.setAttribute("rel","noopener"),t.addEventListener("click",()=>{t.getAttribute("data-wa-source")})})}function W(){const e=document.getElementById("year");e&&(e.textContent=new Date().getFullYear())}function B(){document.querySelectorAll("[data-track]").forEach(e=>{e.addEventListener("click",()=>{e.getAttribute("data-track"),e.getAttribute("data-track-source")})})}document.addEventListener("DOMContentLoaded",()=>{y(),I(),k(),D(),C(),H(),B(),W()});
