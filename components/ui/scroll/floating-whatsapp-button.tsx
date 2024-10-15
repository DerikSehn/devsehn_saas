import WhatsappButton from "@/components/button/whatsapp-button";
import { generateWhatsAppLink } from "@/lib/utils";

export default function FloatingWhatsappButton() {
    const phoneNumber = "(51) 99626-1079";
    const message = "Olá, tudo bem? Gostaria de saber mais sobre os serviços da cultura verde. Poderia me fornecer mais informações?";
    const whatsAppLink = generateWhatsAppLink({ phoneNumber, message });

    return (
        <WhatsappButton className="fixed bottom-4 right-4 z-50" link={whatsAppLink} />
    )
}