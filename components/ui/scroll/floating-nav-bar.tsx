"use client";
import { Dropdown, Tab, Tabs, Trigger, TriggerWrapper } from "@/components/dropdown/dropdown-menu";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";
import WhatsappButton from "@/components/button/whatsapp-button";

interface NavItem {
    name: string;
    link: string;
    icon?: JSX.Element;
}

interface FloatingNavBarProps {
    navItems: NavItem[];
    className?: string;
}

export const FloatingNavBar = ({ navItems, className }: FloatingNavBarProps) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - scrollYProgress.getPrevious()!;
            setIsAtTop(scrollYProgress.get() < 0.05);
            setVisible(scrollYProgress.get() < 0.05 || direction < 0);
        }
    });

    const phoneNumber = "(51) 99626-1079";
    const message = "Olá, tudo bem? Gostaria de saber mais sobre os serviços da cultura verde. Poderia me fornecer mais informações?";
    const whatsAppLink = generateWhatsAppLink({ phoneNumber, message });

    return (
        <motion.div
            layout
            animate={{
                y: visible ? 0 : -200,
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
            style={{ textShadow: '1px 1px 1px gray' }}
            className={cn(
                "flex bg-primary-300 fixed top-0 inset-x-0 md:mx-auto transition-colors duration-500 border-b md:border md:border-primary/40 dark:border-white/20 md:rounded-b-[40px] lg:rounded-none  z-[5000] px-4 md:pl-8 py-2 items-between justify-between md:space-x-4",
                isAtTop ? "md:bg-transparent md:border-none md:top-4 lg:top-6 xl:top-10 2xl:top-12" : "md:bg-primary/70 md:border-2 top-0 backdrop-blur-[2px] ",
                className,
            )}
        >
            <div className="hidden md:block relative max-w-72 -my-2 h-[80px] w-1/2 md:w-1/4">
                <Image src="/logo-white.png" alt="logo" fill className="object-cover object-center" />
            </div>
            <div className="hidden sm:flex justify-end gap-6">
                {navItems.map((navItem, idx) => (
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
                            className={cn("hidden sm:block text-[10px] lg:text-lg relative")}
                        >
                            <motion.span className="absolute bottom-0 w-0 h-[2px] transition-all group-hover/link:w-full mt-1 bg-gray" />
                            {navItem.name}
                        </motion.span>
                    </Link>
                ))}
                <WhatsappButton link={whatsAppLink} />
            </div>
            <div className="flex sm:hidden h-20 w-full justify-center">
                <Dropdown className="w-full flex justify-center items-center">
                    <TriggerWrapper>
                        <Trigger>
                            <div className="relative w-72 h-[80px]">
                                <Image src="/logo-white.png" alt="logo" fill className="object-cover object-center" />
                            </div>
                        </Trigger>
                    </TriggerWrapper>
                    <Tabs>
                        <Tab>
                            <div className="flex gap-4 p-4 w-full h-full bg-primary-300 text-jet-900 border-b border-jet-900">
                                <Link href={whatsAppLink} target="_blank" className="flex mt-3">
                                    <Button variant="swipe" className="text-md group  pr-12 h-40 transition-all rounded-3xl bg-green-600 border-green-200 text-gray-300">
                                        WhatsApp
                                        <MessageCircleIcon className="absolute transition-all duration-500 right-4 " />
                                    </Button>
                                </Link>
                                <div className="flex flex-col justify-between">
                                    {navItems.map((navItem, idx) => (
                                        <Link
                                            key={`link=${idx}`}
                                            href={navItem.link}
                                            className="flex items-center justify-start space-x-4 active:bg-primary-800/40 p-2 w-full rounded-lg text-white"
                                        >
                                            <h3 className=" ">{navItem.icon}</h3>
                                            <p className="text-xl">{navItem.name}</p>
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