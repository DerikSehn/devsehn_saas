import { Section } from "@/components/landingpage/section/section"
import Polaroid from "@/components/polaroid/polaroid"
import BlobImage from "@/components/ui/image/blob-image-path"
import StickyScrollReveal from "@/components/ui/sticky-scroll-reveal"
import prisma from "@/lib/prisma"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Section as SectionType } from "@prisma/client"
import Image from "next/image"
import gradientMesh from "@/styles/gradient-mesh.json";

const SectionPage = ({ section }: { section: ModelWithImages<SectionType> }) => {
    return (< >
        <div className="absolute w-full h-96 bg-primary-200">
            <Image
                className="z-0 blur-2xl object-cover saturate-50 brightness-[.25] opacity-70"
                src={section.images[0]?.url || ""} alt={section.images[0].name} fill />

        </div>
        <div className="absolute w-full h-[200dvh] top-96 bg-primary-300"
            style={{
                backgroundImage: gradientMesh['background-mesh']
            }} />
        <Section id={section.slug} className="bg-transparent min-h-[600px] h-auto flex flex-col max-w-screen-2xl mx-auto justify-start px-12 pt-64 ">
            <div className="relative w-full grid md:grid-cols-2 gap-8 overflow-visible text-neutral-50">
                <div>

                    <h2 className="z-10 flex flex-col font-moglan uppercase font-bold  justify-center text-left  text-5xl  md:text-7xl">
                        {section.title}
                    </h2>
                    <div className="min-h-[600px] pt-14 flex flex-col items-center justify-center text-left text-xl text-jet-900">
                        <p>
                            {section.images[0].description}
                        </p>
                    </div>
                </div>
                <div className="relative z-10 w-full md:-translate-y-[10%]">
                    <Polaroid src={section.images[0]?.url || ""} alt={section.images[0].name} title={section.images[0].name}
                        height={400} width={300}
                    />
                </div>
            </div>
            <div />

        </Section>
        <StickyScrollReveal content={section.images.slice(1).map((image) => ({
            title: image.name,
            description: image.description,
            content: <Image src={image?.url || ""} alt={image.name} fill className="object-cover" />
        })) as any} />
    </>
    )
}


export const getServerSideProps = async (context: any) => {
    const slug = context.params.slug
    const section = await prisma.section.findUnique({
        where: {
            slug
        },
        include: {
            images: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    });
    return { props: { section } }
}

export default SectionPage
