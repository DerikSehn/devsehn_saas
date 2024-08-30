import { useIsMobile, useIsSmall } from "@/lib/utils";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Service } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import HorizontalScrollCarousel from "../ui/scroll/horizontal-scroll";


export default function HeroCards({ services }: { services: ModelWithImage<Service>[] }) {

    const ref = useRef(null);


    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'start start'],
    });

    const borderTopRightRadius = useTransform(scrollYProgress, [0, 1], ['80%', '0%']);



    return (
        <motion.div
            style={{
                borderTopRightRadius: useIsSmall() ? '0%' : borderTopRightRadius,
            }}
            ref={ref}
            className="h-auto relative  z-10 w-full py-0 md:py-0 lg:py-0 flex flex-col justify-start border-gray-200 border-[32px] bg-gray-200"
        >


            <HorizontalScrollCarousel
                content={
                    <div className={" space-y-2 text-center my-10 mx-auto flex flex-col items-center justify-center  h-1/4 w-full col-span-full"}>
                        <h3 className="inline-block rounded-lg bg-gray-900 px-3 py-1 text-sm dark:bg-gray-500 text-gray-300 ">
                            Áreas de atuação
                        </h3>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide max-w-screen-md text-primary-600 font-moglan">
                            O que
                            <h2 className="text-5xl sm:text-6xl lg:text-7xl">
                                Fazemos
                            </h2>
                        </span>
                    </div>
                }

                className="overflow-x-clip  w-full z-20 min-h-[400px]    justify-center gap-4 lg:gap-6   ">

                {services.map((service, index) =>
                    <motion.div
                        key={index}
                    >
                        <HeroCard key={index} service={service} />
                    </motion.div>
                )}
            </HorizontalScrollCarousel>
        </motion.div >
    )
}
export function HeroCard({ service }: { service: ModelWithImage<Service> }) {
    return (
        <Card className="relative w-[300px]  lg:w-[350px] xl:w-[400px]  bg-gray-400 text-gray-800 text-left rounded-2xl shadow-md p-2">
            <CardHeader className="relative h-72">
                {service.image?.url ?
                    <Image
                        src={service.image.url}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                    : <div className="absolute inset-0 bg-gray-600 z-0" />
                }
            </CardHeader>
            <CardContent className="relative z-50 -mt-40 -ml-1 pt-3 min-h-52 rounded-tr-3xl bg-gray-400 w-[80%]">
                <CardTitle className="text-xl font-semibold my-4">{service.title}</CardTitle>
                <CardDescription className="text-md">{service.description}</CardDescription>
            </CardContent>
        </Card>
    );
}


