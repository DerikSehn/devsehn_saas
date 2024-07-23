import Image from "next/image";
import { motion } from "framer-motion";
import { ModelWithImages } from "@/prisma/prisma-utils";
import { Section } from "@prisma/client";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "../bento-grid";


export const SectionCard = ({ item, className }: { item: ModelWithImages<Section>, className?: string }) => {

    console.log(item);

    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            whileTap={{
                scale: 0.99
            }}
            className={cn("grid md:grid-cols-4 border-t-4 border-r-8 border-primary-600 justify-center relative overflow-hidden rounded-lg bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800",
                className
            )}>
            <div className="p-6 md:col-span-3">
                <div>
                    <h4 className="font-semibold text-2xl">{item?.title}</h4>
                </div>
                <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.description}
                </p>
                <BentoGrid className="my-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {item.images?.slice(0, 4)?.map((image, index) =>
                        <div
                            key={index}
                            className={"bg-neutral-100  w-full  flex flex-col space-y-4"}
                        >
                            <div className="relative flex aspect-square rounded-lg overflow-hidden">
                                <Image
                                    alt={`section${item.title}`}
                                    fill
                                    src={image.url}
                                    style={{
                                        aspectRatio: "40/40",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className="leading-none flex flex-col space-y-1 items-center font-normal text-neutral-600 p-2">
                                <span className="text-xl font-light text-neutral-900 line-clamp-1">
                                    {image.name}
                                </span>
                                {/*  <br />
                                <span className="text-md font-thin line-clamp-4">
                                    {image.description}
                                </span> */}
                            </div>
                        </div>
                    )}
                </BentoGrid>
            </div>
            {item?.images ? <>
                <motion.div className="relative rounded-t-3xl w-full h-full bg-neutral-200"
                >
                    <Image
                        alt={`section${item.title}`}
                        fill
                        className="object-cover object-center"
                        src={item?.images[0]?.url}
                        style={{
                        }}
                    />
                </motion.div>
            </>
                : null}

        </motion.div>
    )
}
