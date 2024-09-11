import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

async function sendPasswordResetEmail(email: string) {
    const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) {
        throw new Error('Erro ao enviar email de recuperação.');
    }
    return res.json();
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => sendPasswordResetEmail(email),
        onSuccess: () => {
            setSuccessMessage('Email de recuperação enviado com sucesso. Verifique sua caixa de entrada.');
            setErrorMessage(null);
        },
        onError: () => {
            setSuccessMessage(null);
            setErrorMessage('Erro ao enviar email de recuperação. Por favor, tente novamente.');
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        mutation.mutate();
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Recuperar Senha</h1>
                        <p className="text-balance text-muted-foreground">
                            Insira seu e-mail abaixo para receber instruções de recuperação de senha.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={mutation.isPending}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Enviando...' : 'Enviar'}
                        </Button>
                        {successMessage && (
                            <p className="text-green-500 text-sm text-center">{successMessage}</p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                        )}
                    </form>
                    <Link href="/auth/sign-in" className="text-sm underline text-center">
                        Voltar para Login
                    </Link>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/background/image_1.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
