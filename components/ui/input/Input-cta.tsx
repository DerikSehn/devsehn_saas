import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { z } from "zod";
import { Button } from "../button";
import { SendIcon } from "lucide-react";

export default function InputCTA({ description }: { description: string }) {
    const notify = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const schema = z.object({
        email: z.string()
            .email('Email inválido')
            .min(1, 'Por favor, insira seu email'),
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await schema.parseAsync({ email });

            setLoading(true);

            await fetch('/api/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Cultura Verde - A excelência em paisagismo',
                    body: {
                        template: 'MESSAGE_RECEIVED',
                    },
                }),
            }).then((response) => { response.json() });

            notify('Email enviado com sucesso!', { type: 'success' });
            setEmail('');
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            notify('Erro ao enviar email. Tente novamente mais tarde.', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col items-start space-y-3 rounded-md max-w-2xl xl:max-w-3xl">
                <div className="leading-10">
                    <p className="text-sm font-semibold md:text-md lg:text-lg dark:text-gray-800 xl:max-w-2xl ">
                        {description}
                    </p>
                </div>

                <div className="flex w-full relative max-w-xl xl:max-w-2xl">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Insira seu e-mail"
                        className="w-full  rounded-2xl p-4 px-4 border-2 border-gray-100 bg-gray-300 transition-colors focus:bg-gray-100 hover:bg-gray-100 text-gray-900 placeholder:text-gray-900 h-full"
                        required
                    />
                    <Button
                        variant={'swipe'}
                        disabled={loading}
                        className={cn(`p-3 group transition-all hover:pr-10 rounded-2xl px-4 h-full w-32 absolute right-0 z-10 ${loading ? 'bg-gray-600 text-gray-200 border-gray-600 cursor-not-allowed' : 'bg-gray-400 text-gray-800 border-gray-100 hover:bg-gray-300 hover:text-gray-200'}`)}
                        type="submit"
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                        <SendIcon className="absolute opacity-0 transition-all duration-500 rotate-12 group-hover:rotate-0 group-hover:opacity-100 right-2 translate-x-10 group-hover:translate-x-0" />
                    </Button>

                </div>
            </div>
        </form>
    );
}
