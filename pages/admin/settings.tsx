import prisma from "@/lib/prisma";
import { Setting } from "@prisma/client";

import Card from "@/components/card/card";
import MetricCard from "@/components/card/MetricCard";
import List from "@/components/list/list";
import { Separator } from "@/components/ui/separator";
import { ModelWithImage } from "@/prisma/prisma-utils";
import { InfoIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";

export async function getServerSideProps() {

    const infos = await prisma.setting.findMany({
        orderBy: [{ createdAt: 'desc' }]
    });

    const backgroundImage = await prisma.setting.findFirst({
        where: {
            title: 'backgroundImage'
        }
    });


    return { props: { backgroundImage, infos } };
}


const AdminInfo = ({ backgroundImage, infos = [] }: { backgroundImage: Setting, infos: ModelWithImage<Setting>[] }) => {


    return (
        <div className="col-span-12 ">
            <MetricCard
                className=""
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <InfoIcon className="h-5 w-5" />
                        <div className="text-lg font-semibold">Informações gerais</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>

                        </p>
                    </div>
                </div>
            </MetricCard>
            <MetricCard

                isStatic
                className="min-h-96">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <SettingsIcon className="h-5 w-5" />
                        <div className="text-lg font-semibold">Configurações do site</div>
                    </div>
                </div>

                <List
                    itemsPerPage={8}
                    enableEditor
                    tableName={'setting'}
                    className='grid md:grid-cols-2 gap-3'
                    items={infos}
                    header={{
                        title: '',
                    }}
                >
                    {/* @ts-ignore */}
                    <SettingsCard className="min-h-[100px]" />
                </List>


            </MetricCard>
        </div>
    );
};

export default AdminInfo;

/* Received Email Component. Its like reading a mail from inbox */
const SettingsCard = ({ item }: { item: Setting }) => {
    return (
        <Card isStatic className="group flex flex-col gap-4 py-2 min-h-20">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <Separator />
            {item?.imageId && <Image src={(item as ModelWithImage<Setting>).image.url} alt={item.title} width={100} height={100} />}
            {item?.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}
            {item?.value && <p className="text-xl text-muted-foreground">{item.value}</p>}
        </Card>
    )
}