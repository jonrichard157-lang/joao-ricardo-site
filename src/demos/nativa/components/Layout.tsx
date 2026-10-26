import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { portfolioUrl } from "../config";
import { categories } from "../data/catalog";
import { useCart } from "../lib/cart";
import { href, navigate } from "../lib/router";

export function Wordmark() {
  return <span className="font-serif text-[1.65rem] leading-none tracking-[-0.02em]">nativa casa</span>;
}

function DemoBanner() {
  return (
    <div className="on-dark bg-moss text-paper">
      <p className="wrap py-2 text-center text-[0.82rem] leading-snug">
        Loja demonstrativa da VeyzaTech. Nativa Casa é uma marca fictícia: nenhum pedido é processado e nenhum pagamento é cobrado.{" "}
        <a href={portfolioUrl} className="font-semibold underline underline-offset-2">
          Ver portfólio
        </a>
      </p>
    </div>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function SearchForm({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const id = useId();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/loja${q.trim() ? `?busca=${encodeURIComponent(q.trim())}` : ""}`);
        setQ("");
        onDone?.();
      }}
      className="flex"
    >
      <label htmlFor={id} className="sr-only">
        Buscar produtos
      </label>
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar produtos"
        className="h-10 w-full min-w-0 border-b border-ink/30 bg-transparent px-1 text-[0.95rem] placeholder:text-stone focus:border-ink focus:outline-none"
      />
      <button type="submit" className="h-10 px-3 text-sm font-semibold">
        Buscar
      </button>
    </form>
  );
}

function Header() {
  const { count } = useCart();
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
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-linen">
      <div className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-6 text-[0.95rem]">
            <li>
              <a href={href("/loja")} className="hover:underline hover:underline-offset-4">
                Loja
              </a>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <a href={href(`/loja?categoria=${c.id}`)} className="hover:underline hover:underline-offset-4">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={btn}
          type="button"
          className="-ml-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-loja"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>

        <a href={href("/")} aria-label="Nativa Casa, página inicial" className="inline-flex min-h-11 items-center justify-self-center">
          <Wordmark />
        </a>

        <div className="flex items-center justify-end gap-5">
          <div className="hidden w-56 xl:block">
            <SearchForm />
          </div>
          <a href={href("/carrinho")} className="relative inline-flex h-11 items-center gap-2 text-[0.95rem]" aria-label={`Carrinho, ${count} ${count === 1 ? "item" : "itens"}`}>
            <CartIcon />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-xs font-semibold text-paper tabular-nums" data-testid="cart-count">
              {count}
            </span>
          </a>
        </div>
      </div>

      <div id="menu-loja" hidden={!open} className="border-t border-line bg-linen lg:hidden">
        <div className="wrap py-5">
          <SearchForm onDone={() => setOpen(false)} />
          <nav aria-label="Principal (celular)" className="mt-4">
            <ul>
              <li>
                <a href={href("/loja")} className="block border-b border-line py-3.5 font-serif text-2xl">
                  Toda a loja
                </a>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={href(`/loja?categoria=${c.id}`)} className="block border-b border-line py-3.5 font-serif text-2xl">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-4 max-w-[38ch] text-sm text-stone">
            Objetos para a casa em materiais naturais. Marca, produtos e preços fictícios, criados para demonstração.
          </p>
        </div>
        <nav aria-label="Rodapé" className="text-sm md:col-span-3">
          <ul className="space-y-2">
            <li>
              <a href={href("/loja")} className="link">
                Toda a loja
              </a>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <a href={href(`/loja?categoria=${c.id}`)} className="link">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-stone md:col-span-4">
          Loja demonstrativa desenvolvida pela{" "}
          <a href={portfolioUrl} className="link text-ink">
            VeyzaTech
          </a>
          . Fotos ilustrativas geradas por IA. O carrinho fica salvo apenas neste navegador.
        </p>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#conteudo" onClick={(e) => { e.preventDefault(); document.getElementById("conteudo")?.focus(); }} className="sr-only z-50 bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
