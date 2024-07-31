import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Busca produtos
 *     description: Endpoint para buscar produtos.
 *     tags:
 *       - products
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Categoria do produto
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  try {
    const products =
      category === "Todos"
        ? await prisma.product.findMany({
            include: { images: true },
          })
        : await prisma.product.findMany({
            where: {
              categories: { some: { name: category as string } },
            },
            include: { images: true },
          });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}
