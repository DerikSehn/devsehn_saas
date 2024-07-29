import Image from "next/image";
import { motion } from "framer-motion";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Partner } from "@prisma/client";
import { cn } from "@/lib/utils";

const cardVariants = {
    initial: {
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.5,
        }
    },
    animate: {
        scale: 1.1,
    },
};

export const PartnerCard = ({ item, className }: { item: ModelWithImage<Partner>, className?: string }) => {

    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            whileTap={{
                scale: 0.99
            }}
            className={cn("flex flex-col space-y-2 justify-center relative overflow-hidden rounded-lg bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800",
                className
            )}
        >

            {
                item?.image ?
                    <motion.div className="relative rounded-t-3xl w-full h-full min-h-[100px]"
                        variants={cardVariants} >

                        <Image
                            alt={`Partner-${item.name}`}
                            fill
                            src={item?.image?.url}
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                        />
                    </motion.div >
                    : null}
            <div className="p-6">
                <div>
                    <h4 className="font-semibold line-clamp-2">{item?.name}</h4>
                </div>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-4">
                    {item.description}
                </p>
            </div>
        </motion.div >
    )
}
