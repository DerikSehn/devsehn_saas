// pages/404.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
            <div className="relative w-64 h-64">
                <Image
                    src="/404.avif"
                    alt="404 - Página não encontrada"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <h1 className="text-4xl font-bold mt-8">Página não encontrada</h1>
            <p className="mt-4 text-lg text-center">
                Desculpe, a página que você está procurando não existe.
            </p>
            <Link href="/">
                <a className="mt-6 px-4 py-2 bg-primary-200 text-primary-900 rounded-lg">
                    Voltar para a página inicial
                </a>
            </Link>
        </div>
    );
}