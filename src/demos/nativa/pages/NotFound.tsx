import { EmptyState } from "../components/EmptyState";
import { href } from "../lib/router";

export function NotFound({ title = "Página não encontrada", text = "O endereço não existe nesta loja." }: { title?: string; text?: string }) {
  return (
    <div className="wrap pt-12">
      <h1 tabIndex={-1} className="sr-only">
        {title}
      </h1>
      <EmptyState
        title={title}
        action={
          <a href={href("/loja")} className="btn-dark">
            Ir para a loja
          </a>
        }
      >
        {text}
      </EmptyState>
    </div>
  );
}
