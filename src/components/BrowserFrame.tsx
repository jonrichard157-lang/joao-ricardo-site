import type { ReactNode } from "react";

interface Props {
  address: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
}

/** Moldura de navegador usada nos mockups de projetos e demonstrações. */
export function BrowserFrame({ address, children, className = "", size = "md" }: Props) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-ink/15 bg-paper shadow-frame ${className}`}>
      <div className={`flex items-center gap-3 border-b border-ink/10 bg-sand/70 ${size === "sm" ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8704a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-paper/90 px-3 py-1 font-display text-xs text-muted">{address}</div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}
