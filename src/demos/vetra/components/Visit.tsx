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
  "mt-2 block w-full rounded-sm border-2 bg-paper px-4 py-3 text-iron placeholder:text-steel/70 focus:border-cobalt focus:outline-none";

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
    className: `${field} ${errors[n] ? "border-[#c0352b]" : "border-iron/20"}`,
  });
  const Err = ({ n }: { n: keyof VisitForm }) =>
    errors[n] ? (
      <p id={`${id(n)}-erro`} className="mt-2 text-sm font-semibold text-[#a52a21]">
        {errors[n]}
      </p>
    ) : null;
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id="visita" aria-labelledby="visita-title" className="on-dark bg-iron py-20 text-paper sm:py-28 lg:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="visita-title" className="display text-[clamp(3.75rem,12vw,9rem)]">
            Venha conhecer a Vetra
          </h2>
          <p className="mt-8 max-w-[44ch] text-lg text-paper/80">
            Deixe seus dados e o melhor período. Um professor confirma o horário pelo WhatsApp e mostra a estrutura com
            calma, sem compromisso de matrícula.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-paper/60">Endereço</dt>
              <dd className="mt-1 font-semibold">
                {brand.address}
                <br />
                {brand.city}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-paper/60">Horários</dt>
              <dd className="mt-1 space-y-0.5">
                {brand.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: <strong>{h.time}</strong>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          aria-labelledby={`${uid}-t`}
          className="rounded-sm bg-paper p-6 text-iron sm:p-10 lg:col-span-6"
        >
          <h3 id={`${uid}-t`} className="wide text-2xl font-bold">
            Agendar uma visita
          </h3>
          <p className="mt-1 text-sm text-steel">Todos os campos, exceto observação, são obrigatórios.</p>
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
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-cobalt px-6 text-lg font-semibold text-paper transition-colors hover:bg-cobalt-deep"
          >
            Enviar pedido de visita pelo WhatsApp
          </button>
          <p className="mt-3 text-center text-sm text-steel">Seus dados vão apenas na mensagem do WhatsApp, nada é armazenado neste site.</p>
          {done && (
            <p role="status" className="mt-5 rounded-sm bg-cobalt-soft/60 px-4 py-3 text-sm">
              Mensagem preparada. Confira e envie no WhatsApp para confirmar a visita.
            </p>
          )}
          <p className="mt-6 border-t border-iron/10 pt-5 text-center text-sm">
            Prefere escrever do seu jeito?{" "}
            <WaCta message={messages.visit} className="font-semibold text-cobalt underline underline-offset-4">
              Abrir conversa sem formulário
            </WaCta>
          </p>
        </form>
      </div>
    </section>
  );
}
