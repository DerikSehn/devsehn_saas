import Image from "next/image"
import ImageInLine from "../ui/image/image-in-line"
import InputCTA from "../ui/input/Input-cta"
import { Section } from "./section/section"
import gradientMesh from "@/styles/gradient-mesh.json";
import TwoWayParallax from "../ui/scroll/two-way-parallax";
import useIsTouchDevice, { cn } from "@/lib/utils";

export default function Hero({ heroImages }: { heroImages: string[] }) {

    const isMobile = useIsTouchDevice();


    return (
        <Section id="hero" className="overflow-visible py-36 lg:py-48 xl:py-96 z-10"

        >
            <span className="absolute inset-0 bg-gradient-to-b from-primary-300 from-20% h-[15%] z-40" />
            <span className={cn("absolute inset-0 h-[200dvh]",
                isMobile ? "bg-primary-500" : ""

            )}
                style={{
                    backgroundImage: isMobile ? "" : gradientMesh['background-mesh']
                }}
            />


            <div className="px-4 md:px-6 relative z-20 text-white w-full">
                <div className="grid lg:gap-12 lg:grid-cols-2 relative ">
                    <div className="flex flex-col relative z-20 justify-center lg:items-center">
                        <div className="relative flex flex-col "
                            style={{
                                textShadow: '2px 2px 10px  gray'
                            }}>
                            <div className="relative font-montaga tracking-tight font-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mix-blend-multiply"
                            >
                                <span className="xl:text-[70px] leading-none  " >D</span>escubra a beleza do
                                <ImageInLine src="/background/background.jpeg" alt="Paisagismo"
                                    className="h-16 z-0 hidden   xl:absolute 2xl:relative xl:h-16 lg:right-2 lg:opacity-25 lg:mt-0 lg:h-40 xl:inline-flex ml-4 -mt-5" />

                            </div>
                            <div className="relative text-3xl font-moglan font-thin tracking-tighter sm:text-5xl lg:text-8xl "
                            >
                                <span className=" text:6xl lg:text-7xl xl:text-[120px] 2xl:xl:text-[150px] tracking-tight " >PAISAGISMO </span>
                            </div>

                        </div>
                        <InputCTA
                            description="Entre em contato nos enviando um email, e ficaremos felizes em transformar seu espaço em um ambiente acolhedor"
                        />
                    </div>

                    <div className=" max-h-dvh absolute md:relative w-full brightness-[.6] opacity-25 lg:opacity-100 -top-32 md:top-0 md:brightness-[.9] z-0  ">
                        <TwoWayParallax images={heroImages} />
                    </div>

                </div>
            </div>

        </Section>
    )
}