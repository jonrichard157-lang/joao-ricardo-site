import { img } from "../config";

interface Props {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** Foto de produto 4:5 em WebP, com versão de 480px para telas pequenas. */
export function Photo({ name, alt, sizes, className = "", priority = false }: Props) {
  return (
    <img
      src={img(name, 928)}
      srcSet={`${img(name, 480)} 480w, ${img(name, 928)} 928w`}
      sizes={sizes}
      width={928}
      height={1152}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
