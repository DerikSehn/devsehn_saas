import { cn } from "@/lib/utils";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Partner } from "@prisma/client";
import Image from "next/image";
import LogoMarquee from "../marquee/marquee";
import { Section } from "./section/section";

export default function Partners({ partners }: { partners: ModelWithImage<Partner>[] }) {
    return (
        <Section id="partners" className="h-screen relative w-full py-0 md:py-0 lg:py-20 flex flex-col bg-gradient-to-b from-white to-white justify-start items-start  ">
            <div className={cn(" space-y-2 text-center mx-auto px-4 ")}>
                <h3 className="inline-block rounded-lg bg-primary-600 px-3 py-1 text-sm dark:bg-primary-600 text-primary-900 ">
                    Parcerias
                </h3>
                <div className="text-md sm:text-3xl lg:text-4xl font-light tracking-wide  max-w-screen-md text-primary-300 font-moglan">
                    Levando a
                    <h2 className="text-primary-600 text-5xl lg:text-8xl font-sans"
                        style={{ textShadow: "0 0 1px #000, 0 0 2px #000" }}>
                        Excelência
                    </h2>
                    para todos os lugares
                </div>

            </div>

            <div className="absolute z-20 inset-y-0 w-1/4 to-30% right-0 bg-gradient-to-l from-white" />
            <div className="absolute z-20 inset-y-0 w-1/4 to-30% left-0 bg-gradient-to-r from-white" />
            <LogoMarquee className="h-full">
                {partners.map((partner, index) => (
                    <div className="space-2  relative w-40 min-h-40 " key={index}>
                        <Image
                            key={index}
                            src={partner.image.url}
                            alt={partner.name}
                            fill
                            className="object-cover object-center rounded-md"
                        />
                    </div>
                )

                )}
            </LogoMarquee>
        </Section>
    )
}