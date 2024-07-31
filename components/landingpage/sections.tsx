import { cn } from "@/lib/utils"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Section as SectionType } from "@prisma/client"
import { OpenInNewWindowIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { Section } from "./section/section"

export default function Sections({ sections }: { sections: ModelWithImages<SectionType>[] }) {
    return (<Section id="sections" className="bg-primary-200 flex flex-col justify-start py-10 h-auto px-4 min-h-[150dvh]  ">
        {/* <List
            items={sections}
            enableEditor={false}
            itemsPerPage={2}
            header={{
                title: "Conheça nosso site",
                subTitle: "Veja nossos projetos e conheça nossa equipe",
                className: ""
            }}
        >
            <SectionCard />
        </List> */}
        <div className={cn(" space-y-2 text-center mx-auto px-4 my-10")}>
            <h3 className="inline-block rounded-lg bg-primary-600 px-3 py-1 text-sm dark:bg-primary-600 text-primary-900 ">
                Conheça a Cultura Verde
            </h3>
            <div className="text-3xl font-light tracking-wide sm:text-5xl lg:text-7xl max-w-screen-md text-jet-900 font-moglan">
                <h2 className="text-primary-800 text-5xl lg:text-8xl font-moglan"
                    style={{ textShadow: "0 0 1px #fff, 0 0 2px #fff" }}>
                    Quem Somos?
                </h2>
            </div>
            <small className="text-neutral-100 text-sm">
                Uma empresa especializada em paisagismo e jardins fitoterápicos.
                <br />
                De criações próprias e espírito empreendedor.

            </small>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 w-full    ">
            <SectionItem section={sections[0]} className="col-span-1 h-dvh" />
            <div className="hidden sm:block col-span-1 space-y-10">
                <SectionItem section={sections[1]} />
                <SectionItem section={sections[2]} />
            </div>
            <SectionItem className="block sm:hidden" section={sections[1]} />
            <SectionItem className="block sm:hidden" section={sections[2]} />

        </div>
    </Section >)
}

const SectionItem = ({ section, className }: { section: ModelWithImages<SectionType>; className?: string }) => {
    return (

        <Link href={`/section/${section.slug}`} className={cn("flex group flex-col justify-center items-center w-full relative h-auto min-h-[50%] cursor-pointer", className)}>
            <motion.div
                transition={{ duration: 1.3, type: "tween" }}
                initial={{ opacity: 0, y: 100, }}
                whileInView={{
                    opacity: 1,
                    width: '80%',
                    y: 0
                }}
                className="absolute w-1/2 left-0 h-full aspect-[3/4] overflow-hidden"

            >
                <Image
                    src={section.images[0].url}
                    alt={section.title}
                    fill
                    className="object-cover object-top  group-hover:brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:translate-x-4 shadow-xl rounded-md"
                />
                <div className="absolute w-full h-full z-10 top-0 left-0 bg-gradient-to-r from-primary-600 to-primary-500  blur-3xl transition-opacity opacity-0 group-hover:opacity-10 duration-500" />
                <OpenInNewWindowIcon fontSize={'80px'} className="absolute bottom-1/2 -translate-x-1/2 left-1/4 z-20 w-40 h-40 text-jet-800 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100    transition-all duration-500 " />
            </motion.div>
            <div className="relative z-10 md:pl-[24%] space-y-10">
                <h2 className="  text-3xl font-light tracking-wide sm:text-5xl lg:text-7xl max-w-screen-md text-neutral-100 "
                    style={{
                        textShadow: '0px 0px 10px #000'
                    }}
                >
                    {section.title}
                </h2>
                <div className="font-bold text-neutral-100 text-lg max-w-sm tracking-wider group-hover:opacity-100 opacity-0 transition-opacity">
                    <p className="line-clamp-6">

                        {section.description}
                    </p>
                    <br />
                    <br />
                    <Button variant={'default'} className="bg-secondary/10">
                        Clique para saber mais
                    </Button>
                </div>


            </div>
        </Link>
    )
}