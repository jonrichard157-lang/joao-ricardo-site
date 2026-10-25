import { useEffect, useRef, useState } from "react";
import { portfolioUrl } from "../config";
import { messages, nav } from "../data/content";
import { WaCta } from "../whatsapp";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-lg font-bold tracking-[-0.04em] uppercase ${className}`}>
      Vetra
      <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
      <span className="font-medium">Academia</span>
    </span>
  );
}

export function DemoBanner() {
  return (
    <div className="border-b border-line bg-void text-ash">
      <p className="wrap py-2 text-center text-xs leading-snug">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" aria-hidden="true" />
        Página demonstrativa da VeyzaTech. Vetra Academia é uma marca fictícia, e planos, valores e depoimentos são exemplos.{" "}
        <a href={portfolioUrl} className="text-fog underline underline-offset-2">
          Ver portfólio
        </a>
      </p>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#topo" className="inline-flex min-h-11 items-center" aria-label="Vetra Academia, voltar ao início" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>
        <nav aria-label="Seções da página" className="hidden md:block">
          <ul className="flex gap-1.5 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="pill">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <WaCta
            message={messages.visit}
            className="hidden min-h-10 items-center rounded-full bg-signal px-5 text-[0.95rem] font-semibold text-fog transition-colors hover:bg-fog hover:text-void sm:inline-flex"
          >
            Agendar visita
          </WaCta>
          <button
            ref={btn}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-fog/60 md:hidden"
            aria-expanded={open}
            aria-controls="vetra-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="vetra-menu" hidden={!open} aria-label="Seções da página (celular)" className="border-t border-line md:hidden">
        <ul className="wrap py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="giant block py-3 text-5xl">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
