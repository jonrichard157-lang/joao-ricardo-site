import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { config, hasFormEndpoint } from "../config";
import { projectTypes } from "../data/services";
import { mailtoUrl, whatsappUrl } from "../lib/contact";
import { emptyQuote, quoteToText, validateQuote, type QuoteErrors, type QuoteForm as Quote } from "../lib/validation";
import { WhatsAppIcon } from "./icons";
import { buttonClass } from "./Button";

const budgets = [
  "Até R$ 1.500",
  "R$ 1.500 a R$ 3.000",
  "R$ 3.000 a R$ 6.000",
  "R$ 6.000 a R$ 12.000",
  "Acima de R$ 12.000",
  "Ainda não sei",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string }
  /** Sem backend: os dados NÃO foram enviados. */
  | { kind: "not-sent" };

const fieldBase =
  "mt-2 block w-full rounded-lg border-2 bg-paper px-4 py-3 font-serif text-[1.05rem] text-ink placeholder:text-muted/70 focus:border-forest focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-amber/40";

export function QuoteForm() {
  const [form, setForm] = useState<Quote>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    const onType = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, projectType: type }));
      setErrors((er) => ({ ...er, projectType: undefined }));
    };
    window.addEventListener("veyza:project-type", onType);
    return () => window.removeEventListener("veyza:project-type", onType);
  }, []);

  useEffect(() => {
    if (status.kind !== "idle" && status.kind !== "sending") statusRef.current?.focus();
  }, [status.kind]);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Quote;
    setForm((f) => ({ ...f, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status.kind === "error" || status.kind === "not-sent") setStatus({ kind: "idle" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateQuote(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!hasFormEndpoint) {
      setStatus({ kind: "not-sent" });
      return;
    }

    // Campo armadilha contra spam: usuários reais não o veem.
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
    if (honeypot) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Novo pedido de orçamento: ${form.projectType}` }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ kind: "sent" });
      setForm(emptyQuote);
    } catch {
      setStatus({
        kind: "error",
        message: "Não foi possível enviar o pedido agora. Seus dados continuam no formulário: tente de novo ou use o WhatsApp.",
      });
    }
  };

  const text = quoteToText(form);
  const wa = whatsappUrl(text);
  const mail = mailtoUrl(`Pedido de orçamento: ${form.projectType || "projeto"}`, text);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[1.25rem] bg-paper p-8 text-ink sm:p-12">
        <h3 className="text-3xl font-bold tracking-[-0.02em]">Pedido enviado</h3>
        <p className="mt-4 max-w-[52ch] leading-relaxed">
          Recebi suas informações. Vou responder pelo contato que você informou com os próximos passos.
        </p>
        <button type="button" className={`${buttonClass("outline")} mt-8`} onClick={() => setStatus({ kind: "idle" })}>
          Enviar outro pedido
        </button>
      </div>
    );
  }

  const ids = (name: keyof Quote) => ({ id: `${uid}-${name}`, err: `${uid}-${name}-erro` });
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-titulo`}
      className="rounded-[1.25rem] bg-paper p-6 text-ink sm:p-10"
    >
      <h3 id={`${uid}-titulo`} className="text-2xl font-bold tracking-[-0.02em]">
        Solicitar orçamento
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">Campos marcados com * são obrigatórios.</p>

      <div aria-live="polite" className="sr-only">
        {errorCount > 0 ? `O formulário tem ${errorCount} ${errorCount === 1 ? "campo" : "campos"} para corrigir.` : ""}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Nome *" {...ids("name")} error={errors.name}>
          <input type="text" name="name" autoComplete="name" value={form.name} onChange={update} {...a11y(ids("name"), errors.name)} className={fieldClass(errors.name)} />
        </Field>
        <Field label="E-mail ou WhatsApp *" {...ids("contact")} error={errors.contact}>
          <input type="text" name="contact" inputMode="email" autoComplete="email" placeholder="E-mail ou (DDD) número" value={form.contact} onChange={update} {...a11y(ids("contact"), errors.contact)} className={fieldClass(errors.contact)} />
        </Field>
        <Field label="Tipo de projeto *" {...ids("projectType")} error={errors.projectType}>
          <select name="projectType" value={form.projectType} onChange={update} {...a11y(ids("projectType"), errors.projectType)} className={fieldClass(errors.projectType)}>
            <option value="">Selecione</option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Faixa de investimento (opcional)" {...ids("budget")}>
          <select name="budget" value={form.budget} onChange={update} id={ids("budget").id} className={fieldClass()}>
            <option value="">Prefiro não informar</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Objetivo principal *" {...ids("goal")} error={errors.goal} className="sm:col-span-2">
          <input type="text" name="goal" placeholder="Ex.: receber pedidos de orçamento pelo celular" value={form.goal} onChange={update} {...a11y(ids("goal"), errors.goal)} className={fieldClass(errors.goal)} />
        </Field>
        <Field label="Descreva a necessidade *" {...ids("description")} error={errors.description} className="sm:col-span-2">
          <textarea name="description" rows={5} placeholder="Conte sobre o seu negócio, o que você imagina e se já tem domínio, textos ou imagens." value={form.description} onChange={update} {...a11y(ids("description"), errors.description)} className={`${fieldClass(errors.description)} resize-y`} />
        </Field>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Não preencha este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!hasFormEndpoint && status.kind === "idle" && (
        <p className="mt-6 rounded-lg bg-sand/70 px-4 py-3 text-[0.98rem] leading-relaxed">
          O envio direto pelo formulário ainda está sendo configurado. Ao continuar,{" "}
          {wa || mail
            ? `você envia o pedido ${wa && mail ? "pelo WhatsApp ou e-mail" : wa ? "pelo WhatsApp" : "por e-mail"}, com o texto já preenchido.`
            : "você pode copiar o texto do pedido para enviar pelo canal que preferir."}
        </p>
      )}

      {status.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border-2 border-rust bg-rust/10 px-4 py-3 leading-relaxed text-[#6e2c12]">
          {status.message}
        </div>
      )}

      {status.kind === "not-sent" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border-2 border-amber bg-amber/15 px-5 py-4">
          <p className="font-display font-semibold">Seu pedido ainda não foi enviado.</p>
          <p className="mt-1 leading-relaxed">
            O formulário deste site ainda não está conectado a um serviço de envio. Escolha uma das opções abaixo para mandar o pedido.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                <WhatsAppIcon /> Enviar pelo WhatsApp
              </a>
            )}
            {mail && (
              <a href={mail} className={buttonClass("outline")}>
                Enviar por e-mail
              </a>
            )}
            <button type="button" onClick={copyText} className={buttonClass(wa || mail ? "outline" : "primary")}>
              {copied ? "Texto copiado" : "Copiar texto do pedido"}
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? "Texto do pedido copiado para a área de transferência." : ""}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className={`${buttonClass("primary")} disabled:cursor-wait disabled:opacity-70`}>
          {status.kind === "sending" ? "Enviando pedido…" : hasFormEndpoint ? "Enviar pedido" : "Continuar"}
        </button>
        <p className="text-sm text-muted">Seus dados são usados apenas para responder a este pedido.</p>
      </div>
    </form>
  );
}

function fieldClass(error?: string) {
  return `${fieldBase} ${error ? "border-rust" : "border-ink/20"}`;
}

function a11y({ id, err }: { id: string; err: string }, error?: string) {
  return { id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? err : undefined, "aria-required": true };
}

function Field({ label, id, err, error, className = "", children }: { label: string; id: string; err: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-display text-[0.98rem] font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={err} className="mt-2 text-[0.95rem] font-medium text-[#8a3517]">
          {error}
        </p>
      )}
    </div>
  );
}
