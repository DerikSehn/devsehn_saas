import { cn } from "@/lib/utils";
import { Image as ImageType, Testimonial } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";

export const TestimonialCard = ({ item, readOnly, ...props }: { item: Testimonial & { image?: ImageType }, readOnly?: boolean }) => {
    return (
        <motion.div
            className="flex flex-col justify-center border-t bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800 p-4 rounded-lg"
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
                            src={item?.image?.url}
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                        />
                        : null}

                </div>
                <div className={cn("flex flex-col", readOnly ? "" : "whitespace-nowrap overflow-hidden text-ellipsis")}>

                    <div>
                        <h4 className="font-semibold">{item.name}</h4>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400  ">
                        {item.description}
                    </p>
                </div>
            </div>


        </motion.div>
    )
}
