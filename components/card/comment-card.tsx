import { Comment } from "@prisma/client";
import { motion } from "framer-motion";


const CommentCard = ({ item }: { item: Comment }) => {

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
                <h4 className="font-semibold">{item?.model}</h4>
                <h4 className="font-semibold">{item?.field}</h4>
            </div>
            <div className="p-6">
                <h4 className="font-semibold text-right">{item?.id}</h4>
                <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis word-wrap h-full">
                    {item.description}
                </p>
            </div>

        </motion.div>
    )
}

export default CommentCard