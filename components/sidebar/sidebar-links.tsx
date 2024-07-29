import { motion, Variants } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";


const liVariants = {
}

const itemVariants = {
    initial: { width: 0, opacity: 0, paddingLeft: 0 },
    animate: { width: '100%', opacity: 1, paddingLeft: 16 },
}

const iconVariants = {
    initial: { scale: 1.4 },
    animate: { scale: 1 },
}

interface SidebarLink {
    title: string;
    items: SidebarItem[];
}

interface SidebarItem {
    href: string;
    name: string;
    icon?: React.ReactNode;
}

const SidebarLinks = ({ links, variants = { liVariants, itemVariants, iconVariants } }: { links: SidebarLink[], variants?: { liVariants: Variants, itemVariants: Variants, iconVariants: Variants } }) => {
    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            className="h-full w-full flex flex-col space-y-6 p-2"
            transition={{ type: 'inertia', duration: 0.2 }}
        >
            {links.map(({ title, items }, index) => (
                <ul key={`${title}-${index}`} className='px-2 flex flex-col space-y-4 bg-neutral-100  border-neutral-200'>
                    <small
                        className="opacity-0 group-hover/sidebar:opacity-80 duration-200 transition-opacity text-nowrap whitespace-nowrap text-xl font-bold"
                    >
                        {title}
                    </small>
                    <motion.li
                        variants={variants.liVariants}
                        className=' flex flex-col'
                    >
                        {items.map(({ href, name, icon }, index) => (
                            <Link key={index} href={href !== 'logout' ? href : '/'} onClick={href === 'logout' ? () => signOut() : undefined} className='flex justify-center w-full items-center content-center hover:bg-neutral-200 p-2'>
                                <motion.div
                                    variants={variants.iconVariants}
                                    className='text-neutral-800'>
                                    {icon}
                                </motion.div>
                                <motion.div
                                    variants={variants.itemVariants}
                                    className='text-neutral-800 whitespace-nowrap overflow-hidden'
                                >
                                    {name}
                                </motion.div>
                            </Link>
                        ))}
                    </motion.li>
                </ul>
            ))}
        </motion.div>
    );
};

export default SidebarLinks;
