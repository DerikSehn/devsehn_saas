//tailwind css framer-motion react-hook-form image upload section using prisma local server nextjs user already logged in

import { SectionCard } from "@/components/card/section-card"
import List from "@/components/list/list"
import prisma from "@/lib/prisma"
import { Section } from "@prisma/client"
export async function getServerSideProps() {


    const sections = await prisma.section.findMany({
        include: {
            images: true
        }
    })

    return { props: { sections } }
}

export default function AdminSections({ sections }: { sections: Section[] }) {

    return (
        <div className="w-full h-full grid md:grid-cols-2 gap-4">
            <div className="w-full h-full md:col-span-full">
                <List items={sections} tableName={'section'}
                    className=' grid gap-3 bg-neutral-100 shadow-lg rounded-lg p-4 h-full'
                    itemsPerPage={18}
                    enableEditor
                    header={{ title: 'Seções do site' }}
                >

                    {/* @ts-ignore */}
                    <SectionCard className="min-h-[300px]" />
                </List>
            </div>

        </div>

    )
}
