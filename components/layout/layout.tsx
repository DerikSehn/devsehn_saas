import { Contact, Home, Projector, ShoppingBag, User, Workflow } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Footer } from '../ui/footer'
import { FloatingNavBar } from '../ui/scroll/floating-nav-bar'
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


    const router = useRouter()
    const isAdmin = router.pathname.startsWith("/admin")

    const session = useSession()
    if (session?.status === 'unauthenticated' && isAdmin) signOut()

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
