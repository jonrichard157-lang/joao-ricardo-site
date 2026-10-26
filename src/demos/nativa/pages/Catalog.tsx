import { useEffect, useId, useMemo, useState } from "react";
import { categories, materials, priceRanges, products, sortOptions } from "../data/catalog";
import { EmptyState } from "../components/EmptyState";
import { ProductTile } from "../components/ProductTile";
import { filterProducts, paramsFromQuery, queryFromParams, sortProducts } from "../lib/catalog";
import { navigate } from "../lib/router";
import type { CatalogQuery, CategoryId, Material, PriceRange, SortOrder } from "../types";

export function Catalog({ params }: { params: URLSearchParams }) {
  const query = queryFromParams(params);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState(query.q);
  const uid = useId();

  // Mantém o campo de busca em sincronia quando a busca vem do topo da página.
  useEffect(() => setSearch(query.q), [query.q]);

  const update = (patch: Partial<CatalogQuery>) => navigate(`/loja${paramsFromQuery({ ...query, ...patch })}`, { replace: true });

  const results = useMemo(() => sortProducts(filterProducts(products, queryFromParams(params)), queryFromParams(params).sort), [params]);
  const category = categories.find((c) => c.id === query.category);
  const activeCount = (query.category ? 1 : 0) + query.materials.length + (query.price ? 1 : 0);

  const countIn = (patch: Partial<CatalogQuery>) => filterProducts(products, { ...query, ...patch }).length;

  const toggleMaterial = (m: Material) =>
    update({ materials: query.materials.includes(m) ? query.materials.filter((x) => x !== m) : [...query.materials, m] });

  const chips: { label: string; clear: () => void }[] = [
    ...(query.q ? [{ label: `Busca: “${query.q}”`, clear: () => update({ q: "" }) }] : []),
    ...(category ? [{ label: category.name, clear: () => update({ category: "" }) }] : []),
    ...query.materials.map((m) => ({ label: m, clear: () => toggleMaterial(m) })),
    ...(query.price ? [{ label: priceRanges.find((r) => r.id === query.price)!.label, clear: () => update({ price: "" }) }] : []),
  ];

  return (
    <div className="wrap pt-8 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 tabIndex={-1} className="text-[clamp(2.6rem,6vw,4.5rem)] leading-none focus:outline-none">
            {category ? category.name : "Toda a loja"}
          </h1>
          <p className="mt-3 max-w-[50ch] text-stone">
            {category ? category.description : "Todos os objetos da Nativa Casa em um só lugar."}
          </p>
        </div>
        <form
          role="search"
          className="flex w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: search.trim() });
          }}
        >
          <label htmlFor={`${uid}-q`} className="sr-only">
            Buscar por nome
          </label>
          <input
            id={`${uid}-q`}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome"
            className="field mt-0 min-w-0 border-ink/25"
          />
          <button type="submit" className="btn-dark shrink-0 px-5">
            Buscar
          </button>
        </form>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-stone" aria-live="polite" data-testid="result-count">
          {results.length} {results.length === 1 ? "produto" : "produtos"}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn-line min-h-11 px-4 lg:hidden"
            aria-expanded={filtersOpen}
            aria-controls="filtros"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            Filtros{activeCount ? ` (${activeCount})` : ""}
          </button>
          <label htmlFor={`${uid}-sort`} className="text-sm text-stone">
            Ordenar
          </label>
          <select
            id={`${uid}-sort`}
            value={query.sort}
            onChange={(e) => update({ sort: e.target.value as SortOrder })}
            className="h-11 border border-ink/25 bg-paper px-3 text-[0.95rem]"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chips.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filtros ativos">
          {chips.map((c) => (
            <li key={c.label}>
              <button type="button" onClick={c.clear} className="inline-flex min-h-9 items-center gap-2 border border-ink/25 bg-paper px-3 text-sm hover:border-ink">
                {c.label}
                <span aria-hidden="true">×</span>
                <span className="sr-only">(remover filtro)</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => navigate("/loja", { replace: true })} className="link min-h-9 px-1 text-sm">
              Limpar tudo
            </button>
          </li>
        </ul>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div id="filtros" className={`${filtersOpen ? "block" : "hidden"} border-b border-line pb-8 lg:block lg:border-0 lg:pb-0`}>
          <fieldset>
            <legend className="font-serif text-xl">Categoria</legend>
            <ul className="mt-3 space-y-1">
              {[{ id: "" as const, name: "Todas" }, ...categories].map((c) => (
                <li key={c.id || "todas"}>
                  <label className="flex min-h-9 cursor-pointer items-center gap-3 text-[0.95rem]">
                    <input type="radio" name="categoria" className="h-4 w-4 accent-ink" checked={query.category === c.id} onChange={() => update({ category: c.id as CategoryId | "" })} />
                    {c.name}
                    <span className="ml-auto text-sm text-stone tabular-nums">{countIn({ category: c.id as CategoryId | "" })}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="font-serif text-xl">Material</legend>
            <ul className="mt-3 space-y-1">
              {materials.map((m) => (
                <li key={m}>
                  <label className="flex min-h-9 cursor-pointer items-center gap-3 text-[0.95rem]">
                    <input type="checkbox" className="h-4 w-4 accent-ink" checked={query.materials.includes(m)} onChange={() => toggleMaterial(m)} />
                    {m}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="font-serif text-xl">Preço</legend>
            <ul className="mt-3 space-y-1">
              {[{ id: "" as const, label: "Qualquer preço" }, ...priceRanges].map((r) => (
                <li key={r.id || "qualquer"}>
                  <label className="flex min-h-9 cursor-pointer items-center gap-3 text-[0.95rem]">
                    <input type="radio" name="preco" className="h-4 w-4 accent-ink" checked={query.price === r.id} onChange={() => update({ price: r.id as PriceRange | "" })} />
                    {r.label}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        <div>
          {results.length === 0 ? (
            <EmptyState
              title="Nenhum produto encontrado"
              action={
                <button type="button" className="btn-dark" onClick={() => navigate("/loja", { replace: true })}>
                  Limpar busca e filtros
                </button>
              }
            >
              {query.q ? <>Não há produtos com “{query.q}” no nome com os filtros escolhidos.</> : <>Nenhum produto combina com os filtros escolhidos.</>} Tente
              remover algum filtro ou buscar outro termo.
            </EmptyState>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6" data-testid="product-grid">
              {results.map((p, i) => (
                <ProductTile key={p.id} product={p} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 50vw" priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

