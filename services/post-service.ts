import { DependencyType } from '@/components/ui/auto-form/types';
import { Column } from '@/types/column';
import { z } from 'zod';

export const canShowColumn = (col: Column) => {
  return (
    !['updatedAt', 'createdAt', 'contentHtml', 'user'].includes(col.name) &&
    !col.isId &&
    !col.isReadOnly
  );
};

export const hideFields: any = (fields: string[]) => {
  return fields.map((field) => ({
    sourceField: field,
    type: DependencyType.HIDES,
    targetField: field,
    when: () => true,
  }));
};

export type PostFormData = z.infer<any> & { id: any };

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
