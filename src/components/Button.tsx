import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "outline-light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[1rem] font-semibold leading-none transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-moss",
  accent: "bg-amber text-ink hover:bg-[#d4922c]",
  outline: "border-2 border-ink/80 text-ink hover:bg-ink hover:text-cream",
  "outline-light": "border-2 border-cream/70 text-cream hover:bg-cream hover:text-forest",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", className = "", children, ...rest }: Props) {
  const external = rest.href?.startsWith("http");
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export const buttonClass = (variant: Variant = "primary") => `${base} ${variants[variant]}`;
