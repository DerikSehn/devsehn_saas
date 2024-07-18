//tailwind css framer-motion react-hook-form image upload section using prisma local server nextjs user already logged in

import { BentoGrid, BentoGridItem } from "@/components/bento-grid"
import Gallery from "@/components/gallery/gallery"
import { ImageUploader } from "@/components/image-uploader"
import { ProjectCreator } from "@/components/project-creator"
import prisma from "@/lib/prisma"
import { handleApiRequest } from "@/pages/api/crud"
import { Image, User } from "@prisma/client"
import { ImageIcon } from "lucide-react"
export async function getServerSideProps() {

    const projects = await prisma.project.findMany()
    const user = await prisma.user.findFirst({
        where: {
            email: 'admin@admin.com'
        }
    })

    const images = await prisma.image.findMany()

    return { props: { user, images, projects } }
}

export default function AdminSettings({ user, images }: { user: User, images: Image[] }) {

    const handleUpload = async (image: File) => await handleApiRequest(image, 'image', 'create')

    return (
        <div className="w-full h-full">

            <BentoGrid className="w-full h-full min-h-[600px]" >
                <div className="col-span-1 space-y-4">

                    <BentoGridItem
                        description="Adicione imagens para a sua conta"
                        icon={<ImageIcon className="w-8 h-8 text-muted-foreground" />}
                        title="Nova imagem" className="w-full h-full bg-neutral-100 shadow-lg" variant="static">
                        <ImageUploader onUpload={handleUpload} />
                    </BentoGridItem>
                    <BentoGridItem
                        description="Crie, edite e gerencie suas imagens"
                        icon={<ImageIcon className="w-8 h-8 text-muted-foreground" />}
                        title="Galeria de imagens" className="w-full h-full bg-neutral-100 shadow-lg overflow-scroll" variant="static">
                        <Gallery images={images} />
                        {/* continuar aqui */}
                    </BentoGridItem>
                </div>

                <BentoGridItem
                    description="Adicione projetos "
                    icon={<ImageIcon className="w-8 h-8 text-muted-foreground" />}
                    title="Novo projeto" className="w-full col-span-2 h-full min-h-full bg-neutral-100 shadow-lg" variant="static">
                    <ProjectCreator onUpload={handleUpload} />
                </BentoGridItem>
            </BentoGrid>
        </div>

    )
}
