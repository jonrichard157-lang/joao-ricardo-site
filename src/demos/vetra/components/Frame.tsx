import type { ReactNode } from "react";

const corner = "pointer-events-none absolute h-3 w-3 border-fog/45";

/** Marcas de canto, como um visor: delimitam blocos importantes. */
export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden="true" className={`${corner} top-0 left-0 rounded-tl-[3px] border-t border-l`} />
      <span aria-hidden="true" className={`${corner} top-0 right-0 rounded-tr-[3px] border-t border-r`} />
      <span aria-hidden="true" className={`${corner} bottom-0 left-0 rounded-bl-[3px] border-b border-l`} />
      <span aria-hidden="true" className={`${corner} right-0 bottom-0 rounded-br-[3px] border-r border-b`} />
      {children}
    </div>
  );
}

/** Título de seção: curto, com o traço vermelho por trás. */
export function Label({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`text-xl font-semibold tracking-[-0.02em] sm:text-2xl ${className}`}>
      <span className="mark">{children}</span>
    </h2>
  );
}
