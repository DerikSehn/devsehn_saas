import prisma from '@/lib/prisma';
import markdownToHtml from '@/lib/remark/markdown-to-html';
import { authenticate } from '@/services/auth-service';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(2, 'O título é obrigatório'),
  content: z.string().min(1, 'O conteúdo é obrigatório'),
  /*   userId: z.string().min(10, 'O usuário deve estar autenticado'),
   */
});

/**
 * @swagger
 * /api/protected/blog/new:
 *   post:
 *     summary: Cria uma nova postagem no blog
 *     tags:
 *       - blog
 *     description: Endpoint para criar uma nova postagem no blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da postagem
 *                 example: "Meu primeiro post"
 *               content:
 *                 type: string
 *                 description: Conteúdo da postagem
 *                 example: "Este é o conteúdo do meu primeiro post."
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da postagem criada
 *                 title:
 *                   type: string
 *                   description: Título da postagem
 *                 content:
 *                   type: string
 *                   description: Conteúdo da postagem
 *                 userId:
 *                   type: string
 *                   description: ID do usuário que criou a postagem
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       path:
 *                         type: string
 *       500:
 *         description: Erro ao criar postagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data = postSchema.parse(req.body);
      const post = await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          contentHtml: await markdownToHtml(data.content),
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).end();
  }
}
