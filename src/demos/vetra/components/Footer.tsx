import { portfolioUrl } from "../config";
import { brand, nav } from "../data/content";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer className="on-dark border-t border-paper/10 bg-iron pb-24 text-paper/75 md:pb-0">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark className="text-paper" />
          <p className="mt-4 max-w-[36ch] text-sm">
            {brand.address}, {brand.city}. Marca fictícia criada para demonstração.
          </p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#visita" className="hover:text-paper">
                Agendar visita
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm md:col-span-4">
          Página demonstrativa desenvolvida pela{" "}
          <a href={portfolioUrl} className="font-semibold text-paper underline underline-offset-4">
            VeyzaTech
          </a>
          . Fotos ilustrativas geradas por IA.
        </p>
      </div>
    </footer>
  );
}
