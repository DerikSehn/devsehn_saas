import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";


export const PostCard = ({ item, className, readonly }: { item: Post, className?: string, readonly?: boolean }) => {


    return (
        <Card
            className={cn("relative overflow-hidden rounded-lg bg-gradient-to-b from-white to-neutral-100 hover:bg-neutral-50 transition-colors border-neutral-300 border-2 h-full",
                className
            )}
        >
            <h2 className="absolute right-2 text-neutral-400 p-4 top-0" >
                #{item.id}
            </h2>
            <CardHeader className="bg-neutral-300">
                <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent >
                <div
                    className="max-h-40 w-full my-2 "
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

            </CardContent>

            {readonly ?
                null
                : <CardFooter className="bg-white">
                    <Link href={`/blog/${item.id}`} passHref>
                        <Button variant="outline">Ler mais</Button>
                    </Link>
                </CardFooter>
            }


        </Card >
    )
}