import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function MetricCard({ children, className }: { children?: any, className?: string }) {
    return (
        <motion.div
            className={twMerge('group w-full p-4 my-4 relative z-1  bg-neutral-100 border border-neutral-300 overflow-hidden rounded-[20px]', className)}
            animate={{ boxShadow: '2px 0px 10px 0px rgb(228, 228, 231, .5)', transition: { duration: 0.6, type: 'spring' } }}
            whileHover={{ boxShadow: '2px 0px 10px 0px rgb(40, 40, 40, .5)', transition: { duration: 0.6, type: 'spring' } }}
            whileTap={{
                scale: 0.99
            }}
        >
            {children}
        </motion.div>
    );
}
