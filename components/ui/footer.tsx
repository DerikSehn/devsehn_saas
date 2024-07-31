import { generateWhatsAppLink } from "@/lib/utils";
import Logo from "@/public/logo.svg";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
    {
        title: "Sobre Nós",
        items: [
            /*  {
                 name: "Galeria",
                 href: '#Projects',
             }, */
            {
                name: "Informações",
                href: '/section/a-empresa',
            },
            {
                name: "Contato",
                href: '/contact',
            },
        ],
    },
    {
        title: "Empresa",
        items: [
            {
                name: "Início",
                href: '/#hero',
            },
            {
                name: "Produtos",
                href: '/products',
            },
            {
                name: "Entrar no Sistema",
                href: '/admin',
            },
        ],
    },
];


const phoneNumber = "(51) 99626-1079";
const message = "Olá, gostaria de saber mais sobre os serviços de paisagismo e fitoterapia. Estou interessado em transformar meu espaço em um local de tranquilidade e bem-estar. Vocês podem me fornecer mais informações?";

const whatsAppLink = generateWhatsAppLink({ phoneNumber, message });
const currentYear = new Date().getFullYear();

export function Footer() {

    return (
        <footer className="relative w-full py-20 min-h-[600px] h-[50dvh] bg-primary-200">
            <div className="mx-auto w-full max-w-screen-2xl px-8 text-neutral-400">
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-4">
                    <div className="not-prose flex flex-col gap-6">
                        <Link href="/">
                            <h3 className="sr-only">Cultura Verde</h3>
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={120}
                                height={27.27}
                                className="transition-all hover:opacity-75 dark:invert"
                            />
                        </Link>
                        <p>

                            Cultura Verde é uma empresa dedicada à produção de paisagismo na sua mais alta qualidade.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <small className="mb-3 font-medium opacity-40 text-md">{title}</small>
                                {items.map(({ href, name }) => (
                                    <li key={href}>
                                        <Link href={href} className="py-1.5 font-normal transition-colors hover:text-neutral-200">
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5>Legal</h5>
                        <Link href="/about/privacy-policy">Política de Privacidade</Link>
                        {/* <Link href="/about/terms-of-service">Termos de Serviço</Link> */}
                        {/* <Link href="/about/cookie-policy">Política de Cookies</Link> */}
                    </div>
                </div>
                <div className="mt-12 flex w-full flex-col items-center justify-between border-t border-neutral-50 py-4 md:flex-row">
                    <div className="flex gap-2">
                        {/* TODO ADD DYNAMIC LINKS */}
                        <Link href={whatsAppLink} className="border p-2 rounded-3xl transition-all aspec-square bg-primary/20 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                        >
                            <WhatsApp />
                        </Link>
                        <Link href={'https://www.facebook.com/culturaverders/?locale=pt_BR'} className="border p-2 rounded-3xl transition-all aspec-square bg-primary/20 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                            <Facebook />
                        </Link>
                        <Link href={'https://www.instagram.com/cultura_verde/'} className="border p-2 rounded-3xl transition-all aspec-square bg-primary/20 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                            <Instagram />
                        </Link>
                    </div>
                    <small className="mb-4 text-center font-normal  md:mb-0">
                        &copy; {currentYear} <a href="https://material-tailwind.com/">Cultura Verde</a>. All Rights Reserved.
                    </small>
                </div>
            </div>
        </footer>
    );
}


const WhatsApp = () => <Image src="/whatsapp.png" alt="whatsapp" width={20} className="opacity-40" height={20} />