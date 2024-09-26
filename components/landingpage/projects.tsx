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
    return (
        <Section id="projects" className="bg-white h-auto flex-col">
            <div className={" space-y-2 xl:text-center my-10 lg:relative text-primary-200"}>
                <h3 className="inline-block rounded-lg bg-gray-900 px-3 py-1 text-sm dark:bg-gray-800 ">
                    Projetos
                </h3>
                <h2 className="text-3xl font-light tracking-wide sm:text-5xl lg:text-7xl max-w-screen-md  font-moglan">
                    Projetos paisagísticos realizados pela cultura verde


                </h2>

            </div>
            <div className="relative z-40 w-full min-h-[600px] flex justify-center text-center items-center sm:text-left h-[200vh]">
                <div className="absolute inset-0 bottom-0 bg-gradient-to-b from-transparent via-30% via-white to-white z-[10]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white from-10% to-20% z-[1]" />
                <ZoomParallax classes="z-[10]">
                    {projects.slice(0, 5)?.map((project, index) => (
                        <Card
                            key={project.title + index}
                            isStatic
                            className={cn(
                                "group w-full h-72 bg-gray-100 aspect-[3/4] rounded-none transition-all duration-500 overflow-hidden"
                            )}
                        >
                            <CardHeader className="relative z-20 text-gray-800 font-sans h-full flex justify-center space-y-4 text-center">
                                <CardTitle
                                    className="text-white tracking-wide text-3xl font-moglan opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        textShadow: '2px 2px 10px white'
                                    }}
                                >
                                    {project.title}
                                </CardTitle>
                                <CardDescription
                                    style={{
                                        textShadow: '2px 2px 10px white'
                                    }}
                                    className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white opacity-50 font-sans text-4xl"
                                >
                                    #{index + 1}
                                </CardDescription>
                            </CardHeader>
                            <Image
                                src={project.images[0]?.url || ""}
                                alt={project.title}
                                fill
                                className="opacity-100 lg:opacity-90 group-hover:opacity-80 transition-all duration-500 object-cover object-center"
                            />
                        </Card>
                    ))}
                </ZoomParallax>
            </div>
            {projects[0]?.images?.length ? <ProjectShowcase project={projects[0]} /> : null}
        </Section>
    );
}

const ProjectShowcase = ({ project }: { project: ModelWithImages<Project> }) => {
    return (
        <Section id="project-showcase" className="bg-gray-100 h-auto flex-col">
            <StickyScrollReveal
                content={project.images.map((image, index) => ({
                    title: index ? image.name : project.title,
                    description: (index ? image.description : project.description) as string,
                    content: <Image src={image?.url || ""} alt={image.name} fill className="sticky top-0 object-cover" />
                }))}
            />
        </Section>
    );
}