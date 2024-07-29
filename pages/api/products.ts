import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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
              categories: { some: { category: { name: category as string } } },
            },
            include: { images: true },
          });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}
