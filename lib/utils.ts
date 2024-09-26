import { handleApiCrudRequest } from '@/services/crud-service';
import { clsx, type ClassValue } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  function mq(query: any) {
    return typeof window !== 'undefined' && window.matchMedia(query).matches;
  }

  if (
    'ontouchstart' in window || // @ts-ignore
    (window?.DocumentTouch && document instanceof DocumentTouch)
  )
    return true;
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
    '',
  ); // include the 'heartz' - https://git.io/vznFH
  return mq(query);
}

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const {
      isAndroid,
      isIPad13,
      isIPhone13,
      isWinPhone,
      isMobileSafari,
      isTablet,
    } = require('react-device-detect');
    setIsTouch(
      isTouch ||
        isAndroid ||
        isIPad13 ||
        isIPhone13 ||
        isWinPhone ||
        isMobileSafari ||
        isTablet ||
        isTouchDevice(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isTouch;
}

export function generateWhatsAppLink({
  countryCode = '55',
  phoneNumber,
  message,
}: {
  countryCode?: string;
  phoneNumber: string;
  message: string;
}) {
  // Remove caracteres não numéricos do código do país e do número de telefone
  const cleanedCountryCode = countryCode?.replace(/\D/g, '');
  const cleanedPhoneNumber = phoneNumber?.replace(/\D/g, '');

  // Codifica a mensagem para o formato de URL
  const encodedMessage = encodeURIComponent(message);

  // Gera o link do WhatsApp
  const whatsappLink = `https://wa.me/${cleanedCountryCode}${cleanedPhoneNumber}?text=${encodedMessage}`;
  return whatsappLink;
}

export async function fetchWhatsappLink(message: string) {
  try {
    const { result } = await handleApiCrudRequest(
      { where: { title: 'WHATSAPP_NUMBER' } },
      'setting',
      'findFirst',
    );

    return generateWhatsAppLink({
      phoneNumber: result.value,
      message: message,
    });
  } catch (error) {
    throw new Error('Erro ao buscar o número de telefone do WhatsApp');
  }
}
