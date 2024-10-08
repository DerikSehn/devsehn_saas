// pages/blog/index.tsx
import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { PostCard } from '@/components/card/post-card';
import Image from 'next/image';
import { Section } from '@/components/landingpage/section/section';

export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await prisma.post.findMany({
        include: {
            categories: true,
            images: true,
        },
    });

    return {
        props: { posts },
    };
};

interface BlogPageProps {
    posts: {
        id: number;
        title: string;
        contentHtml: string;
    }[];
}

export default function BlogPage({ posts }: BlogPageProps) {
    return (
        <>
            <div className="absolute w-full h-60 bg-primary-200">
                <Image
                    className="z-0 blur object-cover saturate-50 brightness-[.25] opacity-70"
                    src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />
            </div>

            <Section id="blog" className="bg-transparent min-h-[1000px] h-auto flex flex-col  mx-auto justify-start px-12 pt-40 ">
                <div className="relative w-full grid md:grid-cols-2 gap-4 overflow-visible text-neutral-50 mb-10">
                    <div>
                        <h2 className="z-10 flex flex-col font-moglan uppercase font-thin text-left text-7xl">
                            Blog
                        </h2>
                    </div>
                </div>
                <div className="min-h-screen ">
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {posts.map((post) => (
                                <PostCard key={post.id} item={post as any} />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

        </>
    );
}