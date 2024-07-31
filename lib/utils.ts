import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIsMobile(width: number = 768) {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${width}px)`).matches
  );
}

export function generateWhatsAppLink({
  countryCode = "55",
  phoneNumber,
  message,
}: {
  countryCode?: string;
  phoneNumber: string;
  message: string;
}) {
  // Remove caracteres não numéricos do código do país e do número de telefone
  const cleanedCountryCode = countryCode.replace(/\D/g, "");
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Codifica a mensagem para o formato de URL
  const encodedMessage = encodeURIComponent(message);

  // Gera o link do WhatsApp
  const whatsappLink = `https://wa.me/${cleanedCountryCode}${cleanedPhoneNumber}?text=${encodedMessage}`;

  return whatsappLink;
}
