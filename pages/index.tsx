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
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Cultura Verde - a excelência em paisagismo",
        "url": "https://culturaverde.com.br",
        "logo": "https://culturaverde.com.br/logo.png",
        "sameAs": [
          "https://www.facebook.com/culturaverde",
          "https://www.instagram.com/cultura_verde",
          "https://www.facebook.com/culturaverders"
        ]
      })}
    </script>
    <Page className={`relative z-1  ${yeseva_one.className} ${prata.className}`}>
      <div className="flex flex-col w-full min-h-[100vh] bg-primary-300">
        <Hero heroImages={heroImages} />
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
