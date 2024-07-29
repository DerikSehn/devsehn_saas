import { cn } from "@/lib/utils";
import Image from "next/image";
import { TestimonialCard } from "../card/testimonial-card";
import HorizontalScrollCarousel from "../ui/scroll/horizontal-scroll";
import { Section } from "./section/section";
import SectionHeader from "./section/section-header";

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
    return (
        <Section id="testimonials" className="h-auto relative w-full py-0 md:py-0 lg:py-0 flex flex-col justify-start">

            <span className="absolute inset-0 z-[0] bg-gradient-to-t  from-neutral-100 to-40% to-jet-900" />


            <HorizontalScrollCarousel
                className="overflow-x-clip  "
                content={
                    <div className={" space-y-2 text-center my-10 mx-auto flex flex-col items-center justify-center  h-1/4"}>
                        <h3 className="inline-block rounded-lg bg-jet-100 px-3 py-1 text-sm dark:bg-jet-500 text-jet-900 ">
                            Depoimentos
                        </h3>
                        <h2 className="text-3xl font-light tracking-wide sm:text-5xl lg:text-7xl max-w-screen-md text-jet-600 font-moglan">
                            O que as pessoas dizem
                        </h2>

                    </div>
                }
            >

                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} item={testimonial} readOnly className={cn(" max-w-[600px] w-[80vw]", index ? "" : "max-w-[800px]")} />
                ))}
            </HorizontalScrollCarousel>
        </Section >
    )
}