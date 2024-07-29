import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query;

    if (!token) {
        return {
            redirect: {
                destination: '/auth/sign-in',
                permanent: false,
            },
        };
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token: token as string },
    });

    if (!resetToken || resetToken.expires < new Date()) {
        return {
            redirect: {
                destination: '/auth/sign-in',
                permanent: false,
            },
        };
    }

    const user = await prisma.user.findUnique({
        where: { email: resetToken.email },
    });

    if (!user) {
        return {
            redirect: {
                destination: '/auth/sign-in',
                permanent: false,
            },
        };
    }

    return {
        props: {
            token,
            email: resetToken.email,
        },
    };
};

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

async function resetPassword(token: string, password: string, confirmPassword: string) {
    const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password, confirmPassword }),
    });
    if (!res.ok) {
        throw new Error('Erro ao redefinir a senha.');
    }
    return res.json();
}

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: () => resetPassword(token, password, confirmPassword),
        onSuccess: () => {
            setSuccessMessage('Senha redefinida com sucesso. Você pode fazer login com sua nova senha.');
            setErrorMessage(null);
            router.push('/auth/sign-in');
        },
        onError: (error: any) => {
            setSuccessMessage(null);
            setErrorMessage(error.message || 'Erro ao redefinir a senha. Por favor, tente novamente.');
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
                        <h1 className="text-3xl font-bold">Redefinir Senha</h1>
                        <p className="text-balance text-muted-foreground">
                            Insira sua nova senha abaixo.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Nova Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Nova senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={mutation.isPending}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme a nova senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={mutation.isPending}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Redefinindo...' : 'Redefinir Senha'}
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

