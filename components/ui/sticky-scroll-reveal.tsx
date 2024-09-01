"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const linearGradients = [
    "linear-gradient(to bottom right, var(--gray-100), var(--primary-100))",
    "linear-gradient(to bottom right, var(--primary-200), var(--primary-500))",
    "linear-gradient(to bottom right, var(--gray-100), var(--primary-100))",
];

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

    // eslint-disable-react-hooks/rules-of-hooks
    const imageY = useTransform(scrollYProgress, [0, 1], [`${0}%`, `${100 - 100 / cardLength}%`]);

    const backgroundColors = bgColors || [
        "var(--primary-200)",
        "var(--primary-100)",
        "var(--neutral-900)",
    ];
    const [backgroundGradient, setBackgroundGradient] = useState(
        linearGradients[0]
    );

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCard]);

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className={cn("w-full overflow-y-clip grid md:grid-cols-2 justify-center relative overflow-hidden",
                `md:h-[${cardLength * 100}vh]`,
            )}
            ref={ref}
        >
            <div className="relative z-10 flex items-start justify-center">
                <motion.div
                    animate={{
                        background: backgroundGradient
                    }}
                    className="absolute inset-0 opacity-70 z-0" />
                <div className="max-w-2xl space-y-10">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="flex flex-col justify-center md:h-screen relative z-10 p-4 ">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-4xl lg:text-7xl font-moglan text-slate-100"
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
                                className="text-lg text-slate-300 max-w-lg "
                            >
                                {item.description}
                            </motion.p>

                            <div className="min-h-40 aspect-video w-full relative my-10" >
                                <div
                                    className="md:hidden  "
                                >
                                    {content[index].content}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <AnimatePresence mode="popLayout">
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
                    style={{ top: imageY ?? undefined }}
                    className={cn(
                        "relative hidden md:flex h-screen items-center overflow-hidden",
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
