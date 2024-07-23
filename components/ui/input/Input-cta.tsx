<<<<<<< HEAD
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from 'react';
import { z } from "zod";
import { Button } from "../button";

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

            const response = await fetch('/api/email/send', {
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
            });

            if (response.ok) {
                notify('Email enviado com sucesso!', { type: 'success' });
                setEmail('');
            } else {
                notify('Erro ao enviar email. Tente novamente mais tarde.', { type: 'error' });
            }
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
                    <p className="text-sm font-semibold md:text-xl dark:text-gray-200 xl:max-w-2xl px-4">
                        {description}
                    </p>
                </div>

                <div className="flex w-full relative max-w-xl xl:max-w-2xl">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Insira seu e-mail"
                        className="w-full  rounded-full p-4 px-4 border-2 border-neutral-100 bg-neutral-200 transition-colors focus:bg-neutral-100 hover:bg-neutral-100 text-neutral-600 h-full"
                        required
                    />
                    <Button
                        variant={'swipe'}
                        disabled={loading}
                        className={cn(`p-3 px-4 h-full w-32 absolute right-0 z-10 ${loading ? 'bg-secondary-600 text-neutral-400 border-secondary-600 cursor-not-allowed' : 'bg-secondary-400 text-neutral-600 border-neutral-100 hover:bg-secondary-300 hover:text-neutral-700'}`)}
                        type="submit"
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </Button>
                </div>
            </div>
        </form>
    );
=======
import { EmailTemplateProps } from "@/pages/api/email/EmailTemplate";
import { useToast } from "@/components/providers/toast-provider";
import { handleApiRequest } from "@/pages/api/crud";
import { EmailContent, EmailLink, EmailTemplate } from "@prisma/client";
import { z } from "zod";
import AutoForm from "../auto-form";
import { AutoFormInputComponentProps } from "../auto-form/types";
import { Button } from "../button";
import { FormControl, FormItem, FormLabel } from "../form";




export default function InputCTA() {
    const notify = useToast()

    const schema = z.object({
        email: z.string()
            .describe('Insira seu e-mail e iremos entrar em contato com você')
            .email('Email inválido'),
    });


    const onSubmit = async (data: any) => {

        const email = data.email;
        if (!email) {
            alert('Por favor, insira seu email.');
            return;
        }
        const emailInfo: { result: EmailTemplate & { links: EmailLink[], content: EmailContent[] } } = await handleApiRequest({
            where: {
                keyword: 'MESSAGE_RECEIVED',
            },
            include: { links: true, content: true }
        }, 'emailTemplate', 'findFirst');

        console.log(emailInfo)


        const response = await fetch('/api/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Cultura Verde - A excelência em paisagismo',
                body: emailInfo.result,
            }),
        });

        if (response.ok) {
            notify('Email enviado com sucesso!', { type: 'success' });
        } else {
            notify('Erro ao enviar email. Tente novamente mais tarde.', { type: 'error' });
        }
    };



    return (<AutoForm
        formSchema={schema}
        onSubmit={onSubmit}
        className="relative    "

        fieldConfig={{
            email: {
                fieldType: ({
                    field,
                    fieldProps,
                }: AutoFormInputComponentProps) => (
                    <FormItem className="flex flex-col items-start space-y-3 my-6 rounded-md max-w-3xl">

                        <div className="leading-10 ">
                            <FormLabel className="text-sm font-semibold  md:text-xl dark:text-gray-200 xl:max-w-lg">
                                Insira seu e-mail e iremos entrar em contato com você em menos de 24 horas
                            </FormLabel>
                        </div>
                        <div className="flex  w-full relative">
                            <FormControl>
                                <input
                                    onChange={field.onChange}
                                    value={field.value}
                                    placeholder="Insira seu e-mail"
                                    className="w-full  rounded-full p-4 px-4 border-2 border-neutral-600 bg-neutral-200 transition-colors focus:bg-neutral-100 hover:bg-neutral-100 text-neutral-600 h-full"
                                    {...fieldProps}
                                />
                            </FormControl>
                            <Button
                                variant={'swipe'}
                                className="p-3 px-4 h-full w-32 absolute right-0 z-10 bg-secondary-500 text-neutral-600  border-neutral-600"
                                type="submit">
                                Enviar
                            </Button>
                        </div>


                    </FormItem>
                )
            }
        }}
    />

    )
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
}
