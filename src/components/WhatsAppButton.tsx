import { whatsappUrl } from "../lib/contact";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./icons";

interface Props {
  message?: string;
  variant?: "primary" | "accent" | "outline" | "outline-light";
  className?: string;
}

/**
 * Botão de WhatsApp. Se o número não estiver configurado, vira um link
 * para o formulário, com texto coerente: nunca um link quebrado.
 */
export function WhatsAppButton({ message, variant = "accent", className }: Props) {
  const href = whatsappUrl(message);
  if (!href) {
    return (
      <ButtonLink href="#contato" variant={variant} className={className}>
        Enviar pedido pelo formulário
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={href} variant={variant} className={className}>
      <WhatsAppIcon />
      Conversar pelo WhatsApp
    </ButtonLink>
  );
}
