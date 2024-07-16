import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ImageInLine({ src, alt, className }: { src: string, alt: string, className: string }) {
    return (
        <span className={cn("relative items-center grow justify-center", className)}>
            <Image src={src} alt={alt} fill className="rounded-full" />
        </span>
    )
}