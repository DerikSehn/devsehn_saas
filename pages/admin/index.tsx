import prisma from "@/lib/prisma";
import { Partner, Project, Service, Testimonial } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import GradientCircle from "@/components/box/gradient-circle";
import MetricCard from "@/components/card/MetricCard";
import { PartnerCard } from "@/components/card/partner-card";
import { ProjectCard } from "@/components/card/project-card";
import { ServiceCard } from "@/components/card/service-card";
import { TestimonialCard } from "@/components/card/testimonial-card";
import List from "@/components/list/list";
import { cn } from "@/lib/utils";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { FilesIcon, ImagesIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { driver } from "driver.js";


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
    const services = await prisma.service.findMany({
        include: {
            image: true
        }
    });
    const testimonials = await prisma.testimonial.findMany(
        {
            include: {
                image: true
            }
        }
    );

    const partners = await prisma.partner.findMany(
        {
            include: {
                image: true
            }
        }
    );

    const notifications = await prisma.receivedEmail.findMany({
        where: {
            isRead: false
        }
    });

    const imagesCount = await prisma.image.count();
    const usersCount = await prisma.user.count();

    const session = await getSession();

    const metrics: Metric[] = [
        {
            quantity: projects.length,
            title: 'Projetos',
            table_name: 'project',
            icon: 'projects'
        },
        {
            quantity: imagesCount,
            title: 'Imagens',
            table_name: 'image',
            icon: 'images'
        },
        {
            quantity: usersCount,
            title: 'Usuários',
            table_name: 'user',
            icon: 'users'
        },
        {
            quantity: notifications.length,
            title: 'Notificações',
            table_name: 'receivedEmail',
            icon: 'notifications',
            link: '/admin/notifications'
        },
        {
            quantity: services.length,
            title: 'Serviços',
            table_name: 'service',
            icon: 'services'
        },
        {
            quantity: partners.length,
            title: 'Parceiros',
            table_name: 'partner',
            icon: 'partners'
        },
        {
            quantity: testimonials.length,
            title: 'Depoimentos',
            table_name: 'testimonial',
            icon: 'testimonials'
        },

    ]

    return { props: { projects, session, metrics, testimonials, services, partners } };
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
    link?: string;
}

export default function AdminDashboard({ metrics, projects, testimonials, services, partners }: { metrics: Metric[], projects: ModelWithImage<Project>[], session: Session, testimonials: Testimonial[], services: ModelWithImage<Service>[], partners: Partner[] }) {

    return (
        <div className="col-span-12 ">
            <div className="lg:mt-32 md:grid grid-cols-2 lg:grid-cols-4  gap-6">
                {metrics?.slice(0, 4)?.map((metric, index) =>
                    <Link key={index} title={metric.link ? 'Clique para ver' : ''} className={cn(!metric.link && "cursor-default")} href={metric.link ? metric.link : ''}>

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
                    </Link>
                )}
            </div>
            <ul className="grid md:grid-cols-2 mb-8 gap-6 my-6  ">
                <li id="step-customize" className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">

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
                        className='grid md:grid-cols-2 gap-3'

                        items={services}
                        header={{
                            title: 'Serviços',
                        }}
                    >
                        {/* @ts-ignore */}
                        <ServiceCard className='min-h-[200px]' />
                    </List>
                </li>
                <li className="space-y-4 p-4 border border-neutral-200 rounded-3xl bg-neutral-100 shadow-md">
                    <List
                        itemsPerPage={10}
                        enableEditor
                        tableName={'partner'}
                        className='grid md:grid-cols-4 gap-3'

                        items={partners}
                        header={{
                            title: 'Parceiros',
                        }}
                    >
                        {/* @ts-ignore */}
                        <PartnerCard className='min-h-[200px]' />
                    </List>
                </li>
            </ul>


        </div>
    )
}


