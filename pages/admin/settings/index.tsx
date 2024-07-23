//tailwind css framer-motion react-hook-form image upload section using prisma local server nextjs user already logged in

import { BentoGrid, BentoGridItem } from "@/components/bento-grid"
import CommentCard from "@/components/card/comment-card"
import { ImageCard } from "@/components/card/image-card"
import Gallery from "@/components/gallery/gallery"
import { ImageUploader } from "@/components/image-uploader"
import List from "@/components/list/list"
import prisma from "@/lib/prisma"
import { handleApiRequest } from "@/pages/api/crud"
import { Image, User } from "@prisma/client"
import { ImageIcon, SettingsIcon } from "lucide-react"
export async function getServerSideProps() {

    const comments = await prisma.comment.findMany()
    const user = await prisma.user.findFirst({
        where: {
            email: 'admin@admin.com'
        }
    })

    const images = await prisma.image.findMany()

    return { props: { user, images, comments } }
}

export default function AdminSettings({ comments, images }: { user: User, images: Image[], comments: Comment[] }) {

    return (
        <div className="w-full h-full grid md:grid-cols-2 gap-4">
            {/*  <div className="w-full h-full">
                <List items={comments} tableName={'comment'}
                    className='grid md:grid-cols-3 gap-3 bg-neutral-100 shadow-lg rounded-lg p-4 h-full'
                    itemsPerPage={18}
                    enableEditor={true}
                    header={{ title: 'Comentários de Tabelas' }}
                >
                    <CommentCard />
                </List>
            </div> */}
            <div className="w-full h-full md:col-span-full">
                <List items={images} tableName={'image'}
                    className=' grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 bg-neutral-100 shadow-lg rounded-lg p-4 h-full'
                    itemsPerPage={18}
                    enableEditor
                    header={{ title: 'Galeria de Imagens' }}
                >
                    {/* @ts-ignore */}
                    <ImageCard />
                </List>

            </div>

        </div>

    )
}
