import { cn } from "@/lib/utils";
import { Category, Product } from "@prisma/client";

export default function CategoryCard({ item, className, isStatic }: { item: Category & { products: Product[] }, className?: string, isStatic?: boolean }) {
    return (
        <div className={cn("group relative rounded-md shadow-md shadow-neutral-200 bg-neutral-200 overflow-hidden transition-all grid grid-cols-4 ", className)}>


            <div className="relative col-span-full bg-neutral-100 rounded-b-md p-4 shadow shadow-neutral-200  flex flex-col justify-between">

                <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{item.products?.length || 0} Produto{item.products?.length > 1 ? 's' : ''} vinculado{item.products?.length > 1 ? 's' : ''}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}