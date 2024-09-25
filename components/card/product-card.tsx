import { Button } from "@/components/ui/button"
import { cn, fetchWhatsappLink } from "@/lib/utils"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Product } from "@prisma/client"
import { Coins } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import Link from "next/link"



export const ProductCard = ({ item, className, readOnly }: { item: any, className?: string, readOnly?: boolean }) => {


    async function goToWhatsapp(e: any) {
        e.preventDefault();

        const whatsappMessage = `Olá, estou interessado em comprar o produto ${item.name}. Poderia me fornecer mais informações?`;
        const whatsappLink = await fetchWhatsappLink(whatsappMessage);

        window.open(whatsappLink, "_blank");
    }


    return readOnly ? <ReadOnly item={item} className={className} /> : (
        <div className={cn("group relative rounded-md shadow-md shadow-neutral-200 bg-neutral-200 overflow-hidden transition-all grid grid-cols-4 ", className)}>

            <div className="relative aspect-square col-span-full  m-1 mb-2" >
                <Image
                    src={item.images?.[0].url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover "
                />

            </div>
            <div className="relative col-span-full bg-neutral-100 rounded-b-md p-4 shadow shadow-neutral-200  flex flex-col justify-between">
                <Button variant="outline" className="absolute right-4 -top-1 -translate-y-1/2 rounded-full aspect-square p-0 border-4 border-neutral-200 flex items-center justify-center cursor-not-allowed">
                    <ShoppingCartIcon className="h-4 w-4" />
                </Button>
                <div>

                    <p className="text-sm text-muted-foreground line-clamp-2 ">{item.categories?.[0]?.name}</p>

                    <h3 className="text-lg font-semibold group-hover:text-primary">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                    <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{item.stock > 0 ? 'Em estoque' : 'Sem estoque'}</Badge>
                        <span className="text-xs text-muted-foreground">{item.stock || 'Nenhuma'}  Unidade{item.stock > 1 ? 's' : ''} Disponíve{item.stock > 1 ? 'is' : 'l'}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-4">

                    <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>

                    <Button onClick={goToWhatsapp} variant="swipe" size="sm" className="flex items-center gap-2 z-10 border-neutral-100">
                        <Coins className="h-4 w-4 mr-2" />
                        <span className="text-neutral-600">
                            Comprar
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function ShoppingCartIcon(props: { className?: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}


const ReadOnly = ({ item, className }: { item: ModelWithImages<Product>, className?: string }) => {
    return (
        <div
            className={cn("flex flex-col justify-center border-t bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800 p-4 rounded-lg", className)}

        >
            <div className="grid grid-cols-4 gap-2">
                {item?.images?.[0]?.url ?
                    <span className="relative aspect-square" >
                        <Image
                            alt={`product-${item.name}`}
                            className="object-center object-cover"
                            fill
                            src={item?.images[0]?.url || ""}
                        />
                    </span>
                    : null}

                <div className={cn("col-span-3 flex flex-col")}>

                    <div>
                        <h4 className="font-semibold">{item.name}</h4>
                    </div>
                    <p className={cn("text-gray-500 dark:text-gray-400 line-clamp-1")}>
                        {item.description}
                    </p>
                    <p className={cn("text-gray-500 dark:text-gray-400 line-clamp-1 mt-auto")}>
                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                    </p>
                </div>
            </div>


        </div>
    )
}