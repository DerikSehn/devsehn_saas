import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ImageInLine({ src, alt, className, width = 200, height = 100 }: { src: string, alt: string, className?: string, width?: number, height?: number }) {
    return (
        <Image src={src} alt={alt} width={width} height={height} className={cn(" inline min-w-24 object-cover rounded-full", className)} />
    )
}