"use client";
import { Dropdown, Tab, Tabs, Trigger, TriggerWrapper } from "@/components/dropdown/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";

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
                "flex md:max-w-screen-2xl bg-primary-300 fixed top-0 inset-x-0 md:mx-auto transition-colors duration-500 border-b md:border md:border-primary/40 dark:border-white/20  md:rounded-b-[40px] md:rounded-full dark:bg-primary-300 backdrop-blur-[2px]  z-[5000] px-4 md:pl-8 py-2  items-between justify-between md:space-x-4",
                isAtTop ? " md:bg-transparent md:border-none md:top-4 lg:top-6 xl:top-10 2xl:top-12" : "md:bg-primary/70 md:border-2 md:top-2 lg:top-4 xl:top-6",
                className,
            )}
        >
            <div className="hidden md:block relative max-w-72 -my-2 h-[80px] w-1/2 md:w-1/4">
                {/* max width is 200px */}
                <Image src="/logo-white.png" alt="logo" fill className="object-cover object-center" />
                {/* <Logo className="dark:hidden block" /> */}
            </div>
            <div className="hidden sm:flex justify-end gap-6">
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}

                        className={cn(
                            "relative group/link font-bold flex dark:text-neutral-50 items-center space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-200"
                        )}
                    >
                        <motion.span
                            animate={{
                                fontWeight: isAtTop ? 300 : 600,
                                transition: {
                                    duration: 0.3,
                                    type: 'spring'
                                },
                            }}
                            className={cn("hidden sm:block text-[10px]  lg:text-lg relative")}>
                            <motion.span className="absolute bottom-0 w-0 h-[2px] transition-all group-hover/link:w-full mt-1 bg-secondary" />
                            {navItem.name}</motion.span>
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
            <div className="flex sm:hidden h-20 w-full justify-center">

                <Dropdown className="w-full flex justify-center items-center">
                    <TriggerWrapper >
                        <Trigger className="">
                            <div className="relative  w-72 h-[80px] ">
                                {/* max width is 200px */}
                                <Image src="/logo-white.png" alt="logo" fill className="object-cover object-center" />
                                {/* <Logo className="dark:hidden block" /> */}
                            </div>
                        </Trigger>
                    </TriggerWrapper>
                    <Tabs>
                        <Tab>
                            <div className="flex gap-4 p-4 w-full h-full bg-primary-300 text-jet-900 border-b border-jet-900">
                                <div
                                    className={
                                        'text-white font-bold text-3xl flex items-end justify-start p-4 w-56 h-[200px] rounded-md bg-gradient-to-br [background-size:150%] from-secondary-300   to-primary-400'
                                    }
                                >
                                    Cultura <br /> Verde
                                </div>
                                <div className={'flex flex-col  justify-between'}>
                                    {navItems.map((navItem, idx: number) => (
                                        <Link
                                            key={`link=${idx}`}
                                            href={navItem.link} className="flex items-center justify-start space-x-4 active:bg-primary-800/40 p-2 w-full rounded-lg">
                                            <h3 className={'dark:text-white text-secondary-800'}>{navItem.icon}</h3>

                                            <p className={'text-jet-900 text-xl '}>
                                                {navItem.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Dropdown>
            </div>
        </motion.div>
    );
}; 
