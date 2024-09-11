import repeatPattern from '@/lib/utils/repeat-pattern';
import { cn } from '@/lib/utils';
import { ModelWithImage, ModelWithImages } from '@/prisma/prisma-utils';
import { Image as ImageType, Project } from '@prisma/client';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { BentoGrid, BentoGridItem } from '../bento-grid';



export default function Projects({ projects }: { projects: ModelWithImages<Project>[] }) {

  const repeatedPattern = repeatPattern(projects?.length);




  return (
    <div className="mx-auto max-w-screen-2xl   pt-12">

      <BentoGrid className=' px-8'  >

        {projects?.map(({ description, title, id, images }, index) =>
          <Link href={`/projects/${id}`}
            key={index}
          >
            <BentoGridItem
              title={title}
              description={description}

              icon={<OpenInNewWindowIcon />}
              className={cn(repeatedPattern[index] === 2 ? 'md:col-span-2' : 'md:col-span-1')}
            >
              <Image fill src={images?.[0]?.url || ""} alt={'projects-image'} className="object-cover  object-center" />
            </BentoGridItem>
          </Link>

        )}

      </BentoGrid>

    </div>
  )
}