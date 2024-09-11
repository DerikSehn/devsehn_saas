import { PostCard } from '@/components/card/post-card';
import List from '@/components/list/list';
import PostEditor from '@/components/ui/post/post-editor';
import prisma from '@/lib/prisma';
import { Section } from '@prisma/client';
export async function getServerSideProps() {
    const posts = await prisma.post.findMany({
        include: {
            categories: true,
            images: true
        }
    })

    return { props: { posts } }
}



function AdminBlogsPage({ posts }: { posts: Section[] }) {
    return (
        <div className="w-full h-full grid md:grid-cols-2 gap-4">
            <div className="w-full h-full md:col-span-full">
                <List
                    items={posts}
                    tableName={'post'}
                    className='grid lg:grid-cols-3 gap-3 bg-neutral-100 shadow-lg rounded-lg p-4 h-full'
                    itemsPerPage={18}
                    enableEditor
                    listItemWrapperProps={{ variant: 'modal', className: "min-w-[900px] max-h-[80vh] min-h-[80vh]  overflow-auto" }}
                    /* @ts-ignore */
                    customEditor={<PostEditor />}
                    header={{ title: 'Lista de posts' }}
                >
                    {/* @ts-ignore */}
                    <PostCard className="min-h-[300px]" readonly />
                </List>
            </div>
        </div>
    );
}

export default AdminBlogsPage;