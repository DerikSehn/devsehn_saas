import { cn } from "@/lib/utils"

const SectionHeader = ({ title, subtitle, className }: { title: string, subtitle: string, className?: string }) => {
    return (
        <div className={cn(" space-y-2 text-center my-10", className)}>
            <h3 className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 ">
                {title}
            </h3>
            <h2 className="text-3xl font-light tracking-wide sm:text-5xl lg:text-7xl max-w-screen-md text-neutral-100 font-moglan">
                {subtitle}

            </h2>

        </div>
    )
}

export default SectionHeader