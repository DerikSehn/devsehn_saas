import React, { FC, useRef } from "react";
import Image from "next/image";

import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/*  {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528",
      scale: scale1,
      classes: "relative w-[25%] h-[25%]",
    },
    {
      src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1887",
      scale: scale2,
      classes: "relative top-[-30%] left-[5%] w-[35%] h-[30%]",
    },
    {
      src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887",
      scale: scale3,
      classes: "relative top-[-29%] left-[-25%] w-[20%] h-[28%]",
    },
    {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974",
      scale: scale2,
      classes: "relative left-[27.5%] w-[25%] h-[25%]",
    },
    {
      src: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?q=80&w=1974",
      scale: scale3,
      classes: "relative left-[-27.5%] w-[25%] h-[25%]",
    },
    {
      src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071",
      scale: scale4,
      classes: "relative top-[27.5%] left-[5%] w-[20%] h-[25%]",
    },
    {
      src: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070",
      scale: scale5,
      classes: "relative top-[22.5%] left-[25%] w-[15%] h-[15%]",
    }, */

const ZoomParallax = ({ classes, children }: { children: React.ReactNode[], classes?: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const goldenRatio = 1.61803398875; // Proporção áurea

  const pictures = children.map((child, index) => {
    const angle = index * (Math.PI / 2) / goldenRatio; // Ângulo em radianos
    const radius = index * 8; // Aumenta o raio conforme o índice aumenta

    // Cálculo das posições x e y na espiral
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return {
      child,
      scale: useTransform(scrollYProgress, [0, 1], [1, index + 4]),
      style: {
        position: "relative",
        zIndex: index ? + 1 : 100,
        top: `${index ? 15 + 1.6 * y : 0}%`, // Ajuste para centralizar verticalmente
        left: `${index ? 15 + 1.6 * x : 0}%`, // Ajuste para centralizar horizontalmente
        width: `${index ? 10 + index * 2 : 25}%`, // Aumenta a largura conforme o índice aumenta
        aspectRatio: 1,
      },
    };
  });
  console.log(pictures)

  return (
    <section
      ref={container}
      className={cn("relative h-[200vh] w-full", classes)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ child, scale, style, }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale, }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div style={style}>
                {child}
              </div>
            </motion.div>
          );
        })}
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