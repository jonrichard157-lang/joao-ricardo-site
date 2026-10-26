import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { EmptyState } from "../components/EmptyState";
import { Price } from "../components/Price";
import { useCart } from "../lib/cart";
import { productById } from "../lib/catalog";
import { href } from "../lib/router";
import type { CartLine } from "../types";

interface Delivery {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}
type Errors = Partial<Record<keyof Delivery, string>>;

const empty: Delivery = { name: "", email: "", cep: "", street: "", number: "", complement: "", city: "", state: "" };

const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

export function validateDelivery(d: Delivery): Errors {
  const e: Errors = {};
  if (d.name.trim().split(/\s+/).length < 2) e.name = "Informe nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Informe um e-mail válido, como nome@email.com.";
  if (d.cep.replace(/\D/g, "").length !== 8) e.cep = "O CEP deve ter 8 números, como 01310-100.";
  if (d.street.trim().length < 3) e.street = "Informe a rua ou avenida.";
  if (!d.number.trim()) e.number = "Informe o número (ou “s/n”).";
  if (d.city.trim().length < 2) e.city = "Informe a cidade.";
  if (!UFS.includes(d.state)) e.state = "Escolha o estado.";
  return e;
}

const maskCep = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

type Step = "entrega" | "revisao" | "concluido";

