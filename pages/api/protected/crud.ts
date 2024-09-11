import { NextApiRequest, NextApiResponse } from "next";

import { handleCrudRequest } from "@/services/crud-service";
import { handleError } from "@/lib/utils/error-utils";

/**
 * @swagger
 * /api/protected/crud:
 *   post:
 *     summary: CRUD de um ou vários registros
 *     tags:
 *       - crud
 *     description: Endpoint para fazer crud de um ou vários registros.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *               data:
 *                 type: object
 *               table:
 *                 type: string
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
  try {
    const { method, data, table } = req.body;
    const result = await handleCrudRequest(data, table, method);
    res.status(200).json({ result });
  } catch (err) {
    handleError(res, err, "failed to load data");
  }
}
