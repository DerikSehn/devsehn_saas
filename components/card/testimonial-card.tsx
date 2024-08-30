import { cn } from "@/lib/utils";
import CurveIcon from "@/public/testimonials/curve";
import { Image as ImageType, Testimonial } from "@prisma/client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export const TestimonialCard = ({ item, readOnly, ...props }: { item: Testimonial & { image?: ImageType }, readOnly?: boolean, className?: string }) => {
    return (readOnly ? <ReadOnlyTestimonial item={item} {...props} /> :
        <motion.div
            className={cn("flex flex-col justify-center border-t bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800 p-4 rounded-lg", props.className)}
            whileTap={{
                scale: 0.99
            }}
        >
            <div className="flex justify-start ">
                <div className="flex items-start min-w-12 max-w-12">
                    {item?.image ?
                        <Image
                            alt={`testimonial-${item.name}`}
                            className="h-10 w-10 min-w-10 aspect-square rounded-full object-top"
                            width={40}
                            height={40}
                            src={item?.image?.url as any || ""}
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                        />
                        : null}

                </div>
                <div className={cn("flex flex-col")}>

                    <div>
                        <h4 className="font-semibold">{item.name}</h4>
                    </div>
                    <p className={cn("text-gray-500 dark:text-gray-400 ", readOnly ? "" : "line-clamp-1")}>
                        {item.description}
                    </p>
                </div>
            </div>


        </motion.div>
    )
}


const ReadOnlyTestimonial = ({ item, ...props }: { item: Testimonial & { image?: ImageType }, readOnly?: boolean, className?: string }) => {
    return (
        <div className={cn("border border-jet-500 h-full rounded-xl p-6 space-y-20 flex flex-col justify-center", props.className)}>
            <div className="flex justify-center items-center space-x-6 relative overflow-visible ">
                <motion.div
                    /* @ts-ignore */
                    animate={props.active ? {
                        rotate: '-25deg',
                    } : {
                        rotate: '0deg',
                        opacity: 0,
                    }}

                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                >
                    <CurveIcon className="-scale-x-150  w-12 h-12 " fill="#fff" />
                </motion.div>
                <div className="relative overflow-visible ">
                    <motion.span className="absolute inset-2 z-0 aspect-square overflow-visible rounded-full top-10">
                        <Image src={item?.image?.url as any || ""} alt={`testimonial-${item.name}`} fill
                            className="blur-xl rounded-full opacity-80 aspect-square object-top "
                        />
                    </motion.span>
                    <Quote className=" text-neutral-400 scale-[2] absolute -left-10 bottom-0 opacity-50 z-0" fill="#a3a3a3" />

                    <Image src={item?.image?.url as any || ""} alt={`testimonial-${item.name}`} width={200} height={200} className="brightness-110 aspect-square rounded-full object-top " />
                </div>
                <motion.div
                    /* @ts-ignore */
                    animate={props.active ? {
                        rotate: '25deg',
                    } : {
                        rotate: '0deg',
                        opacity: 0,
                    }}

                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                >
                    <CurveIcon className="scale-x-150 w-12 h-12 " fill="#fff" />
                </motion.div>
            </div>
            <div className="flex flex-col max-w-md mx-auto space-y-5 relative text-center prose tracking-wider"
                style={{
                    textShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)"
                }}
            >
                <p className="text-jet-700 text-md leading-8">
                    {item.description}
                </p>
                <br />
                <h4 className="font-moglan font-bold text-xl text-jet-500">{item.name}</h4>
            </div>
        </div>
    )
}