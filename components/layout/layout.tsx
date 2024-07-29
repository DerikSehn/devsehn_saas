import { Contact, Home, Projector, ShoppingBag, User, Workflow } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import { FloatingNavBar } from '../ui/scroll/floating-nav-bar'
import { Footer } from '../ui/footer'
import AdminLayout from './admin-layout'



const navItems = [
    { name: "Início", link: "/", icon: <Home /> },
    { name: "A Empresa", link: "/section/a-empresa", icon: <Workflow /> },
    { name: "A Paisagista", link: "/section/a-paisagista", icon: <User /> },
    { name: "Contato", link: "/contact", icon: <Contact /> },
    { name: "Projetos", link: "/projects", icon: <Projector /> },
    { name: "Produtos", link: "/products", icon: <ShoppingBag /> },
]


export const Layout = ({ children }: any) => {

    /* se estiver no path /admin, deve desabilitar o layout e renderizar o componente AdminLayout */
    const router = useRouter()
    const isAdmin = router.pathname.startsWith("/admin")

    return (
        router.pathname.startsWith("/auth") ? <>{children}</> :
            isAdmin ?
                <AdminLayout backgroundImage='/uploads/dashboard/background.jpeg'
                >{children}</AdminLayout>
                : <>
                    <FloatingNavBar navItems={navItems} />
                    <div>{children}</div>
                    <Footer />
                </>
    )
}
