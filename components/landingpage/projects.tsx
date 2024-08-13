import { cn } from "@/lib/utils";
import { ModelWithImages } from "@/prisma/prisma-utils";
import { Project } from "@prisma/client";
import Image from "next/image";
import Card from "../card/card";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import ZoomParallax from "../ui/scroll/zoom-parallax";
import StickyScrollReveal from "../ui/sticky-scroll-reveal";
import { Section } from "./section/section";
import SectionHeader from "./section/section-header";

export default function Projects({ projects }: { projects: ModelWithImages<Project>[] }) {
    return (<Section id="projects" className="bg-primary-300 h-auto flex-col ">
        <SectionHeader
            className="lg:relative"
            title="Projetos"
            subtitle="Realizações da Cultura Verde"
        />
        <div className=" relative  z-40 w-full   min-h-[600px] flex justify-center text-center items-center sm:text-left  h-[200vh]">
            <div className="absolute inset-0 bottom-0  bg-gradient-to-b from-transparent  via-30% via-primary-300 to-primary-200 z-[10]" />

            <div className=" absolute inset-0 bg-gradient-to-b from-primary-300 from-10% to-20%  z-[1]" />

            <ZoomParallax
                classes="z-[10]"
            >
                {projects.slice(0, 5)?.map((project, index) =>
/*                     <Link className="relative z-50" key={project.title + index} href={`/project/${project.id}`}>
 */                        <Card
                        key={project.title + index}
                        isStatic
                        className={cn("group w-full h-72 bg-primary-100  aspect-[3/4] rounded-none transition-all duration-500 overflow-hidden ",
                        )}>
                        <CardHeader className=" relative z-20 text-neutral-100 font-sans  h-full flex justify-center space-y-4 text-center">
                            <CardTitle className="text-neutral-00 tracking-wide text-3xl font-moglan opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    textShadow: '2px 2px 10px  black'
                                }}
                            >
                                {project.title}
                            </CardTitle>
                            <CardDescription
                                style={{
                                    textShadow: '2px 2px 10px  black'
                                }}
                                className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-800 opacity-50 font-sans text-4xl">
                                #{index + 1}
                            </CardDescription>
                        </CardHeader>
                        <Image src={project.images[0].url} alt={project.title} fill className=" opacity-100 lg:opacity-90 group-hover:opacity-80  transition-all duration-500 object-cover object-center " />
                    </Card>
/*                     </Link>
 */                )}
            </ZoomParallax>
        </div>
        {projects[0]?.images?.length ?
            <ProjectShowcase project={projects[0]} />
            : null
        }
    </Section>
    )
}


const ProjectShowcase = ({ project }: { project: ModelWithImages<Project> }) => {
    return (
        <Section id="project-showcase" className="bg-primary-200 h-auto flex-col">

            <StickyScrollReveal content={project.images.map((image, index) => ({
                title: index ? image.name : project.title,
                description: (index ? image.description : project.description) as string,
                content: <Image src={image.url} alt={image.name} fill className="sticky top-0 object-cover" />
            }))} />

        </Section>
    )
}

