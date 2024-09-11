import { Section } from "@/components/landingpage/section/section"
import ReturnToPage from "@/components/return-to-page"
import StickyScrollReveal from "@/components/ui/sticky-scroll-reveal"
import prisma from "@/lib/prisma"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Project as ProjectType } from "@prisma/client"
import Image from "next/image"

const ProjectPage = ({ project }: { project: ModelWithImages<ProjectType> }) => {
    return (< >
        <div className="absolute w-full h-96 bg-primary-200">
            <Image
                className="z-0 blur-2xl object-cover saturate-50 brightness-[.25] opacity-70"
                src={project.images[0]?.url || ""} alt={project.images[0].name} fill />

        </div>
        <div className="absolute w-full h-[200dvh] top-96 bg-primary-300" />
        <Section id={'project-' + project.id} className="bg-transparent min-h-[600px] h-auto flex flex-col max-w-screen-2xl mx-auto justify-start  pt-64 ">
            <div className="relative w-full grid md:grid-cols-2  p-8 overflow-visible text-neutral-50">
                <ReturnToPage href="/projects" className="text-white left-6 -top-8" />
                <div>
                    <h2 className="z-10 flex flex-col font-moglan uppercase font-thin  justify-center text-left  text-5xl  md:text-6xl">
                        {project.title}
                    </h2>
                    <div className="relative min-h-[200px]  pt-14 flex flex-col items-center justify-center text-left text-xl text-jet-900">
                        <p className="relative z-10 w-full" style={{
                            textShadow: '0 0 3px #000'
                        }}>
                            {project.images[0].description}
                        </p>
                        <p className="absolute right-4 top-4 text-9xl text-jet-700/50 z-0">
                            #{project.id}
                        </p>
                    </div>
                </div>
                <div className="relative z-10 w-full md:-translate-y-1/4">
                    <Image
                        className="max-w-full max-h-full object-cover "
                        src={project.images[0]?.url || ""} alt={project.images[0].name} fill />
                </div>
            </div>
            <div />

        </Section>
        <StickyScrollReveal content={project.images.slice(1).map((image) => ({
            title: image.name,
            description: image.description,
            content: <Image src={image?.url || ""} alt={image.name} fill className="object-cover" />
        })) as any} />
    </>
    )
}


export const getServerSideProps = async (context: any) => {
    const id = context.params.id
    const project = await prisma.project.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            images: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    });
    return { props: { project } }
}

export default ProjectPage
