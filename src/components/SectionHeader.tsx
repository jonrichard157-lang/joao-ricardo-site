import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Título de seção: h2 grande alinhado à esquerda, com texto de apoio opcional. */
export function SectionHeader({ id, title, children, tone = "light", className = "" }: Props) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <h2
        id={id}
        className={`font-display text-[2.5rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:col-span-6 lg:text-[4.5rem] ${
          tone === "dark" ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {children && (
        <div className={`lg:col-span-5 lg:col-start-8 ${tone === "dark" ? "text-cream/75" : "text-muted"} text-lg leading-relaxed`}>
          {children}
        </div>
      )}
    </div>
  );
}
