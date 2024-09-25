// pages/admin/blog/[id].tsx
import Carousel from '@/components/carousel/carousel';
import { Section } from '@/components/landingpage/section/section';
import ReturnToPage from '@/components/return-to-page';
import prisma from '@/lib/prisma';
import markdownToHtml from '@/lib/remark/markdown-to-html';
import { Post } from '@prisma/client';
import { formatDate } from 'date-fns';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(params?.id) },
        include: { user: true, categories: true, images: true },
    })
    return {
        props: {
            post
        },
    };
};

interface PostPageProps {
    post: Post
}

export default function PostPage({ post }: PostPageProps) {
    const formattedDate = formatDate(new Date(post.createdAt), 'dd/MM/yyyy');

    return (<>
        <div className="absolute w-full h-96 bg-primary-200">
            <Image
                className="z-0 blur object-cover saturate-50 brightness-[.25] opacity-70"
                src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />
        </div>

        <Section id="blog-item" className="bg-transparent min-h-[1000px] h-auto flex flex-col max-w-screen-2xl mx-auto justify-start px-12 pt-64 ">
            <div className="relative w-full grid md:grid-cols-2 gap-4 overflow-visible text-neutral-50 mb-10">
                <div >
                    <ReturnToPage href='/blog' className="absolute -top-20 " />
                    <h1 className="z-10 flex flex-col font-moglan uppercase font-thin text-left text-6xl">
                        {post.title}
                    </h1>
                    <div className=" flex flex-col justify-center text-left text-lg text-jet-600 py-4 text-neutral-200">
                        <p>
                            postado em: {formattedDate}
                        </p>
                    </div>
                </div>
            </div>
            <div className="min-h-screen pb-10 ">
                <div className="container  px-4 space-y-2 flex flex-col justify-center">
                    <Carousel perView={1} className='mx-auto max-w-prose' >
                        {(post as any).images.map((image: any) => (
                            <div key={image.id} className="relative h-96">
                                <Image className="object-cover" alt={post.title} src={image.url} fill />
                            </div>
                        ))}
                    </Carousel>
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} className='max-w-prose mx-auto [&_h1]:mt-8 [&_h2]:mt-6 [&_p]:mb-4 [&_p]:mt-2  [&_li]:my-2' />
                </div>
            </div>
        </Section>

    </>

    );
}