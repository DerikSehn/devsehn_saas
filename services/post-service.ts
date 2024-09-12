import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  content: z.string().min(1, 'O conteúdo é obrigatório'),
  images: z.array(z.any()),
});

export type PostFormData = z.infer<typeof postSchema> & { id: any };

export const createPost = async (post: PostFormData) => {
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
};

export const updatePost = (id: number) => async (post: PostFormData) => {
  console.log(post);
  const res = await fetch(`/api/protected/blog/${id}`, {
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
};

export async function deletePost(post: PostFormData) {
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
