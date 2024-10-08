"use client";
import { useEffect, useState, useRef, FC } from "react";
import Image from "next/image";

import { useScroll, useTransform, motion } from "framer-motion";

interface Props {
    images: string[];
}

const TwoWayParallax: FC<Props> = ({ images }) => {
    const gallery = useRef(null);

    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        //when to start and end the animation (related to target element)
        offset: ["start end", "end start"],
    });

    const { height } = dimension;
    const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);

    useEffect(() => {
        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", resize);
        resize();
    }, []);

    return (
        <div
            ref={gallery}
            className="box-content flex h-[180vh] gap-4 overflow-hidden p-4 py-10"
        >
            <Column
                images={[images[0], images[2], images[4]]}
                y={y1}
                classes="top-[-45%]"
            />
            <Column
                images={[images[1], images[4], images[3]]}
                y={y2}
                classes="top-[-95%]"
            />{/* 
      <Column
        images={[images[5], images[3], images[2]]}
        y={y3}
        classes="top-[-65%] hidden lg:flex"
      />
      <Column
        images={[images[2], images[0], images[3]]}
        y={y4}
        classes="hidden xl:flex top-[-75%]"
      /> */}
        </div>
    );
};
export default TwoWayParallax;

type Column = { images: string[]; y: any; classes: string };

const Column = ({ images, y = 0, classes }: Column) => {
    return (
        <motion.div
            style={{ y }}
            className={`relative flex h-full w-full min-w-[180px] flex-col gap-4 ${classes}`}
        >
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className="relative h-full w-full max-h-[900px] overflow-hidden rounded-md"
                >
                    <Image
                        src={src}
                        objectFit="cover"
                        fill
                        alt="img"
                        className="max-h-[900px]"
                        loading="eager"

                    />
                </div>
            ))}
        </motion.div>
    );
};
