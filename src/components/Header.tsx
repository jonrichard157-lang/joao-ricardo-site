import { useEffect, useRef, useState } from "react";
import { navItems } from "../data/content";
import { ButtonLink } from "./Button";
import { MenuIcon } from "./icons";

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[1.35rem] font-extrabold tracking-[-0.04em] ${tone === "light" ? "text-cream" : "text-ink"}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill={tone === "light" ? "#2b3a35" : "#182421"} />
        <path d="M8 9l8 15 8-15" fill="none" stroke="#E2A23B" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      VeyzaTech
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.matchMedia("(min-width: 1024px)").matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 bg-cream transition-shadow ${scrolled || open ? "shadow-[0_1px_0_rgb(34_34_34/0.12)]" : ""}`}>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#inicio" aria-label="VeyzaTech, voltar ao início" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 font-display text-[0.98rem] font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3.5 py-2 text-ink/80 transition-colors hover:bg-sand hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="#contato" variant="primary" className="!min-h-11 !px-5">
              Solicitar orçamento
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/80 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-ink/10 bg-cream lg:hidden"
      >
        <nav aria-label="Navegação principal (celular)" className="container-site py-6">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-ink/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-3xl font-semibold tracking-[-0.02em] text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#contato" variant="primary" className="mt-8 w-full" onClick={() => setOpen(false)}>
            Solicitar orçamento
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
