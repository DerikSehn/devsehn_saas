"use client"
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function HeaderLogo({ href = '/', className, linkClassName }: { href?: string, linkClassName?: string } & { className?: string }) {
  return (
    <Link
      href={href} className={twMerge("p-2 rounded-full  hover:brightness-75 transition-all lg:col-span-6 col-span-6  flex space-x-2", linkClassName)} >

      <Image
        className={twMerge("object-top object-cover  drop-shadow-sm   shadow-neutral-800 max-h-[89px] ", className)}
        src={"/assets/logo_branco_horizontal.png"}
        width={250}
        height={250}
        alt="logo dom" />

    </Link>)
}

