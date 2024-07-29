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

    const isMobile = getIsMobile()

    return (
        <div ref={ref} className="relative z-10 w-full flex flex-col justify-center text-center items-center  -translate-y-[5%] rounded-[64px] lg:rounded-[3dvw] lg:rounded-b-none bg-primary-300 py-5 lg:p-0 lg:h-[80vh] ">

            <SectionHeader
                className="z-[15] "
                title="Serviços"
                subtitle="Áreas de atuação"
            />

            <Image
                alt="Hero Image"
                fill
                className="object-cover object-center z-0 -scale-x-100 -scale-y-100 select-none rounded-[64px] lg:rounded-none"
                src="/hero/vector.svg" />
            <div className=" absolute inset-0 bg-gradient-to-t from-primary-300 from-20% z-10" />
            <div className=" relative max-w-screen-2xl w-full z-20 min-h-[400px]  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center space-y-10 lg:space-y-0 gap-4 lg:gap-6 px-4 ">

                {services.slice(0, 4)?.map((service, index) =>
                    <motion.div
                        style={isMobile ? {} : {
                            y: useTransform(scrollYProgress, [0, 0.5], [`${(((index + 1) * -10) + 5)}vw`, `0vw`])
                        }}
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
        <Card className="relative lg:absolute  group w-full rounded-[45px] bg-primary-100 backdrop-blur aspect-[3/4] transition-all duration-500 overflow-hidden border-neutral-100 border-0 lg:border-2" >
            <CardHeader className=" relative z-20 text-neutral-100 font-sans bg-gradient-to-b from-primary-200/40 to-50% to-primary-100/30 h-full flex justify-center space-y-4 text-center">
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


