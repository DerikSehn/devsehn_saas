import { ModelWithImages } from "@/prisma/prisma-utils";
import { Project } from "@prisma/client";
import Image from "next/image";
import ZoomParallax from "../ui/scroll/zoom-parallax";
import { Section } from "./section";

export default function Projects({ projects }: { projects: ModelWithImages<Project>[] }) {
    return (
        <Section id="projects" className="  bg-primary-300 h-[200vh]">

            <ZoomParallax
            >
                {projects.slice(0, 5)?.map((project, index) =>
                    <Image key={project.title + index}
                        alt={`project${project.title}`}
                        fill
                        src={project.images[0].url}
                        style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                        }}
                        className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    />
                )}
            </ZoomParallax>
        </Section>
    )
}

