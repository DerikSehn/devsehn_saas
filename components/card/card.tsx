import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function Card({ children, className, title, isStatic = false }: { children: React.ReactNode, className?: string, title?: string, isStatic?: boolean }) {
    return (
        <motion.div
            className={twMerge('group w-full p-4 relative z-1  border border-neutral-600 overflow-hidden rounded-2xl', className)}
            whileHover={isStatic ? {} : { boxShadow: '2px 0px 16px 0px rgb(228, 228, 231, .5)', transition: { duration: 0.6, type: 'spring' } }}
            whileTap={isStatic ? {} : {
                scale: 0.99
            }}
        >
            {title ? <p className="relative z-10 font-bold text-2xl text-shadow-lg shadow-neutral-200">{title}</p> : null}

            {children}
        </motion.div>
    );
}
