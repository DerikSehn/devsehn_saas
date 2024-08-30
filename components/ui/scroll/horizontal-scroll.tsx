import React, { FC, useRef, useState } from "react";
import { motion, useTransform, useScroll, useMotionValueEvent, useSpring, SpringOptions, UseScrollOptions } from "framer-motion";

import { cn } from "@/lib/utils";
interface Props {
    className?: string;
    children: React.ReactNode[];
    content?: React.ReactNode;
    springOptions?: SpringOptions;
    scrollOptions?: UseScrollOptions;
}

const HorizontalScrollCarousel: FC<Props> = ({ children, className, content, springOptions, scrollOptions }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        ...scrollOptions
    });

    const x = useTransform(useSpring(scrollYProgress,
        {
            bounce: 0,
            damping: 30,
            stiffness: 60,
            ...springOptions
        }
    ), [0, 1], ["1%", `-${children.length * 10}%`]);

    const [activeItem, setActiveItem] = useState(0);


    const cardLength = children.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = children.map((_, index) => index / cardLength);
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
        setActiveItem(closestBreakpointIndex);
    });
    return (
        <section
            ref={targetRef}
            className={cn("relative h-[200vh] w-full", className)}
        >
            <div className="sticky top-0 flex h-screen items-start justify-start flex-col">
                {content}
                <motion.div
                    style={{ x }}
                    className="flex gap-4 space-x-10"
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="group relative apect-square overflow-hidden"
                        >
                            {React.cloneElement(child as any, { active: activeItem === index })}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
export default HorizontalScrollCarousel;
