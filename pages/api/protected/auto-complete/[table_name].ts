import prisma, { handleGetColumns } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/protected/auto-complete/{table_name}:
 *   get:
 *     summary: Busca dados de uma tabela
 *     tags:
 *       - crud
 *     description: Endpoint para buscar dados de uma tabela.
 *     parameters:
 *       - name: table_name
 *         in: path
 *         description: Nome da tabela
 *         required: true
 *         schema:
 *           type: string
 *       - name: query
 *         in: query
 *         description: Pesquisa de dados
 *         required: true
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
  const { query } = req.query as any;
  const tableName = req.query.table_name;

  /* where name or description ( if exists) like '%query%' */
  const where = handleGetColumns(tableName as any).reduce(
    (acc: any, curr: any) => {
      if (["name", "title", "description"].includes(curr.name)) {
        return {
          ...acc,
          [curr.name]: {
            contains: query,
          },
        };
      }
    }
  );

  try {
    const result = await (prisma as any)[tableName as any].findMany({
      where,
      take: 12,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to load data" });
  }
}
