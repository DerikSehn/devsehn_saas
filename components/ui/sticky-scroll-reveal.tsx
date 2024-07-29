"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn, getIsMobile } from "@/lib/utils";
import Image from "next/image";

const StickyScrollReveal = ({
    content,
    contentClassName,
    bgColors,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
    bgColors?: string[];
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        target: ref,
        offset: ["start start", "end end"],
    });


    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const imageY = getIsMobile(768) ? null : useTransform(scrollYProgress, [0, 1], [`${0}%`, `${100 - 100 / cardLength}%`])

    const backgroundColors = bgColors || [
        "var(--primary-200)",
        "var(--ebony-100)",
        "var(--neutral-900)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--secondary-100), var(--primary-100))",
        "linear-gradient(to bottom right, var(--ebony-200), var(--ebony-500))",
        "linear-gradient(to bottom right, var(--secondary-100), var(--primary-100))",
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(
        linearGradients[0]
    );

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className={cn("w-full overflow-y-clip grid md:grid-cols-2 justify-center relative   overflow-hidden",
                `h-[${cardLength * 100}vh]`,
            )}
            ref={ref}
        >
            <div className="relative z-10 flex items-start justify-center p-4">
                <motion.div
                    animate={{
                        background: backgroundGradient
                    }}
                    className="absolute inset-0 opacity-70 z-0" />
                <div className="max-w-2xl space-y-10">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="flex flex-col justify-center h-screen relative z-10 ">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-7xl font-moglan text-slate-100"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg text-slate-300 max-w-lg mt-10"
                            >
                                {item.description}
                            </motion.p>

                            <div className="min-h-40 aspect-video w-full relative" >
                                <div
                                    className="md:hidden "
                                >
                                    {content[index].content}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <AnimatePresence mode="popLayout" >
                <motion.div
                    initial={{
                        opacity: 0,

                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.5,

                    }}
                    key={activeCard}
                    style={{ top: imageY! }}
                    className={cn(
                        "relative hidden md:flex h-screen items-center overflow-hidden  ",
                        contentClassName
                    )}
                >
                    {content[activeCard].content ?? null}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};


export default StickyScrollReveal;