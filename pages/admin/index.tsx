import prisma from "@/lib/prisma";
import { Project, Service, Testimonial } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import GradientCircle from "@/components/box/gradient-circle";
import Card from "@/components/card/card";
import MetricCard from "@/components/card/MetricCard";
import { ProjectCard } from "@/components/card/project-card";
import { TestimonialCard } from "@/components/card/testimonial-card";
import Chart from "@/components/charts/chart";
import List from "@/components/list/list";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { FilesIcon, ImagesIcon, StarIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Polaroid from "@/components/ui/polaroid/polaroid";
import { ServiceCard } from "@/components/card/service-card";


const grids = [
    <Chart />,
    <Chart />,
    <Polaroid
        className="shadow-md shadow-neutral-900"
        alt="photos"
        height={400}
        width={400}
        src={'/template.jpeg'}
    />,
    <Polaroid
        className="shadow-md shadow-neutral-900"
        alt="photos"
        height={400}
        width={400}
        src={'/template.jpeg'}
    />,

    <Polaroid
        className="shadow-md shadow-neutral-900"
        alt="photos"
        height={400}
        width={400}
        src={'/template.jpeg'} />
]
export async function getServerSideProps() {

    const projects = await prisma.project.findMany({
        include: {
            images: true
        }
    });
    console.log(projects);
    const services = await prisma.service.findMany({
        include: {
            image: true
        }
    });
    const images = await prisma.image.findMany();
    const users = await prisma.user.findMany();
    const testimonials = await prisma.testimonial.findMany(
        {
            include: {
                image: true
            }
        }
    );
    const session = await getSession();

    const metrics: Metric[] = [
        {
            quantity: projects.length,
            title: 'Projetos',
            table_name: 'project',
            icon: 'projects'
        },
        {
            quantity: images.length,
            title: 'Imagens',
            table_name: 'image',
            icon: 'images'
        },
        {
            quantity: users.length,
            title: 'Usuários',
            table_name: 'user',
            icon: 'users'
        },
        {
            quantity: testimonials.length,
            title: 'Depoimentos',
            table_name: 'testimonial',
            icon: 'testimonials'
        },
        /*    {
               quantity: services.length,
               title: 'Serviços',
               table_name: 'service',
               icon: 'services'
           } */

    ]

    return { props: { projects, session, metrics, testimonials, services } };
}

const icons = {
    project: <FilesIcon />,
    image: <ImagesIcon />,
    user: <UsersIcon />,
    testimonial: <StarIcon />
    /*    service: <ServicesIcon /> */
}

interface Metric {
    quantity: number;
    title: string;
    table_name: string;
    icon: string;
}

export default function AdminDashboard({ metrics, projects, testimonials, services }: { metrics: Metric[], projects: ModelWithImage<Project>[], session: Session, testimonials: Testimonial[], services: ModelWithImage<Service>[] }) {

    return (

        <div className="col-span-12 ">
            <div className="lg:mt-32 md:grid grid-cols-2 lg:grid-cols-4  gap-6">
                {metrics?.map((metric, index) =>
                    <MetricCard key={index} className=''>
                        <div className="flex justify-between">
                            <div className="relative z-10 font-bold text-md text-neutral-700/60 uppercase flex flex-col">
                                <span>
                                    {metric.title}
                                </span>
                                <b>
                                    {metric.quantity}
                                </b>
                            </div>

                            <GradientCircle className="h-12" index={index}>
                                {/* @ts-ignore */}
                                {icons[metric.table_name]}
                            </GradientCircle>
                        </div>

                    </MetricCard>
                )}
            </div>
            <ul className="grid md:grid-cols-2 mb-8 gap-6 my-6  ">
                <li className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">

                    <List
                        itemsPerPage={8}
                        enableEditor
                        tableName={'project'}
                        className='grid md:grid-cols-1 gap-3'
                        items={projects}
                        header={{
                            title: 'Lista de Projetos',
                        }}
                    >
                        {/* @ts-ignore */}
                        <ProjectCard className="min-h-[200px]" />
                    </List>
                </li>
                <li className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                    <List
                        itemsPerPage={10}
                        enableEditor
                        tableName={'testimonial'}
                        className='space-y-5'
                        items={testimonials}
                        header={{
                            title: 'Depoimentos',
                        }}
                    >
                        {/* @ts-ignore */}
                        <TestimonialCard />
                    </List>
                </li>
                <li className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                    <List
                        itemsPerPage={10}
                        enableEditor
                        tableName={'service'}
                        className='space-y-5'
                        items={services}
                        header={{
                            title: 'Serviços',
                        }}
                    >
                        {/* @ts-ignore */}
                        <ServiceCard />
                    </List>
                </li>
            </ul>
            {/*  <div className="col-span-12 gap-8 gap-y-2 md:grid grid-cols-3 cursor-default">
                <BentoGrid className="col-span-3">
                    {grids?.map((grid, index) =>
                        <BentoGridItem
                            key={index}
                            variant="static"
                            className={"md:col-span-2  bg-neutral-200  w-full max-h-96 pb-4"}
                        >
                            {grid}
                        </BentoGridItem>
                    )}
                </BentoGrid>

            </div>
 */}

        </div>
    )
}

const Cards = ({ metrics }: { metrics: any }) => {


    return (<div className=" w-full lg:grid grid-cols-2 place-content-start ">{
        metrics?.map((item: any, index: number) =>
            <Link key={index} className='grow max-w-1/2 px-4 ' href={`admin/account/${item.name}?description=${item.table_description}`}>
                <Card className="group w-full h-32 cursor-pointer hover:scale-[.98] hover:shadow-2xl shadow-neutral-500/50 transition-all duration-500 my-4 text-neutral-500"
                    title={item.table_description} >
                    <Image fill alt={'imagem do card'} src={'/template.jpeg'}
                        className=' z-1 transition-all hover:scale-[1.02] duration-500   brightness-75 object-cover blur-[2px] saturate-50' />
                    <OpenInNewWindowIcon
                        className="group-hover:opacity-100 group-hover:scale-[3] duration-500 z-10 opacity-0 group-hover:-translate-y-1/2 group-hover:-translate-x-1/2  -translate-y-1/4 -translate-x-1/4 absolute left-1/2 top-1/2 transition-all"
                    />
                    <p className=" absolute bottom-2 left-4 leading-none flex space-x-1 items-center font-normal text-neutral-600">
                        <span className="text-md font-thin flex ">
                            Total:
                        </span>
                        <br />
                        <span className="text-2xl font-bold">
                            {item.record_count}
                        </span>
                    </p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">

                    </p>
                </Card>
            </Link>
        )
    }</div>
    )
}


