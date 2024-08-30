"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function Polaroid({ src, alt, height, width, rotation = 0, className, title = '' }: { title?: string, src: string, alt: string, height: number, width: number, rotation?: number, className?: string }) {

    const polaroidVariants = {
        tap: {
            scale: 0.95,
            rotate: rotation * 1.5,
            transition: { duration: 0.1 },
        },
        hover: {
            rotate: rotation,
            transition: { duration: 0.5 },

        },
    };

    return (
        <motion.div
            style={{ rotate: rotation }}
            className={twMerge("pt-10  pb-8 px-3 aspect-[.9] bg-gradient-to-b from-white to-white-400 m-[10%] shadow-gray-300 shadow-xl cursor-grab", className)}
            variants={polaroidVariants}
            whileTap="tap"
            whileHover="hover"
        >
            <Image
                src={src}
                alt={alt}
                height={height}

                width={width}
                className="w-full object-cover aspect-[.8] border border-gray-800 brightness-90 saturate-[1.1] "
            />
            <p className='font-moglan text-gray-400 py-4 inset-x-10  text-center'>
                {title}
            </p>
        </motion.div>
    );
}
