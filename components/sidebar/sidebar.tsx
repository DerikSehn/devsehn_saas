"use client"

import { cn } from "@/lib/utils";
import Logo from "../logo/logo";
import { HeaderLogo } from "../logo/sidebar-logo";
import { motion } from "framer-motion";


export default function Sidebar({ children, className, ...props }: any) {


    return (
        <motion.div
            animate={{ boxShadow: '2px 0px 10px 0px rgb(228, 228, 231, .5)', transition: { duration: 0.6, type: 'spring' }, minWidth: '0px', }}
            whileHover={{ boxShadow: '2px 0px 10px 0px rgb(40, 40, 40, .5)', transition: { duration: 0.6, type: 'spring' }, minWidth: '250px', }}
            layout
            className={cn(
                "fixed h-screen group overflow-hidden  border transition-all duration-400",
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
