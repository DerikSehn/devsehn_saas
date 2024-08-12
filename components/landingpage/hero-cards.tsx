import { getIsMobile } from "@/lib/utils";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Service } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SectionHeader from "./section/section-header";


export default function HeroCards({ services }: { services: ModelWithImage<Service>[] }) {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const isMobile = getIsMobile(1260)
    const yTransforms = services.slice(0, 4).map((service, index) =>
        isMobile ? null : useTransform(scrollYProgress, [0, 0.5], [`${(((index + 1) * -10) + 5)}vw`, `0vw`])
    );
    return (
        <div ref={ref} className="relative z-10 w-full flex flex-col justify-center text-center items-center  -translate-y-[5%]     bg-primary-300 py-5 lg:p-0 lg:h-[80vh] ">

            <SectionHeader
                className="z-[15] "
                title="Serviços"
                subtitle="Áreas de atuação"
            />

            <Image
                alt="Hero Image"
                fill
                className="object-cover object-center z-0 -scale-x-100 -scale-y-100 select-none    blur-sm"
                src="/hero/vector.png" />
            <div className=" absolute inset-0 bg-gradient-to-t from-primary-300 from-20% z-10" />
            <div className=" relative max-w-screen-2xl w-full z-20 min-h-[400px]  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center space-y-10 lg:space-y-0 gap-4 lg:gap-6 px-4 ">

                {services.slice(0, 4)?.map((service, index) =>
                    <motion.div
                        style={isMobile ? {} : { y: yTransforms[index] } as any}
                        key={index}
                    >
                        <HeroCard key={index} service={service} />
                    </motion.div>
                )}
            </div>
        </div >
    )
}
export function HeroCard({ service }: { service: ModelWithImage<Service> }) {
    return (
        <Card className="relative lg:absolute rounded-md group w-full  h-dvh sm:h-auto bg-primary-300 backdrop-blur aspect-[3/4] transition-all duration-500 overflow-hidden  border-none" >
            <CardHeader className=" relative z-20 text-neutral-100 font-sans bg-gradient-to-b from-primary-400/30 to-50% to-primary-500/30 h-full flex justify-center space-y-4 text-center">
                <CardTitle className="text-neutral-100 font-sans text-4xl font-bold">{service.title}</CardTitle>
                <CardDescription
                    style={{
                        textShadow: '2px 2px 10px  black'
                    }}
                    className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-100 font-sans text-sm">{service.description}</CardDescription>
            </CardHeader>
            <Image src={service.image.url} alt={service.title} fill className=" opacity-100 lg:opacity-90 group-hover:opacity-40 group-hover:blur transition-all duration-500 object-cover object-center " />
        </Card>
    );
}


