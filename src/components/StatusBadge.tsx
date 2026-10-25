import type { DemoAvailability, ProjectStatus } from "../types";

const styles: Record<ProjectStatus | DemoAvailability, { label: string; className: string; dot: string }> = {
  real: { label: "Projeto real", className: "bg-forest text-cream", dot: "bg-sage" },
  conceitual: { label: "Projeto conceitual", className: "bg-sand text-ink", dot: "bg-rust" },
  "em-desenvolvimento": { label: "Em desenvolvimento", className: "bg-amber/25 text-[#6b3b0c] ring-1 ring-amber/60", dot: "bg-amber" },
  disponivel: { label: "Disponível", className: "bg-forest text-cream", dot: "bg-sage" },
  "em-construcao": { label: "Em construção", className: "bg-amber/25 text-[#6b3b0c] ring-1 ring-amber/60", dot: "bg-amber" },
  "em-breve": { label: "Em breve", className: "bg-sand text-ink", dot: "bg-muted" },
};

export function StatusBadge({ status }: { status: ProjectStatus | DemoAvailability }) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-sm font-medium ${s.className}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}
