import Contact from "@/components/contact";
import About from "@/components/landingpage/about";
import Hero from "@/components/landingpage/hero";
import HeroCards from "@/components/landingpage/hero-cards";
import Projects from "@/components/landingpage/projects";
import Testimonials from "@/components/landingpage/testimonials";
import Page from "@/components/page";
import prisma from "@/lib/prisma";
import { ModelWithImage, ModelWithImages } from "@/prisma/prisma-utils";
import { Project, Service, Testimonial } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Prata, Yeseva_One } from 'next/font/google';
import { useState } from "react";

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

  const projects = await prisma.project.findMany({ take: 5, include: { images: true } });
  const testimonials = await prisma.testimonial.findMany({ take: 10, include: { image: true } });
  const services = await prisma.service.findMany({ take: 5, include: { image: true } });

  return { props: { projects, testimonials, services } }
})


export default function Home({ projects, testimonials, services }: { projects: ModelWithImages<Project>[], testimonials: ModelWithImage<Testimonial>[], services: ModelWithImage<Service>[] }) {

  const session = useSession();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!session) {
      setMessage('You must be signed in to upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file as any);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage('Upload successful!');
    } else {
      setMessage(`Upload failed: ${result.error}`);
    }
  };

  return (<div className="relative z-0">
    <Page className={`relative z-1  ${yeseva_one.className} ${prata.className}`}>
      <div className="flex flex-col w-full min-h-[100vh]">
        <main className="flex-1 bg-primary-300">
          <Hero />
          <HeroCards services={services} />
          <Projects projects={projects} />
          <About />
          <Testimonials testimonials={testimonials} />
        </main>
      </div>
      <section id="projects" className="relative z-10 w-full overflow-hidden py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Projetos recentes
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Registros das nossas últimas transformações</h2>

          </div>
        </div>

      </section>

      <Contact />
    </Page>
  </div>
  );
}
