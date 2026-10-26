import { useEffect, useState } from "react";

/**
 * Roteamento por hash (#/loja, #/produto/vaso-duna). Funciona em qualquer
 * hospedagem estática (Vercel, GitHub Pages) sem regras de reescrita.
 */
export interface Route {
  path: string;
  params: URLSearchParams;
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, search = ""] = raw.split("?");
  return { path: path || "/", params: new URLSearchParams(search) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export const href = (path: string) => `#${path}`;

export function navigate(path: string, { replace = false } = {}) {
  if (replace) {
    history.replaceState(null, "", href(path));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = path;
  }
}
