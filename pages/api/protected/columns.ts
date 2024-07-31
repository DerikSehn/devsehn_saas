import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * @swagger
 * /api/protected/columns:
 *   post:
 *     summary: Obtém as colunas de um determinado modelo
 *     tags:
 *       - columns
 *     description: Endpoint para obter as colunas de um determinado modelo.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelName:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns the columns of the model.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(req: any, res: any) {
  try {
    // parse string body to code json
    const body = JSON.parse(req.body);
    const { modelName } = body;

    const columns = await getColumnsInfo(modelName);

    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getColumnsInfo(modelName: string) {
  const model = Prisma.dmmf.datamodel.models.find(
    (m) => m.name.toLowerCase() === String(modelName).toLowerCase()
  );

  if (!model) return [];
  const comments = await prisma.comment.findMany({
    where: {
      model: capitalize(modelName),
    },
  });

  const enumComments = Object.fromEntries(
    comments.map((comment) => [comment.field, comment.description])
  );

  const result = model.fields.map((field) => {
    return {
      ...field,
      description: enumComments[field.name] || field.name,
    };
  });

  return result;
}
