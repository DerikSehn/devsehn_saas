import Image from "next/image";
import { motion } from "framer-motion";
import { Post } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";


export const PostCard = ({ item, className, readonly }: { item: Post, className?: string, readonly?: boolean }) => {


    return (
        <Card
            className={cn("  relative overflow-hidden rounded-lg bg-neutral-200/50 hover:bg-neutral-50 transition-colors  dark:bg-gray-800",
                className
            )}
        >
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className="max-h-40 w-full"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

            </CardContent>
            {readonly ?
                null
                : <CardFooter>
                    <Link href={`/blog/${item.id}`} passHref>
                        <Button variant="outline">Ler mais</Button>
                    </Link>
                </CardFooter>
            }



        </Card >
    )
}