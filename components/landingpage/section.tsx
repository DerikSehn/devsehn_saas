import { cn } from "@/lib/utils"

export function Section({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section {...props} className={cn("relative  bg-primary-300 z-10 w-full h-[100vh] min-h-[600px] flex justify-center text-center items-center sm:text-left", className)}>
            {children}
        </section>
    )
}