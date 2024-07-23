import Image from "next/image";
import { motion } from "framer-motion";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { Image as ImageType } from "@prisma/client";

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

export const ImageCard = ({ item }: { item: ImageType }) => {

    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            whileTap={{
                scale: 0.99
            }}
            className="grid md:grid-cols-2 justify-center relative overflow-hidden rounded-lg bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800">

            <motion.div className="relative rounded-t-3xl w-full h-52 col-span-2"
                variants={cardVariants} >

                <Image
                    alt={`image${item.name}`}
                    fill
                    className="object-contain object-center"
                    src={item?.url}
                />
            </motion.div>

        </motion.div>
    )
}
