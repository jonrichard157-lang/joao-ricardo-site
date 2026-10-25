import type { ImageAsset, PreviewVariant } from "../types";

/**
 * Mostra a captura real quando existe; caso contrário desenha uma
 * representação ilustrativa da interface (decorativa, aria-hidden).
 */
export function ProjectPreview({ variant, image, eager = false }: { variant: PreviewVariant; image?: ImageAsset; eager?: boolean }) {
  if (image) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${image.src.replace(/^\//, "")}`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    );
  }
  const Art = art[variant];
  return (
    <div aria-hidden="true" className="h-full w-full select-none">
      <Art />
    </div>
  );
}

const Bar = ({ className }: { className: string }) => <div className={`rounded-full ${className}`} />;

const art: Record<PreviewVariant, () => React.JSX.Element> = {
  eletrica: () => (
    <div className="flex h-full flex-col bg-[#1f211d] p-[5%] text-[#f4e9cf]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[4%]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="#f2b632">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
          </svg>
          <Bar className="h-1.5 w-12 bg-[#f4e9cf]/80" />
        </div>
        <div className="flex gap-2">
          <Bar className="h-1 w-6 bg-[#f4e9cf]/40" />
          <Bar className="h-1 w-6 bg-[#f4e9cf]/40" />
          <Bar className="h-1 w-6 bg-[#f4e9cf]/40" />
        </div>
      </div>
      <div className="mt-[8%] grid flex-1 grid-cols-5 gap-[5%]">
        <div className="col-span-3 flex flex-col gap-[7%]">
          <Bar className="h-[9%] w-[90%] bg-[#f4e9cf]" />
          <Bar className="h-[9%] w-[70%] bg-[#f4e9cf]" />
          <Bar className="mt-[3%] h-[4%] w-[80%] bg-[#f4e9cf]/40" />
          <Bar className="h-[4%] w-[60%] bg-[#f4e9cf]/40" />
          <div className="mt-[4%] h-[13%] w-[45%] rounded-full bg-[#f2b632]" />
        </div>
        <div className="col-span-2 rounded-md bg-[radial-gradient(circle_at_30%_30%,#4a4636,#2a2a24)]" />
      </div>
      <div className="mt-[5%] grid grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-8 rounded border border-[#f4e9cf]/15 bg-[#f4e9cf]/5 sm:h-10" />
        ))}
      </div>
    </div>
  ),
  clinica: () => (
    <div className="flex h-full flex-col bg-[#fbf7f1] p-[5%]">
      <div className="flex items-center justify-between">
        <Bar className="h-1.5 w-16 bg-[#6d7f6b]" />
        <div className="h-4 w-14 rounded-full bg-[#6d7f6b]" />
      </div>
      <div className="mt-[7%] grid flex-1 grid-cols-2 gap-[6%]">
        <div className="flex flex-col justify-center gap-[7%]">
          <Bar className="h-[4%] w-[40%] bg-[#c58f6e]" />
          <Bar className="h-[9%] w-full bg-[#3a3a36]" />
          <Bar className="h-[9%] w-[75%] bg-[#3a3a36]" />
          <Bar className="h-[4%] w-[85%] bg-[#3a3a36]/30" />
          <Bar className="h-[4%] w-[65%] bg-[#3a3a36]/30" />
          <div className="mt-[3%] flex gap-2">
            <div className="h-5 w-16 rounded-full bg-[#6d7f6b]" />
            <div className="h-5 w-14 rounded-full border border-[#6d7f6b]" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-[4%] rounded-t-full bg-[linear-gradient(160deg,#e7d6c4,#cdb49c)]" />
          <div className="absolute bottom-[8%] left-0 h-8 w-20 rounded-lg bg-white shadow-md" />
        </div>
      </div>
    </div>
  ),
  leads: () => (
    <div className="flex h-full bg-[#f3f1ea]">
      <div className="flex w-[22%] flex-col gap-[6%] bg-[#1d2a26] p-[4%]">
        <Bar className="h-1.5 w-[70%] bg-[#b6c6a5]" />
        <div className="mt-[20%] flex flex-col gap-3">
          {[80, 60, 70, 50].map((w, i) => (
            <div key={i} className={`h-1 rounded-full ${i === 0 ? "bg-white/80" : "bg-white/30"}`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[4%] p-[4%]">
        <div className="flex items-center justify-between">
          <Bar className="h-2 w-[30%] bg-[#222]" />
          <div className="h-4 w-[22%] rounded border border-[#222]/20 bg-white" />
        </div>
        <div className="grid grid-cols-3 gap-[3%]">
          {["#e2a23b", "#b6c6a5", "#9c4221"].map((c) => (
            <div key={c} className="rounded-md bg-white p-[8%] shadow-sm">
              <Bar className="h-1 w-[50%] bg-[#222]/30" />
              <div className="mt-2 h-2 w-[40%] rounded-full" style={{ background: c }} />
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden rounded-md bg-white shadow-sm">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-[4%] border-b border-[#222]/5 px-[4%] py-[2.2%]">
              <div className="h-2 w-2 rounded-full bg-[#b6c6a5]" />
              <Bar className="h-1 w-[28%] bg-[#222]/50" />
              <Bar className="h-1 w-[20%] bg-[#222]/20" />
              <div className="ml-auto h-2.5 w-[14%] rounded-full bg-[#e2a23b]/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  academia: () => (
    <div className="relative flex h-full flex-col bg-[#141414] p-[5%] text-white">
      <div className="flex items-center justify-between">
        <Bar className="h-2 w-14 bg-[#e8562a]" />
        <div className="flex gap-2">
          <Bar className="h-1 w-5 bg-white/40" />
          <Bar className="h-1 w-5 bg-white/40" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(200deg,#3a3532,#1c1a19)]" />
      <div className="relative mt-[10%] flex w-[60%] flex-col gap-[8%]">
        <div className="h-4 w-full bg-white sm:h-5" />
        <div className="h-4 w-[80%] bg-[#e8562a] sm:h-5" />
        <Bar className="mt-[4%] h-1 w-[70%] bg-white/40" />
        <div className="mt-[6%] h-5 w-[50%] bg-[#e8562a]" />
      </div>
    </div>
  ),
  barbearia: () => (
    <div className="flex h-full flex-col bg-[#2a1f18] p-[5%] text-[#ead9bf]">
      <div className="flex items-center justify-between">
        <Bar className="h-1.5 w-14 bg-[#ead9bf]" />
        <div className="h-4 w-14 rounded-sm bg-[#c98a3f]" />
      </div>
      <div className="mt-[6%] grid flex-1 grid-cols-2 gap-[5%]">
        <div className="flex flex-col gap-[8%] pt-[4%]">
          <Bar className="h-[9%] w-full bg-[#ead9bf]" />
          <Bar className="h-[9%] w-[65%] bg-[#ead9bf]" />
          <Bar className="h-[4%] w-[80%] bg-[#ead9bf]/35" />
        </div>
        <div className="grid grid-cols-4 content-start gap-[6%] rounded-md bg-[#ead9bf]/8 p-[6%]">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`aspect-square rounded-sm ${i === 6 ? "bg-[#c98a3f]" : "bg-[#ead9bf]/15"}`} />
          ))}
        </div>
      </div>
    </div>
  ),
  catalogo: () => (
    <div className="flex h-full flex-col gap-[4%] bg-[#faf6ec] p-[5%]">
      <div className="flex items-center justify-between">
        <Bar className="h-1.5 w-14 bg-[#222]" />
        <div className="h-4 w-[35%] rounded-full border border-[#222]/15 bg-white" />
      </div>
      <div className="flex gap-2">
        {["bg-[#222]", "bg-[#222]/10", "bg-[#222]/10", "bg-[#222]/10"].map((c, i) => (
          <div key={i} className={`h-3 w-10 rounded-full ${c}`} />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-4 gap-[3%]">
        {["#e9c9a2", "#cfd9c2", "#e7b48a", "#d9cdb5", "#c9d4bd", "#efd6b0", "#dcc0a0", "#d4dcc8"].map((c, i) => (
          <div key={i} className="flex flex-col gap-1 rounded bg-white p-[6%]">
            <div className="flex-1 rounded-sm" style={{ background: c }} />
            <Bar className="h-1 w-[70%] bg-[#222]/40" />
            <Bar className="h-1 w-[40%] bg-[#9c4221]/60" />
          </div>
        ))}
      </div>
    </div>
  ),
};
