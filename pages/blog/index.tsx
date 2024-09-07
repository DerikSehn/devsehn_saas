import { Section } from '@/components/landingpage/section/section';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const postSchema = z.object({
    title: z.string().min(1, 'O título é obrigatório'),
    content: z.string({ message: "Adicione conteúdo primeiro" }).min(1, 'O conteúdo é obrigatório'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function NewPost() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: PostFormData) => {
            const response = await fetch('/api/protected/blog/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Erro ao criar postagem');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'] as any);
            router.push('/admin/blog');
        },
    });

    const onSubmit = (data: PostFormData) => {
        mutation.mutate(data);
    };

    const content = watch('content', '');

    return (
        <>
            <div className="absolute w-full h-96 bg-primary-200">
                <Image
                    className="z-0 blur object-cover saturate-50 brightness-[.25] opacity-70"
                    src={"/uploads/dashboard/background.jpeg"} alt={'background'} fill />
            </div>

            <Section id="blog" className="bg-transparent min-h-[1000px] h-auto flex flex-col max-w-screen-2xl mx-auto justify-start px-12 pt-64">
                <div className="relative w-full grid md:grid-cols-2 gap-4 overflow-visible text-neutral-50 mb-10">
                    <div>
                        <h2 className="z-10 flex flex-col font-moglan uppercase font-thin text-left text-7xl">
                            Nova Postagem
                        </h2>
                        <div className="min-h-40 pt-20 flex flex-col justify-center text-left text-lg text-jet-600 py-4 text-gray-500">
                            <p>
                                Que nome você quer dar à sua postagem?
                            </p>
                        </div>
                        <Input
                            type="text"
                            placeholder="Título da postagem*"
                            {...register('title')}
                            className='bg-white border-b border-gray-800 rounded-sm text-gray-300 text-xl'
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full space-y-4 mb-4'>
                    <MarkdownEditor value={content} onChange={(value) => setValue('content', value)} />
                    {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                    <div className='flex justify-end'>
                        <Button type="submit" className="bg-primary-500 text-white py-2 px-4 rounded-md">
                            Criar
                        </Button>
                    </div>
                </form>
            </Section>
        </>
    );
}