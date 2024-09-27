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
import Head from "next/head";
import About from "@/components/landingpage/about";


export const getServerSideProps = (async () => {

  const projects = await prisma.project.findMany({
    orderBy: {
      id: 'asc'
    },
    take: 6,
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

  const heroImages = projects.map(project => project.images[0]?.url || "");

  return { props: { projects, testimonials, services, partners, sections, heroImages } }
})

interface HomePageProps {
  heroImages: string[],
  projects: ModelWithImages<Project>[],
  testimonials: ModelWithImage<Testimonial>[],
  services: ModelWithImage<Service>[],
  partners: ModelWithImage<Partner>[],
  sections: ModelWithImages<Section>[]
}

export default function Home({ projects, testimonials, services, partners, sections, heroImages }: HomePageProps) {

  return (<div className="relative z-0">
    <Head>
      <title>Cultura Verde - A Excelência em Paisagismo</title>
      <meta name="description" content="Descubra os serviços de paisagismo da Cultura Verde e transforme seu jardim." />
      <meta property="og:title" content="Cultura Verde - Transforme seu Jardim" />
      <meta property="og:description" content="Descubra os serviços de paisagismo da Cultura Verde e transforme seu jardim." />
      <meta property="og:image" content="https://culturaverde.com.br/homepage-image.png" />
      <meta property="og:url" content="https://culturaverde.com.br" />
    </Head>
    <Page className={`relative z-1  ${yeseva_one.className} ${prata.className}`}>
      <article className="flex flex-col w-full min-h-[100vh] bg-primary-300">
        <Hero heroImages={heroImages} />
        <HeroCards services={services} />
        <About />
        <Projects projects={projects} />
        <ScrollSectionReveal content={
          <Sections sections={sections} />
        }>
          <ScrollSectionReveal content={
            <Partners partners={partners} />
          }>
            <Testimonials testimonials={testimonials} />
          </ScrollSectionReveal>
        </ScrollSectionReveal>
      </article>
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
