import { config, hasWhatsapp } from "../config";
import { WhatsAppButton } from "./WhatsAppButton";
import { QuoteForm } from "./QuoteForm";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="on-dark section bg-forest text-cream">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="contato-title" className="font-display text-[2.5rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
            Conte o que você precisa
          </h2>
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-cream/80">
            Preencha o formulário com o máximo de detalhes que tiver. Com isso consigo entender o projeto e responder com
            perguntas certeiras ou uma proposta inicial.
          </p>
          {hasWhatsapp && (
            <>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-cream/70">Prefere conversar direto? Chame no WhatsApp.</p>
              <div className="mt-8">
                <WhatsAppButton variant="accent" />
              </div>
            </>
          )}
          {config.email && (
            <p className="mt-6 font-display text-cream/75">
              Ou escreva para{" "}
              <a className="text-cream underline decoration-amber underline-offset-4 hover:text-amber" href={`mailto:${config.email}`}>
                {config.email}
              </a>
            </p>
          )}
        </div>

        <div className="lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
