import { driver } from "driver.js";
import { motion } from "framer-motion";
import { BellDot, File, Home, InfoIcon, LandPlot, LogOut, ProjectorIcon, Search, Settings, ShoppingBasket, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../container";
import TableItemWrapper from "../list/list-item-wrapper";
import Sidebar from "../sidebar/sidebar";
import SidebarLinks from "../sidebar/sidebar-links";
import { CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandDialog } from "../ui/command";


const LINKS = [
    {
        title: "Painel",
        items: [{
            icon: <Home />,
            name: "Início",
            href: '/admin'
        },
        {
            icon: <BellDot />,
            name: "Notificações",
            href: "/admin/notifications"
        }]
    },
    {
        title: "Empresa",
        items: [{
            icon: <LandPlot />,
            name: "Página de Conversão",
            href: '/'
        }, {
            icon: <Tags />,
            name: "Seções do site",
            href: '/admin/sections'
        },
        {
            icon: <ProjectorIcon />,
            name: "Página de Projetos",
            href: '/admin/projects'
        },
        {
            icon: <ShoppingBasket />,
            name: "Produtos",
            href: '/admin/products'
        },
        {
            icon: <LogOut />,
            name: "Sair",
            href: "logout"
        }
        ],
    },
    {
        title: "Geral",
        items: [{
            icon: <Settings />,
            name: "Configurações",
            href: '/admin/settings'
        },
        /*   {
              icon: <InfoIcon />,
              name: "Sobre",
              href: '/admin/about'
          }, */
        {
            icon: <File />,
            name: "Documentação",
            href: '/admin/api-doc'
        }]
    }
];

export default function AdminLayout({
    children,
    backgroundImage
}: {
    backgroundImage: string;
    children: React.ReactNode;
}) {
    useEffect(() => {
        const tourSeen = localStorage.getItem('tourSeen');
        if (!tourSeen) {
            driver({
                animate: true,
                doneBtnText: 'Fechar',
                nextBtnText: 'Próximo',
                prevBtnText: 'Anterior',
                steps: [
                    {
                        element: '#step-sidebar',
                        popover: {
                            title: 'Bem vindo ao painel administrativo',
                            description: 'Aqui você pode modificar e acompanhar tudo sobre o seu site. Você pode modicar seus projetos, produtos, parcerias, serviços, etc.',
                        }
                    },
                    {
                        element: '#step-search',
                        popover: {
                            title: 'Campo de Pesquisa',
                            description: 'Utilize este campo para buscar por informações no sistema.',
                        }
                    },
                    {
                        element: '#step-content',
                        popover: {
                            title: 'Conteúdo Principal',
                            description: 'Esta área mostra o conteúdo principal da seção selecionada.',
                        }
                    },
                    {
                        element: '#step-customize',
                        popover: {
                            title: 'Conferir seus registros',
                            description: 'Para cada parte do seu site, você terá a opção de customizar o conteúdo, adicionar novos registros e visualizar os registros existentes.',
                        }
                    },
                ],
                onDestroyed: () => {
                    localStorage.setItem('tourSeen', 'true');
                }
            }).drive()


        }
    }, []);

    return (
        <section className="bg-neutral-100 min-h-screen">
            <div className="absolute z-0 inset-x-0 bg-gradient-to-b  from-neutral-400 to-primary-100 h-[300px]" >
                <Image fill src={backgroundImage} className='brightness-50 object-cover' alt='enterprise-background' />
            </div>
            <Sidebar id="step-sidebar" className="hidden md:block hover:w-[15dvw] w-[9dvw] md:w-[8dvw] lg:w-[7dvw]  xl:w-[6dvw] space-y-4 py-2 z-50 group/sidebar bg-neutral-100">
                <SidebarLinks links={LINKS} />
            </Sidebar>
            <div id="step-content" className="grid grid-cols-12 transition-all peer-hover:pl-[15dvw] peer-hover:lg:pl-[15dvw] md:pl-[15dvw] lg:pl-24 peer p-4 pr-0 gap-6 w-full content-center text-neutral-700">
                <section className="col-span-12 relative z-1 p-4 xl:pl-10 2xl: pl-8">
                    <Container className='mt-0 max-w-[1700px]'>
                        <div className="col-span-8 h-16 px-4 md:-translate-y-5">
                            <p className=" font-medium text-lg text-neutral-300">
                                Painel Administrativo
                            </p>
                        </div>

                        <SiteMapSearch />
                        <div className="col-span-12 min-h-[600px]">
                            {children}
                        </div>
                    </Container>
                </section>
            </div>
        </section>
    );
}

const SiteMapSearch = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (<>
        <div onClick={() => setIsOpen(true)} id="step-search" className="col-span-4 flex items-center justify-end h-16 px-4 md:-translate-y-5">
            <motion.input
                className="bg-neutral-300 h-12 rounded-xl focus:bg-neutral-100 text-primary px-2"
            />
            <span className="bg-primary p-2 -ml-11 text-white rounded-xl flex items-center">
                <Search />
            </span>
        </div>
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
            <CommandInput placeholder="O que você está procurando?" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                {LINKS.map((link, idx) => (
                    <CommandGroup key={idx} heading={link.title}>
                        {link.items.map((item, idx) => (
                            <Link key={idx} href={item.href} >
                                <CommandItem className="cursor-pointer flex gap-2 hover:bg-neutral-200 transition-colors duration-75">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                ))}

                {/*  <CommandGroup heading="Suggestions">
                    <CommandItem> Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                </CommandGroup> */}
            </CommandList>
        </CommandDialog>
    </>)
}
