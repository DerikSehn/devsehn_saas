import Image from "next/image";
import { motion } from "framer-motion";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Service } from "@prisma/client";

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

export const ServiceCard = ({ item }: { item: ModelWithImage<Service> }) => {

    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            whileTap={{
                scale: 0.99
            }}
            className="grid md:grid-cols-2 justify-center relative overflow-hidden rounded-lg bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800">
            <div className="p-6">
                <div>
                    <h4 className="font-semibold">{item?.title}</h4>
                </div>
                <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.description}
                </p>
            </div>
            {item?.image ?
                <motion.div className="relative rounded-t-3xl w-full h-full"
                    variants={cardVariants} >

                    <Image
                        alt={`service${item.title}`}
                        fill
                        src={item?.image?.url}
                        style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                        }}
                    />
                </motion.div>
                : null}

        </motion.div>
    )
}
