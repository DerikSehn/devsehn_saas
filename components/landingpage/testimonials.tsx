import Image from "next/image";
import { TestimonialCard } from "../card/testimonial-card";
import { Section } from "./section";

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
    return (
        <Section id="testimonials" className="h-screen relative w-full py-12 md:py-24 lg:py-32 flex justify-center">
            <Image

                alt="Hero Image"
                fill
                className="object-cover object-center z-10 -scale-x-100"

                src="/hero/vector.svg" />
            <span className="absolute inset-0 z-[1] bg-gradient-to-t  from-primary-200 to-40%" />
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-3xl bg-gray-100 px-3 py-1 text-sm dark:bg-primary-200">
                            Depoimentos
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl"> O Que Nossos Clientes Dizem</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Confira o que nossos clientes satisfeitos têm a dizer sobre suas experiências com a Cultura Verde.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    {testimonials.map((testimonial, index) =>
                        <TestimonialCard key={index} item={testimonial} readOnly />
                    )}
                </div>
            </div>
        </Section>
    )
}