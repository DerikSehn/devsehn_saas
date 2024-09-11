// components/BlobImage.tsx

import { cn } from '@/lib/utils';
import React from 'react';

interface BlobImageProps {
    src: string;
    alt?: string;
    className: string;
}

const BlobImage: React.FC<BlobImageProps> = ({ src, className }) => {
    return (
        <div className={cn("relative w-full h-full mx-auto", className)}>
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                className="w-full h-full"
            >
                <clipPath id="mask">
                    <path fill="#FF0066" d="M43.4,-67.2C55.7,-59.7,64.8,-46.7,72.3,-32.4C79.8,-18.1,85.7,-2.4,84,12.3C82.3,27.1,72.9,41,62.2,54.6C51.5,68.1,39.6,81.2,24.3,87.9C9.1,94.7,-9.5,95.2,-25,88.9C-40.4,82.6,-52.8,69.5,-63.5,55.8C-74.1,42.1,-83,27.6,-85.7,12C-88.4,-3.6,-85,-20.4,-76.5,-33.3C-68.1,-46.2,-54.6,-55.1,-41,-62C-27.4,-68.9,-13.7,-73.8,0.9,-75.3C15.6,-76.7,31.1,-74.7,43.4,-67.2Z" transform="translate(100 100)" />
                </clipPath>
                <image
                    width="100%"
                    height="100%"
                    clipPath="url(#mask)"
                    preserveAspectRatio="xMidYMid slice"
                    href={src}
                    className="object-cover"

                />
            </svg>
        </div>
    );
};

export default BlobImage;
