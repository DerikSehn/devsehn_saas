import prisma from "@/lib/prisma";
import { Coins, Home, Info, InfoIcon, LandPlot, LogOut, Search, Settings, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GradientCircle from "../box/gradient-circle";
import Container from "../container";
import Sidebar from "../sidebar/sidebar";
import { motion } from "framer-motion";
import SidebarLinks from "../sidebar/sidebar-links";

const LINKS = [
    {
        title: "Painel",
        items: [{
            icon: <Home />,
            name: "Início",
            href: '/admin'
        },
        {
            icon: <InfoIcon />,
            name: "Informações",
            href: '/admin/editor'
        },
        {
            icon: <Settings />,
            name: "Configurações",
            href: '/admin/settings'
        },
       /*  {
            icon: <Coins />,
            name: "Pagamentos",
            href: "admin/billing"
        } */]
    },
    {
        title: "Empresa",
        items: [{
            icon: <LandPlot />,
            name: "Página de Conversão",
            href: '/'
        }, {
            icon: <Tags />,
            name: "Produtos",
            href: '/#services'
        },
        {
            icon: <LogOut />,
            name: "Sair",
            href: "api/logout"
        }
        ],
    },
    /*  
     {
       title: "Resource",
       items: ["Blog", "Newsletter", "Events", "Help center"],
     }, */
];


export default function AdminLayout({
    children,
    backgroundImage
}: {
    backgroundImage: string;
    children: React.ReactNode;
}) {

    return (
        <section className="bg-neutral-100 min-h-screen">
            <div className="absolute z-0 inset-x-0 bg-gradient-to-b  from-neutral-400 to-primary-100 h-[300px]" >
                <Image fill src={backgroundImage} className='brightness-50 object-cover' alt='enterprise-background' />
            </div>
            <Sidebar className="hidden md:block hover:w-[15dvw] w-[9dvw] md:w-[8dvw] lg:w-[7dvw]  xl:w-[6dvw] space-y-4 py-2 z-50 group/sidebar bg-neutral-100">
                <SidebarLinks links={LINKS} />
            </Sidebar>
            <div className="grid grid-cols-12 transition-all peer-hover:pl-[15dvw] peer-hover:lg:pl-[15dvw] md:pl-[15dvw] lg:pl-24 peer p-4 pr-0 gap-6 w-full content-center text-neutral-700">
                <section className="col-span-12 relative z-1 p-4 xl:pl-10 2xl: pl-8">
                    <Container className='mt-0 max-w-[1700px]'>
                        <div className="col-span-8 h-16 px-4 md:-translate-y-5">
                            <p className=" font-medium text-lg text-neutral-300">
                                Painel Administrativo
                            </p>
                        </div>
                        <div className="col-span-4 flex items-center justify-end h-16 px-4 md:-translate-y-5">
                            <motion.input
                                className="bg-neutral-300 h-12 rounded-xl focus:bg-neutral-100 text-primary px-2"
                            />
                            <span className="bg-primary p-2 -ml-11 text-white rounded-xl flex items-center">
                                <Search />
                            </span>
                        </div>
                        <div className="col-span-12 min-h-[600px]">
                            {children}
                        </div>
                    </Container>
                </section>
            </div>
        </section>

    );
}
