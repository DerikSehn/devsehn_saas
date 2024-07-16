import { cn } from "@/lib/utils";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Page from "../page";
import { LayoutGrid } from "../ui/layout-grid";
import ScrollOverlay from "../ui/scroll/scroll-overlay";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";


export default function HeroCards({ services }: { services: ModelWithImage<Service>[] }) {
    console.log(services)

    /* on scroll, motion will turn the div with 100% */

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 100]);


    return (
        <div ref={container} className="w-full min-h-screen relative rounded-t-[3dvw]  -translate-y-[2%]  z-20 bg-primary-300 shadow-primary-100 shadow-lg">
            


        </div>
    )
}
export function HeroCard({ service }: { service: ModelWithImage<Service> }) {
    console.log(service)
    return (<span    >
        <Card className="relative w-full overflow-visible h-96 max-w-lg border-none" >
            <CardHeader className="relative z-10 text-neutral-100 font-sans">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </CardHeader>


        </Card>
    </span>
    );
}


const Mask = () => {
    return (<>
        <Image
            alt="Hero Image Bottom Mask"
            fill
            className="max-w-[94dvw] object-cover object-bottom max-h-6 z-10 -scale-y-100 -translate-y-3 blur-md "
            src="/hero/background-3.jpeg" />
        <div className="w-[92dvw] h-6 z-10 -translate-y-3 blur-md bg gradient-to-t  " />

    </>

    )
}
