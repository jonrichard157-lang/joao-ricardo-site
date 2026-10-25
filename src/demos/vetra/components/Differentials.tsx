import { differentials, messages } from "../data/content";
import { WaCta } from "../whatsapp";
import { Photo } from "./Photo";

/** O card colorido grande da página (no template, o "showreel"). */
export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="py-8 sm:py-12">
      <div className="wrap">
        <div className="on-light grid overflow-hidden rounded-3xl bg-volt text-void lg:grid-cols-12">
          <div className="aspect-[16/10] overflow-hidden sm:aspect-[2/1] lg:col-span-5 lg:aspect-auto">
            <Photo
              name="acompanhamento"
              width={896}
              height={1200}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Professor corrigindo a postura de um aluno durante um exercício de remada na polia"
              className="object-[center_35%]"
            />
          </div>
          <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 id="diferenciais-title" className="giant text-right text-[clamp(2.6rem,9vw,5.5rem)]">
              Acompanhamento
              <br />
              de perto
            </h2>
            <div className="mt-4 flex justify-end">
              <WaCta message={messages.coach} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fog px-4 text-sm font-semibold hover:bg-white">
                <span aria-hidden="true">▸</span> Tirar dúvidas com um professor
              </WaCta>
            </div>
            <dl className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {differentials.map((d) => (
                <div key={d.title} className="border-t border-void/25 pt-4">
                  <dt className="font-semibold">{d.title}</dt>
                  <dd className="mt-1.5 text-sm text-void/75">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
