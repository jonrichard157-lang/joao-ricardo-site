import { MAX_QUANTITY } from "../data/catalog";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: "md" | "sm";
}

/** Seletor de quantidade com botões e campo numérico (1 a MAX_QUANTITY). */
export function QuantityStepper({ value, onChange, label, size = "md" }: Props) {
  const h = size === "md" ? "h-12" : "h-10";
  const set = (n: number) => onChange(Math.min(MAX_QUANTITY, Math.max(1, n)));
  return (
    <div role="group" aria-label={label} className={`inline-flex ${h} items-stretch border border-ink/30 bg-paper`}>
      <button type="button" className="w-11 text-lg disabled:opacity-30" onClick={() => set(value - 1)} disabled={value <= 1} aria-label="Diminuir quantidade">
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QUANTITY}
        value={value}
        aria-label="Quantidade"
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) set(n);
        }}
        className="w-10 border-x border-ink/15 bg-transparent text-center tabular-nums [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" className="w-11 text-lg disabled:opacity-30" onClick={() => set(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="Aumentar quantidade">
        +
      </button>
    </div>
  );
}
