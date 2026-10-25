import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { brand, goals, messages, periods } from "../data/content";
import { useWhatsApp, WaCta } from "../whatsapp";

interface VisitForm {
  name: string;
  phone: string;
  goal: string;
  period: string;
  note: string;
}
type Errors = Partial<Record<keyof VisitForm, string>>;

const empty: VisitForm = { name: "", phone: "", goal: "", period: "", note: "" };

export function validateVisit(f: VisitForm): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Informe seu nome.";
  const digits = f.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Informe seu WhatsApp com DDD.";
  else if (digits.length < 10 || digits.length > 13 || !/^[\d\s()+-]+$/.test(f.phone)) e.phone = "Use o formato (11) 91234-5678.";
  if (!f.goal) e.goal = "Escolha seu objetivo.";
  if (!f.period) e.period = "Escolha o melhor período para a visita.";
  return e;
}

function visitMessage(f: VisitForm) {
  return [
    "Olá! Quero agendar uma visita à Vetra Academia.",
    `Nome: ${f.name.trim()}`,
    `WhatsApp: ${f.phone.trim()}`,
    `Objetivo: ${f.goal}`,
    `Melhor período: ${f.period}`,
    f.note.trim() ? `Observação: ${f.note.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const field =
  "mt-2 block w-full rounded-xl border bg-smoke px-4 py-3 text-fog placeholder:text-ash/70 focus:border-signal focus:outline-none";

export function Visit() {
  const [form, setForm] = useState<VisitForm>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const openWhatsApp = useWhatsApp();
  const uid = useId();

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof VisitForm;
    setForm((f) => ({ ...f, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    setDone(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateVisit(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    openWhatsApp(visitMessage(form));
    setDone(true);
  };

  const id = (n: keyof VisitForm) => `${uid}-${n}`;
  const a11y = (n: keyof VisitForm) => ({
    id: id(n),
    name: n,
    "aria-invalid": errors[n] ? true : undefined,
    "aria-describedby": errors[n] ? `${id(n)}-erro` : undefined,
    className: `${field} ${errors[n] ? "border-[#ff6b5e]" : "border-line"}`,
  });
  const Err = ({ n }: { n: keyof VisitForm }) =>
    errors[n] ? (
      <p id={`${id(n)}-erro`} className="mt-2 text-sm font-semibold text-[#ff8a80]">
        {errors[n]}
      </p>
    ) : null;
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id="visita" aria-labelledby="visita-title" className="relative overflow-hidden py-10 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] overflow-hidden select-none sm:h-[40rem]">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="giant text-[2.6rem] whitespace-nowrap text-smoke sm:text-6xl" style={{ marginLeft: `${(i % 3) * -7}rem` }}>
            {"Agende sua visita ".repeat(8)}
          </p>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-ink)_30%,transparent_80%)]" />
      </div>

      <div className="wrap relative">
        <div className="flex min-h-[20rem] flex-col items-center justify-center text-center sm:min-h-[32rem]">
          <h2 id="visita-title" className="giant text-[clamp(3.6rem,17vw,10rem)]">
            Agende sua visita!
          </h2>
          <p className="mt-6 max-w-[46ch] text-ash">
            Deixe seus dados e o melhor período. Um professor confirma o horário pelo WhatsApp e mostra a estrutura com calma, sem compromisso de matrícula.
          </p>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <dl className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <div>
              <dt className="text-sm text-ash">Endereço</dt>
              <dd className="mt-1 font-semibold">
                {brand.address}
                <br />
                {brand.city}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ash">Horários</dt>
              <dd className="mt-1 space-y-1 text-sm">
                {brand.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: <strong className="font-semibold">{h.time}</strong>
                  </span>
                ))}
              </dd>
            </div>
          </dl>

        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          aria-labelledby={`${uid}-t`}
          className="rounded-3xl bg-void p-6 sm:p-10 lg:col-span-8"
        >
          <h3 id={`${uid}-t`} className="text-xl font-semibold">
            Agendar uma visita
          </h3>
          <p className="mt-1 text-sm text-ash">Todos os campos, exceto observação, são obrigatórios.</p>
          <p className="sr-only" aria-live="polite">
            {errorCount ? `Há ${errorCount} ${errorCount === 1 ? "campo" : "campos"} para corrigir.` : ""}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className="text-sm font-semibold">
                Nome
              </label>
              <input type="text" autoComplete="name" value={form.name} onChange={update} {...a11y("name")} />
              <Err n="name" />
            </div>
            <div>
              <label htmlFor={id("phone")} className="text-sm font-semibold">
                WhatsApp
              </label>
              <input type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 91234-5678" value={form.phone} onChange={update} {...a11y("phone")} />
              <Err n="phone" />
            </div>
            <div>
              <label htmlFor={id("goal")} className="text-sm font-semibold">
                Objetivo
              </label>
              <select value={form.goal} onChange={update} {...a11y("goal")}>
                <option value="">Selecione</option>
                {goals.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              <Err n="goal" />
            </div>
            <div>
              <label htmlFor={id("period")} className="text-sm font-semibold">
                Melhor período
              </label>
              <select value={form.period} onChange={update} {...a11y("period")}>
                <option value="">Selecione</option>
                {periods.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <Err n="period" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={id("note")} className="text-sm font-semibold">
                Observação (opcional)
              </label>
              <textarea rows={3} placeholder="Alguma lesão, dúvida ou horário específico?" value={form.note} onChange={update} {...a11y("note")} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-signal px-6 font-semibold text-fog transition-colors hover:bg-fog hover:text-void"
          >
            Enviar pedido de visita pelo WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-ash">Seus dados vão apenas na mensagem do WhatsApp, nada é armazenado neste site.</p>
          {done && (
            <p role="status" className="mt-5 rounded-xl border border-signal-soft/60 px-4 py-3 text-sm">
              Mensagem preparada. Confira e envie no WhatsApp para confirmar a visita.
            </p>
          )}
          <p className="mt-6 border-t border-line pt-5 text-center text-sm">
            Prefere escrever do seu jeito?{" "}
            <WaCta message={messages.visit} className="font-semibold text-signal-soft underline underline-offset-4">
              Abrir conversa sem formulário
            </WaCta>
          </p>
        </form>
        </div>
      </div>
    </section>
  );
}
