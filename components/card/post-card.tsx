import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { PostType } from "@/types/post-type";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { LinkPreview } from "../ui/link-preview";


export const PostCard = ({ item, className, readonly }: { item: PostType, className?: string, readonly?: boolean }) => {


    return <Card
        className={cn("relative overflow-hidden rounded-lg bg-gradient-to-b from-neutral-100 to-white hover:bg-neutral-50 transition-colors border-primary-900 border-2 h-full",
            className
        )}
    >

        <div className="relative h-72 ">
            <Image className="object-cover" alt={item.title} fill src={item.images[0]?.url || ""} />
        </div>
        <CardHeader className="relative  text-primary-400 pr-20 flex flex-row justify-between space-x-2" >
            <h4 className="absolute right-2 text-primary-700 p-4 top-4" >
                #{item.id}
            </h4>
            <CardTitle>{item.title}</CardTitle>


            <div>

                {item.categories.map((category) => (
                    <span key={category.id} className="text-neutral-50 bg-primary-700 px-2 rounded-md">{category.name}</span>
                ))
                }
            </div>

        </CardHeader>
        <CardContent className="relative max-h-60  ">
            <div
                className="max-h-60 overflow-hidden w-full [&_h1]:mt-0 [&_h2]:mt-6 [&_p]:mb-4 [&_p]:mt-2 [&_p]:text-neutral-400  [&_li]:my-2"
                dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
            <span className="absolute bottom-0 inset-x-2 h-32 bg-gradient-to-t from-white  " />
        </CardContent>

        {readonly ?
            null
            : <LinkPreview url={`https://culturaverde.com.br/blog/${item.id}`}>

                <CardFooter className="bg-primary-400 text-white pt-5">
                    Ler mais
                    <ArrowTopRightIcon className="scale-[2] ml-2" />
                </CardFooter>
            </LinkPreview>
        }



    </Card >


}