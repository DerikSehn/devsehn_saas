import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

import { ProjectCard } from "@/components/card/project-card";
import List from "@/components/list/list";
import { ModelWithImage } from "@/prisma/prisma-utils";


export async function getServerSideProps() {

    const projects = await prisma.project.findMany({
        orderBy: {
            id: 'asc',
        },
        include: {
            images: {
                orderBy: {
                    id: 'asc'
                }
            },

        }
    });
    return { props: { projects } };
}

export default function AdminDashboard({ projects }: { projects: ModelWithImage<Project>[] }) {

    return (
        <div className="col-span-12 ">

            <ul className="grid  mb-8 gap-6 my-6  ">
                <li className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                    <List
                        itemsPerPage={8}
                        enableEditor
                        tableName={'project'}
                        className='grid md:grid-cols-2 gap-3'
                        items={projects}
                        header={{
                            title: 'Lista de Projetos',
                        }}
                    >
                        {/* @ts-ignore */}
                        <ProjectCard className="min-h-[200px]" />
                    </List>
                </li>

            </ul>


        </div>
    )
}


