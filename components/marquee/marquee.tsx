import { cn } from "@/lib/utils"

const LogoMarquee = ({ children, className }: { children: React.ReactNode[], className?: string }) => {

    return (
        <Marquee>
            {children.map((child, index) => (
                <div
                    key={index}
                    className={cn("relative h-full w-fit mx-[4rem] flex items-center justify-start", className)}
                >
                    {child}
                </div>
            ))}
        </Marquee>
    )
}


export const Marquee: React.FC<{ children: any }> = ({ children }) => {
    const reorderedChildren = children.slice(children.length / 2, children.length).concat(children.slice(0, children.length / 2))
    return (
        <div className="w-full overflow-hidden sm:mt-24 mt-10 z-10">
            <div className="relative flex flex-col max-w-screen overflow-hidden py-5 space-y-10">

                <div className="flex w-max animate-marquee [--duration:30s]">
                    {children}
                    {children}
                </div>
                <div className=" flex w-max animate-marquee [--duration:20s]">
                    {reorderedChildren}
                    {reorderedChildren}
                </div>
            </div>
        </div>
    )
}

export default LogoMarquee