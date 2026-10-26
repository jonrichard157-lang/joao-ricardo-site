import { formatPrice } from "../lib/catalog";

export function Price({ cents, className = "" }: { cents: number; className?: string }) {
  return <span className={`tabular-nums ${className}`}>{formatPrice(cents)}</span>;
}
