
import { HTMLProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Container({ children, ...props }: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
    return (
        <section {...props} className={twMerge('relative z-1 col-span-12 container mx-auto md:grid grid-cols-12 min-h-[600px] mt-24  overflow-hidden md:overflow-visible', props?.className)} >
            {children}
        </section>
    )
}


