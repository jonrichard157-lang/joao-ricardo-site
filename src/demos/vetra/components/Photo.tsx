import { img } from "../config";

interface Props {
  name: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** Foto responsiva em WebP com versão de 640px para telas pequenas. */
export function Photo({ name, width, height, alt, sizes, className = "", priority = false }: Props) {
  return (
    <img
      src={img(name, width)}
      srcSet={`${img(name, 640)} 640w, ${img(name, width)} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
