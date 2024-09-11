import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";


export const PostCard = ({ item, className, readonly }: { item: Post, className?: string, readonly?: boolean }) => {


    return (
        <Card
            className={cn("relative overflow-hidden rounded-lg bg-gradient-to-b from-neutral-100 to-white hover:bg-neutral-50 transition-colors border-primary-900 border-2 h-full",
                className
            )}
        >
            <h2 className="absolute right-2 text-primary-400 p-4 top-0" >
                #{item.id}
            </h2>
            <CardHeader className="bg-primary-900 text-primary-400">
                <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative max-h-60 mt-4 ">
                <div
                    className="max-h-60 overflow-hidden w-full "
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
                <span className="absolute bottom-0 inset-x-2 h-10 bg-gradient-to-t from-white  " />
            </CardContent>

            {readonly ?
                null
                : <CardFooter className="bg-white">
                    <Link href={`/blog/${item.id}`} passHref>
                        <Button variant="outline" className="mt-2">Ler mais</Button>
                    </Link>
                </CardFooter>
            }


        </Card >
    )
}