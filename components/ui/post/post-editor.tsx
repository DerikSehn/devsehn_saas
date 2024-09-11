import { useToast } from '@/components/providers/toast-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { isFunction } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MarkdownEditor from '@/components/MarkdownEditor';
import { TableItemEditorProps } from '@/types/item-editor';
import { createPost, deletePost, updatePost, postSchema, PostFormData } from '@/services/post-service';

const PostEditor = ({ item, method, onClose }: TableItemEditorProps) => {
    const [post, setPost] = useState<PostFormData>(item as any || {
        title: '',
        content: '',
    });

    const notify = useToast();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: post,
    });

    const mutation = useMutation({
        mutationFn: method === 'create' ? createPost : updatePost(item.id),
        onSuccess: (data) => {
            isFunction(onClose) && onClose({ item: data, method });
        },
        onError: () => notify(`Erro ao ${method === 'create' ? 'criar' : 'atualizar'} postagem.`, { type: 'error' }),
    });

    const handleFormSubmit = (data: PostFormData) => {
        mutation.mutate(data);
    };

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            isFunction(onClose) && onClose({ item: post as any, method: 'delete' });
        },
        onError: () => notify(`Erro ao excluir postagem.`, { type: 'error' }),
    });

    const handleDelete = (e: any) => {
        e.preventDefault();
        deleteMutation.mutate(post);
    };

    const content = watch('content', undefined);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className=" space-y-4">
            <h1 className='mb-2 text-2xl font-bold' >
                Novo post
            </h1>
            <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    type="text"
                    {...register('title')}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Conteúdo</Label>
                <MarkdownEditor value={content !== undefined ? content : item?.content} onChange={(value) => setValue('content', value)} />
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>
            <div className="sticky -bottom-8 bg-neutral-200 grid grid-cols-12 gap-2 p-4">
                <span className="col-span-6" />
                <span className="col-span-2">
                    {item ? (
                        <Button onClick={handleDelete} variant="destructive" className="w-full col-span-2">
                            {deleteMutation.isPending ? 'Removendo...' : 'Remover'}
                        </Button>
                    ) : null}
                </span>
                <span className="col-span-4">
                    <Button type="submit" variant={"swipe"} className="w-full col-span-4 rounded-lg">
                        {mutation.isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                </span>
            </div>
        </form>
    );
};

export default PostEditor;