export function Checkout() {
  const { lines, subtotal, clear } = useCart();
  // Os dados de entrega existem só na memória desta página: nada é salvo ou enviado.
  const [data, setData] = useState<Delivery>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<Step>("entrega");
  const [snapshot, setSnapshot] = useState<{ lines: CartLine[]; subtotal: number; firstName: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  if (step === "concluido" && snapshot) {
    return (
      <div className="wrap max-w-3xl pt-12">
        <h1 ref={headingRef} tabIndex={-1} className="text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] focus:outline-none">
          Pedido de demonstração simulado
        </h1>
        <div role="status" className="mt-6 border-l-4 border-moss bg-moss-soft px-5 py-4">
          <p className="font-semibold">Obrigado por testar, {snapshot.firstName}.</p>
          <p className="mt-1">
            Nenhum pedido foi criado, nenhum pagamento foi feito e nenhum dado foi enviado ou salvo. Os dados de entrega
            já foram descartados desta página.
          </p>
        </div>
        <OrderSummary lines={snapshot.lines} subtotal={snapshot.subtotal} />
        <a href={href("/loja")} className="btn-dark mt-10">
          Voltar à loja
        </a>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="wrap pt-12">
        <h1 tabIndex={-1} className="sr-only">
          Checkout
        </h1>
        <EmptyState
          title="Não há itens para finalizar"
          action={
            <a href={href("/loja")} className="btn-dark">
              Explorar a loja
            </a>
          }
        >
          Adicione produtos ao carrinho para ver o fluxo de checkout demonstrativo.
        </EmptyState>
      </div>
    );
  }

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof Delivery;
    const value = name === "cep" ? maskCep(e.target.value) : e.target.value;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateDelivery(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    goTo("revisao");
  };

  const finish = () => {
    setSnapshot({ lines, subtotal, firstName: data.name.trim().split(/\s+/)[0] });
    setData(empty);
    clear();
    goTo("concluido");
  };

  const field = (name: keyof Delivery, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, className = "") => (
    <div className={className}>
      <label htmlFor={`${uid}-${name}`} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        value={data[name]}
        onChange={update}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${uid}-${name}-erro` : undefined}
        className={`field ${errors[name] ? "border-error" : "border-ink/25"}`}
        {...props}
      />
      {errors[name] && (
        <p id={`${uid}-${name}-erro`} className="mt-1.5 text-sm text-error">
          {errors[name]}
        </p>
      )}
    </div>
  );
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="wrap pt-8 lg:pt-12">
      <ol className="flex gap-6 text-sm" aria-label="Etapas do checkout">
        {[
          ["entrega", "1. Entrega"],
          ["revisao", "2. Revisão"],
        ].map(([id, label]) => (
          <li key={id} aria-current={step === id ? "step" : undefined} className={step === id ? "font-semibold underline underline-offset-4" : "text-stone"}>
            {label}
          </li>
        ))}
      </ol>
      <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-[clamp(2.6rem,6vw,4.5rem)] leading-none focus:outline-none">
        {step === "entrega" ? "Entrega" : "Revisão do pedido"}
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === "entrega" ? (
            <form ref={formRef} noValidate onSubmit={submit} aria-label="Dados de entrega">
              <p className="sr-only" aria-live="polite">
                {errorCount ? `O formulário tem ${errorCount} ${errorCount === 1 ? "campo" : "campos"} para corrigir.` : ""}
              </p>
              <div className="grid gap-5 sm:grid-cols-6">
                {field("name", "Nome completo", { autoComplete: "name" }, "sm:col-span-6")}
                {field("email", "E-mail", { type: "email", autoComplete: "email", inputMode: "email" }, "sm:col-span-6")}
                {field("cep", "CEP", { inputMode: "numeric", autoComplete: "postal-code", placeholder: "00000-000" }, "sm:col-span-2")}
                {field("street", "Rua ou avenida", { autoComplete: "address-line1" }, "sm:col-span-4")}
                {field("number", "Número", { autoComplete: "address-line2" }, "sm:col-span-2")}
                {field("complement", "Complemento (opcional)", {}, "sm:col-span-4")}
                {field("city", "Cidade", { autoComplete: "address-level2" }, "sm:col-span-4")}
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-state`} className="text-sm font-semibold">
                    Estado
                  </label>
                  <select
                    id={`${uid}-state`}
                    name="state"
                    value={data.state}
                    onChange={update}
                    aria-invalid={errors.state ? true : undefined}
                    aria-describedby={errors.state ? `${uid}-state-erro` : undefined}
                    className={`field ${errors.state ? "border-error" : "border-ink/25"}`}
                  >
                    <option value="">UF</option>
                    {UFS.map((uf) => (
                      <option key={uf}>{uf}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p id={`${uid}-state-erro`} className="mt-1.5 text-sm text-error">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              <section aria-labelledby="pagamento" className="mt-10 border border-dashed border-ink/30 p-5">
                <h2 id="pagamento" className="text-2xl">
                  Pagamento
                </h2>
                <p className="mt-2 text-[0.95rem] text-stone">
                  Esta é uma loja demonstrativa: não há pagamento e nenhum dado de cartão é solicitado. Em uma loja real, aqui
                  entraria um gateway de pagamento (Pix, cartão ou boleto) com o pagamento processado em ambiente seguro.
                </p>
              </section>

              <button type="submit" className="btn-dark mt-8 w-full sm:w-auto sm:px-10">
                Revisar pedido
              </button>
            </form>
          ) : (
            <div>
              <section aria-labelledby="rev-entrega" className="border-t border-line pt-5">
                <div className="flex justify-between gap-4">
                  <h2 id="rev-entrega" className="text-2xl">
                    Entregar para
                  </h2>
                  <button type="button" className="link min-h-9 text-sm" onClick={() => goTo("entrega")}>
                    Alterar
                  </button>
                </div>
                <p className="mt-3 text-[0.95rem]">
                  {data.name}
                  <br />
                  {data.street}, {data.number}
                  {data.complement && ` (${data.complement})`}
                  <br />
                  {data.city}, {data.state}, CEP {data.cep}
                  <br />
                  {data.email}
                </p>
              </section>
              <p className="mt-8 bg-paper p-5 text-[0.95rem]">
                Ao simular o pedido, nada é cobrado nem enviado: a loja só mostra uma confirmação de demonstração e esvazia
                o carrinho.
              </p>
              <button type="button" className="btn-dark mt-6 w-full sm:w-auto sm:px-10" onClick={finish}>
                Simular pedido
              </button>
            </div>
          )}
        </div>

        <aside className="h-fit bg-paper p-6 lg:col-span-5" aria-labelledby="resumo-checkout">
          <h2 id="resumo-checkout" className="text-3xl">
            Seu pedido
          </h2>
          <OrderSummary lines={lines} subtotal={subtotal} compact />
          <a href={href("/carrinho")} className="link mt-4 inline-block text-sm">
            Editar carrinho
          </a>
        </aside>
      </div>
    </div>
  );
}

function OrderSummary({ lines, subtotal, compact = false }: { lines: CartLine[]; subtotal: number; compact?: boolean }) {
  return (
    <div className={compact ? "mt-5" : "mt-10 bg-paper p-6"}>
      <ul className="divide-y divide-line border-y border-line text-[0.95rem]">
        {lines.map((l) => {
          const p = productById(l.productId)!;
          return (
            <li key={l.productId} className="flex justify-between gap-4 py-3">
              <span>
                {p.name} <span className="text-stone">× {l.quantity}</span>
              </span>
              <Price cents={p.price * l.quantity} />
            </li>
          );
        })}
      </ul>
      <dl className="mt-4 space-y-2 text-[0.95rem]">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>
            <Price cents={subtotal} className="font-semibold" />
          </dd>
        </div>
        <div className="flex justify-between gap-4 text-stone">
          <dt>Frete</dt>
          <dd className="text-right">Não cobrado (demonstração)</dd>
        </div>
      </dl>
    </div>
  );
}
