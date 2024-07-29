import { BentoGrid } from "@/components/bento-grid"
import { Section } from "@/components/landingpage/section/section"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Project as ProjectType } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"



const ProjectPage = ({ projects }: { projects: ModelWithImages<ProjectType>[] }) => {
    return (<>
        <div className="absolute w-full h-96 bg-primary-200">
            <Image
                className="z-0 blur object-cover saturate-50 brightness-[.25] opacity-70"
                src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />

        </div>

        <Section id="projects" className="bg-transparent  min-h-[1000px] flex flex-col max-w-screen-2xl mx-auto justify-start px-12 pt-64 ">
            <div className="relative w-full grid md:grid-cols-2 gap-8 overflow-visible text-neutral-50 border-b border-primary-300 mb-10">
                <div>

                    <h2 className="z-10 flex flex-col font-moglan uppercase font-thin  text-left    text-7xl">
                        Projetos
                    </h2>
                    <div className="min-h-40 pt-20 flex flex-col justify-center text-left text-xl text-jet-600 py-4">
                        <p>
                            Conheça nossos projetos de paisagismo sustentável, onde unimos criatividade e funcionalidade para transformar ambientes,
                            com a expertise em fitoterapia e execução de pergolados e decks personalizados.
                        </p>
                    </div>
                </div>

            </div>
            <BentoGrid className="md:grid-cols-5">
                {projects.map((project, index) => <ProjectItem project={project} key={project.id + index} />)}

            </BentoGrid>

            <div />

        </Section>

    </>)
}


export const getServerSideProps = async () => {
    const projects = await prisma.project.findMany({

        include: {
            images: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    });
    return { props: { projects } }
}

export default ProjectPage


const ProjectItem = ({ project }: { project: ModelWithImages<ProjectType> }) => {
    return (
        <Link className="relative z-50" href={`/project/${project.id}`}>
            <Card
                className={cn("group w-full h-72 bg-primary-100 backdrop-blur aspect-[3/4] rounded-none transition-all duration-500 overflow-hidden ",
                )}>
                <CardHeader className=" absolute inset-4 z-20 bg-primary-700/80  text-neutral-100 font-sans   flex justify-center space-y-4 text-center  opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <CardTitle className="text-neutral-100  text-3xl font-moglan "
                        style={{
                            textShadow: '2px 2px 10px  black'
                        }}
                    >
                        Ver o projeto
                    </CardTitle>
                    {/*  <CardDescription
                        style={{
                            textShadow: '2px 2px 10px  black'
                        }}
                        className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-800 opacity-50 font-sans text-4xl">
                        {project.description}
                    </CardDescription> */}
                </CardHeader>
                <Image src={project.images[0].url} alt={project.title} fill className=" opacity-100 lg:opacity-90 group-hover:opacity-80  transition-all duration-500 object-cover object-center " />
            </Card>
            <div className="p-4  bg-background">
                <h3 className="font-semibold line-clamp-2">{project.title}</h3>
                <div className="text-xs text-muted-foreground line-clamp-2">{project.description}</div>
            </div>

        </Link>

    );
}

