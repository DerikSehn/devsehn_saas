// pages/contact.tsx

import Page from "@/components/page"
import { useToast } from "@/components/providers/toast-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from '@tanstack/react-query'
import Image from "next/image"
import { useState } from 'react'

async function sendEmail(email: string, name: string, message: string) {
    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            name,
            message
        })
    })
    return res.json()
}

export default function Contact() {

    const notify = useToast()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const mutation = useMutation({
        mutationFn: () => sendEmail(email, name, message),
        onSuccess: (data) => {
            notify("Email enviado com sucesso:", { type: 'success' })
        },
        onError: (error) => {
            notify("Erro ao enviar email:", { type: 'error' })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate()
    }

    return (<span className="relative w-full h-full bg-primary-200 ">
        <div className="absolute w-full h-full bg-primary-200 z-0">

            <Image
                className="z-0 blur object-cover saturate-50 brightness-[.25] bg-primary-200 "
                src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />

        </div>
        <Page className="w-full max-w-3xl mx-auto py-32 px-4 md:py-2 flex flex-col justify-center items-center relative z-10 text-jet-900 bg-transparent min-h-screen h-auto">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Entre em contato</h1>
                <p className="text-muted-foreground md:text-xl">
                    Tem alguma dúvida ou precisa de ajuda? Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
                </p>
                <div className="inline-flex items-center justify-center gap-2 w-full  bg-gradient-to-r from-transparent via-primary-200 px-4 py-2 text-primary-900">
                    <MailOpenIcon className="h-5 w-5 " />
                    <span className="font-medium ">contato@culturaverde.com</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6 w-[50dvw] min-w-[380px] max-w-[800px]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input className="border-secondary-100 bg-primary-100/80" id="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input className="border-secondary-100 bg-primary-100/80" id="email" type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Nos diga como podemos ajudar . . . " className="border-secondary-100 bg-primary-100/80 min-h-[150px] " value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="flex flex-col items-center justify-center">

                    <Button variant={'swipe'} type="submit" className="w-full max-w-sm" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Enviando...' : 'Enviar'}
                    </Button>
                </div>
            </form>
        </Page>
    </span>
    )
}

function MailOpenIcon(props: { className?: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
            <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
        </svg>
    )
}
