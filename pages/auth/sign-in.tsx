import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReturnToPage from '@/components/return-to-page';

async function loginUser(email: string, password: string) {
    const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
    });
    return result;
}

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: () => loginUser(email, password),
        onSuccess: (result) => {
            if (result?.error) {
                setError('Email ou senha incorreta. Por favor, tente novamente.');
                return;
            }
            window.location.href = '/admin';
        },
        onError: () => {
            setError('Algo deu errado. Por favor, tente novamente.');
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        mutation.mutate();
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
            <div className=" flex items-center justify-center py-12">
                <div className="relative mx-auto grid w-[350px] gap-6">
                    <ReturnToPage className="absolute -top-2 " />
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Entre com sua conta abaixo para acessar o painel
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
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                                <Link
                                    href="forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={mutation.isPending}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Entrando...' : 'Entrar'}
                        </Button>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/background/image_2.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
