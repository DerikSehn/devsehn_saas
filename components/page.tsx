import { cn } from '@/lib/utils'
import React from 'react'


export default function Page({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <>
            <main
                {...props}
                className={cn("w-full min-h-screen", className)}
            >
                {children}
            </main>
        </>
    )
}
