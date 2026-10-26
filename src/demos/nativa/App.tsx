import { useEffect, useRef } from "react";
import { Layout } from "./components/Layout";
import { CartProvider } from "./lib/cart";
import { findProduct } from "./lib/catalog";
import { useRoute } from "./lib/router";
import { CartPage } from "./pages/CartPage";
import { Catalog } from "./pages/Catalog";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductPage } from "./pages/ProductPage";

const SITE = "Nativa Casa";

function titleFor(path: string) {
  if (path === "/") return `${SITE} — Objetos para a casa em materiais naturais`;
  if (path === "/loja") return `Loja | ${SITE}`;
  if (path === "/carrinho") return `Carrinho | ${SITE}`;
  if (path === "/checkout") return `Checkout | ${SITE}`;
  const product = path.startsWith("/produto/") && findProduct(path.slice(9));
  return product ? `${product.name} | ${SITE}` : `Página não encontrada | ${SITE}`;
}

export default function App() {
  const { path, params } = useRoute();
  const previousPath = useRef(path);

  // Ao trocar de página: título, rolagem para o topo e foco no título (leitores de tela).
  // Mudanças só de filtro (#/loja?…) não movem o foco nem a rolagem.
  useEffect(() => {
    document.title = titleFor(path);
    if (previousPath.current === path) return;
    previousPath.current = path;
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
  }, [path]);

  let page;
  if (path === "/") page = <Home />;
  else if (path === "/loja") page = <Catalog params={params} />;
  else if (path.startsWith("/produto/")) page = <ProductPage key={path} slug={decodeURIComponent(path.slice(9))} />;
  else if (path === "/carrinho") page = <CartPage />;
  else if (path === "/checkout") page = <Checkout />;
  else page = <NotFound />;

  return (
    <CartProvider>
      <Layout>{page}</Layout>
    </CartProvider>
  );
}
