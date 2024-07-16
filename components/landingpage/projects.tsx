import { ModelWithImages } from "@/prisma/prisma-utils";
import { Project } from "@prisma/client";
import Image from "next/image";
import { ProjectCard } from "../card/project-card";
import ZoomParallax from "../ui/scroll/zoom-parallax";
import { Section } from "./section";

export default function Projects({ projects }: { projects: ModelWithImages<Project>[] }) {
    console.log(projects)
    return (
        <Section id="projects" className="  bg-primary-300 h-[200vh]">
            <Image

                alt="Hero Image"
                fill
                className="object-cover object-center  h-screen -scale-y-100 z-0 "

                src="/hero/vector.svg" />
            <ZoomParallax>
                {projects?.map((project, index) =>
                    <ProjectCard key={index} item={project} />
                )}
            </ZoomParallax>
        </Section>
    )
}

