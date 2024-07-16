import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Logo = ({ src, alt, link = '', height = 80, width = 80, className }: { src: string, alt: string, link?: string, height?: number, width?: number, className?: string }) => {

    const Img = () => <Image src={src} alt={alt} height={height} width={width} className={twMerge(className)} />

    return link ? (
        <Link href={link} target='_blank' >
            <Img />
        </Link>
    ) : <Img />

};

export default Logo;
