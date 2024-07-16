import Image from "next/image"
import ImageInLine from "../ui/image/image-in-line"
import InputCTA from "../ui/input/Input-cta"
import { Section } from "./section"

export default function Hero() {
    return (
        <Section id="hero" className="overflow-hidden py-36 md:py-48 lg:py-56 xl:py-96">
            <Image
                alt="Hero Image"
                className="object-cover object-center z-0 -scale-x-100  select-none"
                fill
                src="/hero/background-3.jpeg" />
            <Image
                alt="Hero Vector"
                fill
                className="object-cover object-center z-10 lg:scale-[1.4] brightness-90 select-none translate-x-1/8 -translate-y-1/8 "
                src="/hero/vector.svg" />
            <span className="absolute inset-0 z-[11] bg-gradient-to-b from-primary-100 to-30%" />
            <div className="container px-4 md:px-6 relative z-20 text-white">
                <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="relative flex flex-col"
                            style={{
                                textShadow: '2px 2px 10px  black'
                            }}>
                            <h2 className=" relative font-montaga  tracking-tight font-light text-3xl sm:text-5xl xl:text-6xl "
                            >
                                <span className="lg:text-[80px] " >D</span>escubra a beleza do <ImageInLine src="/hero/inline.jpeg" alt="Paisagismo" className="w-full h-6" />
                            </h2>
                            <h1 className="relative text-3xl font-moglan font-thin tracking-tighter sm:text-5xl lg:text-9xl "
                            >
                                <span className="lg:text-[180px] tracking-tighter" >PAISAGISMO </span>
                            </h1>

                        </div>
                        <InputCTA
                            description="Conheça o nosso trabalho ou entre em contato para saber mais."

                        />
                        {/*   <div className="flex flex-col gap-2 min-[400px]:flex-row">

                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-3xl border border-primary-400 text-primary-400 bg-neutral-200 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-hgreenbg-primary-200 dark:bg-gray-950 dark:hover:bg-primary-200 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 "
                                href="#"
                            >
                                Conheça a Cultura Verde
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </Section>
    )
}