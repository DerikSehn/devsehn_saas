import { handleApiRequest } from "@/pages/api/protected/crud";
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
  console.log(whatsappLink);
  return whatsappLink;
}

export async function fetchWhatsappLink(message: string) {
  try {
    const { result } = await handleApiRequest(
      { where: { title: "WHATSAPP_NUMBER" } },
      "setting",
      "findFirst"
    );

    console.log(result);

    return generateWhatsAppLink({
      phoneNumber: result.value,
      message: message,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar o número de telefone do WhatsApp");
  }
}
