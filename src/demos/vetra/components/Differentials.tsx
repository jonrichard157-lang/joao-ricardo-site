import { differentials, messages } from "../data/content";
import { WaCta } from "../whatsapp";
import { Photo } from "./Photo";

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="on-dark grid bg-cobalt text-paper lg:grid-cols-12">
      <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto">
        <Photo
          name="acompanhamento"
          width={896}
          height={1200}
          sizes="(min-width: 1024px) 42vw, 100vw"
          alt="Professor corrigindo a postura de um aluno durante um exercício de remada na polia"
          className="object-[center_35%]"
        />
      </div>
      <div className="px-4 py-16 sm:px-10 sm:py-20 lg:col-span-7 lg:px-16 lg:py-28 xl:px-24">
        <h2 id="diferenciais-title" className="display max-w-[12ch] text-[clamp(2.4rem,12vw,6rem)] lg:text-[clamp(3rem,6vw,5.75rem)]">
          Acompanhamento do primeiro ao último treino
        </h2>
        <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {differentials.map((d) => (
            <div key={d.title} className="border-l-2 border-paper/50 pl-5">
              <dt className="wide text-lg font-bold">{d.title}</dt>
              <dd className="mt-2 text-paper/85">{d.text}</dd>
            </div>
          ))}
        </dl>
        <WaCta
          message={messages.coach}
          className="mt-12 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-paper px-7 font-semibold transition-colors hover:bg-paper hover:text-cobalt-deep"
        >
          Tirar dúvidas com um professor
        </WaCta>
      </div>
    </section>
  );
}
