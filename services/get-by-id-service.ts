import prisma, { getIncludeFields } from "@/lib/prisma";
import { handleError } from "@/lib/utils/error-utils";
import { NextApiRequest, NextApiResponse } from "next";

export async function getByIdService(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, tableName } = req.body;

  if (!id || !tableName) {
    return res.status(400).json({ error: "id e tableName são obrigatórios" });
  }

  try {
    const model = (prisma as any)[tableName as string];
    if (!model) {
      return res.status(400).json({ error: "Tabela não encontrada" });
    }

    const result = await model.findFirst({
      where: { id: Number(id) },
      include: getIncludeFields(tableName as string),
    });

    if (!result) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.status(200).json(result);
  } catch (err) {
    handleError(res, err, "Falha ao carregar os dados");
  }
}
