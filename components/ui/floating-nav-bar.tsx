"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import Logo from "./logo";

export const FloatingNavBar = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);


    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;
            setIsAtTop(scrollYProgress.get() < 0.05)
            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (

        <motion.div
            layout
            animate={{
                y: visible ? 0 : -200,
                /*                     opacity: visible ? 1 : 0, */

                transition: {
                    duration: 0.6,
                    type: 'spring'
                },
            }}
            transition={{
                duration: 0.6,
                type: 'spring',
                bounce: 0.25,
                damping: 30
            }}
            style={{
                textShadow: '1px 1px 1px  gray'
            }}
            className={cn(
                "flex md:max-w-screen-2xl bg-white fixed top-0 inset-x-0 md:mx-auto transition-colors duration-500 border md:border-primary/40  dark:border-white/20 md:rounded-full rounded-b-[40px] dark:bg-primary-300 backdrop-blur-[2px]  z-[5000] px-4 md:pl-8 py-2  items-between justify-between space-x-4",
                isAtTop ? " md:bg-transparent md:border-none md:top-4 lg:top-10 xl:top-20" : "md:bg-primary/30 md:border-2 md:top-2 lg:top-4 xl:top-6",
                className,
            )}
        >
            <div className="max-w-96 md:w-1/4">
                <Logo />
            </div>
            <div className="hidden sm:flex justify-end gap-6">
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}

                        className={cn(
                            "relative font-bold  dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-200"
                        )}
                    >
                        <span className="block sm:hidden">
                            {navItem.icon}
                        </span>
                        <motion.span
                            animate={{
                                fontWeight: isAtTop ? 300 : 600,
                                transition: {
                                    duration: 0.3,
                                    type: 'spring'
                                },
                            }}
                            className={cn("hidden sm:block text-[10px]  lg:text-lg")}>{navItem.name}</motion.span>
                    </Link>
                ))}
                <Link href="#contato" className="flex items-center justify-center  ">
                    <Button
                        variant={'swipe'}
                        className="text-md"
                    >
                        Entre em contato
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}; 
