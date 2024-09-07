// pages/admin/blog/[id].tsx
import prisma from '@/lib/prisma';
import markdownToHtml from '@/lib/remark/markdown-to-html';
import { Post } from '@prisma/client';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(params?.id) },
        include: { user: true, categories: true },
    });

    const contentHtml = await markdownToHtml(post?.content || '');

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
    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
    );
}