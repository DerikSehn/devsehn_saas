import React, { FC, useRef, useState } from "react";
import { motion, useTransform, useScroll, useMotionValueEvent, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
interface Props {
    className?: string;
    children: React.ReactNode;
    content?: React.ReactNode;
}

const ScrollSectionReveal: FC<Props> = ({ children, className, content }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'start start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0dvh", `100dvh`]);

    return (
        <div >
            <motion.div
                style={{ y }}
            >
                {children}
            </motion.div>
            <motion.div ref={targetRef}>
                {content}
            </motion.div>
        </div>
    );
};
export default ScrollSectionReveal;
