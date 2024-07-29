import repeatPattern from '@/lib/repeat-pattern';
import { cn } from '@/lib/utils';
import { handleApiRequest } from '@/pages/api/protected/crud';
import types from '@prisma/client';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { get } from 'http';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from '../bento-grid';


export default function Gallery({ images }: { images: types.Image[] }) {

    const [values, setImages] = useState<types.Image[]>(images)

    const getImages = async () => {
        const { result } = await handleApiRequest(undefined, 'image', 'findMany')
        setImages(result)
    }

    useEffect(() => {
        if (images.length === 0) {
            getImages()
        }
    }, [])

    const repeatedPattern = repeatPattern(values?.length, [1, 2, 1, 2, 2]);

    return (
        <div className="mx-auto max-w-screen-2xl pt-12">

            <BentoGrid className=' px-8 md:grid-cols-6 h-full overflow-scroll'  >

                {values?.map(({ description, name, url }, index) =>

                    <div key={index}
                        className={cn(
                            "bg-gradient-to-b  from-neutral-700/20 via-50% via-transparent to-90% to-neutral-700/10",
                            repeatedPattern[index] === 2 ? 'md:col-span-2' : 'md:col-span-1')}
                    >
                        <Image fill src={url} alt={'images-image'} className="object-cover  object-center" />
                    </div>

                )}

            </BentoGrid>

        </div>
    )
}