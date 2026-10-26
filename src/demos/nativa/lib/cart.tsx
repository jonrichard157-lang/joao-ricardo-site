import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { MAX_QUANTITY } from "../data/catalog";
import type { CartLine } from "../types";
import { productById } from "./catalog";

/**
 * Carrinho da demonstração. Fica só no navegador (localStorage), guardando
 * apenas o id do produto e a quantidade: nenhum dado pessoal é salvo.
 */
const STORAGE_KEY = "nativa-casa:carrinho";

type Action =
  | { type: "add"; productId: string; quantity: number }
  | { type: "set"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(n)));

export function cartReducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = lines.find((l) => l.productId === action.productId);
      if (existing) return lines.map((l) => (l === existing ? { ...l, quantity: clamp(l.quantity + action.quantity) } : l));
      return [...lines, { productId: action.productId, quantity: clamp(action.quantity) }];
    }
    case "set":
      return lines.map((l) => (l.productId === action.productId ? { ...l, quantity: clamp(action.quantity) } : l));
    case "remove":
      return lines.filter((l) => l.productId !== action.productId);
    case "clear":
      return [];
  }
}

function load(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    // Descarta itens que não existem mais no catálogo ou dados corrompidos.
    return parsed
      .filter((l): l is CartLine => typeof l?.productId === "string" && Number.isFinite(l?.quantity) && !!productById(l.productId))
      .map((l) => ({ productId: l.productId, quantity: clamp(l.quantity) }));
  } catch {
    return [];
  }
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (productId: string, quantity: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* navegação privada ou armazenamento bloqueado: o carrinho segue na memória */
    }
  }, [lines]);

  const api = useMemo<CartApi>(() => {
    const subtotal = lines.reduce((sum, l) => sum + (productById(l.productId)?.price ?? 0) * l.quantity, 0);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal,
      add: (productId, quantity) => dispatch({ type: "add", productId, quantity }),
      setQuantity: (productId, quantity) => dispatch({ type: "set", productId, quantity }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
