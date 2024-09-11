//tremor chart nextjs framer motion tailwindcss

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';


export default function Chart({ children, className }: { children?: any, className?: string }) {
    return (
        <motion.div
            className={twMerge('group w-full p-4 my-4 relative z-1  bg-neutral-900 border border-neutral-600 overflow-hidden rounded-[20px] shadow-md shadow-neutral-300', className)}
            whileHover={{ boxShadow: '2px 0px 16px 0px rgb(228, 228, 231, .5)', transition: { duration: 0.6, type: 'spring' } }}
            whileTap={{
                scale: 0.99
            }}
        >
            {children}
        </motion.div>
    );
}