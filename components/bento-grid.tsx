import { cn } from "@/lib/utils";


export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col md:grid  grid-cols-1 md:grid-cols-3 gap-4 w-full",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    children,
    variant = "primary",
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant?: "static" | "primary";
}) => {
    return (
        <div
            className={cn(
                "group overflow-hidden relative  w-full grow h-96 md:h-[23dvw]  hover:shadow-md duration-200 shadow-input dark:shadow-none dark:border-white/[0.2]  border border-transparent p-4  flex flex-col space-y-4",
                className,
                variant === "static" ? "cursor-default rounded-3xl" : "cursor-pointer rounded-3xl"
            )}
        >
            <span className=" h-full">
                <div className={cn(variant === 'primary' && "text-neutral-200   ")}
                    style={{
                        textShadow: variant === "primary" ? '1px 1px 10px  black' : 'none'
                    }}

                >
                    <span className={cn("text-left transition-all duration-300",
                        variant === "static" ?
                            "relative"
                            : "absolute z-10 opacity-0 group-hover:opacity-100 inset-0"
                    )}>

                        <div className="font-bold mb-2 mt-2 text-xl uppercase">
                            {title}
                        </div>
                        <div className={cn("  font-sans font-normal text-xs ",
                            variant === "static" ? "" : "transition-all delay-300 duration-300 opacity-0 group-hover:opacity-100"
                        )}>
                            {description}
                        </div>
                        <div className={cn("absolute bottom-4 right-4 font-sans font-normal text-xs ",
                            variant === "static" ? "hidden" : ""
                        )}>
                            {/* Detalhes */}
                        </div>
                    </span>
                </div>
                <span className={cn(" ",
                    variant === "static" ? "relative" : "absolute transition duration-300 inset-0 group-hover:scale-[1.02] "
                )}>
                    {children}
                </span>

            </span>
        </div>
    );
};
