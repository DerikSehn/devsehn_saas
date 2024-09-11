import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ReturnToPage({ href, className }: { href?: string, className?: string }) {

    return (
        <div className={cn("absolute group top-0 left-0 flex items-center justify-center hover:-translate-x-2 transition-transform ", className)}>
            <Link href={href || '/'} className="text-sm underline group-hover:w-12">
                <ArrowLeftIcon className="w-8 h-8" />
            </Link>
        </div>
    );
}   