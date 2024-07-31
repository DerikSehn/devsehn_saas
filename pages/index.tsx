import Hero from "@/components/landingpage/hero";
import HeroCards from "@/components/landingpage/hero-cards";
import Partners from "@/components/landingpage/partners";
import Projects from "@/components/landingpage/projects";
import Sections from "@/components/landingpage/sections";
import Testimonials from "@/components/landingpage/testimonials";
import Page from "@/components/page";
import ScrollSectionReveal from "@/components/ui/scroll/scroll-section-reveal";
import prisma from "@/lib/prisma";
import { ModelWithImage, ModelWithImages } from "@/prisma/prisma-utils";
import { Partner, Project, Section, Service, Testimonial } from "@prisma/client";
import { Prata, Yeseva_One } from 'next/font/google';
import Contact from "./contact";



export default function Home({ projects, testimonials, services, partners, sections }: { projects: ModelWithImages<Project>[], testimonials: ModelWithImage<Testimonial>[], services: ModelWithImage<Service>[], partners: ModelWithImage<Partner>[], sections: ModelWithImages<Section>[] }) {

  return (<div className="relative z-0">
    <Page className={`relative z-1  ${yeseva_one.className} ${prata.className}`}>
      <div className="flex flex-col w-full min-h-[100vh] bg-primary-300">
        <Hero />
        <HeroCards services={services} />
        <Projects projects={projects} />
        {/* <About /> */}
        <ScrollSectionReveal content={
          <Sections sections={sections} />
        }>
          <ScrollSectionReveal content={
            <Partners partners={partners} />
          }>
            <Testimonials testimonials={testimonials} />
          </ScrollSectionReveal>
        </ScrollSectionReveal>
      </div>
      <Contact />
    </Page>
  </div>
  );
}


const yeseva_one = Yeseva_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const getServerSideProps = (async () => {

  const projects = await prisma.project.findMany({
    orderBy: {
      id: 'asc'
    },
    take: 5,
    include: {
      images: {
        orderBy: {
          id: 'asc'
        }
      }
    }
  });
  const sections = await prisma.section.findMany({
    orderBy: {
      id: 'asc'
    },
    take: 3,
    include: {
      images: {
        orderBy: {
          id: 'asc'
        }
      }
    }
  });
  const partners = await prisma.partner.findMany({ include: { image: true } });
  const testimonials = await prisma.testimonial.findMany({ take: 10, include: { image: true } });
  const services = await prisma.service.findMany({ include: { image: true } });

  return { props: { projects, testimonials, services, partners, sections } }
})