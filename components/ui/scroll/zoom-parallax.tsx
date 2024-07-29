import React, { FC, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { cn, getIsMobile } from "@/lib/utils";

const fixedPictures = [
  {
    classes: "w-[25%] h-[25%]",
  },
  {
    classes: "top-[-30%] left-[5%] w-[35%] h-[30%]",
  },
  {
    classes: "top-[-29%] left-[-25%] w-[20%] h-[28%]",
  },
  {
    classes: "top-[15%] left-[27.5%] w-[25%] h-[25%]",
  },
  {
    classes: "top-[20%] left-[-27.5%] w-[25%] h-[25%]",
  },
  {
    classes: "top-[27.5%] left-[5%] w-[20%] h-[25%]",
  },
  {
    classes: "top-[22.5%] left-[25%] w-[15%] h-[15%]",
  },
];

const ZoomParallax = ({ classes, children }: { children: React.ReactNode[], classes?: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const pictures = children.slice(0, 5).map((child, index) => {
    const isMobile = getIsMobile(768);
    console.log(isMobile)
    const scale =
      useTransform(scrollYProgress, [0, 1], [isMobile && index ? .5 : 1, index + (isMobile ? !index ? 2 : .6 : 4)]);
    const { classes } = fixedPictures[index];
    return {
      child,
      scale,
      classes: cn("relative", classes, isMobile && index === 0 ? "z-100 w-[50%]" : "min-w-[300px]"),
    };
  });

  return (
    <section
      ref={container}
      className={cn("relative h-[200vh] w-full z-10", classes)}
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {pictures.map(({ child, scale, classes }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className={cn("absolute top-0 z-0 flex h-full w-full  overflow-visible items-center justify-center", !index && "z-10")}
          >
            <div className={cn("", classes)}>
              {child}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-[100vh] leading-[0]"></div>
    </section>
  );
};

export default ZoomParallax;

export function ZoomParallaxItem({ src }: { src: string }) {
  return (
    <Image
      src={src}
      fill
      className="rounded-3xl"
      objectFit="cover"
      alt="image"
    />
  );
}
