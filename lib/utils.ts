import { handleApiRequest } from "@/services/crud-service";
import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useIsMobile(width: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= width);
    };

    // Adiciona o event listener
    window.addEventListener("resize", handleResize);

    // Chama o handler imediatamente para definir o estado inicial
    handleResize();

    // Remove o event listener no cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return isMobile;
}
export const useIsSmall = () => useIsMobile(480);
export const useIsMedium = () => useIsMobile(768);

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

export async function fetchWhatsappLink(message: string) {
  try {
    const { result } = await handleApiRequest(
      { where: { title: "WHATSAPP_NUMBER" } },
      "setting",
      "findFirst"
    );

    return generateWhatsAppLink({
      phoneNumber: result.value,
      message: message,
    });
  } catch (error) {
    throw new Error("Erro ao buscar o número de telefone do WhatsApp");
  }
}
