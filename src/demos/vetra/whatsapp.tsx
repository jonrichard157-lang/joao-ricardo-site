import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { vetraWhatsapp } from "./config";

export const waUrl = (message: string) => `https://wa.me/${vetraWhatsapp}?text=${encodeURIComponent(message)}`;

const Ctx = createContext<(message: string) => void>(() => {});

/**
 * Sem número configurado, os CTAs abrem este aviso mostrando a mensagem
 * que seria enviada. Assim a demonstração é testável sem fingir que existe
 * uma conversa real do outro lado.
 */
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");

  const preview = useCallback((text: string) => {
    setMessage(text);
    dialogRef.current?.showModal();
  }, []);

  return (
    <Ctx.Provider value={preview}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="wa-demo-title"
        className="m-auto w-[min(92vw,520px)] rounded-2xl bg-paper p-0 text-iron backdrop:bg-iron/70"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="p-6 sm:p-8">
          <h2 id="wa-demo-title" className="display text-4xl">
            Demonstração
          </h2>
          <p className="mt-4 text-steel">
            Esta página é um modelo da VeyzaTech e não está ligada a um WhatsApp real. Em um site publicado, este botão
            abriria a conversa com a academia já com esta mensagem:
          </p>
          <blockquote className="mt-5 rounded-xl rounded-tl-sm bg-[#dcf8c6] px-4 py-3 whitespace-pre-line text-[#16301b]" data-testid="wa-preview">
            {message}
          </blockquote>
          <form method="dialog" className="mt-6">
            <button className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-iron px-6 font-semibold text-paper hover:bg-graphite">
              Entendi
            </button>
          </form>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

interface WaCtaProps {
  message: string;
  className?: string;
  children: ReactNode;
  label?: string;
}

/** CTA de WhatsApp: link real quando há número; prévia da mensagem quando não há. */
export function WaCta({ message, className = "", children, label }: WaCtaProps) {
  const preview = useContext(Ctx);
  if (vetraWhatsapp) {
    return (
      <a href={waUrl(message)} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} aria-label={label} aria-haspopup="dialog" onClick={() => preview(message)}>
      {children}
    </button>
  );
}

export function useWhatsApp() {
  const preview = useContext(Ctx);
  return (message: string) => {
    if (vetraWhatsapp) window.open(waUrl(message), "_blank", "noopener,noreferrer");
    else preview(message);
  };
}

export function WaIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
