import prisma from '@/lib/prisma';
import markdownToHtml from '@/lib/remark/markdown-to-html';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(2, 'O título é obrigatório'),
  content: z.string().min(1, 'O conteúdo é obrigatório'),
});

/**
 * @swagger
 * /api/protected/blog/{id}:
 *   put:
 *     summary: Atualiza uma postagem no blog
 *     tags:
 *       - blog
 *     description: Endpoint para atualizar uma postagem existente no blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da postagem a ser atualizada
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
 *       200:
 *         description: Postagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da postagem atualizada
 *                 title:
 *                   type: string
 *                   description: Título da postagem
 *                 content:
 *                   type: string
 *                   description: Conteúdo da postagem
 *                 contentHtml:
 *                   type: string
 *                   description: Conteúdo da postagem em HTML
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
 *         description: Erro ao atualizar postagem
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
  if (req.method === 'PUT') {
    try {
      const id = parseInt(req.query.id as any);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const data = postSchema.parse(req.body);
      const post = await prisma.post.update({
        where: { id },
        data: {
          title: data.title,
          content: data.content,
          contentHtml: await markdownToHtml(data.content),
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).end();
  }
}
