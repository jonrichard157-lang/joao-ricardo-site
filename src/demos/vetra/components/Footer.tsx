import { portfolioUrl } from "../config";
import { brand, nav } from "../data/content";
import { Frame } from "./Frame";

export function Footer() {
  const links = [...nav, { href: "#visita", label: "Agendar visita" }];
  return (
    <footer className="pt-6 pb-28 md:pb-10">
      <div className="wrap">
        <div className="rounded-3xl bg-void px-5 py-10 sm:px-12 sm:py-14">
          <Frame className="flex min-h-40 items-end justify-center px-4 pb-6 sm:min-h-56">
            <p className="text-center text-2xl font-semibold tracking-[-0.03em] uppercase sm:text-4xl">Vetra Academia</p>
          </Frame>
          <nav aria-label="Rodapé" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
              {links.map((n, i) => (
                <li key={n.href} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />}
                  <a href={n.href} className="inline-flex min-h-11 items-center hover:text-signal-soft">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs leading-relaxed text-ash">
            {brand.address}, {brand.city}. Marca fictícia criada para demonstração. Fotos ilustrativas geradas por IA. Página desenvolvida pela{" "}
            <a href={portfolioUrl} className="text-fog underline underline-offset-2">
              VeyzaTech
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
