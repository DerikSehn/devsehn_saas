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

const postSchema = z.object({
    title: z.string().min(1, 'O título é obrigatório'),
    content: z.string().min(1, 'O conteúdo é obrigatório'),
});

type PostFormData = z.infer<typeof postSchema> & { id: any };

async function createPost(post: PostFormData) {
    const res = await fetch('/api/protected/blog/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!res.ok) {
        throw new Error('Erro ao criar postagem.');
    }
    return res.json();
}

async function updatePost(post: PostFormData) {
    const res = await fetch(`/api/protected/blog/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!res.ok) {
        throw new Error('Erro ao atualizar postagem.');
    }
    return res.json();
}

async function deletePost(post: PostFormData) {
    const res = await fetch(`/api/protected/blog/${post.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id }),
    });
    if (!res.ok) {
        throw new Error('Erro ao excluir postagem.');
    }
    return res.json();
}

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
        mutationFn: method === 'create' ? createPost : updatePost,
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">
                {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
            {item ? (
                <Button onClick={handleDelete} variant="destructive" className="w-full">
                    {deleteMutation.isPending ? 'Removendo...' : 'Remover'}
                </Button>
            ) : null}
        </form>
    );
};

export default PostEditor;