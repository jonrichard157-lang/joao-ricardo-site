import { config } from "../config";
import { navItems } from "../data/content";
import { whatsappUrl } from "../lib/contact";
import { Wordmark } from "./Header";

export function Footer() {
  const wa = whatsappUrl();
  return (
    <footer className="on-dark bg-ink text-cream">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark tone="light" />
          <p className="mt-5 max-w-[40ch] text-cream/70">
            Desenvolvimento web freelancer de {config.owner}. Atendimento remoto para todo o Brasil.
          </p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="space-y-2 font-display">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-cream/80 hover:text-amber">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="font-display md:col-span-4">
          <p className="text-cream/60">Contato</p>
          <ul className="mt-2 space-y-2">
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-amber">
                  WhatsApp
                </a>
              </li>
            )}
            {config.email && (
              <li>
                <a href={`mailto:${config.email}`} className="text-cream hover:text-amber">
                  {config.email}
                </a>
              </li>
            )}
            <li>
              <a href="#contato" className="text-cream hover:text-amber">
                Formulário de orçamento
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="container-site py-6 font-display text-sm text-cream/55">
          © {new Date().getFullYear()} {config.brand}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
