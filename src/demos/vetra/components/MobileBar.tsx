import { useEffect, useState } from "react";
import { messages } from "../data/content";
import { WaCta, WaIcon } from "../whatsapp";

/**
 * Barra fixa no celular: aparece depois do hero e some quando o
 * formulário de visita está na tela, para não duplicar o CTA final.
 */
export function MobileBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [visitVisible, setVisitVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    const visit = document.getElementById("visita");
    if (!hero || !visit || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroVisible(e.isIntersecting);
        if (e.target === visit) setVisitVisible(e.isIntersecting);
      }
    });
    io.observe(hero);
    io.observe(visit);
    return () => io.disconnect();
  }, []);

  const show = !heroVisible && !visitVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 p-3 backdrop-blur-sm transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
      data-testid="mobile-bar"
    >
      <div className="flex gap-2">
        <a href="#planos" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-fog/70 text-sm font-semibold">
          Planos
        </a>
        <WaCta message={messages.visit} className="inline-flex min-h-12 flex-[2] items-center justify-center gap-2 rounded-full bg-signal text-sm font-semibold text-fog">
          <WaIcon /> Agendar visita
        </WaCta>
      </div>
    </div>
  );
}
