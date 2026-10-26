import type { ReactNode } from "react";

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-ink/25 px-6 py-16 text-center sm:py-24">
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {children && <div className="mx-auto mt-3 max-w-[46ch] text-stone">{children}</div>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
