import { getByIdService } from "@/services/get-by-id-service";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/protected/get-by-id:
 *   get:
 *     summary: Consulta um item pelo ID
 *     tags:
 *       - crud
 *     description: Endpoint para consultar um item pelo ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID do item
 *         required: true
 *         schema:
 *           type: string
 *       - name: tableName
 *         in: query
 *         description: Nome da tabela
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o item consultado.
 *       500:
 *         description: Falha ao carregar os dados.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await getByIdService(req, res);
}
